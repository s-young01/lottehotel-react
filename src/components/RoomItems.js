import React from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../config/apiurl';
import './RoomItems.css';

const RoomItems = ({item}) => {
    const price = Number(item.r_price).toLocaleString('ko-KR');
    return (
        <li className='roomitem'>
            <div>
                <img src={`${API_URL}/upload/event/${item.r_img1}`} alt=''/>
            </div>
            <div>
                <h3>{item.r_name}</h3>
                <p>기준인원 : 2 <br/> 최대인원 : 3</p>
            </div>
            <div>
                <div className='price'>
                    {price}<br/><span>원 / 1박</span>
                </div>
                <div>
                    <button><Link to={`/roomdetail/${item.r_no}`}>객실 상세보기</Link></button>
                    <button><Link to='/reservation'></Link>예약하기</button>
                </div>
            </div>
        </li>
    );
};

export default RoomItems;