export default function Filter({ filter, handler }) {
    return (
        <div>
            filter shown with: <input value={filter} onInput={handler}/>
        </div>
    );
}