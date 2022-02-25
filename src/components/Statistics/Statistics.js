import HittingStats from "./HittingStats";
import { useState } from "react";
import PitchingStats from "./PitchingStats";
import classes from "./Stats.module.css";

const Statistics = () => {
  const [statsType, setStatsType] = useState(true);

  const HittingStatsHandler = (event) => {
    event.preventDefault();
    setStatsType(true);
  };

  const PitchingStatsHandler = (event) => {
    event.preventDefault();
    setStatsType(false);
  };

  return (
    <>
      <button
        onClick={HittingStatsHandler}
        className={statsType ? classes.selectedType : classes.typeButton}
      >
        打擊成績
      </button>
      <button
        onClick={PitchingStatsHandler}
        className={statsType ? classes.typeButton : classes.selectedType}
      >
        投球成績
      </button>
      {statsType && <HittingStats />}
      {!statsType && <PitchingStats />}
    </>
  );
};

export default Statistics;
