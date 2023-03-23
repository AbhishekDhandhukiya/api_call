import { Route, Routes } from "react-router";
import "./App.css";
import Header from "./Component/Header/Header";
import List from "./Pages/List";
import SingleUserPage from "./Pages/singleUserPage";
import Adduser from "./Pages/Adduser";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/list" element={<List />} />
        <Route path="/singleuser" element={<SingleUserPage />} />
        <Route path="/adduser" element={<Adduser />} />
      </Routes>
    </div>
  );
}

export default App;
