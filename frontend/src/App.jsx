import "react-toastify/dist/ReactToastify.css"
import React, { useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { ToastContainer} from "react-toastify"
import Navbar from "./components/navbar/navbar";
import Home from "./components/home/home"
import SignUp from "./components/sign-up/sign-up"
import SignIn from "./components/sign-in/sign-in"
import NotFound from "./components/not-found/not-found"
import Workouts from "./components/workouts/workouts"
import Exercises from "./components/exercises/exercies"
import authService from "./services/auth.service";
import AuthGuard from "./services/auth.guard"
function App() {
  const [user, setUser] = useState(authService.getCurrentUser())
const history = useHistory()
  const logout = () => {
    setUser(null)
    authService.logout(history)
  }

  return (
    <>
      <Navbar user={user} logout={logout} />
      <Switch>
        <Route exact path="/signUp"><SignUp/></Route>
        <Route exact path="/signIn"><SignIn setUser={setUser}/></Route>
        <Route exact path="/workouts" render={AuthGuard(Workouts)}/>
        <Route exact path="/exercises"render={AuthGuard(Exercises)}/>
        <Route exact path="/"><Home/></Route>
        <Route path="*" render={NotFound}/>
      </Switch>
      <ToastContainer newestOnTop={true}/>
    </>
  );
}

export default App;
