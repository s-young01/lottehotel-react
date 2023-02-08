import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import { API_URL } from '../config/apiurl';
import { getCookie } from '../util/cookie';

const WriteEvent = () => {
    const navigate = useNavigate();
    const isLogin = useSelector(state => state.logincheck.isLogin);
    const username = getCookie('username');
    const [formData, setFormData] = useState({
        e_title: '',
        e_time: '',
        e_titledesc: '',
        e_category: 'special',
        e_img1: '',
        e_img2: '',
        e_desc: ''
    });
    const onChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }
    // input의 type이 file인 input이 onChange 됐을 때
    // 변경된 파일을 서버로 업로드 전송하기
    const onChangeImg = (e) => {
        const {name} = e.target;
        // 폼 태그 생성하기
        const imgFormData = new FormData();
        // 폼 태그 데이터 추가하기
        imgFormData.append('file', e.target.files[0]);
        // 전송하기 
        axios.post(`${API_URL}/upload`, imgFormData, {
            headers: {'Content-Type' : 'multipart/formdata'}
        })
        .then(res => {
            setFormData({
                ...formData,
                [name]: res.data.imgUrl
            });
        })
        .catch(e => {
            console.log(e);
        })
    }   
    // 폼 전송
    const onSubmit = (e) => {
        e.preventDefault(); // 폼 태그 전송 이벤트 삭제
        // input 체크 후 addEvent 호출
        addEvent();
    }
    const addEvent = () => {
        axios.post(`${API_URL}/event`, formData)
        .then(res => {
            alert('등록되었습니다.');
            navigate('/special');
        })
        .catch(e => {
            console.log(e);
        })
    }
    useEffect(() => {
        // 로그인이 되어있지 않거나, 쿠키값에 저장된 이름이 관리자의 이름이 아닐 때 null값을 준다.
        if(!isLogin || username !== 'admin') {
            alert('관리자만 접근할 수 있습니다.');
            navigate('/');
        }
    }, [isLogin, navigate, username])
    
    return (
        <div className='inner'>
            <Title title='Event Update'/>
            <form onSubmit={onSubmit}>
                <table className='defaulttable'>
                    <tbody>
                        <tr>
                            <td>제목</td>
                            <td>
                                <input type='text' name='e_title'
                                value={formData.e_title} onChange={onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>기간</td>
                            <td>
                                <input type='text' name='e_time'
                                value={formData.e_time} onChange={onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>설명</td>
                            <td>
                                <input type='text' name='e_titledesc'
                                value={formData.e_titledesc} onChange={onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>분류</td>
                            <td>
                                <select name='e_category' onChange={onChange} value={formData.e_category}>
                                    <option value='special'>스페셜</option>
                                    <option value='promotion'>프로모션</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>사진1</td>
                            <td>
                                {/* 폼에 파일데이터 추가 -> upload경로로 post전송
                                전송 응답을 받아 setFormData -> e_img: 응답결과 */}
                                <input type='file' name='e_img1'
                                 onChange={onChangeImg}/>
                                 {formData.e_img1 && <div>
                                    <img src={`${API_URL}/upload/event/${formData.e_img1}`} 
                                    width='100px' alt=''/>
                                </div>}
                            </td>
                        </tr>
                        <tr>
                            <td>사진2</td>
                            <td>
                                <input type='file' name='e_img2'
                                 onChange={onChangeImg}/>
                                 {formData.e_img2 && <div>
                                    <img src={`${API_URL}/upload/event/${formData.e_img2}`} 
                                    width='100px' alt=''/>
                                </div>}
                            </td>
                        </tr>
                        <tr>
                            <td>상세설명글</td>
                            <td>
                               <textarea name='e_desc' value={formData.e_desc}
                               onChange={onChange}></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <button type='submit'>등록</button>
                                <button type='reset'>취소</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default WriteEvent;