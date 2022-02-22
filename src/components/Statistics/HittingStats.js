import { useState } from "react";
import Table from "react-bootstrap/Table";
import SortButton from "../UI/SortButton";
import playerHittingStats from "./playerStats.json";
import classes from "./Stats.module.css";

const HittingStats = () => {
  const headers = [
    { key: "order", label: "", width: 30 },
    { key: "playerName", label: "姓名", width: 70 },
    { key: "team", label: "隊伍", width: 60 },
    { key: "game", label: "G", width: 50 },
    { key: "atBat", label: "AB", width: 50 },
    { key: "hit", label: "H", width: 50 },
    { key: "double", label: "2B", width: 50 },
    { key: "triple", label: "3B", width: 50 },
    { key: "homerun", label: "HR", width: 50 },
    { key: "run", label: "R", width: 50 },
    { key: "runBattedIn", label: "RBI", width: 50 },
    { key: "stolenBase", label: "SB", width: 50 },
    { key: "caughtStealing", label: "CS", width: 50 },
    { key: "basedOnBall", label: "BB", width: 50 },
    { key: "strikeOut", label: "SO", width: 50 },
    { key: "hittingAverage", label: ".AVG", width: 50 },
    { key: "onBasePercentage", label: ".OBP", width: 50 },
    { key: "sluggingPercentage", label: ".SLG", width: 50 },
    { key: "onBasePlusSlugging", label: ".OPS", width: 50 },
  ];

  const calAVG = (player) => {
    return (player.hit / player.atBat).toFixed(3);
  };

  const calOBP = (player) => {
    return ((player.hit + player.basedOnBall) / player.plateAppearance).toFixed(
      3
    );
  };

  const calSLG = (player) => {
    return (
      (player.homerun * 3 + player.triple * 2 + player.double + player.hit) /
      player.atBat
    ).toFixed(3);
  };

  const calOPS = (player) => {
    return (
      (player.homerun * 3 + player.triple * 2 + player.double + player.hit) /
        player.atBat +
      (player.hit + player.basedOnBall) / player.plateAppearance
    ).toFixed(3);
  };

  const calPlayerStats = playerHittingStats
    .filter((player) => player.game > 0)
    .map((player) => {
      return {
        ...playerHittingStats[playerHittingStats.indexOf(player)],
        hittingAverage: calAVG(player),
        onBasePercentage: calOBP(player),
        sluggingPercentage: calSLG(player),
        onBasePlusSlugging: calOPS(player),
      };
    });

  const [sortPlayerStats, setSortPlayerStats] = useState(
    [...calPlayerStats].sort(function (a, b) {
      return b.hittingAverage - a.hittingAverage;
    })
  );
  const [sortIncreasing, setSortIncreasing] = useState(true);
  const [selectedItem, setSelectedItem] = useState("hittingAverage");

  const onSortPlayerStats = (key) => {
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
  };

  return (
    <div className=" table-responsive">
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
                className={
                  row.key === selectedItem ? classes.selected : row.key
                }
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
                <td>{player.game}</td>
                <td>{player.atBat}</td>
                <td>{player.hit}</td>
                <td>{player.double}</td>
                <td>{player.triple}</td>
                <td>{player.homerun}</td>
                <td>{player.run}</td>
                <td>{player.runBattedIn}</td>
                <td>{player.stolenBase}</td>
                <td>{player.caughtStealing}</td>
                <td>{player.basedOnBall}</td>
                <td>{player.strikeOut}</td>
                <td>{player.hittingAverage}</td>
                <td>{player.onBasePercentage}</td>
                <td>{player.sluggingPercentage}</td>
                <td>{player.onBasePlusSlugging}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default HittingStats;
