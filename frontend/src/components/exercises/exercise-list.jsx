import React from "react";
import { List, Loader, Image } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

export default function ExerciseList({ loading, exercises }) {
  const history = useHistory();
  function onItemClick(_, { id }) {
    history.push("/exercises/" + id);
  }
  const listItems = exercises.map(({ name, id, image, equipment }) => {
    return (
      <List.Item key={id} id={id} onClick={onItemClick}>
        <Image src={image} avatar />
        <List.Content>
          <List.Header>{name}</List.Header>
          <List.Description>
            {equipment.map(({ name }) => name).join(", ")}
          </List.Description>
        </List.Content>
      </List.Item>
    );
  });
  return loading ? (
    <Loader active />
  ) : exercises.length > 0 ? (
    <>
      <List size="huge" selection>
        {listItems}
      </List>
    </>
  ) : (
    <p>no data...</p>
  );
}
