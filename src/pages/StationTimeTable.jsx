import { useSearchParams } from "react-router";
import { useState, useEffect } from "react";

function flattenRecords(data) {
  return data.flat();
}

function groupTimetablesByHour(timetableEntries) {
  return timetableEntries.reduce((groups, timetableEntry) => {
    const hour = timetableEntry.split(":")[0];
    const entriesForHour = groups.get(hour) || [];

    entriesForHour.push(timetableEntry);
    groups.set(hour, entriesForHour);

    return groups;
  }, new Map());
}

function StationTimeTable() {
  // system initial
  const [searchParams, setSearchParams] = useSearchParams();

  // load data from files
  const [stations, setStations] = useState([]);
  const [timetables, setTimetables] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // user choose
  const [lineID, setLineID] = useState("G");
  const [startStationID, setStartStationID] = useState("G-2");
  const [endStationID, setEndStationID] = useState("G-19");
  const [serviceTag, setServiceTag] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const [stationsResponse, timetablesResponse] = await Promise.all([
          fetch("/motc-tdx/TRTC-stations.json"),
          fetch("/motc-tdx/TRTC-station-timetables.json"),
        ]);

        if (!stationsResponse.ok || !timetablesResponse.ok) {
          throw new Error("無法載入捷運資料");
        }

        const [stationData, timetableData] = await Promise.all([
          stationsResponse.json(),
          timetablesResponse.json(),
        ]);

        setStations(flattenRecords(stationData));
        setTimetables(flattenRecords(timetableData));
      } catch (loadError) {
        setError(loadError.message || "無法載入捷運資料");
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  // Read query parameters
  const railSystem = searchParams.get("RailSystem") || "TRTC";
  const railSystemDisplay = railSystem === "TRTC" ? "臺北捷運" : "其他捷運系統";

  function handleRailSystemChange(newSystem) {
    setSearchParams({ RailSystem: newSystem });
  }

  function handleLineIDChange(newLineID) {
    setLineID(newLineID);
    setStartStationID("");
    setEndStationID("");
    setServiceTag("");
  }

  const lineStations = stations.filter((station) =>
    station.StationID.startsWith(lineID),
  );

  const startStationTimetables = timetables.filter(
    (timetable) =>
      timetable.LineID === lineID && timetable.StationID === startStationID,
  );

  const destinationIDs = [
    ...new Set(
      startStationTimetables.map((timetable) => timetable.DestinationStaionID),
    ),
  ];

  const destinationStations = destinationIDs.map((destinationID) => {
    const station = stations.find(
      (candidate) => candidate.StationID === destinationID,
    );
    const timetable = startStationTimetables.find(
      (candidate) => candidate.DestinationStaionID === destinationID,
    );

    return {
      id: destinationID,
      name:
        station?.StationName?.Zh_tw ||
        timetable?.DestinationStationName?.Zh_tw ||
        destinationID,
    };
  });

  const matchingTimetables = startStationTimetables.filter(
    (timetable) =>
      timetable.DestinationStaionID === endStationID &&
      timetable.ServiceTag === serviceTag,
  );

  const serviceTags = [
    ...new Set(
      startStationTimetables
        .filter((timetable) => timetable.DestinationStaionID === endStationID)
        .map((timetable) => timetable.ServiceTag),
    ),
  ];

  const selectedStartStation = lineStations.find(
    (station) => station.StationID === startStationID,
  );
  const selectedEndStation = stations.find(
    (station) => station.StationID === endStationID,
  );

  function handleStartStationChange(newStartStationID) {
    setStartStationID(newStartStationID);
    setEndStationID("");
    setServiceTag("");
  }

  function handleEndStationChange(newEndStationID) {
    setEndStationID(newEndStationID);
    setServiceTag("");
  }

  return (
    <>
      <h1>{railSystemDisplay} 時刻表</h1>

      <div>
        <span>捷運系統：</span>
        <button onClick={() => handleRailSystemChange("TRTC")}>TRTC</button>
        <button onClick={() => handleRailSystemChange("other")}>Other</button>
      </div>

      <div>
        <span>選擇路線：</span>
        <button onClick={() => handleLineIDChange("BR")}>文湖線</button>
        <button onClick={() => handleLineIDChange("R")}>淡水信義線</button>
        <button onClick={() => handleLineIDChange("G")}>松山新店線</button>
        <button onClick={() => handleLineIDChange("O")}>中和新蘆線</button>
        <button onClick={() => handleLineIDChange("BL")}>板南線</button>
      </div>

      <div>
        <span>選擇起站：</span>
        {lineStations.map((station) => (
          <button
            key={station.StationID}
            type="button"
            onClick={() => handleStartStationChange(station.StationID)}
            aria-pressed={startStationID === station.StationID}
          >
            {station.StationID} {station.StationName.Zh_tw}
          </button>
        ))}
      </div>

      <div>
        <span>選擇迄站：</span>
        {destinationStations.map((station) => (
          <button
            key={station.id}
            type="button"
            onClick={() => handleEndStationChange(station.id)}
            aria-pressed={endStationID === station.id}
            disabled={!startStationID}
          >
            {station.id} {station.name}
          </button>
        ))}
      </div>

      <div>
        <span>服務類別：</span>
        {serviceTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setServiceTag(tag)}
            aria-pressed={serviceTag === tag}
            disabled={!endStationID}
          >
            {tag}
          </button>
        ))}
      </div>

      {isLoading && <p>資料載入中...</p>}
      {error && <p role="alert">{error}</p>}
      {!isLoading && !error && matchingTimetables.length === 0 && (
        <p>請依序選擇起站、迄站與服務類別。</p>
      )}

      {matchingTimetables.map((timetable) => (
        <>
          <hr />
          <section key={`${timetable.RouteID}-${timetable.ServiceTag}`}>
            <h2>
              {railSystemDisplay} {selectedStartStation?.StationName?.Zh_tw}往
              {selectedEndStation?.StationName?.Zh_tw} 時刻表
            </h2>
            <ul>
              <li>起站：{timetable.StationName.Zh_tw}站</li>
              <li>迄站：{timetable.DestinationStationName.Zh_tw}站</li>
            </ul>
            <h3>{timetable.ServiceTag}</h3>
            <div style={{ marginLeft: "20px" }}>
              {[...groupTimetablesByHour(timetable.Timetables)].map(
                ([hour, timetableEntries]) => (
                  <p key={hour}>{timetableEntries.join(" ")}</p>
                ),
              )}
            </div>
          </section>
        </>
      ))}
    </>
  );
}

export default StationTimeTable;
