import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Menu, Search, Bell, ChevronRight, X } from "lucide-react";

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

  // Stats for the Dashboard
  const progress = 65;
  const goalAmount = 1200000;
  const currentAmount = goalAmount * (progress / 100);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      // Points to /billing (ResultsPage) and passes the query
      navigate(`/billing?q=${encodeURIComponent(search.trim())}`);
    }
  };

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Patients", path: "/patients" },
    { name: "Billing", path: "/billing" },
    { name: "Recruitment", path: "/recruitment" },
    { name: "Reports", path: "/reports" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-teal px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white p-1 hover:bg-white/10 rounded-lg transition-colors">
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <h1 className="text-sm font-bold text-white tracking-widest uppercase">Ward B · AI Intake</h1>
        <button className="text-white p-1 relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-hospital-green rounded-full border border-teal-700" />
        </button>
      </header>

      {/* FIXED NAVIGATION DRAWER */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <nav className="relative w-64 bg-card border-r border-border h-full p-6 space-y-2 animate-in slide-in-from-left duration-300">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-6">Main Menu</p>
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  setMenuOpen(false);
                }}
                className="block w-full text-left text-sm font-medium text-foreground py-3 px-4 rounded-xl hover:bg-primary/5 hover:text-primary transition-all active:scale-95"
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      )}

      <div className="px-4 py-6 space-y-6 max-w-lg mx-auto">
        {/* Search Input */}
        <form onSubmit={handleSearch} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Try "Asthma" or "Stroke"...'
              className="pl-12 pr-4 h-14 rounded-2xl bg-card border-border text-base shadow-lg focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </form>

        {/* Hiring Progress Card */}
        <div className="bg-card rounded-[2rem] border border-border p-6 shadow-sm space-y-5 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Hiring Goal Progress</h2>
              <p className="text-2xl font-bold text-foreground">R1.2M Target</p>
            </div>
            <div className="bg-hospital-green/10 text-hospital-green px-3 py-1 rounded-full text-xs font-bold">
              Active
            </div>
          </div>

          <div className="space-y-3">
            <div className="h-4 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-hospital-green to-emerald-400 transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-mono font-bold text-foreground">R{currentAmount.toLocaleString()}</span>
              <span className="font-black text-hospital-green">{progress}%</span>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3 border-t border-border/50">
            <div className="flex -space-x-3">
              {hiredStaff.map((s) => (
                <div
                  key={s.avatar}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-[10px] font-bold text-white ring-4 ring-card"
                >
                  {s.avatar}
                </div>
              ))}
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground ring-4 ring-card">
                +{remainingSlots}
              </div>
            </div>
            <p className="text-xs text-muted-foreground font-medium">
              Staff capacity increasing...
            </p>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold text-foreground uppercase tracking-tight">Recent Activity</h2>
            <button className="text-xs text-primary font-bold">View All</button>
          </div>
          <div className="space-y-3">
            {recentCaptures.map((item) => (
              <div
                key={item.id}
                className="bg-card rounded-2xl border border-border px-5 py-4 flex items-center justify-between hover:border-primary/30 transition-colors group cursor-pointer"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{item.text}</p>
                  <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-hospital-green" /> {item.time}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all translate-x-0 group-hover:translate-x-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;