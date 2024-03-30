import Checkbox from "./Checkbox";

export default function Task({name,done, onToggle}) {
    return (
        <div className="task">
            <Checkbox checked={done} onClick={() => onToggle(!done)}/>
            {name}
            </div>
    )
}