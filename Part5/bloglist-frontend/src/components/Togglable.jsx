import { useImperativeHandle, useState } from "react";

const Togglable = (props) => {
    const [visibility, setVisibilty] = useState(false)

    const hideWhenVisible = { display: visibility ? "none" : "" };
    const showWhenVisible = { display: visibility ? "" : "none" };

    const handleVisibility = () => {
        setVisibilty(!visibility)
    }

    useImperativeHandle(props.ref, () => {
        return { handleVisibility }
    })

    return(
        <>
        <div style={hideWhenVisible}>
            <button onClick={handleVisibility}>{props.buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
            {props.children}
            <button onClick={handleVisibility}>cancel</button>
        </div>
        </>
    )
}

export default Togglable;