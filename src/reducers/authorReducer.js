import { 
    LOAD_AUTHORS_SUCCESS 
} from '../actions/actionTypes';
import { authors } from './initialState';

export default function authorReducer(state = authors, action) {
    switch(action.type) {
        case LOAD_AUTHORS_SUCCESS:
            return action.authors;
        default:
            return state;
    }
}