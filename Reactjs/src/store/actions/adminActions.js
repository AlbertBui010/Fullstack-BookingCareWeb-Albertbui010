import {
	getAllCodeService,
	createNewUserService,
	getAllUsers,
	deleteUserByIdService,
	editUserService,
	getTopDoctorHomeServices,
	getAllDoctors,
	saveDetailInforDoctorServices,
} from '../../services/userService';

import actionTypes from './actionTypes';
import { toast } from 'react-toastify';

// gender
export const fetchGenderStart = () => {
	return async (dispatch, getState) => {
		try {
			dispatch({ type: actionTypes.FETCH_GENDER_START });
			let res = await getAllCodeService('GENDER');
			if (res && res.data.errCode === 0) {
				dispatch(fetchGenderSuccess(res.data));
			} else {
				dispatch(fetchGenderFailed());
			}
		} catch (e) {
			dispatch(fetchGenderFailed());
			console.log('Fetch gender failed: ', e);
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

// position
export const fetchPositionStart = () => {
	return async (dispatch, getState) => {
		try {
			let res = await getAllCodeService('POSITION');
			if (res && res.data.errCode === 0) {
				dispatch(fetchPositionSuccess(res.data));
			} else {
				dispatch(fetchPositionFailed());
			}
		} catch (e) {
			dispatch(fetchPositionFailed());
			console.log('Fetch position failed: ', e);
		}
	};
};

export const fetchPositionSuccess = (positionData) => ({
	type: actionTypes.FETCH_POSITION_SUCCESS,
	data: positionData,
});

export const fetchPositionFailed = () => ({
	type: actionTypes.FETCH_POSITION_FAILED,
});

// role
export const fetchRoleStart = () => {
	return async (dispatch, getState) => {
		try {
			let res = await getAllCodeService('ROLE');
			if (res && res.data.errCode === 0) {
				dispatch(fetchRoleSuccess(res.data));
			} else {
				dispatch(fetchRoleFailed());
			}
		} catch (e) {
			dispatch(fetchRoleFailed());
			console.log('Fetch role failed: ', e);
		}
	};
};

export const fetchRoleSuccess = (roleData) => ({
	type: actionTypes.FETCH_ROLE_SUCCESS,
	data: roleData,
});

export const fetchRoleFailed = () => ({
	type: actionTypes.FETCH_ROLE_FAILED,
});

// C: create new user
export const createNewUser = (data) => {
	return async (dispatch, getState) => {
		try {
			let res = await createNewUserService(data);
			toast.success('New user added successfully');
			if (res && res.data.errCode === 0) {
				dispatch(saveUserSuccess(res.data));
				dispatch(fetchAllUsersStart());
			} else {
				toast.error('New user added failed!');
				dispatch(saveUserFailed());
			}
		} catch (e) {
			toast.error('New user added error!');
			dispatch(saveUserFailed());
			console.log('Save user failed: ', e);
		}
	};
};

export const saveUserSuccess = () => ({
	type: 'CREATE_USER_SUCCESS',
});

export const saveUserFailed = () => ({
	type: 'CREATE_USER_FAILED',
});

// R: get all users
export const fetchAllUsersStart = () => {
	return async (dispatch, getState) => {
		try {
			let res = await getAllUsers('ALL');
			if (res && res.data.errCode === 0) {
				dispatch(fetchAllUsersSuccess(res.data.users.reverse()));
			} else {
				toast.error('Fetch all users error!');
				dispatch(fetchAllUsersFailed());
			}
		} catch (e) {
			toast.error('Fetch all users error!');
			dispatch(fetchAllUsersFailed());
			console.log('Fetch all users failed: ', e);
		}
	};
};

export const fetchAllUsersSuccess = (data) => ({
	type: actionTypes.FETCH_ALL_USERS_SUCCESS,
	users: data,
});

export const fetchAllUsersFailed = () => ({
	type: actionTypes.FETCH_ALL_USERS_FAILED,
});

// U: edit user
export const editAUser = (data) => {
	return async (dispatch, getState) => {
		try {
			let res = await editUserService(data);
			toast.success('Successfully edited user');
			if (res && res.data.errCode === 0) {
				dispatch(editUserSuccess(data));
				dispatch(fetchAllUsersStart());
			} else {
				toast.error('User edition failed');
				dispatch(editUserFailed());
			}
		} catch (e) {
			toast.error('User edition error');
			dispatch(editUserFailed());
			console.log('User edition failed', e);
		}
	};
};

export const editUserSuccess = () => ({
	type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
	type: actionTypes.EDIT_USER_FAILED,
});

// D: delete user
export const deleteAUser = (userId) => {
	return async (dispatch, getState) => {
		try {
			let res = await deleteUserByIdService(userId);
			toast.success('Successfully deleted user');
			if (res && res.data.errCode === 0) {
				dispatch(deleteUserSuccess(res.data));
				dispatch(fetchAllUsersStart());
			} else {
				toast.error('User deletion failed');
				dispatch(deleteUserFailed());
			}
		} catch (e) {
			toast.error('User deletion error');
			dispatch(deleteUserFailed());
			console.log('User deletion failed', e);
		}
	};
};

export const deleteUserSuccess = () => ({
	type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
	type: actionTypes.FETCH_ALL_USERS_FAILED,
});

// Doctor
export const fetchTopDoctor = () => {
	return async (dispatch, getState) => {
		try {
			let res = await getTopDoctorHomeServices('');
			let resData = res.data;
			if (resData && resData.errCode === 0) {
				dispatch({
					type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
					dataDoctors: resData.data,
				});
			} else {
				dispatch({
					type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
				});
			}
		} catch (e) {
			console.log('Fetch top doctors failed: ', e);
			dispatch({
				type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
			});
		}
	};
};

export const fetchAllDoctors = () => {
	return async (dispatch, getState) => {
		try {
			let res = await getAllDoctors();
			let resData = res.data;
			if (resData && resData.errCode === 0) {
				dispatch({
					type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
					dataDr: resData.data,
				});
			} else {
				dispatch({
					type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
				});
			}
		} catch (e) {
			console.log('Fetch all doctors failed: ', e);
			dispatch({
				type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
			});
		}
	};
};

export const saveDetailInforDoctor = (data) => {
	return async (dispatch, getState) => {
		try {
			let res = await saveDetailInforDoctorServices(data);
			console.log('ALbert check res from adminAction: ', res);
			if (res.data && res.data.errCode === 0) {
				toast.success('Update detail information doctor successfully');
				dispatch({
					type: actionTypes.SAVE_DETAIL_INFOR_DOCTOR_SUCCESS,
				});
			} else {
				toast.error('Update detail information doctor failed!');
				dispatch({
					type: actionTypes.SAVE_DETAIL_INFOR_DOCTOR_FAILED,
				});
			}
		} catch (e) {
			toast.error('Update detail information doctor failed!');
			dispatch({
				type: actionTypes.SAVE_DETAIL_INFOR_DOCTOR_FAILED,
			});
		}
	};
};

export const fetchAllScheduleTime = () => {
	return async (dispatch, getState) => {
		try {
			let res = await getAllCodeService('TIME');
			let resData = res.data;
			if (resData && resData.errCode === 0) {
				dispatch({
					type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
					dataTime: resData.data,
				});
			} else {
				dispatch({
					type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
				});
			}
		} catch (e) {
			console.log('Fetch all schedule time failed: ', e);
			dispatch({
				type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
			});
		}
	};
};
