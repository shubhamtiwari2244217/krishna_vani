const activeSongReducers = (state = [], action)=>{
    switch(action.type){
        case 'SET_ACTIVE_SONG':
            return action.payload;
        default:
            return state;
                 
    }
}

const isPlayingReducer = (state = false, action) =>{
    switch (action.type){
        case 'SET_IS_PLAYING':
            return action.payload;
        default:
            return state;
    }
}

export {activeSongReducers, isPlayingReducer};