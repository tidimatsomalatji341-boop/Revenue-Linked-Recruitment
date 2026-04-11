import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Search, ShieldCheck, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

// We removed the hardcoded 'allResults' array here because we are fetching from AI now!

const ResultsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  
  // NEW STATE: To hold the AI data and loading status
  const [aiResult, setAiResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<boolean>(false);

  // FETCH LOGIC: Talk to Member 1's Python Server
  useEffect(() => {
    const fetchAIResult = async () => {
      setLoading(true);
      try {
        // This is the URL you tested in your browser!
        const response = await fetch(`http://127.0.0.1:8000/search?query=${query}`);
        const json = await response.json();
        
        if (json.status === "success") {
          setAiResult(json.data);
        }
      } catch (error) {
        console.error("AI Connection Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchAIResult();
    }
  }, [query]);

  const handleConfirm = () => {
    if (aiResult) {
      // Send the real AI data to the next page
      navigate(`/confirm?code=${aiResult.code}&value=${aiResult.price}&term=${aiResult.term}`);
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

        {/* LOADING STATE */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="w-8 h-8 animate-spin mb-2 text-primary" />
            <p className="text-sm">Consulting Gemini AI...</p>
          </div>
        ) : aiResult ? (
          /* REAL AI RESULT CARD */
          <div className="space-y-3">
            <button
              onClick={() => setSelected(true)}
              className={`w-full text-left bg-card rounded-xl border p-4 transition-all animate-slide-up ${
                selected
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border hover:border-primary/40"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold font-mono text-primary">{aiResult.code}</span>
                  <Badge className="bg-hospital-green/15 text-hospital-green border-0 text-[10px] font-semibold px-2">
                    <ShieldCheck className="w-3 h-3 mr-1" />
                    MATCH FOUND
                  </Badge>
                </div>
                <span className="text-xs font-mono text-muted-foreground">AI Verified</span>
              </div>
              <p className="text-sm text-foreground mb-2">{aiResult.term}</p>
              <div className="flex justify-between items-end">
                <div>
                   <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Value</p>
                   <p className="text-xl font-bold font-mono text-foreground">R{aiResult.price.toLocaleString()}</p>
                </div>
                <div className="text-right">
                   <p className="text-[10px] text-hospital-green font-bold uppercase">Ward Share (10%)</p>
                   <p className="text-lg font-bold font-mono text-hospital-green">R{aiResult.ward_share.toLocaleString()}</p>
                </div>
              </div>
            </button>
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-sm text-muted-foreground">No matches found for "{query}". Please try a different diagnosis.</p>
          </div>
        )}
      </div>

      {/* Sticky footer */}
      {selected && (
        <div className="sticky bottom-0 bg-card/80 backdrop-blur-lg border-t border-border px-4 py-3 animate-slide-up">
          <div className="max-w-lg mx-auto">
            <Button
              onClick={handleConfirm}
              className="w-full h-12 gradient-teal text-primary-foreground font-semibold rounded-xl text-sm hover:opacity-90 transition-opacity"
            >
              Confirm Code & Allocate Funds
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsPage;