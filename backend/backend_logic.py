from database import hospital_balances

def process_billing_claim(estimated_recovery_value):
    ward_share = estimated_recovery_value * 0.10
    hospital_share = estimated_recovery_value * 0.90

    hospital_balances["ward_balance"] += ward_share
    hospital_balances["general_balance"] += hospital_share

    progress_percentage = (hospital_balances["ward_balance"] / hospital_balances["hiring_goal"]) * 100

    return {
        "status": "success",
        "ward_share_added": ward_share,
        "new_ward_total": hospital_balances["ward_balance"],
        "hiring_progress_percent": round(progress_percentage, 2)
    }