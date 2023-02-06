import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import SpDetailContainer from './containers/SpDetailContainer';
import SpecialContainer from './containers/SpecialContainer';
import Main from './pages/Main';
import JoinPage from './pages/member/JoinPage';
import Login from './pages/member/Login';

function App() { 
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/special' element={<SpecialContainer isMain={false}/>}/>
        <Route path='/special/:no' element={<SpDetailContainer/>}/>
        <Route path='/join' element={<JoinPage/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
