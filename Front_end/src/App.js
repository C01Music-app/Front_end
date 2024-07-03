import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Master from "./pages/Master/Master";
import {PlayList} from "./components/List/PlayLists";


function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Master />} >
                  <Route path="/" element={<PlayList />} />
              </Route>
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
