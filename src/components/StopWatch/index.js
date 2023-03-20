import moment from 'moment';
import { useState } from 'react';
import { useStopwatch  } from 'react-timer-hook';
import { DefaultButton } from '../Button';
import './styles.css';

export const StopWatch = ({ date = moment().format('LL') }) => {
    const [inPause, setInPause] = useState(false);
    let {
        seconds,
        minutes,
        hours,
        isRunning,
        start,
        pause,
        reset,
      } = useStopwatch({ offsetTimestamp: '0:0:0:0', autoStart: false });

    const resetAll = () => {
        reset('0:0:0:0', false);
        setInPause(false);
    }
    
    const startOrPause = () => {
        if(!inPause && (seconds !== 0 || minutes !== 0 || hours !== 0)) {
            pause();
            setInPause(true);
            return;
        }

        setInPause(false);
        start();
    }

    return <div className="stopWatch__container">
        <p>{date}</p>
        <div className="stopWatch__panel">
            <span>{hours > 9 ? `${hours}` : `0${hours}`}</span>:
            <span>{minutes > 9 ? `${minutes}` : `0${minutes}`}</span>:
            <span>{seconds > 9 ? `${seconds}` : `0${seconds}`}</span>
        </div>
        <div className="stopWatch__buttons__container">
            <DefaultButton
                label={!isRunning ? "CHECK-IN" : "PAUSE"}
                onPress={startOrPause}
                disabled={date !== moment().format('LL')}
            />
            <DefaultButton
                label="CHECKOUT"
                type="secondary"
                onPress={resetAll}
                disabled={!isRunning && !inPause}
            />
        </div>
    </div>
}