import React, {useEffect, useState} from 'react'
import { Chart } from "react-google-charts";
import axios from "axios"
import {useSelector, useDispatch} from 'react-redux'
export default (props) => {
    const dispatch = useDispatch()
    const param = useSelector(state => state.test2.param)
    const candle = useSelector(state => state.test2.candle)
    const sort = (ticker) => {
        let tmpArray = []
        let datePeriodEnd =  new Date(ticker[0].timestamps)
        datePeriodEnd.setMinutes(datePeriodEnd.getMinutes() - param)
        tmpArray.unshift([
            `${new Date(ticker[0].timestamps).getDate()}/${new Date(ticker[0].timestamps).getMonth()+1}`,
            ticker[0].price,
            ticker[0].price,
            ticker[0].price,
            ticker[0].price,
        ])
        for(let val of ticker){
            tmpArray[0][3] = val.price
            if((new Date(val.timestamps) > datePeriodEnd)){
                
                if(val.price < tmpArray[0][1]) {
                    tmpArray[0][1] = val.price
                }
                else if(val.price > tmpArray[0][4]) {
                    tmpArray[0][4] = val.price
                }
            }else {
                datePeriodEnd = new Date(val.timestamps)
                datePeriodEnd.setMinutes(datePeriodEnd.getMinutes() - param)

                tmpArray.unshift(
                    [
                        `${new Date(val.timestamps).getDate()}/${new Date(val.timestamps).getMonth()+1}`,
                        val.price,
                        val.price,
                        val.price,
                        val.price,
                    ]
                )
                
            }
        }
        dispatch({type: 'setCandle', data: tmpArray})
    }
    useEffect(() => {
        if(param){
            getData()
        }
        
    }, [param])
    const getData = () => {
        axios({
            method: 'get',
            url: 'https://testfai.herokuapp.com/ticker'
        })
        .then(({data}) => {
            sort(data.ticker)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
             <div style={{padding: '20px'}}>
                <button style={{marginRight: '10px'}} onClick={() => props.setTest(1)}>Test1</button>
                <button onClick={() => props.setTest(2)}>Test2</button>
            </div>
            <div>
                <div>
                    <button onClick={() => {
                        dispatch({type: 'setParam',data: 5})
                    }} style={{marginRight: '15px'}}>5 Menit</button>
                    <button onClick={() => {
                        dispatch({type: 'setParam',data: 15})
                    }} style={{marginRight: '15px'}}>15 Menit</button>
                    <button onClick={() => {
                        dispatch({type: 'setParam',data: 30})
                    }} style={{marginRight: '15px'}}>30 Menit</button>
                    <button onClick={() => {
                        dispatch({type: 'setParam',data: 180})
                    }} style={{marginRight: '15px'}}>3 Hours</button>
                    <button onClick={() => {
                        dispatch({type: 'setParam',data: 420})
                    }} style={{marginRight: '15px'}}>7 Hours</button>
                    <button onClick={() => {
                        dispatch({type: 'setParam',data: 1440})
                    }} style={{marginRight: '15px'}}>1 Day</button>
                    <button onClick={() => {
                        dispatch({type: 'setParam',data: 10080})
                    }} style={{marginRight: '15px'}}>1 Week</button>
                    <button onClick={() => {
                        dispatch({type: 'setParam',data: 43800})
                    }} style={{marginRight: '15px'}}>1 Month</button>
                </div>
                {candle.length !== 0 ?
                <Chart
                    width={'100%'}
                    height={350}
                    chartType="CandlestickChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Date', 'Low', 'Open', 'Close', 'High'],
                        ...candle
                      ]}
                    options={{
                        legend: 'none',
                        candlestick: {
                            fallingColor: { strokeWidth: 0, fill: '#a52714' }, // red
                            risingColor: { strokeWidth: 0, fill: '#0f9d58' }   // green
                          }
                    }}
                    rootProps={{ 'data-testid': '1' }}
                    />:null
                }
            </div>
        </div>
    )
}