// src/components/ErrorCard.jsx
import { useRef, useEffect } from "react";
import RegularButton from "./RegularButton";

export default function ErrorCard({ handleClick }) {
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.focus();
  }, []);

  return (
    <div className="wrapper wrapper--accent" ref={divRef} tabIndex="-1">
      <p className="p--large">Space anomaly detected!</p>
      <p className="p--regular">
        We've encountered a cosmic disturbance. Return to the space station or press the button below to re-initialize the mission.
      </p>
      <RegularButton handleClick={handleClick}>Restart Mission</RegularButton>
    </div>
  );
}