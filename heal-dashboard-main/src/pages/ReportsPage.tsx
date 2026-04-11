import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Landmark, BarChart3, ShieldCheck, Download, ArrowUpRight, TrendingUp } from "lucide-react";

const ReportsPage = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  // Trigger animation on load
  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  const savingsData = [
    { month: "Jan", amount: "R45,200", percent: 35, color: "#5eead4" },
    { month: "Feb", amount: "R52,100", percent: 45, color: "#2dd4bf" },
    { month: "Mar", amount: "R98,400", percent: 95, color: "#10b981" }, // The "Success" Month
    { month: "Apr", amount: "R61,000", percent: 60, color: "#0d9488" },
  ];

  const tableData = [
    { category: "Respiratory (Asthma/Pneumonia)", saved: "R84,000", status: "Optimized" },
    { category: "Orthopedic (Fractures/Hips)", saved: "R112,500", status: "High Impact" },
    { category: "Chronic (Diabetes/HTN)", saved: "R49,500", status: "Stable" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 pb-10">
      {/* Header */}
      <header className="bg-teal-700 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-lg">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/dashboard")} className="text-white hover:bg-white/20 p-2 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white font-bold tracking-widest uppercase text-xs">Provincial Treasury Report</h1>
        </div>
        <div className="bg-white/20 text-[10px] text-white px-3 py-1 rounded-full border border-white/30 font-mono">
          SECURE LOG: 2026-AFR-04
        </div>
      </header>

      <main className="flex-1 p-5 space-y-6 max-w-xl mx-auto w-full">
        
        {/* KPI OVERVIEW CARDS */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Total Savings</p>
            <p className="text-2xl font-black text-slate-900 leading-none">R246,000</p>
            <div className="flex items-center gap-1 text-emerald-600 mt-2 font-bold text-xs">
              <ArrowUpRight className="w-3 h-3" /> +14%
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">AI Accuracy</p>
            <p className="text-2xl font-black text-slate-900 leading-none">99.2%</p>
            <div className="flex items-center gap-1 text-teal-600 mt-2 font-bold text-xs">
              <TrendingUp className="w-3 h-3" /> 412 Bills
            </div>
          </div>
        </div>

        {/* DETAILED SAVINGS GRAPH */}
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Revenue Recovery</h3>
              <p className="text-xs text-slate-400">Monthly fiscal leakage prevented</p>
            </div>
            <BarChart3 className="w-6 h-6 text-teal-600 opacity-50" />
          </div>
          
          {/* THE GRAPH AREA */}
          <div className="flex items-end justify-between h-56 gap-6 px-2 border-b-2 border-slate-100 pb-4">
            {savingsData.map((bar) => (
              <div key={bar.month} className="flex-1 flex flex-col items-center h-full">
                <div className="relative w-full flex-1 flex flex-col justify-end items-center">
                  
                  {/* Floating Value Tag */}
                  <span className={`text-[10px] font-black mb-2 text-slate-600 transition-all duration-1000 ${animate ? 'opacity-100' : 'opacity-0'}`}>
                    {bar.amount}
                  </span>
                  
                  {/* THE BAR */}
                  <div 
                    className="w-full rounded-t-xl shadow-md transition-all duration-[1500ms] cubic-bezier(0.34, 1.56, 0.64, 1)"
                    style={{ 
                      height: animate ? `${bar.percent}%` : '0%', 
                      backgroundColor: bar.color,
                      minHeight: animate ? '2px' : '0px'
                    }} 
                  >
                    <div className="w-full h-full bg-white/10 rounded-t-xl" /> {/* Highlight effect */}
                  </div>
                </div>
                <span className="text-[10px] font-black text-slate-400 mt-4 uppercase tracking-widest">{bar.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* REVENUE BREAKDOWN TABLE */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="bg-slate-50 px-5 py-3 border-b border-slate-100 font-bold text-[10px] uppercase text-slate-500 tracking-wider">
            Category Breakdown
          </div>
          <div className="divide-y divide-slate-100">
            {tableData.map((row) => (
              <div key={row.category} className="px-5 py-4 flex justify-between items-center hover:bg-slate-50 transition-colors">
                <div>
                  <p className="text-sm font-bold text-slate-800">{row.category}</p>
                  <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-tighter">{row.status}</p>
                </div>
                <p className="text-sm font-black text-slate-900">{row.saved}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI INSIGHT */}
        <div className="bg-emerald-900 rounded-[2rem] p-6 text-white relative overflow-hidden shadow-xl">
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <ShieldCheck className="w-32 h-32" />
          </div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">System Intelligence</span>
          </div>
          <p className="text-sm font-medium leading-relaxed text-emerald-50 opacity-90">
            "By rectifying historical miscoding in Ward B, the AI has identified a potential **R1.4M annual saving** in uncaptured clinical procedures."
          </p>
        </div>

        {/* ACTION BUTTON */}
        <button className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold text-sm shadow-xl flex items-center justify-center gap-3 hover:bg-slate-800 active:scale-[0.98] transition-all">
          <Download className="w-5 h-5" />
          Export Treasury Dossier
        </button>

      </main>
    </div>
  );
};

export default ReportsPage;