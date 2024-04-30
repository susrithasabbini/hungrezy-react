import { LineChart } from "@tremor/react";

const ratingData = [
  {
    date: "Jan",
    Rating: 4.5,
  },
  {
    date: "Feb",
    Rating: 3,
  },
  {
    date: "Mar",
    Rating: 4.2,
  },
  {
    date: "Apr",
    Rating: 3.4,
  },
  {
    date: "May",
    Rating: 4,
  },
  {
    date: "Jun",
    Rating: 5,
  },
  {
    date: "Jul",
    Rating: 4.8,
  },
  {
    date: "Aug",
    Rating: 4.9,
  },
  {
    date: "Sep",
    Rating: 4.5,
  },
  {
    date: "Oct",
    Rating: 3.9,
  },
  {
    date: "Nov",
    Rating: 4.6,
  },
  {
    date: "Dec",
    Rating: 4.3,
  },
];

const customTooltip = ({ payload, active }) => {
  if (!active || !payload) return null;
  return (
    <div className="w-56 rounded-tremor-default text-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border">
      {payload.map((category, idx) => (
        <div key={idx} className="flex flex-1 space-x-2.5">
          <div
            className={`w-1 flex flex-col bg-${category.color}-500 rounded`}
          />
          <div className="space-y-1">
            <p className="text-tremor-content">{category.dataKey}</p>
            <p className="font-medium text-tremor-content-emphasis">
              {category.value} Rating
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export const AreaGraph = () => {
  return (
    <LineChart
      className="mt-2"
      data={ratingData}
      index="date"
      categories={["Rating"]}
      colors={["orange-400"]}
      yAxisWidth={30}
      customTooltip={customTooltip}
      tickGap={2}
    />
  );
};
