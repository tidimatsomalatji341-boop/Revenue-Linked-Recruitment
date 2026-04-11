import { useNavigate } from "react-router-dom";
import { ArrowLeft, TrendingUp, Landmark, ShieldCheck } from "lucide-react";

const ReportsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-300 p-4 font-sans">
      <div className="w-[375px] h-[812px] bg-[#f0f2f5] rounded-[3rem] border-[10px] border-zinc-900 shadow-2xl overflow-hidden flex flex-col relative">
        
        <header className="bg-[#075E54] pt-10 pb-4 px-4 flex items-center gap-3 text-white shadow-md">
          <ArrowLeft className="w-5 h-5 cursor-pointer" onClick={() => navigate("/dashboard")} />
          <h2 className="font-bold text-sm uppercase">Fiscal Impact Report</h2>
        </header>

        <main className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="bg-white p-5 rounded-xl shadow-sm space-y-4">
             <div className="flex items-center gap-2 text-[#075E54] font-bold text-xs uppercase"><Landmark className="w-4 h-4" /> Revenue Recovered</div>
             <p className="text-3xl font-black text-zinc-900">R246,000</p>
             <div className="h-24 flex items-end gap-2 border-b border-zinc-100 pb-2">
                <div className="flex-1 bg-teal-200 rounded-t h-[40%]"></div>
                <div className="flex-1 bg-teal-400 rounded-t h-[60%]"></div>
                <div className="flex-1 bg-teal-600 rounded-t h-[90%]"></div>
                <div className="flex-1 bg-[#075E54] rounded-t h-[70%]"></div>
             </div>
          </div>

          <div className="bg-[#e1f5fe] p-4 rounded-xl shadow-sm border-l-4 border-blue-400 flex gap-3">
             <ShieldCheck className="w-10 h-10 text-blue-500 opacity-50 flex-shrink-0" />
             <div>
               <p className="text-xs font-bold text-blue-800 uppercase">AI Prediction</p>
               <p className="text-xs text-zinc-700 font-medium leading-relaxed">Ward B is on track to unlock R1.2M in annual procedure revenue. Recruitment goal for 2 new Nurses is 74% complete.</p>
             </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportsPage;