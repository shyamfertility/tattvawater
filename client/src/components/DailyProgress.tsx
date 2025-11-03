import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Droplet, Target } from "lucide-react";
import { useState } from "react";

interface DailyProgressProps {
  current: number;
  goal: number;
  unit?: string;
}

export default function DailyProgress({ current, goal, unit = "ml" }: DailyProgressProps) {
  const [intake, setIntake] = useState(current);
  const percentage = Math.min((intake / goal) * 100, 100);
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  const addWater = (amount: number) => {
    setIntake(prev => Math.min(prev + amount, goal));
    console.log(`Added ${amount}${unit} of water`);
  };

  return (
    <Card className="p-8">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold">Today's Hydration</h2>
          <p className="text-muted-foreground text-sm">Track your daily water intake</p>
        </div>
        
        <div className="flex justify-center">
          <div className="relative w-64 h-64">
            <svg className="transform -rotate-90 w-full h-full">
              <circle
                cx="128"
                cy="128"
                r="90"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                className="text-muted"
              />
              <circle
                cx="128"
                cy="128"
                r="90"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="text-primary transition-all duration-500"
                strokeLinecap="round"
              />
            </svg>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Droplet className="h-8 w-8 text-primary mb-2" />
              <div className="font-mono text-4xl font-bold" data-testid="text-current-intake">
                {intake}
              </div>
              <div className="text-muted-foreground text-sm">
                of {goal} {unit}
              </div>
              <div className="text-2xl font-semibold text-primary mt-1">
                {Math.round(percentage)}%
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Daily Goal</span>
            </div>
            <span className="font-semibold" data-testid="text-goal">{goal} {unit}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Remaining</span>
            <span className="font-semibold" data-testid="text-remaining">
              {Math.max(0, goal - intake)} {unit}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          <Button 
            variant="outline" 
            onClick={() => addWater(250)}
            data-testid="button-add-250ml"
          >
            <Plus className="h-4 w-4 mr-1" />
            250{unit}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => addWater(500)}
            data-testid="button-add-500ml"
          >
            <Plus className="h-4 w-4 mr-1" />
            500{unit}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => addWater(1000)}
            data-testid="button-add-1000ml"
          >
            <Plus className="h-4 w-4 mr-1" />
            1L
          </Button>
        </div>
      </div>
    </Card>
  );
}
