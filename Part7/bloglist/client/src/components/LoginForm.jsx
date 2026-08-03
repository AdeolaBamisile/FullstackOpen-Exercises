import { TextField, Button } from "@mui/material";
import Notification from "./Notification";
import { useState } from "react";
import { useUserActions } from "../store";
import { useNavigate } from "react-router-dom";
import { useNotificationActions } from "../store";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser, logoutUser } = useUserActions();

  const navigate = useNavigate();

  const { notify } = useNotificationActions();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await loginUser({ username, password });
      navigate("/");
      setUsername("");
      setPassword("");
    } catch {
      notify({ text: "wrong username or password", type: "error" });
    }
  };

  return (
    <div>
      <h2>login to application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            label="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginTop: 5, marginBottom: 5 }}
          />
        </div>
        <div>
          <TextField
            label="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginTop: 5, marginBottom: 5 }}
          />
        </div>
        <Button type="submit" variant="contained">
          login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
