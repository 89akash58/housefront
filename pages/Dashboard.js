import Line from "../components/Line";
import Bar from "../components/Bar";
// import Candle from "../components/Candle";
import Pie from "../components/Pie";
import CandlestickChart from "../components/Candle";

const Dashboard = () => {
  return (
    <div className="flex flex-wrap">
      <CandlestickChart />
      <Line />
      <Bar />
      <Pie />
    </div>
  );
};

export default Dashboard;
