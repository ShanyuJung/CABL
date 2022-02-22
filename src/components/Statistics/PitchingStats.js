import { useState } from "react";
import Table from "react-bootstrap/Table";
import SortButton from "../UI/SortButton";
import playerPitchingStats from "./playerStats.json";
import classes from "./Stats.module.css";

const PitchingStats = () => {
  const headers = [
    { key: "order", label: "", width: 30 },
    { key: "playerName", label: "姓名", width: 70 },
    { key: "team", label: "Team", width: 60 },
    { key: "win", label: "W", width: 50 },
    { key: "lose", label: "L", width: 50 },
    { key: "earnedRunAverage", label: "ERA", width: 50 },
    { key: "gamePitched", label: "G", width: 50 },
    { key: "inningPitched", label: "IP", width: 50 },
    { key: "hit", label: "H", width: 50 },
    { key: "run", label: "R", width: 50 },
    { key: "earnedRun", label: "ER", width: 50 },
    { key: "homerun", label: "HR", width: 50 },
    { key: "hitBatsmen", label: "HB", width: 50 },
    { key: "basedOnBall", label: "BB", width: 50 },
    { key: "strikeOut", label: "SO", width: 50 },
    { key: "walkAndHitPerInningPitched", label: "WHIP", width: 50 },
    { key: "hittingAverageAllowed", label: ".AVG", width: 50 },
  ];

  const calIP = (player) => {
    return parseInt(player.IPx3 / 3) + (player.IPx3 % 3) * 0.1;
  };

  const calERA = (player) => {
    return ((player.earnedRun * 7) / (player.IPx3 / 3)).toFixed(2);
  };

  const calWHIP = (player) => {
    return (
      (player.hitAllowed + player.basedOnBallAllowed) /
      (player.IPx3 / 3)
    ).toFixed(2);
  };

  const calAVG = (player) => {
    return (player.hitAllowed / player.atBatFaced).toFixed(3);
  };

  const calPlayerStats = playerPitchingStats
    .filter((player) => player.gamePitched > 0)
    .map((player) => {
      return {
        ...playerPitchingStats[playerPitchingStats.indexOf(player)],
        inningPitched: calIP(player),
        earnedRunAverage: calERA(player),
        walkAndHitPerInningPitched: calWHIP(player),
        hittingAverageAllowed: calAVG(player),
      };
    });

  const [sortPlayerStats, setSortPlayerStats] = useState(
    [...calPlayerStats].sort(function (a, b) {
      return a.earnedRunAverage - b.earnedRunAverage;
    })
  );
  const [sortIncreasing, setSortIncreasing] = useState(true);
  const [selectedItem, setSelectedItem] = useState("earnedRunAverage");

  const onSortPlayerStats = (key) => {
    if (
      key === "earnedRunAverage" ||
      key === "walkAndHitPerInningPitched" ||
      key === "hittingAverageAllowed"
    ) {
      if (selectedItem === key) {
        setSelectedItem(key);
        if (!sortIncreasing) {
          setSortPlayerStats(
            [...sortPlayerStats].sort(function (a, b) {
              return a[key] - b[key];
            })
          );
          setSortIncreasing(true);
        } else {
          setSortPlayerStats(
            [...sortPlayerStats].sort(function (a, b) {
              return b[key] - a[key];
            })
          );
          setSortIncreasing(false);
        }
      } else {
        setSelectedItem(key);
        setSortPlayerStats(
          [...sortPlayerStats].sort(function (a, b) {
            return a[key] - b[key];
          })
        );
        setSortIncreasing(true);
      }
    } else {
      if (selectedItem === key) {
        setSelectedItem(key);
        if (!sortIncreasing) {
          setSortPlayerStats(
            [...sortPlayerStats].sort(function (a, b) {
              return b[key] - a[key];
            })
          );
          setSortIncreasing(true);
        } else {
          setSortPlayerStats(
            [...sortPlayerStats].sort(function (a, b) {
              return a[key] - b[key];
            })
          );
          setSortIncreasing(false);
        }
      } else {
        setSelectedItem(key);
        setSortPlayerStats(
          [...sortPlayerStats].sort(function (a, b) {
            return b[key] - a[key];
          })
        );
        setSortIncreasing(true);
      }
    }
  };

  return (
    <div className="table-responsive">
      <Table striped bordered hover className={classes.statsTable}>
        <colgroup>
          {headers.map((row) => (
            <col width={`${row.width}px`} key={row.key} />
          ))}
        </colgroup>
        <thead>
          <tr>
            {headers.map((row) => (
              <th
                key={row.key}
                className={row.key === selectedItem ? classes.selected : ""}
                onClick={
                  row.key === "order" ||
                  row.key === "playerName" ||
                  row.key === "team"
                    ? () => {}
                    : () => onSortPlayerStats(row.key)
                }
                nowrap="nowrap"
              >
                {row.label}
                {headers.indexOf(row) > 2 && (
                  <SortButton
                    onClick={() => onSortPlayerStats(row.key)}
                    selectedItem={selectedItem}
                    buttonKey={row.key}
                  >
                    {sortIncreasing ? "▲" : "▼"}
                  </SortButton>
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {sortPlayerStats.map((player) => {
            return (
              <tr key={player.id}>
                <td>{sortPlayerStats.indexOf(player) + 1}</td>
                <td>{player.playerName}</td>
                <td>{player.team}</td>
                <td>{player.win}</td>
                <td>{player.lose}</td>
                <td>{player.earnedRunAverage}</td>
                <td>{player.gamePitched}</td>
                <td>{player.inningPitched}</td>
                <td>{player.hitAllowed}</td>
                <td>{player.runAllowed}</td>
                <td>{player.earnedRun}</td>
                <td>{player.homerunAllowed}</td>
                <td>{player.hitBatsmen}</td>
                <td>{player.basedOnBallAllowed}</td>
                <td>{player.strikeOutPitched}</td>
                <td>{player.walkAndHitPerInningPitched}</td>
                <td>{player.hittingAverageAllowed}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default PitchingStats;
