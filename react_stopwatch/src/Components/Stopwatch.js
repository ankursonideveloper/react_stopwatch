import React, { useEffect, useRef, useState } from 'react';

const Stopwatch = (props) => {
  const [timeObject, setTimeObject] = useState({hour: "00", minute: "00", second: "00"});
  const [stopwatchState, setStopWatchState] = useState('YETTOSTART');

  const stopWatchRef = useRef(null);
  let timerRef = useRef(null);
  
  const incrementTime = (initialTime) =>{
    let hour = parseInt(initialTime.hour);
    let minute = parseInt(initialTime.minute);
    let second = parseInt(initialTime.second);

    if (second == "59" ){
      if (minute == "59"){
        hour = incrementByOne(hour);
        minute = "00";
        second = "00";
      }
      else{
        hour = hour<9 ? "0" + hour.toString() : hour.toString();
        minute = incrementByOne(minute);
        second = "00";
      }
    }
    else{
      hour = hour<9 ? "0" + hour.toString() : hour.toString();
      minute = minute<9 ? "0" + minute.toString() : minute.toString();
      second = incrementByOne(second);
    }
     return {hour: hour, minute: minute, second: second};
  }

  const incrementByOne = num => { return num<9 ?  "0" + (num + 1).toString() : (num + 1).toString()};

  const handleClickOnPauseButton = ()=>{
      if (stopwatchState === 'START'){
        setStopWatchState('PAUSE');
      }
  }

  const handleClickOnStartButton = ()=>{
      setStopWatchState('START');
    }

  const handleClickOnResetButton = ()=>{
      setTimeObject({hour: "00", minute: "00", second: "00"});
      setStopWatchState('YETTOSTART');
  }

  useEffect(
        ()=>{
            if (timerRef.current){
              clearInterval(timerRef.current);
            }
            if (stopwatchState === 'START'){
            timerRef.current = setInterval(()=>{
            let hour = (stopWatchRef.current.value.split(":")[0]).trim();
            let minute = (stopWatchRef.current.value.split(":")[1]).trim();
            let second = (stopWatchRef.current.value.split(":")[2]).trim();
            setTimeObject(incrementTime({hour: hour, minute: minute, second: second}));
          },1000)
          }
        }
    ,[stopwatchState])
    
  return (
    <div className="flex flex-col items-center w-6/12 mx-auto mt-8 bg-white border-2 border-gray-300 rounded-xl shadow-md p-6">
      <p className='mb-3 font-extrabold text-black text-3xl' >Stopwatch</p>
      <input
        type="text"
        className="w-full text-center text-xl font-semibold border border-gray-300 rounded-md p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="00:00:00"
        value={`${timeObject.hour} : ${timeObject.minute} : ${timeObject.second}`}
        ref={stopWatchRef}
        readOnly
      />

      <div className="flex flex-wrap justify-center w-full gap-4">
        <button className={`flex-1 ${stopwatchState === 'START'? "bg-slate-400": "bg-blue-500"} text-white font-medium py-2 rounded-md flex-wrap`}
        onClick={handleClickOnStartButton}
        disabled={stopwatchState === 'START'}>
          {stopwatchState === 'START'? "Running":"Start"}
        </button>
        <button className={`flex-1 ${stopwatchState !== 'START'? "bg-slate-400": "bg-yellow-500"} text-white font-medium py-2 rounded-md flex-wrap`}
        onClick={handleClickOnPauseButton}
        disabled={stopwatchState !== 'START'}>
          {stopwatchState === "PAUSE"?"Paused": "Pause"}
        </button>
        <button className={`flex-1 ${stopwatchState === 'YETTOSTART' ? "bg-slate-400": "bg-red-500"} text-white font-medium py-2 rounded-md flex-wrap`}
        onClick={handleClickOnResetButton}
        disabled={stopwatchState === 'YETTOSTART'}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
