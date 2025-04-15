import RegularButton from "./RegularButton"

export default function GameOver({handleClick}) {
    return (
        <div className="wrapper wrapper--accent">
            <p className="p--large">
                Congratulations! You have matched all the cards!
            </p>
            <RegularButton handleClick={handleClick}>
                Play again
            </RegularButton>
        </div>
    )
}