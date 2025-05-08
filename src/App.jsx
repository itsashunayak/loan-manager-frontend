import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
};

export default App;