import { getAllCodeService } from '../../services/userService';
import actionTypes from './actionTypes';

// export const fetchGenderStart = () => ({
// 	type: actionTypes.FETCH_GENDER_START,
// });

export const fetchGenderStart = () => {
	return async (dispatch, getState) => {
		try {
			let res = await getAllCodeService('GENDER');
			console.log('check', res);
			if (res && res.data.errCode === 0) {
				dispatch(fetchGenderSuccess(res.data));
			} else {
				dispatch(fetchGenderFailed());
			}
		} catch (e) {
			dispatch(fetchGenderFailed());
			console.log(e);
		}
	};
};

export const fetchGenderSuccess = (genderData) => ({
	type: actionTypes.FETCH_GENDER_SUCCESS,
	data: genderData,
});

export const fetchGenderFailed = () => ({
	type: actionTypes.FETCH_GENDER_FAILED,
});

// Start Doing End
