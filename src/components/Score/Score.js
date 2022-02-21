import ScoreBox from "../UI/ScoreBox";
import scoreData from "./ScoreData.json";
import classes from "./Score.module.css";

const Score = () => {
  return (
    <div className={classes.score}>
      {scoreData.map((gameData) => (
        <ScoreBox data={gameData} key={gameData.gameNumber} />
      ))}
    </div>
  );
};

export default Score;
