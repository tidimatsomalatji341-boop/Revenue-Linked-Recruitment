import { useState } from "react";
import { Search, CheckCircle2, Activity, DollarSign, FileText, Users } from "lucide-react";
import BillingProgressBar from "@/components/BillingProgressBar";
import WardBalanceCard from "@/components/WardBalanceCard";

const WARDS = [
  { wardName: "ICU — Ward A", balance: 24350, pendingClaims: 12, totalPatients: 18 },
  { wardName: "General — Ward B", balance: -3200, pendingClaims: 5, totalPatients: 42 },
  { wardName: "Pediatrics — Ward C", balance: 8900, pendingClaims: 8, totalPatients: 27 },
  { wardName: "Oncology — Ward D", balance: 15670, pendingClaims: 3, totalPatients: 14 },
];

const SAMPLE_DIAGNOSES: Record<string, { code: string; description: string; progress: number }> = {
  diabetes: { code: "E11.9", description: "Type 2 diabetes mellitus without complications", progress: 82 },
  hypertension: { code: "I10", description: "Essential (primary) hypertension", progress: 65 },
  pneumonia: { code: "J18.9", description: "Pneumonia, unspecified organism", progress: 35 },
  fracture: { code: "S72.001A", description: "Fracture of unspecified part of neck of femur", progress: 48 },
};

const Index = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<{ code: string; description: string; progress: number } | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleConfirm = () => {
    if (!query.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      const key = query.toLowerCase().trim();
      const match = Object.entries(SAMPLE_DIAGNOSES).find(([k]) => key.includes(k));
      setResult(match ? match[1] : { code: "R69", description: "Illness, unspecified", progress: 20 });
      setIsSearching(false);
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleConfirm();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-semibold text-foreground tracking-tight">MedBill Pro</h1>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><FileText className="h-4 w-4" /> Claims</span>
            <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> Patients</span>
            <span className="flex items-center gap-1.5"><DollarSign className="h-4 w-4" /> Billing</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        {/* Search Section */}
        <section className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Diagnosis Lookup</h2>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Enter diagnosis (e.g. diabetes, pneumonia, fracture)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full h-12 pl-11 pr-4 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
              />
            </div>
            <button
              onClick={handleConfirm}
              disabled={!query.trim() || isSearching}
              className="h-12 px-6 rounded-lg bg-primary text-primary-foreground font-medium text-sm flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <CheckCircle2 className="h-4 w-4" />
              {isSearching ? "Searching..." : "Confirm"}
            </button>
          </div>
        </section>

        {/* Result + Progress */}
        {result && (
          <section className="rounded-lg border border-border bg-card p-6 space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono text-primary bg-secondary px-2 py-1 rounded">{result.code}</span>
                <p className="mt-2 text-foreground font-medium">{result.description}</p>
              </div>
            </div>
            <BillingProgressBar value={result.progress} label="Claim Processing Status" />
          </section>
        )}

        {/* Ward Balances */}
        <section className="space-y-4">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Ward Balances</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WARDS.map((ward) => (
              <WardBalanceCard key={ward.wardName} {...ward} />
            ))}
          </div>
        </section>

        {/* Quick Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Total Revenue", value: "$142,800", sub: "+12.5% this month" },
            { label: "Pending Claims", value: "28", sub: "4 require review" },
            { label: "Processing Rate", value: "94.2%", sub: "Above target" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg border border-border bg-card p-5 space-y-1">
              <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
              <p className="text-2xl font-bold font-mono text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.sub}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Index;
