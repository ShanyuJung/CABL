import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={`${classes.footer} fixed-bottom bg-dark text-light`}>
      <p>Some footer nonsense!</p>
    </footer>
  );
};

export default Footer;
