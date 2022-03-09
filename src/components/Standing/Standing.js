import classes from "./Standing.module.css";
import StatsDetail from "../Statistics/StatsDetail.json";
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { calPTC } from "../Statistics/CalStatsFunc";

const Standing = () => {
  const headers = [
    { key: "order", label: "", width: 100 },
    { key: "Team", label: "隊名", width: 100 },
    { key: "Win", label: "W", width: 100 },
    { key: "Lose", label: "L", width: 100 },
    { key: "Tie", label: "T", width: 100 },
    { key: "winningPercentage", label: "PTC", width: 100 },
  ];

  const [selectedYear, setSelectedYear] = useState("2021");
  const [standingData, setStandingData] = useState([]);

  const selectedYearHandler = (event) => {
    setSelectedYear(event.target.value);
  };

  const csvJSON = (csv) => {
    const rowSeparator = "\n";
    const columnSeparator = ",";
    let lines = csv.split(rowSeparator);
    let result = [];
    let headers = lines[0].split(columnSeparator);
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
  };

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/ShanyuJung/cpbl-opendata/master/CPBL/standings.csv",
      {
        method: "GET",
      }
    )
      .then((res) => res.text())
      .then((data) => {
        const teamStanding = JSON.parse(csvJSON(data));
        setStandingData(
          teamStanding.map((team) => {
            return {
              ...teamStanding[teamStanding.indexOf(team)],
              winningPercentage: calPTC(team),
            };
          })
        );
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      <div className={classes["flex-container"]}>
        <div className={classes.selectLabel}>年度</div>
        <select
          id="yearSelector"
          defaultValue="2021"
          className={classes.yearSelector}
          onChange={selectedYearHandler}
        >
          {StatsDetail.map((year) => {
            return <option key={year.year}>{year.year}</option>;
          })}
        </select>
      </div>
      <Table striped bordered hover className={classes.standingTable}>
        <colgroup>
          {headers.map((row) => (
            <col width={`${row.width}px`} key={row.key} />
          ))}
        </colgroup>
        <thead>
          <tr>
            {headers.map((row) => (
              <th key={row.key} nowrap="nowrap">
                {row.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {standingData
            .filter((team) => team.Year === selectedYear)
            .sort(function (a, b) {
              return b.winningPercentage - a.winningPercentage;
            })
            .map((team) => {
              return (
                <tr key={`${team.Year}${team["Team ID"]}`}>
                  <td>
                    {standingData
                      .filter((team) => team.Year === selectedYear)
                      .sort(function (a, b) {
                        return b.winningPercentage - a.winningPercentage;
                      })
                      .indexOf(team) + 1}
                  </td>
                  <td>{team.Team}</td>
                  <td>{team.Win}</td>
                  <td>{team.Lose}</td>
                  <td>{team.Tie}</td>
                  <td>
                    {team.winningPercentage !== 1
                      ? team.winningPercentage.toString().substring(1)
                      : team.winningPercentage.toString()}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};

export default Standing;
