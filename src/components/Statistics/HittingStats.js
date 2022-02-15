import { useState } from "react";
import Table from "react-bootstrap/Table";
import SortButton from "../UI/SortButton";
import playerHittingStats from "./playerStats.json";
import classes from "./Stats.module.css";

const HittingStats = () => {
  const headers = [
    { key: "order", label: "" },
    { key: "playerName", label: "PlayerName" },
    { key: "team", label: "Team" },
    { key: "game", label: "G" },
    { key: "atBat", label: "AB" },
    { key: "hit", label: "H" },
    { key: "double", label: "2B" },
    { key: "triple", label: "3B" },
    { key: "homerun", label: "HR" },
    { key: "basedOnBall", label: "BB" },
    { key: "hittingAverage", label: ".AVG" },
    { key: "onBasePercentage", label: ".OBP" },
    { key: "sluggingPercentage", label: ".SLG" },
    { key: "onBasePlusSlugging", label: ".OPS" },
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

  const calPlayerStats = playerHittingStats.map((player) => {
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
  const [selectItem, setSelectItem] = useState("hittingAverage");

  const onSortPlayerStats = (key) => {
    if (selectItem === key) {
      setSelectItem(key);
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
      setSelectItem(key);
      setSortPlayerStats(
        [...sortPlayerStats].sort(function (a, b) {
          return b[key] - a[key];
        })
      );
      setSortIncreasing(true);
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
                className={row.key === selectItem ? classes.selected : ""}
                onClick={() => onSortPlayerStats(row.key)}
                nowrap="nowrap"
              >
                {row.label}
                {headers.indexOf(row) > 2 && (
                  <SortButton
                    onClick={() => onSortPlayerStats(row.key)}
                    className={row.key === selectItem ? classes.selected : ""}
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
                <td>{player.basedOnBall}</td>
                <td>{player.hittingAverage}</td>
                <td>{player.onBasePercentage}</td>
                <td>{player.sluggingPercentage}</td>
                <td>{player.onBasePlusSlugging}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default HittingStats;
