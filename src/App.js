import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import SpDetailContainer from './containers/SpDetailContainer';
import SpecialContainer from './containers/SpecialContainer';
import Main from './pages/Main';
import EditPass from './pages/member/EditPass';
import IdFind from './pages/member/IdFind';
import JoinPage from './pages/member/JoinPage';
import Login from './pages/member/Login';
import PassFind from './pages/member/PassFind';

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
        <Route path='/findid' element={<IdFind/>}/>
        <Route path='/findpass' element={<PassFind/>}/>
        <Route path='/updatepass' element={<EditPass/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
