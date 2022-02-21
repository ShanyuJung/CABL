import { NavDropdown } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const teamList = [
  { id: "NTU", name: "台大" },
  { id: "NCHU", name: "中興" },
  { id: "NCTU", name: "交大" },
  { id: "NCCU", name: "政大" },
];
const Teams = () => {
  return (
    <>
      {teamList.map((team) => (
        <NavDropdown.Item as={Link} to={`/${team.id}`} key={team.id}>
          {team.name}
        </NavDropdown.Item>
      ))}
    </>
  );
};

export default Teams;
