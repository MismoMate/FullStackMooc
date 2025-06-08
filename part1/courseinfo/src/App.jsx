const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content p1= {part1} p2= {part2} p3= {part3} 
               exe1= {exercises1} exe2={exercises2} exe3={exercises3} />
      <Total exe={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <Part p={props.p1} exec={props.exe1} />
      <Part p={props.p2} exec={props.exe2} />
      <Part p={props.p3} exec={props.exe3} />    
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.exe}</p>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.p} {props.exec}
      </p>
    </>
  )
}

export default App
