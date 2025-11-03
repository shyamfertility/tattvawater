import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, X } from "lucide-react";

interface MotivationalCardProps {
  message: string;
  author?: string;
  onDismiss?: () => void;
}

export default function MotivationalCard({ message, author, onDismiss }: MotivationalCardProps) {
  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        
        <div className="flex-1 space-y-2">
          <h4 className="font-semibold text-sm text-primary">Daily Inspiration</h4>
          <p className="text-foreground italic" data-testid="text-motivation-message">
            "{message}"
          </p>
          {author && (
            <p className="text-sm text-muted-foreground">— {author}</p>
          )}
        </div>
        
        {onDismiss && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={onDismiss}
            data-testid="button-dismiss-motivation"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </Card>
  );
}
