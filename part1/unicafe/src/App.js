import { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  ) 
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  if (Total(good, neutral, bad) === 0) {
    return (
    <div>
      <Header text='statistics' />
      <p>No feedback given</p>
    </div>
    )
  }

  return (
    <div>
      <Header text='statistics' />
      <table>
        <tbody>
          <tr>
            <td>good: </td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutral: </td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>bad: </td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>total: </td>
            <td>{Total(good, neutral, bad)}</td>
          </tr>
          <tr>
            <td>average: </td>
            <td>{AverageScore(good, neutral, bad)}</td>
          </tr>
          <tr>
            <td>positive: </td>
            <td>{positiveScore(good, neutral, bad) * 100}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const Total = (good, neutral, bad) => {
  return (good + neutral + bad)
}

const AverageScore = (good, neutral, bad) => {
  let weightedScore = good - bad
  return (weightedScore / Total(good, neutral, bad))
}

const positiveScore = (good, neutral, bad) => {
  return (good / Total(good, neutral, bad))
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increment = (value, setValue) => () => {
    setValue(value + 1)
  }

  return (
    <div>

      <Header text='give feedback' />
      <Button handleClick={increment(good, setGood)} text='good' />
      <Button handleClick={increment(neutral, setNeutral)} text='neutral' />
      <Button handleClick={increment(bad, setBad)} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App