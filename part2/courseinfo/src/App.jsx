const Course = ({name, parts}) => {

  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total
        total={
          parts.reduce((total, part) => total += part.exercises, 0)
        }
      />
    </div>
  )
}

const Header = (props) => <h1>{props.course}</h1>

const Content = ({parts}) => (
  <div>
    {
      parts.map(
        part => 
        <Part key={part.id} part={part} />
      )
    }    
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => <p>Number of exercises {props.total}</p>

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },      
    ],
  }

  return (
    <div>
      <Course name={course.name} parts={course.parts} />
    </div>
  )
}

export default App
