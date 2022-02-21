import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Home from "../Home";
import Score from "../Score/Score";
import Statistics from "../Statistics/Statistics";
import teamList from "../Teams/TeamList.json";
import TeamHomePage from "../Teams/TeamHomePage";

const NavbarComp = () => {
  return (
    <BrowserRouter>
      <Navbar sticky="top" bg="dark" expand="sm" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to={"/CABL"}>
            CABL 大專校友棒球聯盟
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={"/CABL/Score"}>
                比賽成績
              </Nav.Link>
              <Nav.Link as={Link} to={"/Statistics"}>
                成績統計
              </Nav.Link>
              <NavDropdown title="隊伍" id="basic-nav-dropdown">
                {teamList.map((team) => (
                  <NavDropdown.Item as={Link} to={`/${team.id}`} key={team.id}>
                    {team.name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Switch>
        <Route path="/CABL">
          <Home />
        </Route>
        <Route path="/CABL/Score">
          <Score />
        </Route>
        <Route path="/Statistics">
          <Statistics />
        </Route>
        {teamList.map((team) => {
          return (
            <Route path={`/${team.id}`} key={team.id}>
              <TeamHomePage team={team.id} />
            </Route>
          );
        })}
      </Switch>
    </BrowserRouter>
  );
};

export default NavbarComp;
