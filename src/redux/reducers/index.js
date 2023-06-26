import {combineReducers} from 'redux';
import {allSongsReducers} from './allSongsReducers'
import { activeSongsReducers, isPlayingReducer } from './activeSongReducer';

const reducers = combineReducers({
    allSongs_global: allSongsReducers,
    activeSong_global: activeSongsReducers,
    isPlyaing_global: isPlayingReducer,
})


export default reducers;