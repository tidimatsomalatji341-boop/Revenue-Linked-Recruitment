import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Menu, Search, Bell, ChevronRight } from "lucide-react";

const hiredStaff = [
  { name: "Dr. Nkosi", avatar: "DN" },
  { name: "Sr. Pillay", avatar: "SP" },
  { name: "Dr. Mokoena", avatar: "DM" },
  { name: "Sr. van Wyk", avatar: "SV" },
];

const remainingSlots = 3;

const recentCaptures = [
  { id: 1, text: "Septic Hip (M86.91) coded — R45,000", time: "2 min ago", type: "success" },
  { id: 2, text: "New admission: Bed 14 — J. Mthembu", time: "18 min ago", type: "info" },
  { id: 3, text: "Diabetic Ketoacidosis captured — R28,500", time: "1 hr ago", type: "success" },
  { id: 4, text: "Ward B recruitment fund updated", time: "2 hrs ago", type: "update" },
  { id: 5, text: "Pneumonia (J18.9) coded — R32,000", time: "3 hrs ago", type: "success" },
];

const DashboardPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const progress = 65;
  const goalAmount = 1200000;
  const currentAmount = goalAmount * (progress / 100);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/results?q=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-teal px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-primary-foreground p-1">
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-sm font-bold text-primary-foreground tracking-widest uppercase">Ward B</h1>
        <button className="text-primary-foreground p-1 relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-hospital-green rounded-full" />
        </button>
      </header>

      {/* Mobile menu drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="absolute inset-0 bg-foreground/30" onClick={() => setMenuOpen(false)} />
          <nav className="relative w-64 bg-card border-r border-border h-full p-6 space-y-4 animate-fade-in">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">Navigation</p>
            {["Dashboard", "Patients", "Billing", "Recruitment", "Reports"].map((item) => (
              <button key={item} className="block w-full text-left text-sm text-foreground py-2 hover:text-primary transition-colors">
                {item}
              </button>
            ))}
          </nav>
        </div>
      )}

      <div className="px-4 py-5 space-y-5 max-w-lg mx-auto">
        {/* Search */}
        <form onSubmit={handleSearch} className="animate-slide-up">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Type diagnosis or symptom... (e.g. Septic Hip)'
              className="pl-12 pr-4 h-12 rounded-2xl bg-card border-border text-sm shadow-sm"
            />
          </div>
        </form>

        {/* Hiring Progress */}
        <div className="bg-card rounded-2xl border border-border p-5 space-y-4 animate-slide-up" style={{ animationDelay: "0.05s" }}>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Hiring Goal</h2>
            <span className="text-xs font-mono text-muted-foreground">R1.2M</span>
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full gradient-green transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>R{currentAmount.toLocaleString()}</span>
              <span className="font-semibold text-hospital-green">{progress}%</span>
            </div>
          </div>

          {/* Avatars */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {hiredStaff.map((s) => (
                <div
                  key={s.avatar}
                  className="w-8 h-8 rounded-full gradient-teal flex items-center justify-center text-[10px] font-bold text-primary-foreground ring-2 ring-card"
                >
                  {s.avatar}
                </div>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {hiredStaff.length} hired · {remainingSlots} remaining
            </span>
          </div>
        </div>

        {/* Recent Captures */}
        <div className="space-y-3 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <h2 className="text-sm font-semibold text-foreground">Recent Captures</h2>
          <div className="space-y-2">
            {recentCaptures.map((item) => (
              <div
                key={item.id}
                className="bg-card rounded-xl border border-border px-4 py-3 flex items-center justify-between"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground truncate">{item.text}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 ml-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
