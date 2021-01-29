import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
export default (props) => {
    const dispatch = useDispatch()
    const favs = useSelector(state => state.test1.favs)
    const quotes = useSelector(state => state.test1.myQuotes)
    const [text, setText] = useState("")
    const [customQuotes, setCustomQuotes] = useState("")

    const getQuotes = () => {
        axios({
            method: "get",
            url: "https://api.kanye.rest"
        })
        .then(({data}) =>{
            setText(data.quote)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        if(!text) {
            getQuotes()
        }
    }, [])

    return (
        <div>
            <div style={{padding: '20px'}}>
                <button style={{marginRight: '10px'}} onClick={() => props.setTest(1)}>Test1</button>
                <button onClick={() => props.setTest(2)}>Test2</button>
            </div>


            <div style={{
                display: 'flex',
                flexDirection:'column',
                alignItems: 'center'
            }}>
                <h3>{text}</h3>
                <div style={{
                    display: 'flex',
                    padding: '20px'

                }}>
                    <button style={{marginRight: '10px'}} onClick={getQuotes}>Get Quotes</button>
                    <button onClick={() => {
                        dispatch({type: 'addFavs', data: text})
                    }}>Add Favs</button>
                    </div>
                {
                    favs.map((val, index) => {
                        return <h4 key={index}>{val}</h4>
                    })
                }

                <h2>My Quotes</h2>
                <input placeholder="Write your quote here" style={{margin: '10px'}} value={customQuotes} onChange={e => {
                    setCustomQuotes(e.target.value)
                }}/>
                <button onClick={() => {
                    dispatch({type: 'addQuotes', data: customQuotes})
                    setCustomQuotes("")
                }}>submit</button>
                {
                    quotes.map((val, index) => {
                        return <p style={{marginBottom: '5px'}} key={index}>{val}</p>
                    })
                }
            </div>
        </div>
    )
}