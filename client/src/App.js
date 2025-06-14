import './styles/tailwind.css';
import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";

const App = () => {
    return (
        <div className="App">
            <ToastContainer />
            <BrowserRouter>
                <Routes>
                  <Route path="/api/todos" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;