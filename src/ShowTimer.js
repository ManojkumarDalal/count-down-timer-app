
const ShowTimer = (props) => {
  // console.log(props.isPause, "showtime comp")
    const {hours, minutes, seconds,isPause, 
            handlePause, handleResume, handleReset} = props;
    return (
        <div className="show-container">
          <div className="timer-box">
            <div>{hours < 10 ? `0${hours}` : hours}</div>
            <span>:</span>
            <div>{minutes < 10 ? `0${minutes}` : minutes}</div>
            <span>:</span>
            <div>{seconds < 10 ? `0${seconds}` : seconds}</div>
          </div>

          <div className="action-box">
            {!isPause && (
              <button onClick={handlePause} className="timer-button">
                Pause
              </button>
            )} 
            
            {isPause && (
              <button onClick={handleResume} className="timer-button">
                Resume
              </button>
            )}
            <button className="timer-button" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
    )
}

export default ShowTimer;