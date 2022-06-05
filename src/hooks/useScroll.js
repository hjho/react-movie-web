import { useEffect, useState } from "react";

export const useScroll = () => {
    const [state, setState] = useState({
        x: 0,
        y: 0
    });
    const onScroll = () => {
        // console.log("Y ", window.scrollY, "X", window.scrollX);
        setState({y:window.scrollY, x: window.scrollX});
    }
    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        }
    }, [])
    return state;
}
// style={{height:"1000vh"}}
// const {y} = useScroll();