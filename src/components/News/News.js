import Table from "react-bootstrap/Table";
import newsList from "./NewsList.json";
import classes from "./News.module.css";
import Modal from "../UI/Modal";
import { useState } from "react";

const News = (props) => {
  const sortedNewsList = newsList.sort(function (a, b) {
    return Date.parse(b.date) - Date.parse(a.date);
  });

  const [selectedNews, setSelectNews] = useState("");
  const [showModal, setShowModal] = useState(false);

  const showNewsContentHandler = (news) => {
    setSelectNews(news.newsContent);
    setShowModal(true);
  };

  const onClose = () => {
    setShowModal(false);
    setSelectNews("");
  };

  return (
    <>
      {showModal && <Modal onClose={onClose}>{selectedNews}</Modal>}
      <Table striped bordered hover className={classes.newsTable}>
        <caption className={classes.newsCaption}>News</caption>
        <thead>
          <tr>
            <th>日期</th>
            <th>標題</th>
          </tr>
        </thead>
        <tbody>
          {sortedNewsList.map((news) => (
            <tr key={news.id} onClick={() => showNewsContentHandler(news)}>
              <td>{news.date}</td>
              <td>{news.title}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default News;
