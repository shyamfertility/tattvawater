import StatsGrid from '../StatsGrid';
import { Droplet, Flame, Zap, Award } from 'lucide-react';

export default function StatsGridExample() {
  const mockStats = [
    {
      label: 'This Week',
      value: '21.5L',
      icon: <Droplet className="h-5 w-5 text-primary" />,
      trend: '+12%',
      color: 'bg-primary/10'
    },
    {
      label: 'Daily Average',
      value: '3.1L',
      icon: <Flame className="h-5 w-5 text-orange-500" />,
      trend: '+5%',
      color: 'bg-orange-500/10'
    },
    {
      label: 'Current Streak',
      value: '12 days',
      icon: <Zap className="h-5 w-5 text-yellow-500" />,
      color: 'bg-yellow-500/10'
    },
    {
      label: 'Energy Score',
      value: '8.5/10',
      icon: <Award className="h-5 w-5 text-green-500" />,
      trend: '+1.2',
      color: 'bg-green-500/10'
    },
  ];

  return (
    <div className="p-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <StatsGrid stats={mockStats} />
      </div>
    </div>
  );
}
