import { Card } from "@/components/ui/card";
import { TrendingUp, Droplet, Flame, Zap } from "lucide-react";

interface Stat {
  label: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  color?: string;
}

interface StatsGridProps {
  stats: Stat[];
}

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <Card key={idx} className="p-6 space-y-3" data-testid={`card-stat-${idx}`}>
          <div className="flex items-center justify-between">
            <div className={`p-2 rounded-lg ${stat.color || 'bg-primary/10'}`}>
              {stat.icon}
            </div>
            {stat.trend && (
              <div className="flex items-center gap-1 text-xs text-green-600">
                <TrendingUp className="h-3 w-3" />
                <span>{stat.trend}</span>
              </div>
            )}
          </div>
          
          <div className="space-y-1">
            <div className="font-mono text-2xl font-bold" data-testid={`text-stat-value-${idx}`}>
              {stat.value}
            </div>
            <div className="text-sm text-muted-foreground" data-testid={`text-stat-label-${idx}`}>
              {stat.label}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
