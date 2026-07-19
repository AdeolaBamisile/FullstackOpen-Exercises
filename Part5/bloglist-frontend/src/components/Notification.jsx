const Notification = ({ message }) => {
  if (!message) {
    return null
  }
  return <p className={message.type}>{message.text}</p>
}

export default Notification
