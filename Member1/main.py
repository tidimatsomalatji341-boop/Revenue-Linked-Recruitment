import sys
import os

# This tells Python to look outside Member1 to find the 'backend' folder
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from backend.database import hospital_balances


import google.generativeai as genai
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from data import medical_codes
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Use your key here
genai.configure(api_key="AIzaSyDMcBAkB5WK1O540YBA_YFIPK82n3zbOlo")
model = genai.GenerativeModel('gemini-1.5-flash')

@app.get("/search")
async def search(query: str):
    try:
        # 1. Attempt AI Search
        prompt = f"Match '{query}' to one item in {medical_codes}. Return ONLY JSON: {{\"term\": \"name\", \"code\": \"icd10\", \"price\": 0}}"
        response = model.generate_content(prompt)
        
        # Strip any AI chatter
        text = response.text
        json_data = text[text.find("{"):text.rfind("}")+1]
        result = json.loads(json_data)
        
    except Exception as e:
        print(f"AI Failed, using local search... Error: {e}")
        # 2. Backup Plan: Local Search (Demo Saver!)
        result = {"term": "Manual Review Required", "code": "000.0", "price": 0}
        for item in medical_codes:
            if query.lower() in item["term"].lower():
                result = item
                break
    
    # Calculate the 10% Ward Fund
    price = float(result.get("price", 0))
    result["ward_share"] = price * 0.10
    
    return {"status": "success", "data": result}

# 1. This function saves every bill to a file for Member 2 to see
def save_to_ledger(entry):
    file_path = "ledger.json"
    data = []
    if os.path.exists(file_path):
        with open(file_path, "r") as f:
            data = json.load(f)
    data.append(entry)
    with open(file_path, "w") as f:
        json.dump(data, f, indent=4)

# 2. This is the endpoint the "Confirm" button will call
@app.post("/confirm-billing")
async def confirm_billing(item: dict):
    price = float(item.get("price", 0))
    ward_cut = price * 0.10  # 10% for hiring
    
    # Update the shared balances you imported
    hospital_balances["ward_balance"] += ward_cut
    hospital_balances["general_balance"] += (price - ward_cut)
    
    # Save to the ledger file
    save_to_ledger({
        "diagnosis": item.get("term"),
        "total_price": price,
        "hiring_contribution": ward_cut
    })
    
    remaining = hospital_balances["hiring_goal"] - hospital_balances["ward_balance"]
    
    return {
        "status": "Success",
        "hiring_fund_new_total": hospital_balances["ward_balance"],
        "remaining_to_goal": max(0, remaining)
    }