import Table from "react-bootstrap/Table";
import newsList from "./NewsList.json";

const News = () => {
  const sortedNewsList = newsList.sort(function (a, b) {
    return Date.parse(b.date) - Date.parse(a.date);
  });

  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>日期</th>
          <th>標題</th>
        </tr>
      </thead>
      <tbody>
        {sortedNewsList.map((news) => (
          <tr key={news.id}>
            <td>{news.date}</td>
            <td>{news.title}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default News;
