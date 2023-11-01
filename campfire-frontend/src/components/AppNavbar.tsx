import { NavLink, Navbar } from "@mantine/core";
import { Link } from "react-router-dom";

export default function AppNavbar() {
  return (
    <Navbar width={{ base: 300 }} p="xs">
      <Navbar.Section>{<p>Logo CAMPFIRE</p>}</Navbar.Section>
      <Navbar.Section grow mt="md">
        <Link to="/">
          <NavLink label="Home" />
        </Link>
        <Link to="/robots">
          <NavLink label="Roboter" className="font-medium" />
        </Link>
        <Link to="/images">
          <NavLink label="Images" className="font-medium" />
        </Link>
      </Navbar.Section>
    </Navbar>
  );
}
