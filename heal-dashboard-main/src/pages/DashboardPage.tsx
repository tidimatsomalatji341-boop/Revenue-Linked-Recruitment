import React, { useState, useEffect, useRef } from "react";
import { 
  Search, MoreVertical, Paperclip, Mic, 
  Landmark, CreditCard, BarChart3, Users, MessageSquare, Check, CheckCheck 
} from "lucide-react";

// --- ICD-10 INTELLIGENT DIAGNOSIS DATABASE ---
const DIAGNOSIS_DATABASE: { [key: string]: any } = {
  "stroke": {
    isVague: true,
    clarifyQuestion: "To find the exact billable code, I need to know: Did the stroke affect the left side of the body, right side, speech, or another area?",
    followUps: {
      "left arm": {
        code: "I63.9",
        fullCode: "I63.9 with G81.92",
        icdDescription: "Cerebral Infarction - Hemiplegia affecting left arm",
        price: 60000,
        description: "Acute ischemic stroke with motor deficit affecting left arm requiring emergency intervention and rehabilitation",
        bodyPart: "Brain & Left Arm",
        medications: ["Alteplase (tPA)", "Aspirin", "Clopidogrel", "Statins", "Physical Therapy"],
        dangerLevel: "Critical",
        dangerColor: "bg-red-100 text-red-700"
      },
      "right arm": {
        code: "I63.9",
        fullCode: "I63.9 with G81.91",
        icdDescription: "Cerebral Infarction - Hemiplegia affecting right arm",
        price: 60000,
        description: "Acute ischemic stroke with motor deficit affecting right arm requiring emergency intervention and rehabilitation",
        bodyPart: "Brain & Right Arm",
        medications: ["Alteplase (tPA)", "Aspirin", "Clopidogrel", "Statins", "Physical Therapy"],
        dangerLevel: "Critical",
        dangerColor: "bg-red-100 text-red-700"
      },
      "speech": {
        code: "I63.9",
        fullCode: "I63.9 with R47.02",
        icdDescription: "Cerebral Infarction - Expressive Aphasia",
        price: 55000,
        description: "Acute ischemic stroke affecting Broca's area causing expressive speech impairment",
        bodyPart: "Brain - Language Center",
        medications: ["Alteplase (tPA)", "Aspirin", "Clopidogrel", "Speech Therapy", "Statins"],
        dangerLevel: "Critical",
        dangerColor: "bg-red-100 text-red-700"
      },
      "left leg": {
        code: "I63.9",
        fullCode: "I63.9 with G81.94",
        icdDescription: "Cerebral Infarction - Hemiplegia affecting left leg",
        price: 62000,
        description: "Acute ischemic stroke with motor deficit affecting left leg requiring emergency intervention",
        bodyPart: "Brain & Left Leg",
        medications: ["Alteplase (tPA)", "Aspirin", "Clopidogrel", "Anticoagulants", "Physical Therapy"],
        dangerLevel: "Critical",
        dangerColor: "bg-red-100 text-red-700"
      },
      "right leg": {
        code: "I63.9",
        fullCode: "I63.9 with G81.93",
        icdDescription: "Cerebral Infarction - Hemiplegia affecting right leg",
        price: 62000,
        description: "Acute ischemic stroke with motor deficit affecting right leg requiring emergency intervention",
        bodyPart: "Brain & Right Leg",
        medications: ["Alteplase (tPA)", "Aspirin", "Clopidogrel", "Anticoagulants", "Physical Therapy"],
        dangerLevel: "Critical",
        dangerColor: "bg-red-100 text-red-700"
      }
    }
  },
  "heart attack": {
    isVague: true,
    clarifyQuestion: "To get the precise billing code, I need to know: Was this an anterior wall MI, inferior wall MI, or lateral wall MI? Or do you know which coronary artery was blocked?",
    followUps: {
      "anterior": {
        code: "I21.02",
        fullCode: "I21.02",
        icdDescription: "ST Elevation Myocardial Infarction (STEMI) of Anterior Wall",
        price: 85000,
        description: "Acute ST-elevation myocardial infarction of anterior wall requiring emergency cardiac catheterization and stent placement",
        bodyPart: "Cardiac System - Anterior Wall",
        medications: ["Aspirin", "Clopidogrel (Plavix)", "Enoxaparin", "Atorvastatin", "Metoprolol", "Nitroglycerin"],
        dangerLevel: "Life-Threatening",
        dangerColor: "bg-red-200 text-red-800"
      },
      "inferior": {
        code: "I21.11",
        fullCode: "I21.11",
        icdDescription: "ST Elevation Myocardial Infarction (STEMI) of Inferior Wall",
        price: 75000,
        description: "Acute ST-elevation myocardial infarction of inferior wall with potential RV involvement",
        bodyPart: "Cardiac System - Inferior Wall",
        medications: ["Aspirin", "Clopidogrel (Plavix)", "Enoxaparin", "Atorvastatin", "Beta-Blockers", "Nitroglycerin"],
        dangerLevel: "Life-Threatening",
        dangerColor: "bg-red-200 text-red-800"
      },
      "lateral": {
        code: "I21.21",
        fullCode: "I21.21",
        icdDescription: "ST Elevation Myocardial Infarction (STEMI) of Lateral Wall",
        price: 72000,
        description: "Acute ST-elevation myocardial infarction of lateral wall of left ventricle",
        bodyPart: "Cardiac System - Lateral Wall",
        medications: ["Aspirin", "Clopidogrel", "Enoxaparin", "Atorvastatin", "ACE Inhibitors", "Nitroglycerin"],
        dangerLevel: "Life-Threatening",
        dangerColor: "bg-red-200 text-red-800"
      },
      "lad blocked": {
        code: "I21.02",
        fullCode: "I21.02",
        icdDescription: "LAD Occlusion - Anterior Wall STEMI",
        price: 90000,
        description: "Left Anterior Descending (LAD) artery occlusion causing extensive anterior wall infarction",
        bodyPart: "Cardiac System - LAD Territory",
        medications: ["Aspirin", "Clopidogrel", "Enoxaparin", "Atorvastatin", "Metoprolol", "High-dose Nitrates"],
        dangerLevel: "Life-Threatening",
        dangerColor: "bg-red-200 text-red-800"
      }
    }
  },
  "asthma": {
    isVague: true,
    clarifyQuestion: "To determine the right code: Is this an acute exacerbation with respiratory distress requiring intervention, or a chronic case flare-up?",
    followUps: {
      "acute exacerbation": {
        code: "J45.901",
        fullCode: "J45.901",
        icdDescription: "Unspecified asthma with (acute) exacerbation",
        price: 12000,
        description: "Acute exacerbation of asthma with respiratory distress requiring bronchodilator therapy and corticosteroids",
        bodyPart: "Respiratory System",
        medications: ["Salbutamol Aerosol", "Ipratropium Bromide", "Prednisone", "Oxygen Therapy", "Magnesium Sulfate IV"],
        dangerLevel: "High",
        dangerColor: "bg-orange-100 text-orange-600"
      },
      "status asthmaticus": {
        code: "J45.902",
        fullCode: "J45.902",
        icdDescription: "Unspecified asthma with status asthmaticus",
        price: 35000,
        description: "Severe acute asthma attack (status asthmaticus) with severe bronchospasm requiring ICU admission and mechanical ventilation",
        bodyPart: "Respiratory System",
        medications: ["IV Epinephrine", "High-dose Corticosteroids", "Continuous Albuterol", "Mechanical Ventilation", "Oxygen", "Magnesium Sulfate"],
        dangerLevel: "Life-Threatening",
        dangerColor: "bg-red-200 text-red-800"
      },
      "mild intermittent": {
        code: "J45.901",
        fullCode: "J45.901",
        icdDescription: "Mild intermittent asthma",
        price: 5000,
        description: "Mild intermittent asthma symptoms with infrequent exacerbations",
        bodyPart: "Respiratory System",
        medications: ["Salbutamol PRN", "Inhaled Corticosteroid", "Antihistamines"],
        dangerLevel: "Low",
        dangerColor: "bg-green-100 text-green-700"
      }
    }
  },
  "diabetes": {
    isVague: true,
    clarifyQuestion: "For the correct code: Is this Type 1 Diabetes, Type 2 Diabetes, or Diabetic Ketoacidosis (DKA)? And are there complications like neuropathy or kidney problems?",
    followUps: {
      "type 1": {
        code: "E10.9",
        fullCode: "E10.9",
        icdDescription: "Type 1 Diabetes Mellitus",
        price: 18000,
        description: "Type 1 Diabetes Mellitus requiring insulin therapy and glucose monitoring",
        bodyPart: "Endocrine System - Pancreas",
        medications: ["Insulin (Multiple types)", "Metformin", "Blood Glucose Monitoring", "Dietary Education"],
        dangerLevel: "High",
        dangerColor: "bg-orange-100 text-orange-600"
      },
      "type 2": {
        code: "E11.9",
        fullCode: "E11.9",
        icdDescription: "Type 2 Diabetes Mellitus",
        price: 12000,
        description: "Type 2 Diabetes Mellitus requiring oral antidiabetic agents and lifestyle modification",
        bodyPart: "Endocrine System - Pancreas",
        medications: ["Metformin", "GLP-1 Agonists", "SGLT2 Inhibitors", "Statins", "Blood Pressure Control"],
        dangerLevel: "Moderate",
        dangerColor: "bg-yellow-100 text-yellow-700"
      },
      "dka": {
        code: "E10.1",
        fullCode: "E10.1",
        icdDescription: "Type 1 Diabetes with Diabetic Ketoacidosis",
        price: 48000,
        description: "Life-threatening condition requiring emergency ICU admission, IV fluids, insulin drip, and electrolyte correction",
        bodyPart: "Endocrine System - Systemic",
        medications: ["IV Insulin Drip", "Normal Saline IV", "Potassium Replacement", "Bicarbonate (if severe)", "ICU Monitoring"],
        dangerLevel: "Life-Threatening",
        dangerColor: "bg-red-200 text-red-800"
      }
    }
  },
  "pneumonia": {
    isVague: true,
    clarifyQuestion: "To code this correctly: Is this bacterial pneumonia, viral pneumonia, or aspiration pneumonia? And is it community-acquired or hospital-acquired?",
    followUps: {
      "bacterial communityacquired": {
        code: "J15.9",
        fullCode: "J15.9",
        icdDescription: "Bacterial Pneumonia - Community Acquired",
        price: 28000,
        description: "Community-acquired bacterial pneumonia requiring broad-spectrum antibiotics and respiratory support",
        bodyPart: "Lungs & Lower Respiratory Tract",
        medications: ["Cephalosporin", "Fluoroquinolone", "Azithromycin", "Oxygen Therapy", "Chest Physiotherapy"],
        dangerLevel: "High",
        dangerColor: "bg-orange-100 text-orange-600"
      },
      "viral": {
        code: "J12.9",
        fullCode: "J12.9",
        icdDescription: "Viral Pneumonia - Unspecified",
        price: 15000,
        description: "Viral pneumonia requiring supportive care, oxygen therapy, and monitoring",
        bodyPart: "Lungs & Lower Respiratory Tract",
        medications: ["Antiviral Agents", "Oxygen Therapy", "Bronchodilators", "Symptomatic Treatment"],
        dangerLevel: "Moderate",
        dangerColor: "bg-yellow-100 text-yellow-700"
      },
      "severe sepsis": {
        code: "J15.9",
        fullCode: "J15.9 with R65.21",
        icdDescription: "Severe Sepsis from Pneumonia",
        price: 65000,
        description: "Severe sepsis secondary to bacterial pneumonia requiring ICU admission, vasopressors, and intensive support",
        bodyPart: "Lungs & Lower Respiratory Tract - Systemic",
        medications: ["IV Antibiotics (High-dose)", "Vasopressors", "IV Fluids", "Oxygen/Mechanical Ventilation", "ICU Care"],
        dangerLevel: "Life-Threatening",
        dangerColor: "bg-red-200 text-red-800"
      }
    }
  },
  "sepsis": {
    isVague: true,
    clarifyQuestion: "Critical information needed: What is the source of infection? Is it from pneumonia, urinary tract, abdominal, wound, or blood?",
    followUps: {
      "pneumonia source": {
        code: "R65.20",
        fullCode: "R65.20 with J15.9",
        icdDescription: "Severe Sepsis from Pneumonia",
        price: 75000,
        description: "Severe sepsis with septic shock secondary to pneumonia requiring emergency ICU admission",
        bodyPart: "Multi-system - Systemic Infection",
        medications: ["Broad-spectrum IV Antibiotics", "Vasopressors (Norepinephrine)", "IV Fluid Resuscitation", "Blood Product Support"],
        dangerLevel: "Life-Threatening",
        dangerColor: "bg-red-200 text-red-800"
      },
      "urinary source": {
        code: "R65.20",
        fullCode: "R65.20 with N39.0",
        icdDescription: "Severe Sepsis from UTI/UrosepsiS",
        price: 52000,
        description: "Severe sepsis secondary to urinary tract infection with renal involvement",
        bodyPart: "Urinary System - Systemic",
        medications: ["IV Fluoroquinolone", "Vasopressors", "IV Fluids", "Foley Catheterization", "Renal Monitoring"],
        dangerLevel: "Life-Threatening",
        dangerColor: "bg-red-200 text-red-800"
      }
    }
  }
};

const PATIENTS = [
  { 
    id: 1, 
    name: "Jabu Mthembu", 
    type: "Government", 
    amount: 45000, 
    condition: "Septic Hip (M86.91)",
    description: "Severe bone infection requiring emergency surgical intervention",
    bodyPart: "Hip Joint",
    medications: ["Vancomycin IV", "Ceftriaxone", "Rifampicin", "Pain Management"],
    dangerLevel: "Critical",
    dangerColor: "bg-red-100 text-red-700"
  },
  { 
    id: 2, 
    name: "Sarah Pillay", 
    type: "Medical Aid", 
    amount: 8500, 
    condition: "Asthma Attack (J45.9)",
    description: "Acute exacerbation of persistent asthma with respiratory distress",
    bodyPart: "Respiratory System",
    medications: ["Salbutamol Aerosol", "Ipratropium Bromide", "Prednisone", "Oxygen Therapy"],
    dangerLevel: "Moderate",
    dangerColor: "bg-yellow-100 text-yellow-700"
  },
  { 
    id: 3, 
    name: "Bongani Dlamini", 
    type: "Government", 
    amount: 85000, 
    condition: "Heart Attack (I21.9)",
    description: "Acute ST-elevation myocardial infarction requiring immediate cardiac intervention",
    bodyPart: "Cardiac System",
    medications: ["Aspirin", "Clopidogrel", "Enoxaparin", "Atorvastatin", "Nitroglycerin", "Beta-Blockers"],
    dangerLevel: "Life-Threatening",
    dangerColor: "bg-red-200 text-red-800"
  },
];

const DashboardPage = () => {
  const [messages, setMessages] = useState<any[]>([
    { 
      id: 1, 
      sender: 'bot', 
      type: 'options',
      text: "Good morning, Dr. I am your Ward B Assistant. How can I help you today?",
      options: ['Patient Registry', 'Revenue Report', 'New Billing Claim', 'Register Patient']
    }
  ]);
  
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [balances, setBalances] = useState<any>(null);
  const [claimStatuses, setClaimStatuses] = useState<{ [key: number]: string }>({});
  const [registrationStep, setRegistrationStep] = useState<number>(0);
  const [registrationData, setRegistrationData] = useState<any>({});
  const [patientsList, setPatientsList] = useState<any[]>(PATIENTS);
  const [waitingForClarification, setWaitingForClarification] = useState<boolean>(false);
  const [currentConditionKey, setCurrentConditionKey] = useState<string>('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch balances from backend
  useEffect(() => {
    fetch('http://localhost:8001/balances')
      .then(res => res.json())
      .then(data => setBalances(data))
      .catch(err => console.error('Failed to load balances:', err));
  }, []);

  const handleOptionClick = (option: string) => {
    // If in registration mode, use registration handler for options
    if (registrationStep > 0) {
      handleRegistrationInput(option);
      return;
    }

    // 1. Add User bubble
    const userMsg = { id: Date.now(), sender: 'user', text: option, type: 'text' };
    setMessages(prev => [...prev, userMsg]);

    // 2. Bot "Thinking" Delay
    setTimeout(() => {
      let botResponse: any = { id: Date.now() + 1, sender: 'bot' };

      if (option === 'Patient Registry') {
        botResponse.type = 'registry';
        botResponse.data = patientsList;
      } else if (option === 'Revenue Report') {
        botResponse.type = 'report';
        botResponse.text = "Here is the fiscal recovery summary for Ward B:";
        botResponse.balances = balances;
      } else if (option === 'Register Patient') {
        // Start patient registration flow
        setRegistrationStep(1);
        setRegistrationData({});
        botResponse.type = 'text';
        botResponse.text = "Great! Let's register a new patient. What is the patient's first name?";
      } else {
        botResponse.type = 'text';
        botResponse.text = "Enter a diagnosis or condition in the search box below (e.g., 'Stroke', 'Asthma', 'Heart Attack')";
      }
      setMessages(prev => [...prev, botResponse]);
    }, 600);
  };

  // Search medical codes via API
// Helper function to enrich search results with clinical details
const getConditionDetails = (term: string, price: number) => {
  const detailsMap: { [key: string]: any } = {
    "septic hip": {
      description: "Severe bone infection requiring emergency surgical intervention and prolonged antibiotic therapy",
      bodyPart: "Hip Joint",
      medications: ["Vancomycin IV", "Ceftriaxone", "Rifampicin", "Pain Management", "Surgical Drainage"],
      dangerLevel: "Critical",
      dangerColor: "bg-red-100 text-red-700"
    },
    "asthma": {
      description: "Acute exacerbation of persistent asthma with respiratory distress requiring aerosol and systemic therapy",
      bodyPart: "Respiratory System",
      medications: ["Salbutamol Aerosol", "Ipratropium Bromide", "Prednisone", "Oxygen Therapy"],
      dangerLevel: "Moderate",
      dangerColor: "bg-yellow-100 text-yellow-700"
    },
    "heart": {
      description: "Acute myocardial infarction requiring immediate cardiac intervention and intensive monitoring",
      bodyPart: "Cardiac System",
      medications: ["Aspirin", "Clopidogrel", "Enoxaparin", "Atorvastatin", "Nitroglycerin", "Beta-Blockers"],
      dangerLevel: "Life-Threatening",
      dangerColor: "bg-red-200 text-red-800"
    },
    "stroke": {
      description: "Cerebrovascular accident requiring urgent neurological intervention and rehabilitation",
      bodyPart: "Brain & Neural System",
      medications: ["Alteplase (tPA)", "Antiplatelet Agents", "Anticoagulants", "Antihypertensives", "Statins"],
      dangerLevel: "Critical",
      dangerColor: "bg-red-100 text-red-700"
    },
    "pneumonia": {
      description: "Severe lung infection requiring broad-spectrum antimicrobial therapy and respiratory support",
      bodyPart: "Lungs & Lower Respiratory Tract",
      medications: ["Cephalosporin", "Fluoroquinolone", "Azithromycin", "Oxygen Therapy", "Bronchodilators"],
      dangerLevel: "High",
      dangerColor: "bg-orange-100 text-orange-600"
    },
    "diabetes": {
      description: "Acute metabolic complication requiring immediate glucose stabilization and insulin therapy",
      bodyPart: "Endocrine System",
      medications: ["Insulin", "Dextrose IV", "Electrolyte Replacement", "Bicarbonate", "Monitoring"],
      dangerLevel: "High",
      dangerColor: "bg-orange-100 text-orange-600"
    }
  };

  // Find matching detail key
  const lowerTerm = term.toLowerCase();
  let details = null;
  
  for (const [key, value] of Object.entries(detailsMap)) {
    if (lowerTerm.includes(key)) {
      details = value;
      break;
    }
  }

  // Default details if no match found
  return details || {
    description: "Clinical condition under review. Additional details to be confirmed by medical staff.",
    bodyPart: "System TBD",
    medications: ["Awaiting clinical assessment"],
    dangerLevel: "Pending",
    dangerColor: "bg-gray-100 text-gray-700"
  };
};

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    // If in registration mode, use registration handler
    if (registrationStep > 0) {
      handleRegistrationInput(query);
      return;
    }

    // Add user message
    const userMsg = { id: Date.now(), sender: 'user', text: query, type: 'text' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:8000/search?query=${encodeURIComponent(query)}`);
      const result = await response.json();
      
      const details = getConditionDetails(result.data?.term || '', result.data?.price || 0);

      // Show search result as AI analysis
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        type: 'claim',
        patient: {
          name: result.data?.term || 'Unknown',
          condition: result.data?.term || 'Unknown Condition',
          type: 'Government',
          amount: result.data?.price || 0,
          code: result.data?.code,
          description: details.description,
          bodyPart: details.bodyPart,
          medications: details.medications,
          dangerLevel: details.dangerLevel,
          dangerColor: details.dangerColor
        },
        searchMode: true
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error('Search failed:', error);
      const errorMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        type: 'text',
        text: 'Sorry, I could not search that diagnosis. Please try another.'
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const triggerClaim = (p: any) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'bot',
      type: 'claim',
      patient: p,
      searchMode: false
    }]);
  };

  // Confirm billing claim via API
  const handleConfirmClaim = async (patient: any, messageId: number) => {
    const claimMsgId = messageId || Date.now();
    
    // Set status to pending
    setClaimStatuses(prev => ({ ...prev, [claimMsgId]: 'pending' }));
    
    // Show pending message
    const pendingMsg = {
      id: Date.now(),
      sender: 'bot',
      type: 'status',
      text: '⏳ Claim submission in progress...',
      status: 'pending'
    };
    setMessages(prev => [...prev, pendingMsg]);
    
    try {
      const response = await fetch('http://localhost:8001/confirm-billing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recovery_value: patient.amount })
      });
      const result = await response.json();
      
      // Wait 5 seconds then show approved
      setTimeout(() => {
        setClaimStatuses(prev => ({ ...prev, [claimMsgId]: 'approved' }));
        const approvedMsg = {
          id: Date.now(),
          sender: 'bot',
          type: 'status',
          text: `✅ CLAIM APPROVED! Ward recovery: R${(patient.amount * 0.1).toLocaleString()} successfully filed.`,
          status: 'approved'
        };
        setMessages(prev => [...prev, approvedMsg]);
      }, 5000);
    } catch (error) {
      console.error('Claim failed:', error);
      setClaimStatuses(prev => ({ ...prev, [claimMsgId]: 'failed' }));
    } finally {
      setLoading(false);
    }
  };

  const handleRegistrationInput = async (userInput: string) => {
    if (!userInput.trim()) return;

    // Add user message
    const userMsg = { id: Date.now(), sender: 'user', text: userInput, type: 'text' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    const updatedData = { ...registrationData };
    let nextQuestion = '';
    let newStep = registrationStep + 1;
    let needsOptions = false;
    let options: string[] = [];
    let setWaiting = false;

    if (registrationStep === 1) {
      // First name
      updatedData.firstName = userInput;
      nextQuestion = "What is the patient's surname/last name?";
    } else if (registrationStep === 2) {
      // Last name
      updatedData.lastName = userInput;
      nextQuestion = "What is the patient's diagnosis or condition (e.g., 'Stroke', 'Heart Attack', 'Asthma')?";
    } else if (registrationStep === 3 && !waitingForClarification) {
      // Condition - Use Gemini AI to intelligently clarify diagnosis
      const conditionInput = userInput;
      setLoading(true);

      try {
        const response = await fetch('http://localhost:8000/clarify-diagnosis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ diagnosis: conditionInput })
        });
        
        const aiResult = await response.json();
        
        if (aiResult.needs_clarification) {
          // AI needs more info
          updatedData.condition = conditionInput;
          setCurrentConditionKey(conditionInput);
          nextQuestion = aiResult.question || "Please provide more details about this condition.";
          
          // Add options if Gemini provided them
          if (aiResult.options && aiResult.options.length > 0) {
            needsOptions = true;
            options = aiResult.options;
          }
          
          setWaiting = true;
          newStep = 3; // Stay on step 3 but in clarification mode
        } else {
          // AI found a match directly
          updatedData.condition = conditionInput;
          updatedData.conditionDetails = {
            fullCode: aiResult.code,
            price: aiResult.price,
            description: aiResult.diagnosis || conditionInput,
            dangerLevel: "Confirmed",
            dangerColor: "bg-green-100 text-green-700",
            bodyPart: "Clinical Assessment",
            medications: ["As recommended by AI"]
          };
          
          // Show the diagnosis
          setTimeout(() => {
            const codeMsg = {
              id: Date.now(),
              sender: 'bot',
              type: 'text',
              text: `✓ Diagnosis identified: ${aiResult.diagnosis}. ICD-10 Code: ${aiResult.code}. Value: R${aiResult.price.toLocaleString()}.`
            };
            setMessages(prev => [...prev, codeMsg]);

            // Now ask for patient type
            setTimeout(() => {
              const typeMsg = {
                id: Date.now() + 1,
                sender: 'bot',
                type: 'options',
                text: "Is this a Government-funded or Medical Aid patient?",
                options: ['Government', 'Medical Aid']
              };
              setMessages(prev => [...prev, typeMsg]);
            }, 500);
          }, 300);

          setRegistrationStep(4);
          setRegistrationData(updatedData);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error('Gemini clarification error:', error);
        nextQuestion = `I had trouble analyzing "${userInput}". Could you be more specific? Try mentioning the body part or symptoms affected.`;
        newStep = 3;
      } finally {
        setLoading(false);
      }
    } else if (registrationStep === 3 && waitingForClarification) {
      // Processing the clarification answer - use Gemini to refine
      const originalDiagnosis = registrationData.condition;
      const clarificationAnswer = userInput;
      setLoading(true);

      try {
        const response = await fetch('http://localhost:8000/clarify-diagnosis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            diagnosis: originalDiagnosis,
            clarification_response: clarificationAnswer
          })
        });
        
        const aiResult = await response.json();
        
        if (aiResult.status === 'success' && !aiResult.needs_clarification) {
          // Got the final diagnosis
          updatedData.condition = clarificationAnswer;
          updatedData.conditionDetails = {
            fullCode: aiResult.code,
            price: aiResult.price,
            description: aiResult.diagnosis || originalDiagnosis,
            dangerLevel: "Confirmed",
            dangerColor: "bg-green-100 text-green-700",
            bodyPart: "Clinical Assessment",
            medications: ["As recommended by AI"]
          };

          setTimeout(() => {
            const codeMsg = {
              id: Date.now(),
              sender: 'bot',
              type: 'text',
              text: `✓ Confirmed. ICD-10 Code: ${aiResult.code} (${aiResult.diagnosis}). Value: R${aiResult.price.toLocaleString()}.`
            };
            setMessages(prev => [...prev, codeMsg]);

            setTimeout(() => {
              const typeMsg = {
                id: Date.now() + 1,
                sender: 'bot',
                type: 'options',
                text: "Is this a Government-funded or Medical Aid patient?",
                options: ['Government', 'Medical Aid']
              };
              setMessages(prev => [...prev, typeMsg]);
            }, 500);
          }, 300);

          setWaitingForClarification(false);
          setCurrentConditionKey('');
          setRegistrationStep(4);
          setRegistrationData(updatedData);
        } else if (aiResult.needs_clarification) {
          // Need more clarification
          nextQuestion = `I'm still not certain. ${aiResult.question || "Please provide more details."}`;
          newStep = 3;
        } else {
          throw new Error("Could not confirm diagnosis");
        }
      } catch (error) {
        console.error('Gemini refinement error:', error);
        nextQuestion = "I'm having trouble confirming that diagnosis. Could you describe it differently?";
        newStep = 3;
      } finally {
        setLoading(false);
      }
    } else if (registrationStep === 4) {
      // Patient type
      updatedData.type = userInput;
      nextQuestion = "What is the estimated treatment cost (in Rands)?";
    } else if (registrationStep === 5) {
      // Amount
      updatedData.amount = parseInt(userInput.replace(/[^0-9]/g, '')) || 0;
      
      // Create new patient with collected details
      const details = updatedData.conditionDetails || getConditionDetails(updatedData.condition, updatedData.amount);
      
      const newPatient = {
        id: patientsList.length + 1,
        name: `${updatedData.firstName} ${updatedData.lastName}`,
        type: updatedData.type,
        amount: details.price || updatedData.amount,
        condition: `${updatedData.condition}${details.fullCode ? ` (${details.fullCode})` : ''}`,
        description: details.description,
        bodyPart: details.bodyPart,
        medications: details.medications,
        dangerLevel: details.dangerLevel,
        dangerColor: details.dangerColor
      };

      // Add to patients list
      const updatedPatients = [...patientsList, newPatient];
      setPatientsList(updatedPatients);

      // Reset registration
      setTimeout(() => {
        const confirmMsg = {
          id: Date.now(),
          sender: 'bot',
          type: 'text',
          text: `✅ Patient registered successfully! ${newPatient.name} has been added to the Ward B registry with billable code ${details.fullCode || 'pending'}.`
        };
        setMessages(prev => [...prev, confirmMsg]);
        
        setTimeout(() => {
          const optionsMsg = {
            id: Date.now() + 1,
            sender: 'bot',
            type: 'options',
            text: "What would you like to do next?",
            options: ['Patient Registry', 'Revenue Report', 'New Billing Claim', 'Register Patient']
          };
          setMessages(prev => [...prev, optionsMsg]);
        }, 600);
      }, 300);

      setRegistrationStep(0);
      setRegistrationData({});
      setWaitingForClarification(false);
      setCurrentConditionKey('');
      return;
    }

    setRegistrationData(updatedData);
    setRegistrationStep(newStep);
    setWaitingForClarification(setWaiting);

    // Send next question
    setTimeout(() => {
      let botMsg: any = { id: Date.now() + 1, sender: 'bot', type: 'text', text: nextQuestion };
      
      if (needsOptions) {
        botMsg.type = 'options';
        botMsg.options = options;
      }

      setMessages(prev => [...prev, botMsg]);
    }, 300);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#d1d7db] font-sans p-0 md:p-4">
      
      {/* MAIN BOX */}
      <div className="flex w-full max-w-6xl h-screen md:h-[850px] bg-white shadow-2xl overflow-hidden md:rounded-lg">
        
        {/* SIDEBAR (DESKTOP) */}
        <div className="hidden lg:flex flex-col w-[380px] border-r border-gray-200">
          <header className="bg-[#f0f2f5] p-3 flex justify-between items-center">
            <div className="w-10 h-10 bg-slate-400 rounded-full" />
            <div className="flex gap-5 text-gray-500">
              <MessageSquare size={20} />
              <MoreVertical size={20} />
            </div>
          </header>
          
          <div className="p-2 border-b border-gray-100">
            <div className="bg-[#f0f2f5] flex items-center px-3 py-1.5 rounded-lg gap-4 text-gray-500">
              <Search size={16} />
              <input placeholder="Search or start new chat" className="bg-transparent text-sm outline-none w-full" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* Active AI Chat */}
            <div className="bg-[#ebebeb] flex items-center gap-3 p-3 cursor-pointer">
              <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold shadow-inner">AI</div>
              <div className="flex-1">
                <div className="flex justify-between font-bold text-sm"><span>Ward B AI Bot</span><span className="text-[10px] text-gray-400 font-normal">11:45</span></div>
                <p className="text-xs text-gray-500 truncate">Online</p>
              </div>
            </div>
            {/* Passive Contacts */}
            {['Dr. Nkosi', 'Pharmacy', 'Lab Dept', 'Head of Nursing'].map(name => (
              <div key={name} className="flex items-center gap-3 p-3 border-b border-gray-50 opacity-60">
                <div className="w-12 h-12 bg-gray-200 rounded-full" />
                <div className="flex-1">
                  <div className="flex justify-between font-medium text-sm text-gray-700"><span>{name}</span><span className="text-[10px] text-gray-400">Yesterday</span></div>
                  <p className="text-xs text-gray-400 truncate">Status unavailable</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CHAT INTERFACE */}
        <div className="flex-1 flex flex-col relative bg-[#efe7dd] border-l border-white/10">
          
          {/* HEADER */}
          <header className="bg-[#075E54] py-3 px-4 flex items-center gap-3 text-white z-20 shadow-sm">
            <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center font-bold border border-white/20 shadow-inner">AI</div>
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-bold truncate">Ward B AI Assistant</h2>
              <p className="text-[10px] opacity-80 uppercase tracking-tighter">Secure Healthcare Billing</p>
            </div>
            <div className="flex gap-4 opacity-80"><Search size={20} /><MoreVertical size={20} /></div>
          </header>

          {/* CHAT MESSAGES */}
          <main className="flex-1 overflow-y-auto p-4 space-y-4" style={{backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')", backgroundSize: "contain"}}>
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                
                {/* STANDARD TEXT */}
                {m.type === 'text' && (
                  <div className={`p-2 px-3 rounded-lg shadow-sm max-w-[85%] relative ${m.sender === 'user' ? 'bg-[#dcf8c6]' : 'bg-white'}`}>
                    <p className="text-sm text-gray-800">{m.text}</p>
                    <div className="flex justify-end items-center gap-1 mt-1">
                      <span className="text-[9px] text-gray-400 uppercase">11:46 AM</span>
                      {m.sender === 'user' && <CheckCheck size={12} className="text-blue-500" />}
                    </div>
                  </div>
                )}

                {/* OPTIONS BUBBLE */}
                {m.type === 'options' && (
                  <div className="bg-white p-4 rounded-xl shadow-lg w-full max-w-[85%] space-y-4 border border-gray-100">
                    <p className="text-sm font-bold text-teal-900 leading-tight">{m.text}</p>
                    <div className="flex flex-col gap-2">
                      {m.options?.map(opt => (
                        <button key={opt} onClick={() => handleOptionClick(opt)} className="w-full py-2.5 border-2 border-teal-600 text-teal-700 rounded-lg text-xs font-black uppercase tracking-wider hover:bg-teal-50 transition-all active:scale-95">
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* REGISTRY BUBBLE */}
                {m.type === 'registry' && (
                  <div className="bg-white rounded-xl shadow-2xl w-full max-w-[90%] overflow-hidden border border-gray-200 animate-fade-in">
                    <div className="bg-teal-800 p-3 text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                      <Users size={14} /> Ward B Activity Registry
                    </div>
                    {m.data?.map((p: any) => (
                      <div key={p.name} onClick={() => triggerClaim(p)} className="p-3 border-b border-gray-50 flex justify-between items-center active:bg-teal-50 hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-gray-800 truncate">{p.name}</p>
                          <p className="text-[10px] text-gray-500">{p.condition}</p>
                        </div>
                        <div className="text-right ml-3 shrink-0">
                          <p className={`text-[9px] font-black ${p.type === 'Government' ? 'text-orange-500' : 'text-blue-500'}`}>{p.type}</p>
                          <p className="text-[10px] font-bold">R{p.amount.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* REPORT BUBBLE */}
                {m.type === 'report' && (
                  <div className="bg-white p-4 rounded-xl shadow-lg w-full max-w-[95%] space-y-4 border border-gray-100">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-gray-50 pb-3 text-teal-900 font-black text-xs uppercase italic">
                      <div className="flex items-center gap-2">
                        <BarChart3 size={16} />
                        Ward B Revenue Summary
                      </div>
                      <span className="text-[8px] bg-teal-100 text-teal-700 px-2 py-1 rounded">Fiscal 2025-2026</span>
                    </div>

                    {/* Main Financial Metrics */}
                    <div className="grid grid-cols-2 gap-3">
                      {/* Hospital Balance */}
                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <p className="text-[8px] font-black text-gray-500 uppercase tracking-tight">Hospital Balance</p>
                        <p className="text-base font-black text-blue-700 mt-1">R{(m.balances?.hospital_balances?.hospital_total || 0).toLocaleString()}</p>
                        <div className="w-full bg-blue-200 h-1 rounded-full mt-2 overflow-hidden">
                          <div className="bg-blue-500 h-full" style={{width: '75%'}}></div>
                        </div>
                      </div>

                      {/* Ward Recovery */}
                      <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                        <p className="text-[8px] font-black text-gray-500 uppercase tracking-tight">Ward Recovery</p>
                        <p className="text-base font-black text-emerald-700 mt-1">R{(m.balances?.hospital_balances?.ward_recovery || 0).toLocaleString()}</p>
                        <div className="w-full bg-emerald-200 h-1 rounded-full mt-2 overflow-hidden">
                          <div className="bg-emerald-500 h-full" style={{width: '60%'}}></div>
                        </div>
                      </div>

                      {/* Government Claims */}
                      <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                        <p className="text-[8px] font-black text-gray-500 uppercase tracking-tight">Gov't Claims Processed</p>
                        <p className="text-base font-black text-orange-700 mt-1">{patientsList.filter(p => p.type === 'Government').length}</p>
                        <p className="text-[8px] text-gray-500 mt-1">R{patientsList.filter(p => p.type === 'Government').reduce((sum, p) => sum + p.amount, 0).toLocaleString()}</p>
                      </div>

                      {/* Medical Aid Claims */}
                      <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                        <p className="text-[8px] font-black text-gray-500 uppercase tracking-tight">Medical Aid Claims</p>
                        <p className="text-base font-black text-purple-700 mt-1">{patientsList.filter(p => p.type === 'Medical Aid').length}</p>
                        <p className="text-[8px] text-gray-500 mt-1">R{patientsList.filter(p => p.type === 'Medical Aid').reduce((sum, p) => sum + p.amount, 0).toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Detailed Breakdown */}
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <p className="text-[9px] font-black text-gray-600 uppercase tracking-tight mb-2">Claim Distribution by Type</p>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-[8px] font-bold text-gray-700 mb-1">
                            <span>Government-Funded</span>
                            <span>{((patientsList.filter(p => p.type === 'Government').length / patientsList.length) * 100).toFixed(0)}%</span>
                          </div>
                          <div className="w-full bg-gray-300 h-2 rounded-full overflow-hidden">
                            <div className="bg-orange-500 h-full" style={{width: `${((patientsList.filter(p => p.type === 'Government').length / patientsList.length) * 100)}%`}}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-[8px] font-bold text-gray-700 mb-1">
                            <span>Medical Aid</span>
                            <span>{((patientsList.filter(p => p.type === 'Medical Aid').length / patientsList.length) * 100).toFixed(0)}%</span>
                          </div>
                          <div className="w-full bg-gray-300 h-2 rounded-full overflow-hidden">
                            <div className="bg-purple-500 h-full" style={{width: `${((patientsList.filter(p => p.type === 'Medical Aid').length / patientsList.length) * 100)}%`}}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Total Summary */}
                    <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-3 rounded-lg border-2 border-teal-200 flex justify-between items-center">
                      <div>
                        <p className="text-[8px] font-black text-gray-600 uppercase">Total Billable Amount</p>
                        <p className="text-xs font-black text-teal-700">All Patients: {patientsList.length}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-base font-black text-emerald-700">R{patientsList.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}</p>
                        <p className="text-[8px] font-bold text-gray-500 italic">Ward Share: R{(patientsList.reduce((sum, p) => sum + p.amount, 0) * 0.1).toLocaleString()}</p>
                      </div>
                    </div>

                    <p className="text-[8px] text-gray-400 italic text-center">Last updated: {new Date().toLocaleTimeString()}</p>
                  </div>
                )}

                {/* CLAIM STATUS */}
                {m.type === 'status' && (
                  <div className={`p-3 px-4 rounded-lg shadow-md max-w-[85%] border-l-4 ${
                    m.status === 'pending' 
                      ? 'bg-yellow-50 border-yellow-400 text-yellow-800' 
                      : m.status === 'approved'
                      ? 'bg-green-50 border-green-400 text-green-800'
                      : 'bg-red-50 border-red-400 text-red-800'
                  }`}>
                    <p className="text-sm font-bold">{m.text}</p>
                  </div>
                )}

                {/* CLAIM BUBBLE */}
                {m.type === 'claim' && (
                  <div className="bg-white p-4 rounded-xl shadow-2xl w-full max-w-[95%] space-y-3 border-t-8 border-emerald-500 relative">
                    {/* Header with type and danger */}
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1">
                        <span className="text-[9px] font-black text-gray-400 uppercase italic tracking-tighter">AI Clinical Analysis</span>
                        {m.patient.name && <p className="text-xs font-black text-teal-700 mt-1">Patient: {m.patient.name}</p>}
                        <h4 className="text-sm font-black text-gray-800 leading-tight mt-1">{m.patient.condition}</h4>
                        {m.patient.code && <p className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold mt-1 w-fit">ICD-10: {m.patient.code}</p>}
                      </div>
                      <div className="flex flex-col gap-1 items-end">
                        <span className={`text-[8px] px-2 py-1 rounded-full font-black ${m.patient.type === 'Government' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                          {m.patient.type}
                        </span>
                        <span className={`text-[8px] px-2 py-1 rounded-full font-black ${m.patient.dangerColor || 'bg-red-100 text-red-700'}`}>
                          {m.patient.dangerLevel || 'Unknown'}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                      <p className="text-[11px] text-gray-700 leading-relaxed">{m.patient.description || 'Clinical details pending review'}</p>
                    </div>

                    {/* Body Part */}
                    <div className="bg-gray-50 p-2 rounded-lg border border-gray-200">
                      <p className="text-[8px] text-gray-400 font-black uppercase tracking-tight">Affected Area</p>
                      <p className="text-sm font-bold text-gray-800">{m.patient.bodyPart || 'N/A'}</p>
                    </div>

                    {/* Medications */}
                    {m.patient.medications && (
                      <div className="bg-green-50 p-2 rounded-lg border border-green-200">
                        <p className="text-[8px] text-gray-400 font-black uppercase tracking-tight mb-1">Treatment Protocol</p>
                        <div className="flex flex-wrap gap-1">
                          {m.patient.medications.map((med: string, idx: number) => (
                            <span key={idx} className="text-[9px] bg-green-100 text-green-700 px-2 py-1 rounded font-bold">
                              {med}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Financial Summary */}
                    <div className="flex justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div><p className="text-[8px] text-gray-400 font-black">TOTAL BILL</p><p className="font-black text-lg text-gray-900">R{m.patient.amount.toLocaleString()}</p></div>
                      <div className="text-right"><p className="text-[8px] text-gray-400 font-black italic">WARD RECOVERY</p><p className="font-black text-emerald-600 text-lg italic">R{(m.patient.amount * 0.1).toLocaleString()}</p></div>
                    </div>

                    <button 
                      onClick={() => handleConfirmClaim(m.patient, m.id)}
                      disabled={loading || claimStatuses[m.id] === 'pending'}
                      className="w-full py-3 bg-[#25D366] hover:bg-[#1da851] disabled:bg-gray-400 text-white font-black rounded-xl shadow-lg uppercase text-[10px] tracking-widest active:scale-95 transition-all">
                      {claimStatuses[m.id] === 'pending' ? 'Submitting Claim...' : (loading ? 'Confirming...' : 'Confirm & File Claim')}
                    </button>
                  </div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </main>

          {/* INPUT BAR */}
          <footer className="bg-[#f0f2f5] p-3 flex items-center gap-3 pb-8 px-4 border-t border-gray-200">
             <Paperclip className="w-6 h-6 text-gray-500 cursor-pointer opacity-50" />
             <div className="flex-1 bg-white rounded-full px-5 py-2.5 flex items-center shadow-inner border border-gray-200 focus-within:border-teal-300">
               <input 
                 type="text" 
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 onKeyPress={(e) => e.key === 'Enter' && handleSearch(input)}
                 placeholder="Type diagnosis (e.g., Stroke, Asthma, Heart Attack)..." 
                 className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400" 
                 disabled={loading}
               />
             </div>
             <button
               onClick={() => handleSearch(input)}
               disabled={loading || !input.trim()}
               className="w-11 h-11 bg-[#075E54] hover:bg-[#054a42] disabled:bg-gray-300 rounded-full flex items-center justify-center text-white shadow-lg active:scale-90 transition-all cursor-pointer">
               <Mic size={24} />
             </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;