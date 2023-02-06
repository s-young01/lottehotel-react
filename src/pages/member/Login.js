import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Title from '../../components/Title';
import { API_URL } from '../../config/apiurl';
import { setCookie } from '../../util/cookie';
import { setLogin, goToHome } from '../../modules/logincheck';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // input 입력값 상태 관리
    const [loginData, setLoginData] = useState({
        useremail: '',
        userpass: ''
    })
    const onChange = (e) => {
        const {name, value} = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        })
    }

    const onSubmit = (e) => {
        // form 전송 이벤트 제거
        e.preventDefault();
        // input에 입력 다 되었는지 확인
        if(loginData.useremail === '' || loginData.userpass === '') {
            alert('이메일과 비밀번호를 입력해주세요');
        }else {
            axios.post(`${API_URL}/login`, loginData)
            .then(result => {
                const {m_email, m_nickname} = result.data[0];
                if(m_email && m_nickname) {
                    alert('로그인 되었습니다.');
                    // 현재 시간 객체 생성
                    let expires = new Date();
                    // 60분 더한 값으로 변경
                    expires.setMinutes(expires.getMinutes() + 60);
                    // 쿠키 생성
                    setCookie('useremail', `${m_email}`, {path: '/', expires});
                    setCookie('username', `${m_nickname}`, {path: '/', expires});
                    dispatch(setLogin()); // setLogin 값이 ture
                    dispatch(goToHome(navigate)); // 홈으로 보내버려 ~
                }
            })
            .catch(e => {
                console.log(e);
            })
        }
    }
    return (
        <div className='inner' id='login'>
            <Title title='Login'/>
            <form onSubmit={onSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td>아이디 (이메일 주소)</td>
                            <td>
                                <input type='text' name='useremail'
                                value={loginData.useremail} onChange={onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>비밀번호</td>
                            <td>
                                <input type='password' name='userpass'
                                value={loginData.userpass} onChange={onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <button type='submit'>로그인</button>
                                <button><Link to='/join'>회원가입</Link></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default Login;