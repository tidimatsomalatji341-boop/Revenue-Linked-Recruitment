import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, User, CreditCard, Landmark, MoreVertical, Filter } from "lucide-react";

// Mock Dataset of 15 Patients
const initialPatients = [
  { id: 1, name: "Jabu Mthembu", age: 42, condition: "Septic Hip", code: "M86.91", total: 45000, type: "Government" },
  { id: 2, name: "Sarah Pillay", age: 29, condition: "Asthma Attack", code: "J45.9", total: 8500, type: "Medical Aid" },
  { id: 3, name: "Koos van Wyk", age: 65, condition: "Type 2 Diabetes", code: "E11.9", total: 5200, type: "Government" },
  { id: 4, name: "Thandi Molefe", age: 34, condition: "Pneumonia", code: "J18.9", total: 12500, type: "Medical Aid" },
  { id: 5, name: "Zane Retief", age: 19, condition: "Ankle Sprain", code: "S93.4", total: 3200, type: "Government" },
  { id: 6, name: "Fatima Isaacs", age: 51, condition: "Hypertension", code: "I10", total: 3500, type: "Medical Aid" },
  { id: 7, name: "Bongani Dlamini", age: 48, condition: "Heart Attack", code: "I21.9", total: 85000, type: "Government" },
  { id: 8, name: "Elena Gomez", age: 27, condition: "Gastroenteritis", code: "A09.9", total: 2100, type: "Government" },
  { id: 9, name: "Sipho Khumalo", age: 55, condition: "Stroke", code: "I63.9", total: 95000, type: "Medical Aid" },
  { id: 10, name: "Lindiwe Sisulu", age: 31, condition: "Migraine", code: "G43.9", total: 1800, type: "Government" },
  { id: 11, name: "David Miller", age: 44, condition: "Low Back Pain", code: "M54.5", total: 1500, type: "Medical Aid" },
  { id: 12, name: "Grace Naidoo", age: 72, condition: "Cellulitis", code: "L03.9", total: 6400, type: "Government" },
  { id: 13, name: "Pieter Botha", age: 38, condition: "Acute Sinusitis", code: "J01.9", total: 1100, type: "Medical Aid" },
  { id: 14, name: "Nomsa Bekker", age: 24, condition: "Anemia", code: "D64.9", total: 2800, type: "Government" },
  { id: 15, name: "Kabelo Moene", age: 60, condition: "Insomnia", code: "G47.0", total: 1400, type: "Medical Aid" },
];

const PatientsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredPatients = initialPatients.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.condition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "All" || p.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-300 p-4 font-sans">
      <div className="w-[375px] h-[812px] bg-white rounded-[3rem] border-[10px] border-zinc-900 shadow-2xl overflow-hidden flex flex-col relative">
        
        {/* IPHONE NOTCH */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-900 rounded-b-2xl z-50"></div>

        {/* WHATSAPP STYLE HEADER */}
        <header className="bg-[#075E54] pt-10 pb-3 px-4 flex items-center gap-3 text-white shadow-md">
          <ArrowLeft className="w-5 h-5 cursor-pointer" onClick={() => navigate("/dashboard")} />
          <div className="flex-1">
            <h2 className="text-sm font-bold">Select Patient</h2>
            <p className="text-[10px] opacity-80">{filteredPatients.length} contacts</p>
          </div>
          <Search className="w-5 h-5 opacity-80" />
          <MoreVertical className="w-5 h-5 opacity-80" />
        </header>

        {/* SEARCH & FILTERS */}
        <div className="p-3 bg-white border-b border-zinc-100 space-y-3">
          <input 
            type="text"
            placeholder="Search patient name..."
            className="w-full bg-zinc-100 rounded-full px-4 py-2 text-xs outline-none border border-transparent focus:border-teal-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {["All", "Government", "Medical Aid"].map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase whitespace-nowrap border ${
                  filter === t ? "bg-teal-700 text-white border-teal-700" : "bg-white text-zinc-500 border-zinc-200"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* PATIENT LIST */}
        <main className="flex-1 overflow-y-auto bg-white">
          {filteredPatients.map((patient) => (
            <div 
              key={patient.id} 
              // DYNAMIC LINK: Sends all patient data to the Billing Assistant
              onClick={() => navigate(`/billing?name=${encodeURIComponent(patient.name)}&type=${patient.type}&amount=${patient.total}&condition=${encodeURIComponent(patient.condition)}`)}
              className="flex items-center gap-4 px-4 py-3 border-b border-zinc-50 active:bg-zinc-100 cursor-pointer transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-500 font-bold text-xs uppercase">
                {patient.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-zinc-900 text-sm">{patient.name}</h3>
                  <div className="flex items-center gap-1">
                    {patient.type === "Government" ? 
                      <Landmark className="w-3 h-3 text-orange-500" /> : 
                      <CreditCard className="w-3 h-3 text-blue-500" />
                    }
                  </div>
                </div>
                <p className="text-[11px] text-zinc-500 truncate uppercase tracking-tighter">
                  {patient.condition} • R{patient.total.toLocaleString()}
                </p>
              </div>
            </div>
          ))}

          {filteredPatients.length === 0 && (
            <div className="p-10 text-center">
              <p className="text-xs text-zinc-400 italic">No contacts found.</p>
            </div>
          )}
        </main>

        {/* HOME INDICATOR */}
        <div className="pb-2 pt-1 bg-white flex justify-center">
           <div className="w-28 h-1 bg-zinc-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default PatientsPage;