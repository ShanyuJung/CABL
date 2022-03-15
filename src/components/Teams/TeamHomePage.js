import classes from "./TeamHomePage.module.css";
import { Container, Row, Col } from "react-bootstrap";

const TeamHomePage = (props) => {
  console.log(props.team);
  return (
    <Container className={classes.card}>
      <Row className={classes.cardHeader}>
        <Col md={4}>
          <img
            src={require(`../../assets/${props.team.logo}`)}
            alt={props.team.Team}
            className={classes.logo}
          />
        </Col>
        <Col md={8} className={classes.teamName}>
          <h2>{props.team.Team}</h2>
          <p>{props.team.teamHistory}</p>
        </Col>
      </Row>
      <Row className="text-center">
        <Col md={2}>
          <p>領隊</p>
          <h6>{props.team.generalManager}</h6>
        </Col>
        <Col md={2}>
          <p>總教練</p>
          <h6>{props.team.manager}</h6>
        </Col>
        <Col md={3}>
          <p>主球場</p>
          <h6>{props.team.mainField}</h6>
        </Col>
        <Col md={5}>
          <p>官方網站</p>
          <h6>{props.team.teamWebsite}</h6>
        </Col>
      </Row>
    </Container>
  );
};

export default TeamHomePage;
