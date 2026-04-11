import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Search, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const allResults = [
  { code: "M86.91", desc: "Osteomyelitis, unspecified — Septic Hip", value: 45000, billable: true, confidence: 97 },
  { code: "M86.90", desc: "Osteomyelitis, unspecified site", value: 38000, billable: true, confidence: 82 },
  { code: "M25.551", desc: "Pain in right hip — associated diagnosis", value: 12000, billable: true, confidence: 68 },
  { code: "M86.10", desc: "Other acute osteomyelitis, unspecified site", value: 41000, billable: false, confidence: 55 },
];

const ResultsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [selected, setSelected] = useState<string | null>(null);

  const handleConfirm = () => {
    const result = allResults.find((r) => r.code === selected);
    if (result) {
      navigate(`/confirm?code=${result.code}&value=${result.value}`);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="gradient-teal px-4 py-3 flex items-center gap-3 sticky top-0 z-30">
        <button onClick={() => navigate("/dashboard")} className="text-primary-foreground p-1">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-sm font-bold text-primary-foreground tracking-widest uppercase">Coding Guardrail</h1>
      </header>

      <div className="flex-1 px-4 py-5 space-y-4 max-w-lg mx-auto w-full">
        {/* Search context */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground animate-fade-in">
          <Search className="w-4 h-4" />
          <span>Semantic search for "<strong className="text-foreground">{query}</strong>"</span>
        </div>

        {/* Results */}
        <div className="space-y-3">
          {allResults.map((r, i) => (
            <button
              key={r.code}
              onClick={() => setSelected(r.code)}
              className={`w-full text-left bg-card rounded-xl border p-4 transition-all animate-slide-up ${
                selected === r.code
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border hover:border-primary/40"
              }`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold font-mono text-primary">{r.code}</span>
                  {r.billable && (
                    <Badge className="bg-hospital-green/15 text-hospital-green border-0 text-[10px] font-semibold px-2">
                      <ShieldCheck className="w-3 h-3 mr-1" />
                      BILLABLE
                    </Badge>
                  )}
                </div>
                <span className="text-xs font-mono text-muted-foreground">{r.confidence}% match</span>
              </div>
              <p className="text-sm text-foreground mb-2">{r.desc}</p>
              <p className="text-lg font-bold font-mono text-foreground">
                R{r.value.toLocaleString()}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Sticky footer */}
      {selected && (
        <div className="sticky bottom-0 bg-card/80 backdrop-blur-lg border-t border-border px-4 py-3 animate-slide-up">
          <div className="max-w-lg mx-auto">
            <Button
              onClick={handleConfirm}
              className="w-full h-12 gradient-teal text-primary-foreground font-semibold rounded-xl text-sm hover:opacity-90 transition-opacity"
            >
              Confirm Code & View Split
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsPage;
