import { Fragment } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../Home";
import Score from "../Score";
import Statistics from "../Statistics";
import NTU from "../Teams/NTU";
import NCHU from "../Teams/NCHU";
import NCTU from "../Teams/NCTU";
import NCCU from "../Teams/NCCU";
import Teams from "../Teams/Teams";

const NavbarComp = () => {
  return (
    <Router>
      <Fragment>
        <Navbar sticky="top" bg="dark" expand="sm" variant="dark">
          <Container>
            <Navbar.Brand as={Link} to={"/Home"}>
              CABL 大專校友棒球聯盟
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to={"/Score"}>
                  SCORE
                </Nav.Link>
                <Nav.Link as={Link} to={"/Statistics"}>
                  STATISTICS
                </Nav.Link>
                <NavDropdown title="TEAMS" id="basic-nav-dropdown">
                  <Teams />
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Switch>
          <Route path="/Score">
            <Score />
          </Route>
          <Route path="/Statistics">
            <Statistics />
          </Route>
          <Route path="/NTU">
            <NTU />
          </Route>
          <Route path="/NCHU">
            <NCHU />
          </Route>
          <Route path="/NCTU">
            <NCTU />
          </Route>
          <Route path="/NCCU">
            <NCCU />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Fragment>
    </Router>
  );
};

export default NavbarComp;
