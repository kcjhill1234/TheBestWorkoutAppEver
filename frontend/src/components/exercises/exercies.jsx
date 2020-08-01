import React from "react";
import api from "../../services/exercise.service";
//import { response } from "express";


class Exercises extends React.Component {
  constructor(props) {
      super(props);
      this.state = { exercises:[]};
  }
  componentDidMount(){
    api().then((response)=>{
      this.setState({exercises: response.data})
    })

  }
  render () {
    return <div>{this.state.exercises.map((exercise) => {
    return <h3>{exercise.description}</h3>
    })}</div>;

  }
}
export default Exercises;
