import News from "./News/News";

const Home = () => {
  const showNewsContentHandler = () => {
    console.log("");
  };

  return (
    <div>
      <News onClick={showNewsContentHandler} />
    </div>
  );
};

export default Home;
