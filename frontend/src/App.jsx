import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/navbar/navbar";
import Home from "./components/home/home";
import SignUp from "./components/sign-up/sign-up";
import SignIn from "./components/sign-in/sign-in";
import NotFound from "./components/not-found/not-found";
import Workouts from "./components/workouts/workouts";
import Exercises from "./components/exercises/exercises";
import authService from "./services/auth.service";
import AuthGuard from "./services/auth.guard";
import ExerciseDetail from "./components/exercises/exercise-detail";
function App() {
  const [user, setUser] = useState(authService.getCurrentUser());
  const history = useHistory();
  const logout = () => {
    setUser(null);
    authService.logout(history);
  };
  const AuthWorkouts = AuthGuard(Workouts);
  const AuthExercises = AuthGuard(Exercises);
  const AuthExerciseDetail = AuthGuard(ExerciseDetail);

  return (
    <div style={{
      backgroundImage: `url('/assets/fitness.jpg')`,
      backgroundSize: 'cover',
      overflow: 'scroll',
      height: '100vh'
    }}>
      <Navbar user={user} logout={logout} />
      <div className="app">
        <Switch>
          <Route exact path="/signUp">
            <SignUp />
          </Route>
          <Route exact path="/signIn">
            <SignIn setUser={setUser} />
          </Route>
          <Route exact path="/workouts">
            <AuthWorkouts />
          </Route>
          <Route exact path="/exercises">
            <AuthExercises />
          </Route>
          <Route exact path="/exercises/:id">
            <AuthExerciseDetail />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*" render={NotFound} />
        </Switch>
      </div>
      <ToastContainer newestOnTop={true} />
    </div>
  );
}

export default App;
