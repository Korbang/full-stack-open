export default function Persons({persons, handle}) {
    return (
        <>
            {persons.map((person) => {
                return (
                    <div key={person.id}>
                        <p >{person.name} {person.number}</p>
                        <button type="button" onClick={() => handle(person.id)}>Delete</button>
                    </div>
                )
                })
            }
        </>
    )
}