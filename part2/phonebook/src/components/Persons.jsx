
const Persons = (props) => {
    return (
        <div>
            {
                props.persons.map(
                    person =>
                    <Entry key={person.id} name={person.name} number={person.number} />
                )
            }
        </div>
    )
}

const Entry = ({name, number}) => {
  return (
    <p>{name} {number}</p>
  )
}

export default Persons
