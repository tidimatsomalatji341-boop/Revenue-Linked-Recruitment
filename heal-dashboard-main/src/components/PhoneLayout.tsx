import { ReactNode } from "react";

const PhoneLayout = ({ children, headerTitle }: { children: ReactNode, headerTitle?: string }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-200 p-4 font-sans">
      {/* IPHONE FRAME */}
      <div className="w-[375px] h-[812px] bg-[#e5ddd5] rounded-[3.5rem] border-[12px] border-slate-900 shadow-2xl overflow-hidden flex flex-col relative">
        
        {/* IPHONE NOTCH */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-slate-900 rounded-b-3xl z-50"></div>

        {/* CONTENT AREA */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {children}
        </div>

        {/* HOME BAR */}
        <div className="h-1.5 w-32 bg-slate-900/20 rounded-full mx-auto mb-2 mt-auto"></div>
      </div>
    </div>
  );
};

export default PhoneLayout;