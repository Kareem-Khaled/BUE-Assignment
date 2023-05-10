import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import MainPage from './pages';
import DataTable from './pages/view';
import ErrorMessage from './pages/error';
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
              <Route path="*" element={<ErrorMessage
                messages={[
                  "Oops! The page you're looking for doesn't exist.",
                  'We are sorry, but the page you requested cannot be found.',
                  'Please check the URL and try again.',
                ]} />} />
            </Routes>
        </Router>
  			<Footer />
      </div>
    </div>
  );
}

export default App;
