import { useUnicafeStore } from "../store"

const Statistics = () => {
  const state = useUnicafeStore()

  const all = state.good + state.bad + state.neutral
  const average = all == 0 ? 0 : (state.good * 1 + state.neutral * 0 + state.bad * -1) / all
  const positive = all == 0 ? 0 : (state.good / all) * 100

  if (all === 0) {
    return (
      <>
        <h2>statistics</h2>
        <div>No feedback given</div>
      </>
    )
  }

  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <tr><td>good</td><td>{state.good}</td></tr>
          <tr><td>neutral</td><td>{state.neutral}</td></tr>
          <tr><td>bad</td><td>{state.bad}</td></tr>
          <tr><td>all</td><td>{all}</td></tr>
          <tr><td>average</td><td>{average}</td></tr>
          <tr><td>positive</td><td>{positive}</td></tr>
        </tbody>
      </table>
    </div>
  )
}

export default Statistics
