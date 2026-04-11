interface WardBalanceCardProps {
  wardName: string;
  balance: number;
  pendingClaims: number;
  totalPatients: number;
}

const WardBalanceCard = ({ wardName, balance, pendingClaims, totalPatients }: WardBalanceCardProps) => {
  const isPositive = balance >= 0;

  return (
    <div className="rounded-lg border border-border bg-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">{wardName}</h3>
        <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
          {totalPatients} patients
        </span>
      </div>
      <div className={`text-3xl font-bold font-mono ${isPositive ? "text-ward-positive" : "text-ward-negative"}`}>
        {isPositive ? "+" : ""}${Math.abs(balance).toLocaleString()}
      </div>
      <div className="text-xs text-muted-foreground">
        {pendingClaims} pending claims
      </div>
    </div>
  );
};

export default WardBalanceCard;
