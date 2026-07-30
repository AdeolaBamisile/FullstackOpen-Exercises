import { createContext, useState } from "react";

const NotificationContext = createContext();

export default NotificationContext;

export const NotificationContextProvider = (props) => {
  const [notify, setNotify] = useState(null);

  return (
    <NotificationContext.Provider value={{ notify, setNotify }}>
      <div>{props.children}</div>
    </NotificationContext.Provider>
  );
};
