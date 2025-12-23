import React from "react";
import { AcquisitionChart } from "./components/acquisition-chart";
import { PlatformBudget } from "./components/platform-budget";
import StatCard from "./components/start-card";
import type { IStat } from "./interfaces/start-card.interface";
import { TrafficChart } from "./components/traffic-chart";
import {
  CheckCircle,
  DollarSign,
  Users,
  WalletCards,
} from "lucide-react";

const statCard: IStat[] = [
  {
    title: "Total Spend",
    value: "$8,765",
    icon: <WalletCards className="h-5 w-5 text-lime-600" />,
    previous: "$10,234",
    progress: "-14.32%",
    isPositive: false,
    iconBg: "bg-lime-50 text-lime-600 border-lime-200",
  },
  {
    title: "Visitor",
    value: "14,321",
    icon: <Users className="h-5 w-5 text-lime-600" />,
    previous: "12,543",
    progress: "+14.23%",
    isPositive: true,
    iconBg: "bg-lime-50 text-lime-600 border-lime-200",
  },
  {
    title: "Acquisition",
    value: "1,023",
    icon: <CheckCircle className="h-5 w-5 text-lime-600" />,
    previous: "876",
    progress: "+18.73%",
    isPositive: true,
    iconBg: "bg-lime-50 text-lime-600 border-lime-200",
  },
  {
    title: "Revenue",
    value: "$18,765",
    icon: <DollarSign className="h-5 w-5 text-lime-600" />,
    previous: "$15,432",
    progress: "+21.67%",
    isPositive: true,
    iconBg: "bg-lime-50 text-lime-600 border-lime-200",
  },
];

const Marketting: React.FC = () => {
  const periods = ["7 Days", "14 Days", "1 Month"] as const;
  const [activePeriod, setActivePeriod] = React.useState<(typeof periods)[number]>("7 Days");

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Marketing
        </h2>
        <div className="period">
          <div className="inline-flex rounded-[4px] border border-black overflow-hidden text-sm font-semibold shadow-sm">
            {periods.map((period) => {
              const isActive = period === activePeriod;
              return (
                <button
                  key={period}
                  type="button"
                  onClick={() => setActivePeriod(period)}
                  className={`px-4 py-1.5 transition border-r last:border-r-0 ${
                    isActive ? "bg-white text-green-600" : "text-gray-700 bg-gray-50"
                  }`}
                >
                  {period}
                </button>
              );
            })}
          </div>
        </div>
      </div>

        <div className="flex flex-wrap ">
          <div
            role="group"
            aria-label="Marketing Overview"
            className="w-1/2 px-2 "
          >
            <div className=" rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {statCard.map((card) => (
                  <StatCard key={card.title} {...card} />
                ))}
              </div>
            </div>
          </div>

          <div role="group" aria-label="Card 2" className="w-1/2 px-2 mb-4">
            <div className="h-full border border-gray-200  flex flex-col justify-center">
              <AcquisitionChart />
            </div>
          </div>

          <div
            role="group"
            aria-label="Budget by Platform"
            className="w-1/2 px-2 mb-4"
          >
            <div className="h-full flex flex-col">
              <TrafficChart />
            </div>
          </div>

          <div role="group" aria-label="Card 4" className="w-1/2 px-2 mb-4">
            <div className="h-ful border border-gray-200 rounded-lg p-4 flex flex-col justify-center">
              <PlatformBudget />
            </div>
          </div>
        </div>
      </div>
    );
};

export default Marketting;
