import {useState } from 'react';
import './App.css';
import InputSample from './comonents/InputSample';
import ListsSample from './comonents/ListsSample';
import TextSample from './comonents/TextSample';

function App() {
  const [lists, setLists] = useState([]);
  const addLists = (name, nickname) => {
    setLists([
      ...lists,
      {name: name, nickname: nickname, isToggle: false},
    ])
    console.log(lists);
  }
  const delList = (delindex) => {
    const newList = lists.filter((li, index) => {
      if(index !== delindex) {
        return li
      }
    })
    setLists(newList);
  }
  const ToggleList = (toggleindex) => {
    const newList = lists.map((li, index) => index === toggleindex ? {
      ...li,
      isToggle: !li.isToggle
    } : li);
    setLists(newList);
  }
  return (
    <div className="App">
     <InputSample title='green' addLists={addLists}>
      <TextSample/> 
     </InputSample>
     <ListsSample lists={lists} delList={delList} ToggleList={ToggleList}/>
    </div>
  );
}

export default App;
