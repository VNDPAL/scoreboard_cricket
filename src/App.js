import Header from './components/Header';
import Layout from './components/Layout';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter basename="/">
      <Layout />
    </BrowserRouter>
  );
}

export default App;
