import classes from "./StatsForm.module.css";

const StatsForm = (props) => {
  return (
    <form className={classes.statsForm}>
      <div className={classes.statsType}>
        <button
          onClick={props.onHitting}
          className={
            props.statsType ? classes.selectedType : classes.typeButton
          }
        >
          Hitting
        </button>
        <button
          onClick={props.onPitching}
          className={
            props.statsType ? classes.typeButton : classes.selectedType
          }
        >
          Pitching
        </button>
      </div>
      {props.children}
    </form>
  );
};

export default StatsForm;
