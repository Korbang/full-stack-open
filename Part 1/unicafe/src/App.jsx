import { useState } from 'react'

const Header = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const FeedbackSection = ({handleGood, handleNeutral, handleBad}) => {
  return (
    <>
      <Header text={'give feedback'}/>
      <div style={{display: 'flex'}}>
        <Button clickHandleFunction={handleGood}    text={'good'} />
        <Button clickHandleFunction={handleNeutral} text={'neutral'} />
        <Button clickHandleFunction={handleBad}     text={'bad'} />
      </div>
    </>
  )
}

const Button = ({clickHandleFunction, text}) => {
  return(
    <button onClick={clickHandleFunction}>{text}</button>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all                = good + neutral + bad
  const average            = (good - bad) / all
  const positivePercentage = (good / all) * 100

  if(all == 0){
    return (
      <p>No feedback given</p>
    )
  }


  return (
    <>
      <Header text={'statistics'}/>
      <table>
        <tbody>
          <StatisticLine name={'good'}     value={good} />
          <StatisticLine name={'neutral'}  value={neutral} />
          <StatisticLine name={'bad'}      value={bad} />
          <StatisticLine name={'all'}      value={all} />
          <StatisticLine name={'average'}  value={average} />
          <StatisticLine name={'positive'} value={positivePercentage} inPercentage={true}/>
        </tbody>  
      </table> 
    </>
  )
}

const StatisticLine = ({name, value, inPercentage = false}) => {
  if(inPercentage) {
    return (
      <tr>
        <td>{name}</td> 
        <td>{value}%</td>       
      </tr>
    )
  }
  
  return (
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good,    setGood   ] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad,     setBad    ] = useState(0)

  console.log('Rendering ' + good);
  const addGood = () => {
    console.log('handleGood ' + good);
    setGood(good + 1)
  }

  const addNeutral = () => {
    setNeutral(neutral + 1)
  }

  const addBad = () => {
    setBad(bad + 1)
  }

  return (
    <>
      <FeedbackSection handleGood={addGood} handleNeutral={addNeutral} handleBad={addBad}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

export default App
