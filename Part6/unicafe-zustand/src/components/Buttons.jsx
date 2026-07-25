import { useUnicafeStore } from "../store"

const Buttons = () => {
  const state = useUnicafeStore()

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={state.increaseGood}>good</button>
      <button onClick={state.increaseNeutral}>neutral</button>
      <button onClick={state.increaseBad}>bad</button>
    </div>
  )
}

export default Buttons
