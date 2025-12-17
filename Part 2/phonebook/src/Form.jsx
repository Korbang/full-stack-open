export default function Form({handleSubmit, newName, handleNewName, newNumber, handleNewNumber}) {
    return (
        <form onSubmit={handleSubmit}>
            <FormInput 
                name={"name: "}
                value={newName}
                handle={handleNewName}
            />
            <FormInput 
                name={"number: "}
                value={newNumber}
                handle={handleNewNumber}
            />
            <div>
                <button type="submit">add</button>
            </div>
      </form>
    );
}

function FormInput({name, value, handle}) {
    return (
        <div>
            {name} <input value={value} onInput={handle}/>
        </div>
    );
}