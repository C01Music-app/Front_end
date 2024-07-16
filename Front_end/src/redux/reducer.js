
// Khai báo các action types
const SET_USER = 'SET_USER';

// Khởi tạo state ban đầu
const initialState = {
    idUser:"",
    userName:"truong mac dinh",
    roles:"",
    token:""
};

// Định nghĩa reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};
export  default reducer ;