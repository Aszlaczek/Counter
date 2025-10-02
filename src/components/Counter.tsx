import React, { useEffect, useState } from 'react'
import '../style/Counter.css'
const Counter = (props: { handleHours: Function }) => {

    const [value, setValue] = useState(0)
    const [count, setCount] = useState({ hour: 0, min: 0 })

    useEffect(() => {
        const len = String(value)
        if (len.length >= 5) {
            alert("Za duzo znaków :P")
            setValue(0)
            setCount({ hour: 0, min: 0 })
            return
        }
        else {
            const hour = Math.floor(value / 60)
            let min = value - hour * 60

            setCount({ hour: hour, min: min })
            props.handleHours(`${hour}h ${min > 10 ? min : '0' + min}min`)
        }
    }, [value])


    return (
        <div className='container-outer'>
            <div className='container-inner'>
                <p>Napisz wartość godzin w minutach</p>
                <div className="box">
                    <input type="number" name="inp" id="inp" onChange={e => setValue(Number(e.target.value))} min={0} inputMode='numeric' max={1000} placeholder='0' value={value === 0 ? '' : value} />
                </div>
                <h1>{`${count.hour > 10 ? count.hour : '' + count.hour}h ${count.min < 10 ? '0' + count.min : count.min}min`}</h1>
            </div>
        </div>
    )
}

export default Counter