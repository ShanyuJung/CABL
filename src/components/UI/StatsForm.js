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
          打擊成績
        </button>
        <button
          onClick={props.onPitching}
          className={
            props.statsType ? classes.typeButton : classes.selectedType
          }
        >
          投球成績
        </button>
      </div>
      {props.children}
    </form>
  );
};

export default StatsForm;
