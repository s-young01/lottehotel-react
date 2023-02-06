import axios from 'axios';
import React, { useState } from 'react';
import PopupDom from '../../components/PopupDom';
import PopupPostCode from '../../components/PopupPostCode';
import Title from '../../components/Title';
import { API_URL } from '../../config/apiurl';

const JoinPage = () => {
    const [formData, setFormData] = useState({
        m_name: '',
        m_email: '',
        m_pass: '',
        m_passch: '',
        m_nickname: '',
        m_phone: '',
        m_address1: '',
        m_address2: ''
    });
    const onChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    // 팝업창 상태관리
    const [isPopupOpen, setisPopupOpen] = useState(false);
    // 팝업창 열기
    const openPostCode = () => {
        setisPopupOpen(true);
    }
    // 팝업창 닫기 
    const onClose = () => {
        setisPopupOpen(false);
    }
    // 주소 넣기
    const onAddData = (data) => {
        console.log(data);
        setFormData({
            ...formData,
            m_address1: data.address
        })
    }
    // 폼 전송 이벤트
    const onSubmit = (e) => {
        e.preventDefault();
        // 입력 다 되었는지 확인
        if(formData.m_name !== '' && formData.m_pass !== ''
        && formData.m_passch !== '' && formData.m_email !== ''
        && formData.m_nickname !== '' && formData.m_phone !== ''
        && formData.m_add1 !== '' && formData.m_add2 !== '') {
            addMember();
        }
    }
    const addMember = () => {
        axios.post(`${API_URL}/join`, formData)
        .then(res => {
            alert('등록되었습니다.');
        })
        .catch(e => {
            console.log('에러가 발생했습니다.');
            console.log(e);
        })
    }

    return (
        <div>
            <Title title='Join'/>
            <div className='inner'>
                <form onSubmit={onSubmit}>
                    <table className='defaulttable'>
                        <tbody>
                            <tr>
                                <td>이름</td>
                                <td>
                                    <input name='m_name' type='text'
                                    value={formData.m_name}
                                    onChange={onChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>이메일 주소(아이디)</td>
                                <td>
                                    <input name='m_email' type='text'
                                    value={formData.m_email}
                                    onChange={onChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>비밀번호</td>
                                <td>
                                    <input name='m_pass' type='password'
                                    value={formData.m_pass}
                                    onChange={onChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>비밀번호 확인</td>
                                <td>
                                    <input name='m_passch' type='password'
                                    value={formData.m_passch}
                                    onChange={onChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>별명</td>
                                <td>
                                    <input name='m_nickname' type='text'
                                    value={formData.m_nickname}
                                    onChange={onChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>전화번호</td>
                                <td>
                                    <input name='m_phone' type='text'
                                    value={formData.m_phone}
                                    onChange={onChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>주소</td>
                                <td>
                                    <input name='m_address1' type='text'
                                    value={formData.m_address1}
                                    onChange={onChange}/>
                                    <input name='m_address2' type='text'
                                    value={formData.m_address2}
                                    onChange={onChange}/>
                                    <button onClick={openPostCode} type="button">우편번호 검색</button>
                                    <div id='popupDom'>
                                        {isPopupOpen && (
                                            <PopupDom>
                                                <PopupPostCode onClose={onClose}
                                                onAddData={onAddData}/>
                                            </PopupDom>
                                        )}
                                    </div>
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
        </div>
    );
};

export default JoinPage;