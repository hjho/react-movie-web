import { useRef } from "react";

export const useFullscreen = (callback) => {
    const element = useRef();
    const triggerFull = () => {
        if(element) {
            element.current.requestFullScreen();
            if(typeof callback === "function") {
                callback(true)
            }
        }
    }
    const exitFull = () => {
        document.exitFullscreen();
        if(typeof callback === "function") {
            callback(false)
        }
    }
    return {element, triggerFull, exitFull}
}

// const {element, triggerFull, exitFull} = useFullscreen(onFullS);