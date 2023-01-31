import React from 'react';

const ListsSample = ({lists, delList, ToggleList}) => {
    return (
        <div>
            <ul>
                {lists.map((li, index) => <li key={index}
                style={{color: li.isToggle ? 'pink' : 'blue'}}>
                <span onClick={() => ToggleList(index)}>{li.name}, {li.nickname}</span> 
                <button onClick={() => delList(index)}>삭제</button>
                </li>)}
            </ul>
        </div>
    );
};

export default ListsSample;