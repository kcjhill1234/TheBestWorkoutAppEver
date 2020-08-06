import React, { useState } from "react";
import ExerciseFilter from "./exercise-filter";
import { useEffect } from "react";
import exerciseService from "../../services/exercise.service";
import ExerciseList from "./exercise-list";
import { Segment } from "semantic-ui-react";

export default function Exercises() {
  const [filter, setFilter] = useState({});
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);

  const defaultFilter = {
    searchName: "",
    category: 0,
    equipment: 0,
    muscle: 0,
  };
  useEffect(() => {
    const getExercises = async (filter) => {
      setLoading(true);
      setExercises(await exerciseService.getByFilter(filter));
      setLoading(false);
    };
    getExercises(filter);
  }, [filter]);
  console.log(exercises);
  return (
    <Segment loading={loading}>
      <h1>Exercises Component</h1>

      <ExerciseFilter setFilter={setFilter} defaultValues={defaultFilter} />
      <ExerciseList  exercises={exercises} />
    </Segment>
  );
}
