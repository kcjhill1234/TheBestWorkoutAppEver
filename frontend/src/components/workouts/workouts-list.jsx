import React from "react";
import { List, Message } from "semantic-ui-react";
import {useHistory} from "react-router-dom";

export default function WorkoutList({ workouts }) {
  const history = useHistory()
  const onItemClick = (_, {id}) => {
    history.push("/workouts/" + id)
  };
  const listItems = workouts.map(({ name, _id }) => {
    return (
      <List.Item onClick={onItemClick} key={_id} id={_id}>
        <List.Content>
          <List.Header>{name}</List.Header>
        </List.Content>
      </List.Item>
    );
  });
  return <List selection size="huge">{listItems.length > 0 ? listItems : <Message info>No Workouts Saved</Message>}</List>;
}
