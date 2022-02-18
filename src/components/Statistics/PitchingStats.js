import { useState } from "react";
import Table from "react-bootstrap/Table";
import SortButton from "../UI/SortButton";
import playerPitchingStats from "./playerStats.json";
import classes from "./Stats.module.css";

const PitchingStats = () => {
  const headers = [
    { key: "order", label: "" },
    { key: "playerName", label: "Player Name" },
    { key: "team", label: "Team" },
    { key: "win", label: "W" },
    { key: "lose", label: "L" },
    { key: "earnedRunAverage", label: "ERA" },
    { key: "gamePitched", label: "G" },
    { key: "inningPitched", label: "IP" },
    { key: "hit", label: "H" },
    { key: "run", label: "R" },
    { key: "earnedRun", label: "ER" },
    { key: "homerun", label: "HR" },
    { key: "hitBatsmen", label: "HB" },
    { key: "basedOnBall", label: "BB" },
    { key: "strikeOut", label: "SO" },
    { key: "walkAndHitPerInningPitched", label: "WHIP" },
    { key: "hittingAverageAllowed", label: ".AVG" },
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
    <>
      <Table striped bordered hover className={classes.statsTable}>
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
    </>
  );
};

export default PitchingStats;
