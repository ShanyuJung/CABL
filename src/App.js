import Footer from "./components/Layout/Footer";
import NavbarComp from "./components/Layout/NavbarComp";
import "./App.css";
import background from "./assets/backgroundPic.jpg";

const App = () => {
  return (
    <>
      <div
        className="content"
        style={{
          backgroundImage: `url(${background})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "100vh",
        }}
      >
        <NavbarComp />
      </div>
      <Footer />
    </>
  );
};

export default App;
