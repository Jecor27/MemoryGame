import { useRef, useEffect } from 'react'
import RegularButton from './RegularButton'
import Select from './Select'

export default function Form({ handleSubmit, handleChange, isFirstRender }) {
    const divRef = useRef(null)
    
    useEffect(() => {
        !isFirstRender && divRef.current.focus()
    }, [])
    
    return (
        <div className="form-container" ref={divRef} tabIndex={-1}>
            <p className="p--regular">
                Welcome to the cosmic memory challenge! Select an emoji constellation and the number of stellar cards to begin your galactic journey.
            </p>
            <form className="wrapper">
                <Select handleChange={handleChange} />
                <RegularButton handleClick={handleSubmit}>
                    Launch Mission
                </RegularButton>
            </form>
        </div>
    )
}