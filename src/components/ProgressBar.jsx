export default function ProgressBar({ value }) {
  return (
    <div className="w-full bg-gray-300 rounded-full h-2 sm:h-3 overflow-hidden">
      <div
        className="bg-green-400 h-full transition-all duration-500"
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      />
    </div>
  );
}