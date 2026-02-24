import { useSearchParams } from "react-router-dom";

function StationTimeTable() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read query parameters
  const railSystem = searchParams.get("RailSystem") || "trtc";
  const railSystemDisplay = railSystem === "trtc" ? "臺北捷運" : "其他捷運系統";

  return (
    <div>
      <h1>{railSystemDisplay} 時刻表</h1>
    </div>
  );
}

export default StationTimeTable;
