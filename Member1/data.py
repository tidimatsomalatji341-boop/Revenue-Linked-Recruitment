# data.py - Centralized Medical Coding & Pricing for RLR Prototype

medical_codes = [
    # Trauma & Emergency
    {"term": "Heart Attack STEMI", "code": "I21.0", "price": 72000, "desc": "Acute transmural myocardial infarction"},
    {"term": "Septic Hip Arthritis", "code": "M86.9", "price": 48000, "desc": "Pyogenic arthritis, hip"},
    {"term": "Gunshot Wound Abdomen", "code": "S31.1", "price": 92000, "desc": "Open wound of abdominal wall"},
    {"term": "Stab Wound Chest", "code": "S21.1", "price": 82000, "desc": "Open wound of thorax (penetrating)"},
    {"term": "Head Injury (Concussion)", "code": "S06.0", "price": 35000, "desc": "Concussion / Traumatic brain injury"},
    {"term": "Snake Bite (Venomous)", "code": "T63.0", "price": 95000, "desc": "Toxic effect of snake venom"},
    {"term": "Severe Burn (3rd Degree)", "code": "T20.3", "price": 120000, "desc": "Burn of third degree, head and neck"},
    {"term": "Fractured Femur (Thigh)", "code": "S72.9", "price": 55000, "desc": "Fracture of femur, unspecified part"},
    {"term": "Broken Ribs (Multiple)", "code": "S22.4", "price": 28000, "desc": "Multiple fractures of ribs"},
    
    # Maternal & Pediatric
    {"term": "Normal Vaginal Delivery", "code": "O80.9", "price": 14500, "desc": "Single spontaneous delivery"},
    {"term": "Caesarean Section (C-Section)", "code": "O82.0", "price": 60000, "desc": "Delivery by elective caesarean section"},
    {"term": "Neonatal Jaundice", "code": "P59.9", "price": 12000, "desc": "Neonatal jaundice from unspecified causes"},
    {"term": "Severe Malnutrition (Kwashiorkor)", "code": "E40", "price": 30000, "desc": "Kwashiorkor"},
    
    # Chronic & Infectious Disease
    {"term": "Bacterial Pneumonia", "code": "J15.9", "price": 28000, "desc": "Unspecified bacterial pneumonia"},
    {"term": "Diabetes with Ketoacidosis", "code": "E11.1", "price": 42000, "desc": "Type 2 diabetes with ketoacidosis"},
    {"term": "Stroke (Ischaemic)", "code": "I63.9", "price": 88000, "desc": "Cerebral infarction, unspecified"},
    {"term": "Tuberculosis (Pulmonary)", "code": "A15.0", "price": 35000, "desc": "TB of lung, confirmed by sputum"},
    {"term": "Appendicitis with Peritonitis", "code": "K35.2", "price": 68000, "desc": "Acute appendicitis with peritonitis"},
    {"term": "Severe Dehydration (Gastro)", "code": "E86.0", "price": 18000, "desc": "Volume depletion (dehydration)"},
    {"term": "Meningitis (Bacterial)", "code": "G00.9", "price": 75000, "desc": "Bacterial meningitis, unspecified"},
    {"term": "Asthma Attack (Acute)", "code": "J46", "price": 15000, "desc": "Status asthmaticus"},
    {"term": "Hypertensive Crisis", "code": "I10", "price": 22000, "desc": "Essential hypertension - Emergency"},
    {"term": "Kidney Failure (Acute)", "code": "N17.9", "price": 110000, "desc": "Acute kidney failure, unspecified"},
    {"term": "HIV with Opportunistic Infection", "code": "B20", "price": 40000, "desc": "HIV disease with infectious results"},
    {"term": "Epileptic Fit (Seizure)", "code": "G40.9", "price": 18000, "desc": "Epilepsy, unspecified"}
]