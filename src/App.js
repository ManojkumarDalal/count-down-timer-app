import "./App.css";
import {  useEffect, useState } from "react";
import InputTimer from './InputTimer';
import ShowTimer from './ShowTimer';

function App() {
  const [isStart, setIsStart] = useState(false);
  const [isPause, setIsPause] = useState(false);
  console.log("state value isPause", isPause)
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerId, setTimerId] = useState(0);

  const handleStart = () => {
    console.log("click on handle start btn")

    if (hours < 0 || minutes < 0 || seconds <= 0) {
      window.alert("Invalid Input");
      return;
    } else {
      setIsStart(true);
    }
  };

  const handlePause = () => {
    console.log("click on handle pause btn")
    setIsPause(true);
    clearInterval(timerId);
  };

  const handleResume = () => {
    console.log("click on handle resume btn")

    setIsPause(false);
    runTimer(seconds, minutes, hours, timerId);
  };
  const handleReset = () => {
    console.log("click on handle reset btn")
    setIsStart(false);
    resetTimer();
  };
  const resetTimer = () => {
    console.log("click on handle timer btn")

    setHours(0);
    setMinutes(0);
    setSeconds(0);
    clearInterval(timerId);
  };
  const handleInput = (e) => {
    //console.log(e.target.id, e.target.value);
    if (e.target.id === "hours") setHours(Number.parseInt(e.target.value));
    if (e.target.id === "minutes") setMinutes(Number.parseInt(e.target.value));
    if (e.target.id === "seconds") setSeconds(Number.parseInt(e.target.value));
  };

  const runTimer = (sec, min, hrs, tid) => {
    if (sec > 0) {
      setSeconds((s) => s - 1);
    } else if ((sec === 0) & (min > 0)) {
      setMinutes((m) => m - 1);
      setSeconds(59);
    } else {
      setHours((h) => h - 1);
      setMinutes(59);
      setSeconds(59);
    }
    if (sec === 0 && min === 0 && hrs === 0) {
      handleReset();
      alert("Timer is Finished");
      clearInterval(tid);
      return
    }
  }

  useEffect(() => {
    let tid;
    if (isStart) {
      tid = setInterval(() => {
        runTimer(seconds, minutes, hours, tid);
      }, 1000)
      setTimerId(tid);
    }
    return () => {
      clearInterval(tid);
    }
  }, [isStart, hours, minutes, seconds])

  return (
    <div className="App">
      <h1>Countdown Timer</h1>
      {
        !isStart && <InputTimer
          handleStart={handleStart}
          handleInput={handleInput} />
      }

      {
        isStart &&
        <ShowTimer
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          isPause={isPause}
          handlePause={handlePause}
          handleReset={handleReset}
          handleResume={handleResume}
        />
      }

    </div>
  );
}

export default App;
