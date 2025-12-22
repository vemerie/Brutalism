import type { IStat } from "../interfaces/start-card.interface";

export default function StatCard({
  title,
  value,
  previous,
  progress,
  isPositive,
  icon,
  iconBg,
}: IStat) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full border ${iconBg}`}
        >
          {icon}
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between text-sm">
        <div>
          <p className="text-xs uppercase text-gray-400">Previous</p>
          <p className="font-semibold text-gray-700">{previous}</p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase text-gray-400">Progress</p>
          <p
            className={`font-semibold ${
              isPositive ? "text-green-600" : "text-red-500"
            }`}
          >
            {progress}
          </p>
        </div>
      </div>
    </div>
  );
}
