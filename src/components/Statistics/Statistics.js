import BattingStats from "./BattingStats";
import { useState } from "react";
import PitchingStats from "./PitchingStats";
import classes from "./Stats.module.css";
import initBattingStats from "./initBattingStats.json";
import StatsDetail from "./StatsDetail.json";
import {
  calAVG,
  calOBP,
  calSLG,
  calOPS,
  calERA,
  calWHIP,
  calAVGP,
  calIPx3,
  csvJSON,
} from "./CalStatsFunc";

const Statistics = (props) => {
  const [statsType, setStatsType] = useState(true);
  const [selectedYear, setSelectedYear] = useState([
    {
      year: "2021",
      annual: "三十二",
      games: "120",
    },
  ]);
  const [playerStats, setPlayerStats] = useState(initBattingStats);
  const [statsMode, setStatsMode] = useState("partial");

  const selectModeHandler = (event) => {
    setStatsMode(`${event.target.value}`);
  };

  const selectYearHandler = (event) => {
    setPlayerStats([]);
    setSelectedYear(
      StatsDetail.filter((year) => year.year === event.target.value)
    );

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
        if (statsType) {
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
        } else {
          const playerPitchingStats = JSON.parse(csvJSON(data)).slice(0, -1);
          setPlayerStats(
            playerPitchingStats
              .map((player) => {
                return {
                  ...playerPitchingStats[playerPitchingStats.indexOf(player)],
                  earnedRunAverage: calERA(player),
                  walkAndHitPerInningPitched: calWHIP(player),
                  hittingAverageAllowed: calAVGP(player),
                  IPx3: calIPx3(player),
                };
              })
              .sort(function (a, b) {
                return a.earnedRunAverage - b.earnedRunAverage;
              })
          );
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const BattingStatsHandler = () => {
    fetch(
      `https://raw.githubusercontent.com/ShanyuJung/cpbl-opendata/master/CPBL/battings/${selectedYear[0].year}.csv`,
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
      `https://raw.githubusercontent.com/ShanyuJung/cpbl-opendata/master/CPBL/pitchings/${selectedYear[0].year}.csv`,
      {
        method: "GET",
      }
    )
      .then((res) => res.text())
      .then((data) => {
        const playerPitchingStats = JSON.parse(csvJSON(data)).slice(0, -1);
        setPlayerStats(
          playerPitchingStats
            .map((player) => {
              return {
                ...playerPitchingStats[playerPitchingStats.indexOf(player)],
                earnedRunAverage: calERA(player),
                walkAndHitPerInningPitched: calWHIP(player),
                hittingAverageAllowed: calAVGP(player),
                IPx3: calIPx3(player),
              };
            })
            .sort(function (a, b) {
              return a.earnedRunAverage - b.earnedRunAverage;
            })
        );
        setStatsType(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // console.log(playerStats);
  // console.log(statsMode);
  // console.log(selectedYear);

  return (
    <>
      <div className={classes["flex-container"]}>
        <div className={classes.selectLabel}>年度</div>
        <select
          id="modeSelector"
          className={classes.statsSelector}
          onChange={selectModeHandler}
        >
          <option value="partial">{statsType ? "規定打席" : "規定局數"}</option>
          <option value="all">{"全部成績"}</option>
        </select>

        <div className={classes.selectLabel}>年度</div>
        <select
          id="yearSelector"
          defaultValue="2021"
          className={classes.statsSelector}
          onChange={selectYearHandler}
        >
          {StatsDetail.map((year) => {
            return (
              <option value={year.year} key={year.year}>
                {year.year}
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
      {statsType && (
        <BattingStats
          playerStats={playerStats}
          statsMode={statsMode}
          selectedYear={selectedYear}
        />
      )}
      {!statsType && (
        <PitchingStats
          playerStats={playerStats}
          statsMode={statsMode}
          selectedYear={selectedYear}
        />
      )}
    </>
  );
};

export default Statistics;
