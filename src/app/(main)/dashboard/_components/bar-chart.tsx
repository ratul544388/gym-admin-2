import { getGraphData } from "@/actions/graph-data";
import { Overview } from "./overview";

export const BarChart = async () => {
  const graphData = await getGraphData();
  return <Overview data={graphData} />;
};
