// 액션 타입, 액션 생성 함수, reducer함수
// 1. 액션 타입
const SET_LOGIN = 'SET_LOGIN';
const SET_LOGOUT = 'SET_LOGOUT';
const SET_ID = 'SET_ID';

// 2.액션 생성 함수
export const setLogin = () => ({
    type: SET_LOGIN
})
export const setLogout = () => ({
    type: SET_LOGOUT
})
export const setId = (id) => ({
    type: SET_ID,
    id: id
})


// 초기값 설정
const initialState = {
    isLogin: false,
    updateiId: ''
}

// 로그인 시 홈으로 이동하는 함수
export const goToHome = (navigate) => () => {
    navigate('/');
}

// 3. reducer함수 생성
export default function logincheck(state=initialState, action) {
    switch(action.type) {
        case SET_LOGIN:
            return {
                ...state,
                isLogin: true
            };
        case SET_LOGOUT:
            return {
                ...state,
                isLogin: false
            };
        case SET_ID:
            return {
                ...state,
                updateiId: action.id
            };
        default:
            return state;
    }
}