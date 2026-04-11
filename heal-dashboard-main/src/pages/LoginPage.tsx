import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Activity, Lock, User } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [staffId, setStaffId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm animate-scale-in">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl gradient-teal flex items-center justify-center mb-4 shadow-lg">
            <Activity className="w-8 h-8 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">RLR</h1>
          <p className="text-sm text-muted-foreground mt-1">Public Hospital Portal</p>
        </div>

        {/* Card */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Staff ID</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={staffId}
                  onChange={(e) => setStaffId(e.target.value)}
                  placeholder="e.g. WB-00421"
                  className="pl-10 h-11 bg-muted/50 border-border"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Biometric / Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 h-11 bg-muted/50 border-border"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 gradient-teal text-primary-foreground font-semibold text-sm rounded-xl hover:opacity-90 transition-opacity"
            >
              {loading ? "Authenticating..." : "Login to Ward B"}
            </Button>
          </form>

          <p className="text-xs text-center text-muted-foreground mt-4">
            Secure access · Ward B Clinical Staff Only
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
