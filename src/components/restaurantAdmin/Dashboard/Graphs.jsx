import { AreaGraph } from "../../Charts/AreaGraph";
import BarGraph from "../../Charts/BarGraph";

export default function Graphs() {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1">
      <BarGraph />
      <AreaGraph />
    </div>
  );
}
