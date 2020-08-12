import React from "react";
import {
  Segment,
  Form,
  Message,
} from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useService } from "../../services/use-service";

export default function AddWorkout() {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory()
  const {workoutService, messageService} = useService()

  const OnSubmit = data => {
    workoutService.create(data.workoutName).then(({_id}) => {
      messageService.success("workout created")
      history.push("/workouts/" + _id)

    }).catch((error) => {
      messageService.error("workout can not be added at this time")
      console.log(error)
    })

  }
  return (
    <Segment className='auth-form'>
      <h1>Create new Workout</h1>
      <Form onSubmit={handleSubmit(OnSubmit)}>
        <Form.Field>
          <label>Workout Name</label>
          <input
            name="workoutName"
            placeholder="Workout Name"
            ref={register({ required: true })}
          />
          {errors.workoutName && (
            <Message negative>{errors.workoutName.message}</Message>
          )}
        </Form.Field>
        <Form.Button floated="right">Add</Form.Button>
      </Form>
    </Segment>
  );
}
