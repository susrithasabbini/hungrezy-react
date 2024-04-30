import { DonutChart } from "@tremor/react";

const dataFormatter = (number) =>
  `${Intl.NumberFormat("us").format(number).toString()}`;

const PieChartComponent = ({ data, label, loading }) => {
  return (
    <>
      <div className="mx-auto space-y-12">
        <div className="space-y-3">
          <span className="text-center block font-mono text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            {label}
          </span>
          <div className="flex justify-center">
            {loading ? (
              <div className="h-72 w-72 bg-gray-200 animate-pulse rounded-full"></div>
            ) : (
              <DonutChart
                className="h-72 w-72"
                colors={[
                  "orange-400",
                  "orange-300",
                  "orange-200",
                  "orange-100",
                ]}
                data={data}
                variant="pie"
                valueFormatter={dataFormatter}
                onValueChange={(v) => console.log(v)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PieChartComponent;
