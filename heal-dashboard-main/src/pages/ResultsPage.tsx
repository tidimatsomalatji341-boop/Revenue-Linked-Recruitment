import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Check, Paperclip, Mic, Landmark, CreditCard, Send } from "lucide-react";

const ResultsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Get data from URL (e.g., /billing?name=Jabu&type=Government&amount=45000)
  const patientName = searchParams.get("name") || "New Patient";
  const claimType = searchParams.get("type") || "Government";
  const amount = parseInt(searchParams.get("amount") || "45000");
  const condition = searchParams.get("condition") || "Septic Hip (M86.91)";

  const wardShare = amount * 0.1;

  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-300 p-4 font-sans text-slate-900">
      <div className="w-[375px] h-[812px] bg-[#e5ddd5] rounded-[3rem] border-[10px] border-zinc-900 shadow-2xl overflow-hidden flex flex-col relative"
        style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundSize: 'cover' }}>
        
        {/* WHATSAPP HEADER */}
        <header className="bg-[#075E54] pt-10 pb-3 px-4 flex items-center gap-3 text-white shadow-md">
          <ArrowLeft className="w-5 h-5 cursor-pointer" onClick={() => navigate("/dashboard")} />
          <div className="w-9 h-9 bg-teal-600 rounded-full flex items-center justify-center font-bold text-xs shadow-inner">AI</div>
          <div className="flex-1">
            <h2 className="text-sm font-bold">Billing Assistant</h2>
            <p className="text-[9px] opacity-80 italic">typing...</p>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* USER INQUIRY */}
          <div className="flex justify-end animate-in fade-in duration-300">
            <div className="bg-[#dcf8c6] p-2 px-3 rounded-lg shadow-sm max-w-[80%] relative">
              <p className="text-sm text-zinc-800 pb-1 font-medium">Claim for {patientName}</p>
              <span className="text-[9px] text-zinc-500 flex items-center justify-end gap-1">09:45 <Check className="w-3 h-3 text-blue-500" /></span>
            </div>
          </div>

          {/* AI CLAIM CARD */}
          <div className="flex justify-start animate-in slide-in-from-left duration-500">
            <div className="bg-white p-4 rounded-lg shadow-md max-w-[88%] space-y-3 border-t-4 border-teal-600">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-teal-700 font-black text-[10px] uppercase tracking-tighter">AI Verification Engine</h3>
                {claimType === "Government" ? (
                  <div className="flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-[9px] font-bold">
                    <Landmark className="w-3 h-3" /> GOVT
                  </div>
                ) : (
                  <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-[9px] font-bold">
                    <CreditCard className="w-3 h-3" /> MEDICAL AID
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Diagnosis Detected</p>
                <p className="text-sm font-bold text-zinc-800">{condition}</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-md flex justify-between items-center border border-slate-100">
                <div>
                  <p className="text-[9px] text-zinc-400 font-bold uppercase">Total Billable</p>
                  <p className="text-xl font-black text-zinc-900 leading-none">R{amount.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-zinc-400 font-bold uppercase">Ward Bonus</p>
                  <p className="text-sm font-black text-emerald-600">R{wardShare.toLocaleString()}</p>
                </div>
              </div>

              <div className="text-[10px] text-zinc-500 leading-tight bg-teal-50 p-2 rounded italic">
                {claimType === "Government" 
                  ? "✓ ICD-10 Match: Processing via Provincial Treasury. Funds allocated to Staff Retention Fund."
                  : "✓ ICD-10 Match: Auth confirmed via Discovery/GEMS. 10% processing fee applied."}
              </div>

              <button 
                onClick={() => navigate("/recruitment")} 
                className="w-full py-3 bg-[#25D366] text-white rounded-lg font-black text-xs shadow-lg active:scale-95 transition-all uppercase tracking-widest"
              >
                Claim Now
              </button>
              
              <p className="text-[9px] text-zinc-300 text-right">Just now</p>
            </div>
          </div>
        </main>

        {/* WHATSAPP FOOTER */}
        <footer className="bg-[#f0f0f0] p-2 flex items-center gap-2 pb-8 px-3">
          <div className="flex-1 bg-white rounded-full px-4 py-2 flex items-center gap-2 shadow-sm border border-zinc-200">
            <Paperclip className="w-5 h-5 text-zinc-400" />
            <input type="text" placeholder="Type a message" className="flex-1 bg-transparent border-none text-sm outline-none font-medium" disabled />
          </div>
          <div className="w-11 h-11 bg-[#075E54] rounded-full flex items-center justify-center text-white shadow-md">
            <Mic className="w-5 h-5" />
          </div>
        </footer>

        {/* HOME INDICATOR */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-black/20 rounded-full" />
      </div>
    </div>
  );
};

export default ResultsPage;