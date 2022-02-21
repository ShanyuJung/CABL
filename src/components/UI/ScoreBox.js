import { Col, Container, Row } from "react-bootstrap";
import classes from "./ScoreBox.module.css";

const ScoreBox = (props) => {
  return (
    <Container className={classes.scoreBox}>
      <Row xs={4} md={4} lg={6}>
        <Col lg="3" className="border border-secondary">
          #
        </Col>
        <Col
          lg="3"
          className="border-top border-right border-bottom border-secondary"
        >
          R
        </Col>
        <Col
          lg="3"
          className="border-top border-right border-bottom border-secondary"
        >
          H
        </Col>
        <Col
          lg="3"
          className="border-top border-right border-bottom border-secondary"
        >
          E
        </Col>
      </Row>

      <Row xs={4} md={4} lg={6}>
        <Col
          lg="3"
          className="border-left border-right border-bottom border-secondary"
        >
          {props.data.guestTeam}
        </Col>
        <Col xs lg="3" className="border-right border-bottom border-secondary">
          {props.data.guestTeamRun}
        </Col>
        <Col xs lg="3" className=" border-right border-bottom border-secondary">
          {props.data.guestTeamHit}
        </Col>
        <Col xs lg="3" className=" border-right border-bottom border-secondary">
          {props.data.guestTeamError}
        </Col>
      </Row>

      <Row xs={4} md={4} lg={6}>
        <Col
          lg="3"
          className="border-left border-right border-bottom border-secondary"
        >
          {props.data.homeTeam}
        </Col>
        <Col lg="3" className="border-right border-bottom border-secondary">
          {props.data.homeTeamRun}
        </Col>
        <Col lg="3" className=" border-right border-bottom border-secondary">
          {props.data.homeTeamHit}
        </Col>
        <Col lg="3" className=" border-right border-bottom border-secondary">
          {props.data.homeTeamError}
        </Col>
      </Row>
      <Row>
        <Col
          lg="12"
          className="border-left border-right border-bottom border-secondary"
        >
          W: {props.data.winPitcher} L: {props.data.losePitcher} <br />
          球場:{props.data.field}
        </Col>
      </Row>
    </Container>
  );
};

export default ScoreBox;
