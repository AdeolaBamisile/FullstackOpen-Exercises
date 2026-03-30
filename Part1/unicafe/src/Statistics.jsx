const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (all == 0) {
    return <div>No feedback given</div>;
  } else {
    return (
      <>
        <div>good {good}</div>
        <div>neutral {neutral}</div>
        <div>bad {bad}</div>
        <div>all {all}</div>
        <div>average {average}</div>
        <div>positive {positive} %</div>
      </>
    );
  }
};

export default Statistics;
