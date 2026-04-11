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

@app.post("/clarify-diagnosis")
async def clarify_diagnosis(diagnosis: str, clarification_response: str = None):
    """
    Uses Gemini AI to intelligently clarify a vague diagnosis.
    If clarification_response is provided, it refines the diagnosis further.
    Returns the final diagnosis with ICD-10 code or follow-up questions needed.
    """
    try:
        database_context = json.dumps(medical_codes)
        
        if not clarification_response:
            # Stage 1: Initial diagnosis - Ask what clarification is needed
            prompt = (
                f"A doctor has reported this patient condition: '{diagnosis}'. "
                f"Our available medical database has these conditions: {database_context}. "
                f"To identify the exact billable ICD-10 code from our database, generate 1-2 specific clarification questions "
                f"that would help narrow down the diagnosis. "
                f"IMPORTANT: The questions should lead to answers from our actual database. "
                f"Return ONLY valid JSON: {{'needs_clarification': true, 'question': '...', 'options': ['...', '...']}} "
                f"If the diagnosis is already specific enough in our database, return: "
                f"{{'needs_clarification': false, 'matched_diagnosis': '...', 'code': '...', 'price': 0}}"
            )
        else:
            # Stage 2: Refined diagnosis - Match with database using clarification
            prompt = (
                f"The doctor initially reported: '{diagnosis}'. "
                f"When asked for clarification, they responded: '{clarification_response}'. "
                f"Available database: {database_context}. "
                f"Using this context, find the most accurate diagnosis from our database. "
                f"Return ONLY valid JSON: {{'matched_diagnosis': '...', 'code': '...', 'price': 0, 'description': '...'}}"
            )
        
        response = model.generate_content(prompt)
        clean_text = response.text.strip().replace("```json", "").replace("```", "").replace("```python", "")
        
        start = clean_text.find("{")
        end = clean_text.rfind("}") + 1
        if start != -1 and end > start:
            result = json.loads(clean_text[start:end])
            
            # If matched_diagnosis provided, cross-reference with database
            if result.get("matched_diagnosis"):
                for item in medical_codes:
                    if item["term"].lower() == result.get("matched_diagnosis", "").lower() or \
                       item["code"] == result.get("code"):
                        return {
                            "status": "success",
                            "diagnosis": item["term"],
                            "code": item["code"],
                            "price": item["price"],
                            "ward_share": float(item["price"]) * 0.10,
                            "needs_clarification": False
                        }
            
            # If needs clarification
            if result.get("needs_clarification"):
                return {
                    "status": "success",
                    "needs_clarification": True,
                    "question": result.get("question", "Please provide more details"),
                    "options": result.get("options", [])
                }
            
            return {"status": "success", "data": result}
        
    except Exception as e:
        print(f"Clarification Error: {e}")
        return {
            "status": "error",
            "error": str(e)
        }
    
    return {
        "status": "error",
        "error": "Could not process diagnosis"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)