import axios from "axios";
import { API_URL } from "../config/apiurl";

// 액션 타입
// 1. 여러 개의 데이터를 받아왔을 때
const GET_DATAS = 'special/GET_DATAS';
const GET_DATAS_SUCSESS = 'special/GET_DATAS_SUCSESS';
const GET_DATAS_ERROR = 'special/GET_DATAS_ERROR';
// 2. 한 개의 데이터를 받아왔을 때
const GET_DATA = 'special/GET_DATA';
const GET_DATA_SUCSESS = 'special/GET_DATA_SUCSESS';
const GET_DATA_ERROR = 'special/GET_DATA_ERROR';

// 초기 값 설정
const initialState = {
    // 1. 여러 개의 데이터...
    specials : {
        loading: false,
        data: null,
        error: null
    },
    // 2. 한 개의 데이터...
    special : {
        loading: false,
        data: null,
        error: null
    }
}

// redux-middleware thunk함수 생성
// thunk 함수를 사용해서 action객체를 dispatch하기
export const getDatas = () => async dispatch => {
    dispatch({type: GET_DATAS}) // 요청 시작
    // 에러 핸들링
    try{
        const response = await axios.get(`${API_URL}/special`);
        const data = response.data;
        dispatch({type: GET_DATAS_SUCSESS, data: data});
    }
    catch(e) {
        dispatch({type: GET_DATAS_ERROR, error: e});
    }
}
export const getData = no => async dispatch => {
    dispatch({type: GET_DATA}) // 요청 시작
    // 에러 핸들링
    try{
        const response = await axios.get(`${API_URL}/special/${no}`);
        const data = response.data;
        dispatch({type: GET_DATA_SUCSESS, data: data});
    }
    catch(e) {
        dispatch({type: GET_DATA_ERROR, error: e});
    }
}

// 리듀서 함수
export default function special(state=initialState, action) {
    switch(action.type) {
        // 여러 개의 데이터 요청 시작
        case GET_DATAS:
            return {
                ...state,
                specials: {
                    loading: true,
                    data: null,
                    error: null
                }
            };
        case GET_DATAS_SUCSESS:
            return {
                ...state,
                specials: {
                    loading: false,
                    data: action.data,
                    error: null
                }
            };
        case GET_DATAS_ERROR:
            return {
                ...state,
                specials: {
                    loading: false,
                    data: null,
                    error: action.error
                }
            };
        // 한 개의 데이터 요청 시작
        case GET_DATA:
            return {
                ...state,
                special: {
                    loading: true,
                    data: null,
                    error: null
                }
            };
        case GET_DATA_SUCSESS:
            return {
                ...state,
                special: {
                    loading: false,
                    data: action.data,
                    error: null
                }
            };
        case GET_DATA_ERROR:
            return {
                ...state,
                special: {
                    loading: false,
                    data: null,
                    error: action.error
                }
            };
        default:
            return state;
    }
}