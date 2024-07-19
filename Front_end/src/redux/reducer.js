
// Khai báo các action types
const SET_USER = 'SET_USER';
const SELECT_MUSIC ='SELECT_MUSIC';
const SELECT_SONGS ='SELECT_SONGS';
const SELECT_INDEX ='SELECT_INDEX';

// Khởi tạo state ban đầu
const initialState = {
   user : {
       idUser:"",
       userName:"truong mac dinh",
       roles:"",
       token:""
   },
    song: {
       id:"",
       title:""

    },
    songs:[],
    currentSongIndex: -1,
};

// Định nghĩa reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload,
            };
            case SELECT_MUSIC:
            return {
                ...state,
                song: action.payload,
            };
        case SELECT_SONGS:
            return {
                ...state,
                songs: action.payload,
            };
            case SELECT_INDEX:
            return {
                ...state,
                currentSongIndex: action.payload,
            };
        default:
            return state;
    }
};
export  default reducer ;