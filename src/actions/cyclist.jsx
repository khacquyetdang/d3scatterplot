import * as webapi  from '../api';
import { FETCH_CYCLIST_REQUEST, FETCH_CYCLIST_SUCCESS, FETCH_CYCLIST_ERROR} from '../constants';

export function fetchCyclistRequest() {
    return {
        type: FETCH_CYCLIST_REQUEST,
    }
};
//

export function fetchCyclistSuccess(response) {
    return {
        type: FETCH_CYCLIST_SUCCESS,
        response
    }
};

export function fetchCyclistFailure(error) {
    return {
        type: FETCH_CYCLIST_ERROR,
        error
    }
};

export const fetchCyclist = () => (dispatch, getState) => {
    console.log("fetchCyclist ");
    dispatch(fetchCyclistRequest());
    webapi.fetchCyclistData().then(response => {
        dispatch(fetchCyclistSuccess(response));
    },
    error => {
        dispatch(fetchCyclistFailure(error.message || 'Something went wrong.'));
    });
}
