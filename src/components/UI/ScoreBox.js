import classes from "./ScoreBox.module.css";

const ScoreBox = (props) => {
  return (
    <table className={classes.scoreBox}>
      <colgroup>
        <col width="100" />
        <col width="50" />
        <col width="50" />
        <col width="50" />
      </colgroup>
      <thead>
        <tr>
          <th className="border border-secondary text-center "></th>
          <th className="border border-secondary text-center">R</th>
          <th className="border border-secondary text-center">H</th>
          <th className="border border-secondary text-center">E</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-secondary text-center">
            <b>{props.data.guestTeam}</b>
          </td>
          <td className="border border-secondary text-center">
            {props.data.guestTeamRun}
          </td>
          <td className="border border-secondary text-center">
            {props.data.guestTeamHit}
          </td>
          <td className="border border-secondary text-center">
            {props.data.guestTeamError}
          </td>
        </tr>
        <tr>
          <td className="border border-secondary text-center">
            <b>{props.data.homeTeam}</b>
          </td>
          <td className="border border-secondary text-center">
            {props.data.homeTeamRun}
          </td>
          <td className="border border-secondary text-center">
            {props.data.homeTeamHit}
          </td>
          <td className="border border-secondary text-center">
            {props.data.homeTeamError}
          </td>
        </tr>
        <tr>
          <td className="border border-secondary px-2" colSpan={4}>
            <b>W:</b> {props.data.winPitcher}
            <br />
            <b>L:</b> {props.data.losePitcher} <br />
            <b>球場:</b>
            {props.data.field}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ScoreBox;
