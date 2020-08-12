import React from "react";
import { Segment } from "semantic-ui-react";
import { useState } from "react";
import { useEffect } from "react";
import WorkoutList from "./workouts-list";
import { useService } from "../../services/use-service";

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const {workoutService, messageService}= useService()
  useEffect(() => {
    setLoading(true);
    workoutService
      .getAll()
      .then((workouts) => {
        setLoading(false);
        setWorkouts(workouts);
      })
      .catch((error) => {
        setLoading(false);
        messageService.error(error?.response?.data?.message ||"can not load workout");
      });
  }, [workoutService, messageService]);

  return (
    <Segment loading={loading} className="workouts">
      <h1>Workouts Component</h1>
      <WorkoutList workouts={workouts} />
    </Segment>
  );
}
