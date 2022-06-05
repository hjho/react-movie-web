import { useState } from "react";

export const useInput = (initialValue, validator) => {
    const [value, setValue] = useState(initialValue);
    const onChange = (event) => {
        const {
            target : {value}
        } = event;
        let willUpdate = true;
        // 유효성 검사.
        if(typeof validator === "function") {
            willUpdate = validator(value);
        }
        if(willUpdate) {
            setValue(value);
        }
    }
    return {value, onChange}
}