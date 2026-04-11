from fastapi import FastAPI
from backend_logic import process_billing_claim, hospital_balances

app = FastAPI()

@app.post("/confirm-billing")
def confirm_billing(recovery_value: float):
    return process_billing_claim(recovery_value)

@app.get("/balances")
def get_balances():
    return hospital_balances

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8001)