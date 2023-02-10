import React from 'react';
import RoomItems from '../components/RoomItems';
import Title from '../components/Title';

const RoomPage = ({data}) => {
    return (
        <div className='inner'>
            <Title title='Room'/>
            <ul>
                {data.map((item, index) => <RoomItems key={index} item={item}/>)}
            </ul>
        </div>
    );
};

export default RoomPage;