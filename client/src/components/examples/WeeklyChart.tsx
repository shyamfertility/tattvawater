import WeeklyChart from '../WeeklyChart';

export default function WeeklyChartExample() {
  const mockData = [
    { day: 'Mon', intake: 2800, goal: 3000 },
    { day: 'Tue', intake: 3200, goal: 3000 },
    { day: 'Wed', intake: 2500, goal: 3000 },
    { day: 'Thu', intake: 3100, goal: 3000 },
    { day: 'Fri', intake: 2900, goal: 3000 },
    { day: 'Sat', intake: 3400, goal: 3000 },
    { day: 'Sun', intake: 2700, goal: 3000 },
  ];

  return (
    <div className="p-8 bg-background">
      <div className="max-w-3xl mx-auto">
        <WeeklyChart data={mockData} />
      </div>
    </div>
  );
}
