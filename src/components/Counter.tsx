import { useEffect } from 'react'
import '../style/Counter.css'
import { useHoursStore } from '../store'
const Counter = () => {

    const count = useHoursStore()

    useEffect(() => {
        const len = String(count.min)
        if (len.length >= 5) {
            alert("Za duzo znaków :P")
            count.setMin(0)
            return
        }
        else {
            count.convert()
        }
    }, [count.min])


    return (
        <div className='container-outer'>
            <div className='container-inner'>
                <p>Napisz wartość godzin w minutach</p>
                <div className="box">
                    <input type="number" name="inp" id="inp" onChange={e => { count.setMin(Number(e.target.value)) }} min={0} inputMode='numeric' max={1000} placeholder='0' value={count.min === 0 ? '' : count.min} />
                </div>
                <h1>{count.allHours}</h1>
            </div>
        </div>
    )
}

export default Counter