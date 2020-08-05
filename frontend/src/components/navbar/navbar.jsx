import React from "react";
import { Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
export default function Navbar({ user, logout }) {
  return (
    <Menu stackable>
      <Menu.Item header>TheBestWorkoutEver</Menu.Item>
      <Menu.Item as={NavLink} to="/" name="home" exact/>
      {user && (
        <>
          <Menu.Item as={NavLink} to="/exercises" name="exercises" />
          <Menu.Item as={NavLink} to="/workouts" name="workouts" />
        </>
      )}
      <Menu.Menu position="right">
        {user ? (
          <Menu.Item name="logOut" onClick={logout} />
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
