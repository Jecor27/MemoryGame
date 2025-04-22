import RegularButton from "./RegularButton"
import { useRef, useEffect } from "react"

export default function GameOver({handleClick}) {
const ref = useRef(null)

    useEffect(() => {
        ref.current.focus()
    }
    , [])

    return (
        <div className="wrapper wrapper--accent" tabIndex="-1" ref={ref}>
            <p className="p--large">
                Stellar achievement! You've aligned all the cosmic cards!
            </p>
            <RegularButton handleClick={handleClick}>
                New Mission
            </RegularButton>
        </div>
    )
}