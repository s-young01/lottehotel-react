import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Title from '../../components/Title';
import { API_URL } from '../../config/apiurl';
import { setId } from '../../modules/logincheck';

const PassFind = () => {
    const dispatch = useDispatch();
    const [idInfo, setIdInfo] = useState('');
    const [formData, setFormData] = useState({
        m_name: '',
        m_email: ''
    });
    const onChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }
    const onSubmit = (e) => {
        e.preventDefault();
        axios.post(`${API_URL}/findpass`, formData)
        .then(res => {
            alert('아이디와 이름이 확인되었습니다.')
            setIdInfo(res.data);
            dispatch(setId(res.data));
        })
        .catch(e => {
            console.log(e);
        })
    }
    return (
        <div className='inner'>
            <Title title='Find Pass'/>
            {idInfo ? <div className='small'> 
                <p>당신의 비밀번호는 입니다.</p>
                <p>비밀번호를 변경할 수 있습니다.</p>
                <Link to='/updatepass'><button>비밀번호 변경하기</button></Link>
                <Link to='/login'><button>로그인</button></Link>
            </div>  :
            <>
                <p className='small'>가입 시 입력한 이름과 아이디(이메일주소)를 입력해 주세요.</p>
                <form onSubmit={onSubmit}>
                    <table className='defaulttable small'>
                        <tbody>
                            <tr>
                                <td>이름</td>
                                <td>
                                    <input name='m_name' type='text'
                                    value={FormData.m_name} onChange={onChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>아이디 (이메일)</td>
                                <td>
                                    <input name='m_email' type='text'
                                    value={FormData.m_email} onChange={onChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <button type='submit'>찾기</button>
                                    <button type='reset'>취소</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </>}
        </div>
    );
};

export default PassFind;