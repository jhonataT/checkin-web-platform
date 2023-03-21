import { BoardContainer } from "./container/BoardContainer";
import { HomeContainer } from "./container/HomeContainer";
import './global.css';

const App = () => {
  return <main>
    <HomeContainer />
    <BoardContainer />
  </main>
}

export default App;
