
import RegularButton from "./RegularButton"
import { useRef, useEffect } from "react"

export default function GameOver({ handleClick, reason, victory }) {
  const ref = useRef(null)

  useEffect(() => {
    ref.current.focus()
  }, [])

  // Determine message based on outcome
  let message = ""
  if (victory) {
    message = "Stellar achievement! You've aligned all the cosmic cards!"
  } else if (reason === "time") {
    message = "Time warp collapsed! Your cosmic journey has run out of time."
  } else if (reason === "lives") {
    message = "Energy depleted! You've run out of dimensional lives."
  } else {
    message = "Mission incomplete! Better luck on your next space adventure."
  }

  return (
    <div className={`wrapper wrapper--accent ${victory ? 'victory' : 'defeat'}`} tabIndex="-1" ref={ref}>
      <p className="p--large">
        {message}
      </p>
      <RegularButton handleClick={handleClick}>
        New Mission
      </RegularButton>
    </div>
  )
}