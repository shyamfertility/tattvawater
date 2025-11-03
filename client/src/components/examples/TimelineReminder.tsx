import TimelineReminder from '../TimelineReminder';

export default function TimelineReminderExample() {
  const mockReminders = [
    { time: '7:00 AM', label: 'Morning Wake-up', amount: '500ml', completed: true, optimal: false },
    { time: '9:30 AM', label: 'Mid-morning Boost', amount: '300ml', completed: true, optimal: false },
    { time: '12:00 PM', label: 'Before Lunch', amount: '400ml', completed: false, optimal: true },
    { time: '3:00 PM', label: 'Afternoon Energy', amount: '300ml', completed: false, optimal: false },
    { time: '6:00 PM', label: 'Evening Hydration', amount: '400ml', completed: false, optimal: false },
    { time: '8:30 PM', label: 'Before Bed', amount: '200ml', completed: false, optimal: false },
  ];

  return (
    <div className="p-8 bg-background">
      <div className="max-w-2xl mx-auto">
        <TimelineReminder reminders={mockReminders} />
      </div>
    </div>
  );
}
