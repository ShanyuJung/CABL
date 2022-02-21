import { Col, Container, Row } from "react-bootstrap";
import classes from "./ScoreBox.module.css";

const ScoreBox = (props) => {
  return (
    <Container className={classes.scoreBox}>
      <Row xs={12} md={12} lg={12}>
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
          GUEST
        </Col>
        <Col xs lg="3" className="border-right border-bottom border-secondary">
          R
        </Col>
        <Col xs lg="3" className=" border-right border-bottom border-secondary">
          H
        </Col>
        <Col xs lg="3" className=" border-right border-bottom border-secondary">
          E
        </Col>
      </Row>

      <Row xs={4} md={4} lg={6}>
        <Col
          lg="3"
          className="border-left border-right border-bottom border-secondary"
        >
          HOME
        </Col>
        <Col lg="3" className="border-right border-bottom border-secondary">
          R
        </Col>
        <Col lg="3" className=" border-right border-bottom border-secondary">
          H
        </Col>
        <Col lg="3" className=" border-right border-bottom border-secondary">
          E
        </Col>
      </Row>
      <Row>
        <Col
          lg="12"
          className="border-left border-right border-bottom border-secondary"
        >
          W: L: <br />
          球場:
        </Col>
      </Row>
    </Container>
  );
};

export default ScoreBox;
