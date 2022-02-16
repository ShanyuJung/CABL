import HittingStats from "./HittingStats";
import StatsForm from "../UI/StatsForm";
import { useState } from "react";
import PitchingStats from "./PitchingStats";

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
    <StatsForm
      onHitting={HittingStatsHandler}
      onPitching={PitchingStatsHandler}
      selectedHitting={statsType ? "selectedType" : ""}
      selectedPitching={statsType ? "" : "selectedType"}
      statsType={statsType}
    >
      {statsType && <HittingStats />}
      {!statsType && <PitchingStats />}
    </StatsForm>
  );
};

export default Statistics;
