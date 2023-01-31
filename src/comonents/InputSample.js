import React, { useState } from 'react';

const InputSample = ({title, children, addLists}) => {
    const [inputs, setInputs] = useState({
        userName: '',
        userNickName: ''
    });
    const {userName, userNickName} = inputs;
    const onChange = (e) => {
        const {name, value} = e.target;
        setInputs({
           ...inputs,
           [name]: value
        })
    }
    const onClick = () => {
        addLists(userName, userNickName);
        setInputs({
            userName: '',
            userNickName: ''
        })
    }
    return (
        <div>
            <h2>{title}</h2>
            {children}
            <input type='text' name='userName' 
            value={userName} onChange={onChange}/>
            <input type='text' name='userNickName' 
            value={userNickName} onChange={onChange}/>
            <button onClick={onClick}>추가</button>
        </div>
    );
};

export default InputSample;