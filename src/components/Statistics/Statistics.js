import BattingStats from "./BattingStats";
import { useState } from "react";
import PitchingStats from "./PitchingStats";
import classes from "./Stats.module.css";
import initBattingStats from "./initBattingStats.json";
import { calAVG, calOBP, calSLG, calOPS } from "./CalStatsFunc";

const Statistics = (props) => {
  const dataRange = [
    "1990",
    "1991",
    "1992",
    "1993",
    "1994",
    "1995",
    "1996",
    "1997",
    "1998",
    "1999",
    "2000",
    "2001",
    "2002",
    "2003",
    "2004",
    "2005",
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
  ];
  const [statsType, setStatsType] = useState(true);
  const [selectedYear, setSelectedYear] = useState("2021");
  const [playerStats, setPlayerStats] = useState(initBattingStats);

  const rowSeparator = "\r\n";
  const columnSeparator = ",";
  function csvJSON(csv) {
    let lines = csv.split(rowSeparator);
    let result = [];
    var headers = lines[0].split(columnSeparator);
    lines.splice(0, 1);
    for (let line of lines) {
      let columns = line.split(columnSeparator);
      let row = {};
      for (let header of headers) {
        row[header] = columns[headers.indexOf(header)];
      }
      result.push(row);
    }
    return JSON.stringify(result);
  }

  const selectYearHandler = (event) => {
    setPlayerStats([]);
    setSelectedYear(event.target.value);
    fetch(
      `https://raw.githubusercontent.com/ShanyuJung/cpbl-opendata/master/CPBL/${
        statsType ? "battings" : "pitchings"
      }/${event.target.value}.csv`,
      {
        method: "GET",
      }
    )
      .then((res) => res.text())
      .then((data) => {
        const playerHittingStats = JSON.parse(csvJSON(data)).slice(0, -1);
        setPlayerStats(
          playerHittingStats
            .map((player) => {
              return {
                ...playerHittingStats[playerHittingStats.indexOf(player)],
                hittingAverage: calAVG(player),
                onBasePercentage: calOBP(player),
                sluggingPercentage: calSLG(player),
                onBasePlusSlugging: calOPS(player),
              };
            })
            .sort(function (a, b) {
              return b.hittingAverage - a.hittingAverage;
            })
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const BattingStatsHandler = () => {
    fetch(
      `https://raw.githubusercontent.com/ShanyuJung/cpbl-opendata/master/CPBL/battings/${selectedYear}.csv`,
      {
        method: "GET",
      }
    )
      .then((res) => res.text())
      .then((data) => {
        const playerHittingStats = JSON.parse(csvJSON(data)).slice(0, -1);
        setPlayerStats(
          playerHittingStats
            .map((player) => {
              return {
                ...playerHittingStats[playerHittingStats.indexOf(player)],
                hittingAverage: calAVG(player),
                onBasePercentage: calOBP(player),
                sluggingPercentage: calSLG(player),
                onBasePlusSlugging: calOPS(player),
              };
            })
            .sort(function (a, b) {
              return b.hittingAverage - a.hittingAverage;
            })
        );
        setStatsType(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const PitchingStatsHandler = () => {
    fetch(
      `https://raw.githubusercontent.com/ShanyuJung/cpbl-opendata/master/CPBL/pitchings/${selectedYear}.csv`,
      {
        method: "GET",
      }
    )
      .then((res) => res.text())
      .then((data) => {
        setPlayerStats(JSON.parse(csvJSON(data)).slice(0, -1));
        setStatsType(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <div className={classes["flex-container"]}>
        <div className={classes.selectLabel}>年度</div>
        <select
          name="year"
          id="yearSelector"
          defaultValue="2021"
          className={classes.statsSelector}
          onChange={selectYearHandler}
        >
          {dataRange.map((year) => {
            return (
              <option value={year} key={year}>
                {year}
              </option>
            );
          })}
        </select>
        <button
          onClick={BattingStatsHandler}
          className={statsType ? classes.selectedType : classes.typeButton}
        >
          打擊成績
        </button>
        <button
          onClick={PitchingStatsHandler}
          className={statsType ? classes.typeButton : classes.selectedType}
        >
          投球成績
        </button>
      </div>
      {statsType && <BattingStats playerStats={playerStats} />}
      {!statsType && <PitchingStats />}
    </>
  );
};

export default Statistics;
