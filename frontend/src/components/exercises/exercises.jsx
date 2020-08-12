import React, { useState } from "react";
import ExerciseFilter from "./exercise-filter";
import { useEffect } from "react";
import ExerciseList from "./exercise-list";
import { Segment } from "semantic-ui-react";
import { useService } from "../../services/use-service";

export default function Exercises() {
  const [filter, setFilter] = useState({});
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const { exerciseService, messageService } = useService();

  const defaultFilter = {
    searchName: "",
    category: 0,
    equipment: 0,
    muscle: 0,
  };
  useEffect(() => {
    setLoading(true);

    exerciseService
      .getByFilter(filter)
      .then((exercises) => {
        setLoading(false);
        setExercises(exercises);
      })
      .catch((error) => {
        setLoading(false);
        messageService.error(error?.response?.data?.message);
      });
  }, [filter, exerciseService, messageService]);
  return (
    <Segment loading={loading}>
      <h1>Exercises Component</h1>

      <ExerciseFilter setFilter={setFilter} defaultValues={defaultFilter} />
      <ExerciseList exercises={exercises} />
    </Segment>
  );
}
