import { NavDropdown } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const teamList = [
  { id: "NTU" },
  { id: "NCHU" },
  { id: "NCTU" },
  { id: "NCCU" },
];
const Teams = () => {
  return (
    <>
      {teamList.map((team) => (
        <NavDropdown.Item as={Link} to={`/${team.id}`} key={team.id}>
          {team.id}
        </NavDropdown.Item>
      ))}
    </>
  );
};

export default Teams;
