import BattingStats from "./BattingStats";
import { useEffect, useState } from "react";
import PitchingStats from "./PitchingStats";
import classes from "./Stats.module.css";
import StatsDetail from "./StatsDetail.json";
import {
  calAVG,
  calOBP,
  calSLG,
  calOPS,
  calERA,
  calWHIP,
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
  const [playerStats, setPlayerStats] = useState([]);
  const [statsMode, setStatsMode] = useState("partial");
  const [avgStats, setAvgStats] = useState("");

  const selectModeHandler = (event) => {
    setStatsMode(`${event.target.value}`);
  };

  useEffect(() => {
    fetch(
      `https://raw.githubusercontent.com/ShanyuJung/cpbl-opendata/master/CPBL/${
        statsType ? "battings" : "pitchings"
      }/${selectedYear[0].year}.csv`,
      {
        method: "GET",
      }
    )
      .then((res) => res.text())
      .then((data) => {
        if (statsType) {
          const playerHittingStats = JSON.parse(csvJSON(data)).slice(0, -1);
          const totalStats = {
            H: `${playerHittingStats
              .map((player) => player.H)
              .reduce((prev, next) => parseInt(prev) + parseInt(next))}`,
            AB: `${playerHittingStats
              .map((player) => player.AB)
              .reduce((prev, next) => parseInt(prev) + parseInt(next))}`,
            TB: `${playerHittingStats
              .map((player) => player.TB)
              .reduce((prev, next) => parseInt(prev) + parseInt(next))}`,
            BB: `${playerHittingStats
              .map((player) => player.BB)
              .reduce((prev, next) => parseInt(prev) + parseInt(next))}`,
            IBB: `${playerHittingStats
              .map((player) => player.IBB)
              .reduce((prev, next) => parseInt(prev) + parseInt(next))}`,
            HBP: `${playerHittingStats
              .map((player) => player.HBP)
              .reduce((prev, next) => parseInt(prev) + parseInt(next))}`,
            SF: `${playerHittingStats
              .map((player) => player.SF)
              .reduce((prev, next) => parseInt(prev) + parseInt(next))}`,
          };

          setAvgStats({
            avgOBP: calOBP(totalStats),
            avgSLG: calSLG(totalStats),
          });

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
          const totalStats = {
            IPx3: `${playerPitchingStats
              .map((player) => calIPx3(player))
              .reduce((prev, next) => parseInt(prev) + parseInt(next))}`,
            ER: `${playerPitchingStats
              .map((player) => player.ER)
              .reduce((prev, next) => parseInt(prev) + parseInt(next))}`,
          };

          setAvgStats({
            avgERA: (parseInt(totalStats.ER) / parseInt(totalStats.IPx3)) * 27,
          });

          setPlayerStats(
            playerPitchingStats
              .map((player) => {
                return {
                  ...playerPitchingStats[playerPitchingStats.indexOf(player)],
                  earnedRunAverage: calERA(player),
                  walkAndHitPerInningPitched: calWHIP(player),
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
  }, [selectedYear, statsType]);

  const selectYearHandler = (event) => {
    setPlayerStats([]);
    setSelectedYear(
      StatsDetail.filter((year) => year.year === event.target.value)
    );
  };

  const BattingStatsHandler = () => {
    setStatsType(true);
  };

  const PitchingStatsHandler = () => {
    setStatsType(false);
  };

  // console.log(playerStats);
  // console.log(statsMode);
  // console.log(selectedYear);

  return (
    <>
      <div className={classes["flex-container"]}>
        <select
          id="modeSelector"
          className={classes.statsSelector}
          onChange={selectModeHandler}
        >
          <option value="partial">{statsType ? "規定打席" : "規定局數"}</option>
          <option value="all">{"全部成績"}</option>
        </select>

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
          avgStats={avgStats}
        />
      )}
      {!statsType && (
        <PitchingStats
          playerStats={playerStats}
          statsMode={statsMode}
          selectedYear={selectedYear}
          avgStats={avgStats}
        />
      )}
    </>
  );
};

export default Statistics;
