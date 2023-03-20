import { useStopwatch  } from 'react-timer-hook';
import moment from 'moment';
import './styles.css';
import { DefaultButton } from '../Button';

export const StopWatch = ({ expiryTimestamp = 40000, date = moment().format('LL') }) => {
    const {
        seconds,
        minutes,
        hours,
        isRunning,
        start,
        pause,
        resume,
        restart,
      } = useStopwatch({ autoStart: true });

    return <div className="stopWatch__container">
        <p>{date}</p>
        <div className="stopWatch__panel">
            <span>{hours > 9 ? `${hours}` : `0${hours}`}</span>:
            <span>{minutes > 9 ? `${minutes}` : `0${minutes}`}</span>:
            <span>{seconds > 9 ? `${seconds}` : `0${seconds}`}</span>
        </div>
        <div className="stopWatch__buttons__container">
            <DefaultButton label="CHECK-IN" onPress={start}/>
            <DefaultButton label="CHECKOUT" type="secondary" onPress={pause} disabled />
        </div>
    </div>
}