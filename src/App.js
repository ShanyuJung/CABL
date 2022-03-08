import Footer from "./components/Layout/Footer";
import NavbarComp from "./components/Layout/NavbarComp";
import "./App.css";
import background from "./assets/backgroundPic.jpg";

const App = () => {
  return (
    <>
      <div className="wrapper">
        <NavbarComp />
      </div>
      <Footer />
    </>
  );
};

export default App;
