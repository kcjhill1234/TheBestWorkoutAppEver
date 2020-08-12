import React, { useState, useEffect } from "react";
import {
  Segment,
  Header,
  Button,
  Icon,
  Search,
  Divider,
  Form,
  Confirm,
  Image,
  Label,
} from "semantic-ui-react";
import { useParams, useHistory, Link } from "react-router-dom";
import workoutService from "../../services/workouts.service";
import messageService from "../../services/message.service";
import exerciseService from "../../services/exercise.service";
import { useForm, useFieldArray } from "react-hook-form";
import WorkoutSets from "./workout-sets";

const inlineStyle = {
  modal : {
    marginTop: '0 !important',
    maxHeight: '150px',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
};

export default function WorkoutDetail() {
  const [workout, setWorkout] = useState([]);
  const [loading, setLoading] = useState({ component: false, search: false });
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const history = useHistory();
  const { control, register, handleSubmit, reset, errors } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "exercises",
    keyName: "key",
  });

  const OnSubmit = ({ exercises }) => {
    setLoading((prev) => ({ ...prev, component: true }));
    workoutService
      .update({ id, exercises })
      .then(() => {
        setLoading((prev) => ({ ...prev, component: false }));
        messageService.success("Workout updated!");
      })
      .catch((error) => {
        setLoading((prev) => ({ ...prev, component: false }));
        messageService.error("Something went wrong");
      });
  };

  useEffect(() => {
    setLoading((prev) => ({ ...prev, component: true }));
    workoutService
      .getById(id)
      .then((workout) => {
        setLoading((prev) => ({ ...prev, component: false }));
        setWorkout(workout);
        reset(workout);
      })
      .catch((error) => {
        messageService.error("sorry that workout does not exist");
        history.push("/");
      });
  }, [history, id, reset]);
  // alert(JSON.stringify(workout, null, 2));

  const handleSearchChange = (e, { value }) => {
    setLoading((prev) => ({ ...prev, search: true }));
    setQuery(value);
    exerciseService.getByFilter({ searchName: value }).then((exercises) => {
      setLoading((prev) => ({ ...prev, search: false }));
      const mappedExercises = exercises.map(({ name, id, comment, image }) => {
        return {
          title: name,
          id,
          image,
          comment,
        };
      });
      setSearchResults(mappedExercises);
    });
  };

  const resultRenderer = ({ title }) => <Label content={title} />;

  const handleResultSelect = (e, { result }) => {
    setQuery("");
    append({
      name: result.title,
      id: result.id,
      image: result.image,
      comment: result.comment,
    });
  };

  const triggerConfirm = () => {
    setOpen(true);
  };

  const onConfirm = () => {
    workoutService.remove(id).then(() => {
      messageService.success("Workout removed");
      history.push("/workouts");
    });
  };

  const closeConfirm = () => {
    setOpen(false);
  };

  return (
    <Segment padded className="workout-detail" loading={loading.component}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Header size="huge">{workout.name}</Header>
        <div>
          <Button size="small" circular icon onClick={triggerConfirm}>
            <Icon name="trash" />
          </Button>
        </div>
      </div>
      <Search
        placeholder="Add Exercise"
        loading={loading.search}
        value={query}
        results={searchResults}
        resultRenderer={resultRenderer}
        onSearchChange={handleSearchChange}
        onResultSelect={handleResultSelect}
      />
      <br />
      <Divider />
      <Form onSubmit={handleSubmit(OnSubmit)}>
        {fields.map((field, index) => (
          <Form.Field key={field.key}>
            <Form.Button
              icon
              circular
              floated="right"
              type="button"
              onClick={() => remove(index)}
            >
              <Icon name="minus" /> Remove Exercise
            </Form.Button>
            <input
              hidden
              name={`exercises[${index}].name`}
              ref={register()}
              defaultValue={field.name}
            />
            <input
              hidden
              name={`exercises[${index}].id`}
              ref={register()}
              defaultValue={field.id}
            />
            <input
              hidden
              name={`exercises[${index}].comment`}
              ref={register()}
              defaultValue={field.comment}
            />
            <input
              hidden
              name={`exercises[${index}].image`}
              ref={register()}
              defaultValue={field.image}
            />
            <Header as={Link} to={`/exercises/${field.id}`} size="large">
              {field.image && <Image avatar src={field.image} />}
              {field.name}
            </Header>
            <WorkoutSets nestIndex={index} {...{ control, register, errors }} />
          </Form.Field>
        ))}
        <Divider />
        <Form.Button floated="right">Update</Form.Button>
      </Form>
      <Confirm
        content="Are you sure you want to delete this workout?"
        open={open}
        confirmButton="Delete"
        onCancel={closeConfirm}
        onConfirm={onConfirm}
        style={inlineStyle.modal}
        className='scrolling'
      />
    </Segment>
  );
}
