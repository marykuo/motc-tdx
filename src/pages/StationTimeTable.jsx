import { useSearchParams } from "react-router-dom";

function StationTimeTable() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read query parameters
  const railSystem = searchParams.get("RailSystem") || "trtc";
  const railSystemDisplay = railSystem === "trtc" ? "臺北捷運" : "其他捷運系統";

  function handleRailSystemChange(newSystem) {
    setSearchParams({ RailSystem: newSystem });
  }

  return (
    <>
      <h1>{railSystemDisplay} 時刻表</h1>

      <div>
        <span>捷運系統：</span>
        <button onClick={() => handleRailSystemChange("trtc")}>TRTC</button>
        <button onClick={() => handleRailSystemChange("other")}>Other</button>
      </div>

      <div>
        <span>選擇路線：</span>
        <button>松山新店線</button>
        <button>淡水信義線</button>
        <button>板南線</button>
      </div>

      <div>
        <span>選擇起站：</span>
        <button>新店</button>
        <button>松山</button>
        <button>台電大樓</button>
      </div>

      <div>
        <span>選擇迄站：</span>
        <button>松山</button>
        <button>新店</button>
        <button>台電大樓</button>
      </div>

      <div>
        <span>服務類別：</span>
        <button>平日</button>
        <button>假日</button>
      </div>

      <hr />

      <h2>{railSystemDisplay} 台電大樓往松山站 時刻表</h2>
      <ul>
        <li>路線：G-2</li>
        <li>起站：台電大樓站</li>
        <li>迄站：松山站</li>
      </ul>

      <div>
        <h3>平日</h3>
        <div style={{ marginLeft: "20px" }}>
          <p>07:16 07:28 07:40 07:52 </p>
          <p>08:04 08:16 08:28 08:40 08:52 </p>
          <p>09:04 </p>
          <p>17:03 17:16 17:28 17:42 17:55 </p>
          <p>18:07 18:20 18:33 18:45 18:58 </p>
          <p>19:11 </p>
        </div>
      </div>
    </>
  );
}

export default StationTimeTable;
