import React, { useState, useEffect } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import exerciseService from "../../services/exercise.service";
import messageService from "../../services/message.service";
import {
  Loader,
  Header,
  Breadcrumb,
  Grid,
  Container,
  Image,
} from "semantic-ui-react";

export default function ExerciseDetail() {
  const [exercise, setExercise] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    exerciseService
      .getById(id)
      .then((dbExercise) => {
        setLoading(false);
        setExercise(dbExercise);
      })
      .catch((error) => {
        messageService.error("sorry exercise does not exist");
        history.push("/exercise");
      });
  }, [history, id]);
  console.log(exercise)
  return loading ? (
    <Loader active />
  ) : (
    <Container>
      <Header>{exercise.name}</Header>
      <div className="ExerciseDetail-breadCrumb">
        <Breadcrumb>
          <Breadcrumb.Section as={NavLink} to="/exercises">
            Exercises
          </Breadcrumb.Section>
          <Breadcrumb.Divider />
          <Breadcrumb.Section active>{exercise.name}</Breadcrumb.Section>
        </Breadcrumb>
      </div>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Header size="small">Category</Header>
          </Grid.Column>
          <Grid.Column>{exercise.category}</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header size="small">Equipment</Header>
          </Grid.Column>
          <Grid.Column>
            {exercise.equipment?.map(({ name }) => name).join(", ")}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header size="small">Description</Header>
          </Grid.Column>
          <Grid.Column>
            {exercise.description?.replace(/(<([^>]+)>)/gi, "")}
            <div className="ExerciseDetail-images">
              {exercise.images?.map((src, i) => (
                <Image key={i} size="small" src={src} />
              ))}
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header size="small">Muscles</Header>
          </Grid.Column>
          <Grid.Column>
            <div>
              <label>Primary:</label>
              <ul>
                {exercise.muscles?.map(({ name, id }) => {
                  return <li key={id}>{name}</li>;
                })}
              </ul>
            </div>
            <div>
              <label>Secondary:</label>
              <ul>
                {exercise.musclesSecondary?.map(({ name, id }) => {
                  return <li key={id}>{name}</li>;
                })}
              </ul>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}
