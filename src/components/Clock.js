import { useState } from "react";

export default function Clock() {
    const [time, setTime] = useState(`00:00:00`);

    setInterval(() => {
        const date = new Date();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        setTime(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return (
        <h2 id="clock">{time}</h2>
    );
}