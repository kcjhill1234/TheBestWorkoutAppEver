import React from "react";
import { Segment } from "semantic-ui-react";
import { useState } from "react";
import { useEffect } from "react";
import workoutsService from "../../services/workouts.service";
import messageService from "../../services/message.service";
import WorkoutList from "./workouts-list";

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    workoutsService
      .getAll()
      .then((workouts) => {
        setLoading(false);
        setWorkouts(workouts);
      })
      .catch((error) => {
        setLoading(false);
        messageService.error("can not load workout");
      });
  }, []);

  return (
    <Segment loading={loading} className="workouts">
      <h1>Workouts Component</h1>
      <WorkoutList workouts={workouts} />
    </Segment>
  );
}
