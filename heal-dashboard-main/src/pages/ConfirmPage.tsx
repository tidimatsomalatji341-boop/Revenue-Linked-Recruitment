import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Building2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const ConfirmPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code") || "M86.91";
  const value = Number(searchParams.get("value") || 45000);

  const hospitalShare = Math.round(value * 0.9);
  const wardShare = Math.round(value * 0.1);

  const goalRemaining = 120000 - wardShare; // simplified mock
  const newProgress = 65 + Math.round((wardShare / 1200000) * 100);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="gradient-teal px-4 py-3 flex items-center gap-3 sticky top-0 z-30">
        <button onClick={() => navigate(-1)} className="text-primary-foreground p-1">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-sm font-bold text-primary-foreground tracking-widest uppercase">Revenue Split</h1>
      </header>

      <div className="flex-1 px-4 py-5 space-y-5 max-w-lg mx-auto w-full">
        {/* Success banner */}
        <div className="gradient-success rounded-2xl p-6 text-center animate-scale-in">
          <CheckCircle2 className="w-10 h-10 text-accent-foreground mx-auto mb-3" />
          <p className="text-xs font-medium text-accent-foreground/80 uppercase tracking-wider mb-1">Claim Confirmed</p>
          <p className="text-3xl font-bold font-mono text-accent-foreground">R{value.toLocaleString()}</p>
          <p className="text-xs text-accent-foreground/70 mt-1 font-mono">{code}</p>
        </div>

        {/* Split grid */}
        <div className="grid grid-cols-2 gap-3 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="bg-card rounded-xl border border-border p-4 text-center">
            <Building2 className="w-5 h-5 text-primary mx-auto mb-2" />
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">90% Hospital Fund</p>
            <p className="text-xl font-bold font-mono text-foreground mt-1">R{hospitalShare.toLocaleString()}</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 text-center">
            <Users className="w-5 h-5 text-hospital-green mx-auto mb-2" />
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">10% Ward B Recruitment</p>
            <p className="text-xl font-bold font-mono text-hospital-green mt-1">R{wardShare.toLocaleString()}</p>
          </div>
        </div>

        {/* Impact Summary */}
        <div className="bg-card rounded-2xl border border-border p-5 space-y-4 animate-slide-up" style={{ animationDelay: "0.15s" }}>
          <h2 className="text-sm font-semibold text-foreground">Impact Summary</h2>

          {/* Updated progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Hiring Progress</span>
              <span className="font-semibold text-hospital-green">{newProgress}%</span>
            </div>
            <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full gradient-green transition-all duration-1000"
                style={{ width: `${newProgress}%` }}
              />
            </div>
          </div>

          <div className="bg-muted/50 rounded-xl p-4">
            <p className="text-sm text-foreground leading-relaxed">
              Your contribution just added{" "}
              <span className="font-bold text-hospital-green">R{wardShare.toLocaleString()}</span>!
              Only <span className="font-bold">R{goalRemaining.toLocaleString()}</span> remaining
              to fund your new Medical Officer.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 bg-card/80 backdrop-blur-lg border-t border-border px-4 py-3">
        <div className="max-w-lg mx-auto">
          <Button
            onClick={() => navigate("/dashboard")}
            className="w-full h-12 gradient-teal text-primary-foreground font-semibold rounded-xl text-sm hover:opacity-90 transition-opacity"
          >
            Proceed to Next Patient
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPage;
