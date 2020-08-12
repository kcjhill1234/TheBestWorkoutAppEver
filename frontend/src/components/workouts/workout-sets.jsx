import React from "react";
import { useFieldArray, Controller } from "react-hook-form";
import { useEffect } from "react";
import { Form, Input, Icon, Message } from "semantic-ui-react";
import { get } from "lodash";

export default function WorkoutSets({ nestIndex, control, register, errors }) {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `exercises[${nestIndex}].sets`,
    keyName: "key",
  });

  useEffect(() => {
    if (!fields.length) {
      append({ weight: "", repetitions: "" });
    }
  }, [fields, append]);

  return (
    <div>
      {fields.map((field, index) => (
        <Form.Group key={field.key}>
          <Form.Field>
            <label>Repetitions</label>
            <Controller
              control={control}
              as={Input}
              name={`exercises[${nestIndex}].sets[${index}].repetitions`}
              defaultValue={field.repetitions}
              rules={{ required: "Repetitions are required." }}
            />
            {get(
              errors,
              `exercises[${nestIndex}].sets[${index}].repetitions`
            ) && (
              <Message negative>
                {get(
                  errors,
                  `exercises[${nestIndex}].sets[${index}].repetitions.message`
                )}
              </Message>
            )}
          </Form.Field>
          <Form.Field>
            <label>Weight</label>
            <Controller
              control={control}
              as={Input}
              name={`exercises[${nestIndex}].sets[${index}].weight`}
              defaultValue={field.weight}
            />
          </Form.Field>
          <Form.Button
            type="button"
            circular
            icon
            floated="right"
            onClick={() => remove(index)}
          >
            <Icon name="minus" />
            Remove Set
          </Form.Button>
        </Form.Group>
      ))}
      <Form.Button
        type="button"
        circular
        icon
        onClick={() => append({ repetitions: "", weight: "" })}
      >
        <Icon name="plus" /> Add Set
      </Form.Button>
    </div>
  );
}
