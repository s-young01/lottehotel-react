import React, { useReducer } from 'react';

function reducer(state, action) {
    let newList;
    switch(action.type) {
      case 'ADDLIST':
        return [
          ...state,
          action.list
        ];
      case 'DELLIST':
        newList = state.filter((li, index) => index !== action.delindex)
        return newList;
      case 'TOGGLELIST':
        newList = state.map((li, index) => index === action.toggleindex ? {
          ...li,
          isToggle: !li.isToggle
        } : li);
        return newList;
      default:
        return state;
    }
  }

const useLists = () => {
    const [state, dispatch] = useReducer(reducer,[]);
    const addLists = (name, nickname) => {
      dispatch({
        type: 'ADDLIST',
        list: {name: name, nickname: nickname}
      })
    }
    const delList = (delindex) => {
      dispatch({
        type: 'DELLIST',
        delindex: delindex
      })
    }
    const ToggleList = (toggleindex) => {
      dispatch({
        type:'TOGGLELIST',
        toggleindex: toggleindex
      })
    }
    return [state, addLists, delList, ToggleList];
};

export default useLists;