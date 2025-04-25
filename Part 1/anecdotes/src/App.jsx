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

  const votesArray = new Uint8Array(anecdotes.length)
   
  const [selected, setSelected] = useState(0)
  const [votes,    setVotes]    = useState(votesArray)

  const topIndex    = votes.indexOf(Math.max(...votes));
  console.log('topIndex ', topIndex)

  function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }

  const nextAnecdote = () => {
    const randomAnecdote = getRandomInt(0, anecdotes.length)
    setSelected(randomAnecdote)
  }

  const vote = () => {
    const copy      = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }
  

  return (
    <>
      <h1>Anecdot of the day</h1>
      <div>
        {anecdotes[selected]}
      </div>
      <div>has {votes[selected]} votes</div>
      <button onClick={vote}>vote</button>
      <button onClick={nextAnecdote}>next anecdote</button>
      <h1>Anecdot with most vote</h1>
      <div>
        {anecdotes[topIndex]}
      </div>
      <div>has {votes[topIndex]} votes</div>
    </>
  )
}

export default App