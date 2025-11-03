import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart } from "recharts";

interface WeeklyChartProps {
  data: Array<{
    day: string;
    intake: number;
    goal: number;
  }>;
}

export default function WeeklyChart({ data }: WeeklyChartProps) {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold">Weekly Progress</h3>
          <p className="text-sm text-muted-foreground">Your hydration trend over the past 7 days</p>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis 
                dataKey="day" 
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                tickLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis 
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                tickLine={{ stroke: 'hsl(var(--border))' }}
                label={{ value: 'ml', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                  color: 'hsl(var(--foreground))'
                }}
              />
              <Bar 
                dataKey="intake" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]}
                name="Intake"
              />
              <Line 
                type="monotone" 
                dataKey="goal" 
                stroke="hsl(var(--destructive))" 
                strokeWidth={2}
                dot={false}
                name="Goal"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-primary" />
            <span className="text-muted-foreground">Actual Intake</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-destructive" />
            <span className="text-muted-foreground">Daily Goal</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
