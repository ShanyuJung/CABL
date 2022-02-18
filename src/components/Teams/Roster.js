import { Table } from "react-bootstrap";
import playerList from "../Statistics/playerStats.json";

const Roster = (props) => {
  const headers = [
    { key: "playerNumber", label: "背號" },
    { key: "playerName", label: "姓名" },
    { key: "departmentLevel", label: "系級" },
    { key: "position", label: "職稱" },
    { key: "battingThrowing", label: "投/打" },
    { key: "hittingAverage", label: ".AVG" },
    { key: "earnedRunAverage", label: ".ERA" },
    { key: "notes", label: "備註" },
  ];

  const calAVG = (player) => {
    return (player.hit / player.atBat).toFixed(3);
  };
  const calERA = (player) => {
    return ((player.earnedRun * 7) / (player.IPx3 / 3)).toFixed(2);
  };

  const rosterList = playerList
    .filter((player) => player.team === props.team)
    .map((player) => {
      return {
        ...playerList[playerList.indexOf(player)],
        hittingAverage: calAVG(player),
        earnedRunAverage: calERA(player),
      };
    });

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {headers.map((row) => (
            <th key={row.key}>{row.label}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rosterList.map((player) => {
          return (
            <tr key={player.id}>
              <td>{player.playerNumber}</td>
              <td>{player.playerName}</td>
              <td>{player.departmentLevel}</td>
              <td>{player.position}</td>
              <td>{player.battingThrowing}</td>
              <td>
                {player.plateAppearance > 0 ? player.hittingAverage : "-"}
              </td>
              <td>{player.IPx3 > 0 ? player.earnedRunAverage : "-"}</td>
              <td>{player.notes}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default Roster;
