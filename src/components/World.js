import Clock from "./Clock"
import Weather from "./Weather"
import Todos from "./Todos"

export default function World() {
    return (
        <div>
            <Clock />
            <Weather />
            <Todos />
        </div>
    );
}