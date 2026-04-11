import pandas as pd

# -----------------------------
# LOAD DATA (NO FILE ISSUES)
# -----------------------------
prices_csv = """Condition,ICD10,Price
Heart Attack,I21,45000
Appendicitis,K35,25000
Gunshot,W34,60000
Stroke,I63,50000
Fracture,S52,20000
Asthma,J45,15000
Pneumonia,J18,18000
Diabetes,E11,12000
Hypertension,I10,8000
Burns,T30,30000
Kidney Failure,N17,40000
HIV,B20,22000
TB,A15,20000
Covid,U07.1,18000
Cancer,C50,70000
Sepsis,A41,55000
Head Injury,S06,35000
Malaria,B50,14000
Ulcer,K25,16000
Anemia,D64,10000
"""

from io import StringIO
df = pd.read_csv(StringIO(prices_csv))

# -----------------------------
# RULES
# -----------------------------
DOCTOR_SALARY = 70800
THRESHOLD = DOCTOR_SALARY / 0.10  # 708,000

def process_claim(balance, amount):
    return balance + amount

def can_hire(balance):
    if balance >= THRESHOLD:
        return True, int(balance // THRESHOLD)
    return False, 0

def needed(balance):
    return max(THRESHOLD - balance, 0)

# -----------------------------
# SIMULATION
# -----------------------------
balance = 0
conditions = ["Heart Attack", "Appendicitis", "Gunshot"]

for c in conditions:
    row = df[df["Condition"] == c].iloc[0]
    balance = process_claim(balance, row["Price"])
    print(f"{c} -> +R{row['Price']}")

print("\nTotal Balance:", balance)

ok, doctors = can_hire(balance)

if ok:
    print(f"Hire {doctors} doctor(s)")
else:
    print("Need more:", needed(balance))