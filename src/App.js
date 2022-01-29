import { Fragment } from "react";
import Footer from "./components/Layout/Footer";
import NavbarComp from "./components/Layout/NavbarComp";
import "./App.css";

const App = () => {
  return (
    <Fragment>
      <NavbarComp />
      <Footer />
    </Fragment>
  );
};

export default App;
