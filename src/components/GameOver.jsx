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
                Congratulations! You have matched all the cards!
            </p>
            <RegularButton handleClick={handleClick}>
                Play again
            </RegularButton>
        </div>
    )
}