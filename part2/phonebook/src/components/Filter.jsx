
const Entry = ({name, number}) => {
  return (
    <p>{name} {number}</p>
  )
}

const Filter = (props) => {

    return (
    <div>
        <p>{props.text} <input value={props.inputValue} onChange={props.onChange} /></p>      
        <div>
            {
            !props.match ? <p>No search results</p> : props.phonebook.map(person => {
                if (person.name.toLowerCase().includes(props.inputValue.toLowerCase())) {              
                return <Entry key={person.id} name={person.name} number={person.number} />
                }
            })
            }
        </div>        
    </div>
    )
}


export default Filter
