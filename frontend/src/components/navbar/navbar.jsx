import React from "react";
import { Menu, Button } from "semantic-ui-react";
import { NavLink, Link, useHistory } from "react-router-dom";
import { useAuth } from "../../services/use-auth";
import { useService } from "../../services/use-service";
export default function Navbar() {
  const { user, logout } = useAuth();
  const { messageService } = useService();
  const history = useHistory();

  const handleLogout = () => {
    logout();
    messageService.success(`${user.userName} has logged out. Come back soon!`);
    history.push("/");
  };
  return (
    <Menu stackable fixed="top">
      <Menu.Item header>TheBestWorkoutAppEver</Menu.Item>
      <Menu.Item as={NavLink} to="/" name="home" exact />
      {user && (
        <>
          <Menu.Item as={NavLink} to="/exercises" name="exercises" />
          <Menu.Item as={NavLink} to="/workouts" name="workouts" />
          <Menu.Item>
            <Button as={Link} to="/workouts/new">
              Add Workout
            </Button>
          </Menu.Item>
        </>
      )}
      <Menu.Menu position="right">
        {user ? (
          <Menu.Item name="logOut" onClick={handleLogout} />
        ) : (
          <>
            <Menu.Item as={NavLink} to="/signUp" name="signUp" />
            <Menu.Item as={NavLink} to="/signIn" name="signIn" />
          </>
        )}
      </Menu.Menu>
    </Menu>
  );
}
