import os
import json
import google.generativeai as genai
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from data import medical_codes

app = FastAPI(title="Medical Code Search API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Your API Key
genai.configure(api_key="AIzaSyDMcBAkB5WK1O540YBA_YFIPK82n3zbOlo")
model = genai.GenerativeModel("gemini-1.5-flash")

@app.get("/search")
async def search(query: str):
    result = None
    query_lower = query.lower().strip()
    
    try:
        # 1. The "Strict" Prompt: Forces the AI to use YOUR specific list
        prompt = (
            f"User input: '{query}'. "
            f"Available Database: {medical_codes}. "
            f"Find the most relevant entry from the database. "
            f"Return ONLY a JSON object: {{\"term\": \"...\", \"code\": \"...\", \"price\": 0}}. "
            f"Do not invent new codes. If unsure, pick the most similar medical condition."
        )
        
        response = model.generate_content(prompt)
        clean_text = response.text.strip().replace("```json", "").replace("```", "")
        
        start = clean_text.find("{")
        end = clean_text.rfind("}") + 1
        if start != -1:
            result = json.loads(clean_text[start:end])
            
    except Exception as e:
        print(f"AI Search Error: {e}")

    # 2. THE FIX: Cross-Reference with your local data
    # If the AI gave us a result, let's make sure that 'code' exists in our list to get the REAL price.
    matched_item = None
    
    if result and result.get("code") != "000.0":
        # Search our list of 25 for the code the AI suggested
        for item in medical_codes:
            if item["code"] == result.get("code"):
                matched_item = item
                break

    # 3. SMART BACKUP: If the AI failed or the code wasn't found, do a keyword scan
    if not matched_item:
        for item in medical_codes:
            # Check if query words (like 'sugar' or 'flu') are in the medical terms
            if query_lower in item["term"].lower() or item["term"].lower() in query_lower:
                matched_item = item
                break

    # 4. Final Result Construction
    if matched_item:
        final_data = {
            "term": matched_item["term"],
            "code": matched_item["code"],
            "price": matched_item["price"],
            "ward_share": float(matched_item["price"]) * 0.10
        }
    else:
        final_data = {
            "term": "Manual Review Required",
            "code": "000.0",
            "price": 0,
            "ward_share": 0
        }
    
    return {"status": "success", "data": final_data}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)