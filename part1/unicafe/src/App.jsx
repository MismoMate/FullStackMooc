import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allReviews, setReviews] = useState(0)


  const increaseGood = () => {
    setGood(good + 1)
    setReviews(allReviews + 1)
  }
  const increaseNeutral = () => {
    setNeutral(neutral + 1)
    setReviews(allReviews + 1)
  }
  const increaseBad = () => {    
    setBad(bad + 1)
    setReviews(allReviews + 1)
  }

  return (
    <div>
      <Header text='give feedback' />
      <Button onClick={increaseGood} text='good' />
      <Button onClick={increaseNeutral} text='neutral' />
      <Button onClick={increaseBad} text='bad' />
      <Header text='statistics' />
      <Stats goodRe={good} neutralRe={neutral} badRe={bad} total={allReviews} />
    </div>
  )
}

const Header = (props) => <h1>{props.text}</h1>

const Button = (props) => {

  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const Stats = (props) => {  

  if (props.total === 0) {
    return (
    <p>No Feedback given</p>
    )
  }

  const positive = (props.goodRe / props.total) * 100
  const average = (props.goodRe + -(props.badRe)) /props.total

  return (
    <table style={{borderSpacing: 4}}>
      <tbody>    
        <StatisticLine text="good" value={props.goodRe} />
        <StatisticLine text="neutral" value={props.neutralRe} />
        <StatisticLine text="bad" value={props.badRe} />
        <StatisticLine text="all" value={props.total} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={`${positive}%`} />
      </tbody>
    </table>
  )


}

const StatisticLine = ({text, value}) => {
  
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  
  )
  
}




export default App
