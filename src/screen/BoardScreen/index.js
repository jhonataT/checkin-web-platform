import ReactStickyNotes from '@react-latest-ui/react-sticky-notes';
import './styles.css';

export const BoardScreen = () => {
    return <div className="board__container">
        <ReactStickyNotes
            colors={["2a3237", "d3461e", "ff8818", "171b27", "444f73"]}
            noteHeight={200}
            noteWidth={300}
            footer={true}
        />
    </div>
}