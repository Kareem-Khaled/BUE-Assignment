import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import MainPage from './pages';
import DataTable from './pages/view';
import ErroPage from './pages/error';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <div className="App-container">
        <Header />
        <Router>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/view" element={<DataTable />} />
              <Route path="*" element={<ErroPage />} />
            </Routes>
        </Router>
  			<Footer />
      </div>
    </div>
  );
}

export default App;
