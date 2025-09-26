import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Caseback from "./components/dashboard/caseback/Caseback";
import Metrics from "./components/dashboard/metrics";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route path="caseback" element={<Caseback />} />
            <Route path="metrics" element={<Metrics />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
