import DailyProgress from '../DailyProgress';

export default function DailyProgressExample() {
  return (
    <div className="p-8 bg-background flex justify-center">
      <div className="w-full max-w-md">
        <DailyProgress current={1750} goal={3000} />
      </div>
    </div>
  );
}
