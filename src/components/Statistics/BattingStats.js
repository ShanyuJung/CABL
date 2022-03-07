import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import SortButton from "../UI/SortButton";
import classes from "./Stats.module.css";

const BattingStats = (props) => {
  const headers = [
    { key: "order", label: "", width: 30 },
    { key: "Name", label: "姓名", width: 80 },
    { key: "Team Name", label: "隊伍", width: 60 },
    { key: "G", label: "G", width: 50 },
    { key: "AB", label: "AB", width: 50 },
    { key: "H", label: "H", width: 50 },
    { key: "2B", label: "2B", width: 50 },
    { key: "3B", label: "3B", width: 50 },
    { key: "hHR", label: "HR", width: 50 },
    { key: "R", label: "R", width: 50 },
    { key: "RBI", label: "RBI", width: 50 },
    { key: "SB", label: "SB", width: 50 },
    { key: "CS", label: "CS", width: 50 },
    { key: "BB", label: "BB", width: 50 },
    { key: "SO", label: "SO", width: 50 },
    { key: "hittingAverage", label: ".AVG", width: 50 },
    { key: "onBasePercentage", label: ".OBP", width: 50 },
    { key: "sluggingPercentage", label: ".SLG", width: 50 },
    { key: "onBasePlusSlugging", label: ".OPS", width: 50 },
  ];

  const playerHittingStats = props.playerStats;
  const [sortPlayerStats, setSortPlayerStats] = useState(playerHittingStats);
  const [sortIncreasing, setSortIncreasing] = useState(true);
  const [selectedItem, setSelectedItem] = useState("hittingAverage");

  useEffect(() => {
    setSortPlayerStats(playerHittingStats);
  }, [playerHittingStats]);

  const onSortPlayerStats = (key) => {
    if (selectedItem === key) {
      setSelectedItem(key);
      if (!sortIncreasing) {
        setSortPlayerStats(
          [...playerHittingStats].sort(function (a, b) {
            return b[key] - a[key];
          })
        );
        setSortIncreasing(true);
      } else {
        setSortPlayerStats(
          [...playerHittingStats].sort(function (a, b) {
            return a[key] - b[key];
          })
        );
        setSortIncreasing(false);
      }
    } else {
      setSelectedItem(key);
      setSortPlayerStats(
        [...playerHittingStats].sort(function (a, b) {
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
              <tr key={`${player.ID}${sortPlayerStats.indexOf(player) + 1}`}>
                <td>{sortPlayerStats.indexOf(player) + 1}</td>
                <td>{player.Name}</td>
                <td>{player["Team Name"]}</td>
                <td>{player.G}</td>
                <td>{player.AB}</td>
                <td>{player.H}</td>
                <td>{player["2B"]}</td>
                <td>{player["3B"]}</td>
                <td>{player.HR}</td>
                <td>{player.R}</td>
                <td>{player.RBI}</td>
                <td>{player.SB}</td>
                <td>{player.CS}</td>
                <td>{player.BB}</td>
                <td>{player.SO}</td>
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

export default BattingStats;
