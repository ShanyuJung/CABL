import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Home from "../Home";
import Score from "../Score/Score";
import Statistics from "../Statistics/Statistics";
import teamList from "../Teams/TeamList.json";
import TeamHomePage from "../Teams/TeamHomePage";
import Standing from "../Standing/Standing";

const NavbarComp = () => {
  return (
    <BrowserRouter>
      <Navbar sticky="top" bg="dark" expand="sm" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to={"/CPBLData"}>
            CPBL 中華職棒大聯盟數據查詢
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={"/Score"}>
                比賽成績
              </Nav.Link>
              <Nav.Link as={Link} to={"/Standing"}>
                年度戰績
              </Nav.Link>
              <Nav.Link as={Link} to={"/Statistics"}>
                成績統計
              </Nav.Link>
              <NavDropdown title="隊伍" id="basic-nav-dropdown">
                {teamList.map((team) => (
                  <NavDropdown.Item
                    as={Link}
                    to={`/${team["Team ID"]}`}
                    key={team["Team ID"]}
                  >
                    {team.Team}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Switch>
        <Route path="/CPBLData">
          <Home />
        </Route>
        <Route path="/Score">
          <Score />
        </Route>
        <Route path="/Standing">
          <Standing />
        </Route>
        <Route path="/Statistics">
          <Statistics />
        </Route>
        {teamList.map((team) => {
          return (
            <Route path={`/${team["Team ID"]}`} key={team["Team ID"]}>
              <TeamHomePage team={team} />
            </Route>
          );
        })}
      </Switch>
    </BrowserRouter>
  );
};

export default NavbarComp;
