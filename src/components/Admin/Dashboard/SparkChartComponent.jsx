import { Card, SparkAreaChart } from '@tremor/react'

const SparkChartComponent = ({data, total, percentageChange, label}) => {
  return (
    <Card className="mx-auto flex max-w-lg items-center justify-between px-4 py-3.5">
        <div className="flex items-center space-x-2.5">
          <p className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
            {label.charAt(0).toUpperCase() + label.slice(1)}
          </p>
        </div>
        <SparkAreaChart
          data={data}
          categories={[`${label}`]}
          index={"month"}
          colors={["orange"]}
          className="h-8 w-20 sm:h-10 sm:w-36"
        />
        <div className="flex items-center space-x-2.5">
          <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            {total}
          </span>
          <span
            className={`rounded px-2 py-1 font-medium text-white ${
              percentageChange >= 0 ? "bg-orange-500" : "bg-red-500"
            }`}
          >
            {percentageChange >= 0
              ? `+${percentageChange}%`
              : `${percentageChange}%`}
          </span>
        </div>
      </Card>
  )
}

export default SparkChartComponent