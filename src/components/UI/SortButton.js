import classes from "./SortButton.module.css";

const SortButton = (props) => {
  console.log(props.selectedItem);
  return (
    <button
      onClick={props.onClick}
      type="button"
      key={props.buttonKey}
      className={
        props.selectedItem === props.buttonKey
          ? classes.selected
          : classes.sortButton
      }
    >
      {props.children}
    </button>
  );
};

export default SortButton;
