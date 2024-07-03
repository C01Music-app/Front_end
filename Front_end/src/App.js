import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Master from "./pages/Master/Master";
import {List} from "./components/List/List";


function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Master />} >
                  <Route path="/" element={<List />} />
              </Route>
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
