import {useEffect, useLayoutEffect} from "react";

const useAutosizeTextArea = (
    textAreaRef:any,
    value:any,
    offset= 2
) => {


    useEffect(() => {
        if (textAreaRef.current ) {
            textAreaRef.current.style.height = "inherit";
            const scrollHeight = textAreaRef.current.scrollHeight;

            textAreaRef.current.style.height = scrollHeight + offset +  "px";
        }
    }, [textAreaRef.current, value]);
};

export default useAutosizeTextArea;
