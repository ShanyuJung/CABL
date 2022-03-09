import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import SortButton from "../UI/SortButton";
import classes from "./Stats.module.css";

const PitchingStats = (props) => {
  const headers = [
    { key: "order", label: "", width: 40 },
    { key: "Name", label: "姓名", width: 80 },
    { key: "Team Name", label: "Team", width: 60 },
    { key: "W", label: "W", width: 50 },
    { key: "L", label: "L", width: 50 },
    { key: "earnedRunAverage", label: "ERA", width: 60 },
    { key: "G", label: "G", width: 50 },
    { key: "GS", label: "GS", width: 50 },
    { key: "CG", label: "CG", width: 50 },
    { key: "SHO", label: "SHO", width: 60 },
    { key: "SV", label: "SV", width: 50 },
    { key: "HLD", label: "HLD", width: 60 },
    { key: "IP", label: "IP", width: 50 },
    { key: "H", label: "H", width: 50 },
    { key: "R", label: "R", width: 50 },
    { key: "ER", label: "ER", width: 50 },
    { key: "HR", label: "HR", width: 50 },
    { key: "HBP", label: "HBP", width: 60 },
    { key: "BB", label: "BB", width: 50 },
    { key: "SO", label: "SO", width: 50 },
    { key: "walkAndHitPerInningPitched", label: "WHIP", width: 70 },
    { key: "hittingAverageAllowed", label: ".AVG", width: 60 },
  ];

  const playerPitchingStats = props.playerStats;
  const [sortPlayerStats, setSortPlayerStats] = useState(playerPitchingStats);
  const [sortIncreasing, setSortIncreasing] = useState(true);
  const [selectedItem, setSelectedItem] = useState("earnedRunAverage");

  useEffect(() => {
    if (props.statsMode === "partial") {
      setSortPlayerStats(
        playerPitchingStats.filter(
          (player) =>
            parseInt(player.IP) > parseInt(props.selectedYear[0].games) * 1.1
        )
      );
    } else {
      setSortPlayerStats(playerPitchingStats);
    }
  }, [playerPitchingStats, props.statsMode]);

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
              <tr key={`${player.ID}${sortPlayerStats.indexOf(player) + 1}`}>
                <td>{sortPlayerStats.indexOf(player) + 1}</td>
                <td>{player.Name}</td>
                <td>{player["Team Name"]}</td>
                <td>{player.W}</td>
                <td>{player.L}</td>
                <td>{player.earnedRunAverage}</td>
                <td>{player.G}</td>
                <td>{player.GS}</td>
                <td>{player.CG}</td>
                <td>{player.SHO}</td>
                <td>{player.SV}</td>
                <td>{player.HLD}</td>
                <td>{player.IP}</td>
                <td>{player.H}</td>
                <td>{player.R}</td>
                <td>{player.ER}</td>
                <td>{player.HR}</td>
                <td>{player.HBP}</td>
                <td>{player.BB}</td>
                <td>{player.SO}</td>
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
