import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Title from '../../components/Title';
import { API_URL } from '../../config/apiurl';

const EditPass = () => {
    const navigate = useNavigate();
    const userId = useSelector(state => state.logincheck.updateId);
    const [formData, setFormData] = useState({
        m_pass: '',
        m_passch: '',
        m_email: userId
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
        if(formData.m_pass === formData.m_passch) {
            // ! 요청 방식 !
            // .get : 조회
            // .post : 입력
            // .put : 리소스 전체 업데이트
            // .patch : 리소스 일부를 업데이트
            axios.patch(`${API_URL}/updatepass`, formData)
            .then(res => {
                if(res.data) {
                    alert('비밀번호가 변경되었습니다.');
                    navigate('/login');
                }
            })
            .catch(e => {
                console.log(e);
            })
        }else {
            alert('비밀번호가 일치하지 않습니다.');
        }
    }

    return (
        <div className='inner'>
            <Title title='Update Paddword'/>
            <form onSubmit={onSubmit}>
                <table className='defaulttable small'>
                    <tbody>
                        <tr>
                            <td>새로운 비밀번호</td>
                            <td>
                                <input type='password' name='m_pass'
                                value={formData.m_pass} onChange={onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>비밀번호 확인</td>
                            <td>
                                <input type='password' name='m_passch'
                                value={formData.m_passch} onChange={onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <button type='submit'>변경하기</button>
                                <button type='reset'>취소</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default EditPass;