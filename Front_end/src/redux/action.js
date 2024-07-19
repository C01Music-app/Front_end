export const  setUser = (user) => {
    return {
        type: "SET_USER",
        payload: user,
    };
};
export const  selectMusic = (song) => {
    return {
        type: "SELECT_MUSIC",
        payload: song,
    };
};
export const selectSongs = (songs) =>{
    return{
        type: "SELECT_SONGS",
        payload: songs,
    };
};
export const selectIndex = (currentSongIndex) =>{
    return{
        type: "SELECT_INDEX",
        payload: currentSongIndex,
    };
};