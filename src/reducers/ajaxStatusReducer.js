import { BEGIN_AJAX_CALL, AJAX_CALL_ERROR } from '../actions/actionTypes';
import { ajaxCallsInProgress } from './initialState';

function actionTypeEndsInSuccess(type) {
    return type.substring(type.length - 8) == '_SUCCESS';
}

export default function ajaxStatusReducer(state = ajaxCallsInProgress, action) {
    if(action.type == BEGIN_AJAX_CALL) {
        return state + 1;
    } else if( AJAX_CALL_ERROR || actionTypeEndsInSuccess(action.type)) {
        return state - 1;
    }

    return state;
}