import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Check, Bell } from "lucide-react";
import { useState } from "react";

interface ReminderTime {
  time: string;
  label: string;
  amount: string;
  completed: boolean;
  optimal: boolean;
}

interface TimelineReminderProps {
  reminders: ReminderTime[];
}

export default function TimelineReminder({ reminders: initialReminders }: TimelineReminderProps) {
  const [reminders, setReminders] = useState(initialReminders);

  const markCompleted = (index: number) => {
    setReminders(prev => prev.map((r, i) => 
      i === index ? { ...r, completed: true } : r
    ));
    console.log(`Marked reminder at ${initialReminders[index].time} as completed`);
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">Today's Hydration Schedule</h3>
            <p className="text-sm text-muted-foreground">Optimal times for water intake</p>
          </div>
          <Bell className="h-5 w-5 text-muted-foreground" />
        </div>
        
        <div className="space-y-3">
          {reminders.map((reminder, idx) => (
            <div 
              key={idx}
              className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                reminder.completed 
                  ? 'bg-muted/50 border-muted' 
                  : reminder.optimal 
                  ? 'bg-primary/5 border-primary/20' 
                  : 'border-border'
              }`}
              data-testid={`reminder-${idx}`}
            >
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                reminder.completed 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {reminder.completed ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Clock className="h-5 w-5" />
                )}
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold" data-testid={`text-time-${idx}`}>{reminder.time}</span>
                  {reminder.optimal && !reminder.completed && (
                    <Badge variant="default" className="text-xs">Optimal</Badge>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">{reminder.label}</div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-medium">{reminder.amount}</span>
                {!reminder.completed && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => markCompleted(idx)}
                    data-testid={`button-complete-${idx}`}
                  >
                    Done
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
