import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={`${classes.footer}  bg-dark text-light fixed-bottom`}>
      <p>CPBL Stats</p>
    </footer>
  );
};

export default Footer;
