import MotivationalCard from '../MotivationalCard';
import { useState } from 'react';

export default function MotivationalCardExample() {
  const [visible, setVisible] = useState(true);
  
  if (!visible) {
    return (
      <div className="p-8 bg-background text-center">
        <p className="text-muted-foreground">Motivation dismissed</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-background">
      <div className="max-w-2xl mx-auto">
        <MotivationalCard
          message="Small steps every day lead to big changes. Your body is 60% water - honor it with every sip you take."
          author="Tattva Wellness"
          onDismiss={() => setVisible(false)}
        />
      </div>
    </div>
  );
}
