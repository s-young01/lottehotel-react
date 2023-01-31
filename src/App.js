import './App.css';
import InputSample from './comonents/InputSample';
import ListsSample from './comonents/ListsSample';
import TextSample from './comonents/TextSample';
import useLists from './hooks/useLists';

function App() { 
  const [state, addLists, delList, ToggleList] = useLists();
  return (
    <div className="App">
     <InputSample title='green' addLists={addLists}>
      <TextSample/> 
     </InputSample>
     <ListsSample lists={state} delList={delList} ToggleList={ToggleList}/>
    </div>
  );
}

export default App;
