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