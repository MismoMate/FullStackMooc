import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, updateVotes] = useState(new Array(8).fill(0))

  console.log(votes)

  const randAnecdote = () => {
    const rand = Math.floor(Math.random() * anecdotes.length)
    console.log(rand)
    setSelected(rand)
  }

  const increaseVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    updateVotes(copy)
  }

  return (
    <div>
      <Anecdote header="Anecdote of the day" text={`${anecdotes[selected]}`} votes={votes[selected]} />
      <Button onClick={increaseVote} text="vote" />
      <Button onClick={randAnecdote} text='next anecdote'/>
      <TopAnecdote anecdotes={anecdotes} votes={votes}/>
    </div>
  )
}

const Anecdote = ({header, text, votes}) => {
  console.log(text)
  return (
    <>
      <h1>{header}</h1>
      <p>{text}<br />has {votes} votes</p>
    </>
  )
}

const Button = (props) => {
  
  return (
    <>
      <button onClick={props.onClick}>{props.text}</button>
    </>
  )
}

const TopAnecdote = ({anecdotes, votes}) => {
  let winnersPos = 0
  for (let i = 0; i < votes.length; i++) {
    if (votes[i] > votes[winnersPos]) {
      winnersPos = i
    }
  }
  if (votes[winnersPos] === 0) {
    return (
      <></>
    )
  }
  
  return (
    <>
      <Anecdote header="Anecdote with most votes" text={`${anecdotes[winnersPos]}`} votes={votes[winnersPos]} />
    </>
  )
}

export default App
