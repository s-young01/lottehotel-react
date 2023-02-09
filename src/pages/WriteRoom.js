import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import { API_URL } from '../config/apiurl';
import { getCookie } from '../util/cookie';

const WriteRoom = () => {
    const navigate = useNavigate();
    const isLogin = useSelector(state => state.logincheck.isLogin);
    const username = getCookie('username');
    const [amenitys, setAmenitys] = useState([
        {id: 1, text: '북한산 전망의 발코니', checked: false},
        {id: 2, text: '프리미엄 덕다운 침구 세트', checked: false},
        {id: 3, text: 'LG 43인치 LED TV (케이블 TV 채널)', checked: false},
        {id: 4, text: '최대 1기가 유/무선 인터넷 무료', checked: false},
        {id: 5, text: '욕실(욕조, 샤워부스)', checked: false},
        {id: 6, text: "해양심층수 '천년동안' 3병 제공", checked: false},
        {id: 7, text: '미니바 1회 무료', checked: false},
        {id: 8, text: "해양심층수 '천년동안' 2병 제공", checked: false},
        {id: 9, text: '욕실(자쿠지,샤워부스) / 화장실 2개', checked: false},
        {id: 10, text: '와인셀러', checked: false},
    ])
    const checkClick = (id) => {
        setAmenitys(amenitys.map(ame => ame.id === id ? {
            ...ame, checked: !ame.checked } : ame));
    }
    const [formData, setFormData] = useState({
        r_name: '',
        r_size: '13평',
        r_price: '',
        r_bed: '퀸 베드 1개',
        r_amenity: '',
        r_desc: '',
        r_img1: '',
        r_img2: '',
        r_img3: '',
        r_img4: '',
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
        addRoom();
    }
    const addRoom = () => {
        const amenityText = amenitys.filter(ame => ame.checked).map(ame => ame.text).join(',');
        const formData2 = {
            ...formData,
            r_amenity: amenityText
        }
        console.log(formData2);
        axios.post(`${API_URL}/room`, formData2)
        .then(res => {
            alert('등록되었습니다.');
            navigate('/room');
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
            <Title title='Room Update'/>
            <form onSubmit={onSubmit}>
                <table className='defaulttable'>
                    <tbody>
                        <tr>
                            <td>방 이름</td>
                            <td>
                                <input type='text' name='r_name'
                                value={formData.r_name} onChange={onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>배드 타입</td>
                            <td>
                                <select name='r_bed' value={formData.r_bed} onChange={onChange}>
                                    <option value='퀸 베드 1개'>퀸 베드 1개</option>
                                    <option value='싱글 배드 1개 & 세미 더블 베드 1개'>싱글 배드 1개 & 세미 더블 베드 1개</option>
                                    <option value='할리우드 베드 1개 (세미 더블 베드 2개 일체형)'>할리우드 베드 1개 (세미 더블 베드 2개 일체형)</option>
                                    <option value='싱글 베드 2개 & 침구류 1세트'>싱글 베드 2개 & 침구류 1세트</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>객실 크기</td>
                            <td>
                                <select name='r_size' value={formData.r_size} onChange={onChange}>
                                    <option value='13평'>13평</option>
                                    <option value='18평'>18평</option>
                                    <option value='24평'>24평</option>
                                    <option value='32평'>32평</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>어메니티</td>
                            <td>
                                {amenitys.map(amenity => <div key={amenity.id}>{amenity.text}
                                    <input type='checkbox' value={amenity.text} checked={amenity.checked}
                                    onChange={() => checkClick(amenity.id)}/>
                                </div>)}
                            </td>
                        </tr>
                        <tr>
                            <td>이용요금</td>
                            <td>
                               <input name='r_price' type='number' min={50000} step={1000} 
                               value={formData.r_price} onChange={onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>사진1</td>
                            <td>
                                {/* 폼에 파일데이터 추가 -> upload경로로 post전송
                                전송 응답을 받아 setFormData -> e_img: 응답결과 */}
                                <input type='file' name='r_img1'
                                 onChange={onChangeImg}/>
                                 {formData.r_img1 && <div>
                                    <img src={`${API_URL}/upload/event/${formData.r_img1}`} 
                                    width='100px' alt=''/>
                                </div>}
                            </td>
                        </tr>
                        <tr>
                            <td>사진2</td>
                            <td>
                                <input type='file' name='r_img2'
                                 onChange={onChangeImg}/>
                                 {formData.r_img2 && <div>
                                    <img src={`${API_URL}/upload/event/${formData.r_img2}`} 
                                    width='100px' alt=''/>
                                </div>}
                            </td>
                        </tr>
                        <tr>
                            <td>사진3</td>
                            <td>
                                <input type='file' name='r_img3'
                                 onChange={onChangeImg}/>
                                 {formData.r_img3 && <div>
                                    <img src={`${API_URL}/upload/event/${formData.r_img3}`} 
                                    width='100px' alt=''/>
                                </div>}
                            </td>
                        </tr>
                        <tr>
                            <td>사진4</td>
                            <td>
                                <input type='file' name='r_img4'
                                 onChange={onChangeImg}/>
                                 {formData.r_img4 && <div>
                                    <img src={`${API_URL}/upload/event/${formData.r_img4}`} 
                                    width='100px' alt=''/>
                                </div>}
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

export default WriteRoom;