import './App.css';
import Header from './components/Header';
import RegisterForm from './components/RegisterForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <div className="App-container">
        <Header />
        <RegisterForm />
        <Footer />
      </div>
    </div>
  );
}

export default App;
