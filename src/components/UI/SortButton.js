import classes from "./SortButton.module.css";

const SortButton = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={`${classes.sortButton} ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default SortButton;
