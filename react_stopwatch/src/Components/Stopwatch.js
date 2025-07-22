import React from 'react'

const Stopwatch = (props) => {
  return (
    <div className='flex flex-col align-middle w-4/12 mx-auto mt-2 border-gray-300 bg-white border-2 rounded-xl p-5'>
        <input></input>
        <div className='flex flex-row justify-around'>
            <button>Start</button>
            <button>Pause</button>
            <button>Reset</button>
        </div>
    </div>
  )
}

export default Stopwatch
