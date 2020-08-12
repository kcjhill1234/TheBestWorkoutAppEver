import React, { useState } from "react";
import { Form, Message, Segment } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../services/use-auth";
import { useService } from "../../services/use-service";

export default function SignIn() {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const { messageService } = useService();

  const OnSubmit = (data) => {
    setLoading(true);
    signIn(data)
      .then((userName) => {
        messageService.info(`Welcome ${userName}`);
        setLoading(false);
        history.push("/");
      })
      .catch((error) => {
        messageService.error(error.response.data.message);
        setLoading(false);
      });
  };
  return (
    <Segment className="auth-form">
      <h1>Sign In</h1>
      <Form onSubmit={handleSubmit(OnSubmit)} loading={loading}>
        <Form.Field>
          <label>User Name</label>
          <input
            name="userName"
            placeholder="User Name"
            ref={register({ required: "This is required" })}
          />
          {errors.userName && (
            <Message negative>{errors.userName.message}</Message>
          )}
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            ref={register({
              required: "This is required",
              minLength: {
                value: 8,
                message: "password must be greater than 8 characters",
              },
            })}
          />
          {errors.password && (
            <Message negative>{errors.password.message}</Message>
          )}
        </Form.Field>
        <Form.Button>Submit</Form.Button>
      </Form>
    </Segment>
  );
}
