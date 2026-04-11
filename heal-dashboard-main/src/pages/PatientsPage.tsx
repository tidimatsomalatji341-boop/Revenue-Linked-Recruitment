import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, User, CreditCard, Landmark, ChevronRight, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

// 1. Mock Dataset: 15 Patients with different billing types
const initialPatients = [
  { id: 1, name: "Jabu Mthembu", age: 42, condition: "Septic Hip", code: "M86.91", total: 45000, type: "Government", status: "Coded" },
  { id: 2, name: "Sarah Pillay", age: 29, condition: "Asthma Attack", code: "J45.9", total: 8500, type: "Medical Aid", status: "Pending" },
  { id: 3, name: "Koos van Wyk", age: 65, condition: "Type 2 Diabetes", code: "E11.9", total: 5200, type: "Government", status: "Coded" },
  { id: 4, name: "Thandi Molefe", age: 34, condition: "Pneumonia", code: "J18.9", total: 12500, type: "Medical Aid", status: "Coded" },
  { id: 5, name: "Zane Retief", age: 19, condition: "Ankle Sprain", code: "S93.4", total: 3200, type: "Government", status: "Pending" },
  { id: 6, name: "Fatima Isaacs", age: 51, condition: "Hypertension", code: "I10", total: 3500, type: "Medical Aid", status: "Coded" },
  { id: 7, name: "Bongani Dlamini", age: 48, condition: "Heart Attack", code: "I21.9", total: 85000, type: "Government", status: "Coded" },
  { id: 8, name: "Elena Gomez", age: 27, condition: "Gastroenteritis", code: "A09.9", total: 2100, type: "Government", status: "Pending" },
  { id: 9, name: "Sipho Khumalo", age: 55, condition: "Stroke", code: "I63.9", total: 95000, type: "Medical Aid", status: "Coded" },
  { id: 10, name: "Lindiwe Sisulu", age: 31, condition: "Migraine", code: "G43.9", total: 1800, type: "Government", status: "Coded" },
  { id: 11, name: "David Miller", age: 44, condition: "Low Back Pain", code: "M54.5", total: 1500, type: "Medical Aid", status: "Coded" },
  { id: 12, name: "Grace Naidoo", age: 72, condition: "Cellulitis", code: "L03.9", total: 6400, type: "Government", status: "Pending" },
  { id: 13, name: "Pieter Botha", age: 38, condition: "Acute Sinusitis", code: "J01.9", total: 1100, type: "Medical Aid", status: "Coded" },
  { id: 14, name: "Nomsa Bekker", age: 24, condition: "Anemia", code: "D64.9", total: 2800, type: "Government", status: "Coded" },
  { id: 15, name: "Kabelo Moene", age: 60, condition: "Insomnia", code: "G47.0", total: 1400, type: "Medical Aid", status: "Coded" },
];

const PatientsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  // Search and Filter Logic
  const filteredPatients = initialPatients.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.condition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "All" || p.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-teal-700 px-4 py-3 flex items-center gap-3 sticky top-0 z-30 shadow-md">
        <button onClick={() => navigate("/dashboard")} className="text-white p-1">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-white font-bold tracking-widest uppercase text-xs">Patient Ward Registry</h1>
      </header>

      <main className="p-4 space-y-4 max-w-xl mx-auto w-full">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Search by name or diagnosis..."
            className="pl-10 h-12 rounded-2xl border-slate-200 bg-white shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {["All", "Government", "Medical Aid"].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                filter === t ? "bg-teal-700 text-white shadow-md" : "bg-white text-slate-500 border border-slate-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Patient List */}
        <div className="space-y-3">
          <p className="text-[10px] font-bold text-slate-400 uppercase ml-1">
            Showing {filteredPatients.length} Active Records
          </p>
          
          {filteredPatients.map((patient) => (
            <div 
              key={patient.id} 
              className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between hover:border-teal-500 transition-colors shadow-sm active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{patient.name}</h3>
                  <p className="text-[10px] text-slate-500 uppercase font-medium">
                    {patient.condition} • {patient.code}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm font-black text-slate-900">R{patient.total.toLocaleString()}</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  {patient.type === "Government" ? (
                    <Landmark className="w-3 h-3 text-orange-500" />
                  ) : (
                    <CreditCard className="w-3 h-3 text-blue-500" />
                  )}
                  <span className={`text-[9px] font-bold uppercase ${patient.type === "Government" ? "text-orange-500" : "text-blue-500"}`}>
                    {patient.type}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {filteredPatients.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-400 text-sm italic">No patients found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PatientsPage;