import { Alert } from "@mui/material";
import { useNotification } from "../store";

const Notification = () => {
  const message = useNotification();

  if (!message) {
    return null;
  }

  return (
    <Alert style={{ marginTop: 10 }} severity={message.type}>
      {message.text}
    </Alert>
  );
};

export default Notification;
