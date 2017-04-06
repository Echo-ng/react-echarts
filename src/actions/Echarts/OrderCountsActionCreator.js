import * as actionTypes from '../../constants/types';
import {
	refetch
} from '../../utils/refetch.js';

export const queryOrderCounterChart = (params) => {
	params = {
		...params
	}
	return (dispatch, getState) => {
		let data = getState().data;
		let option = getState().option;
		let length = data && data.length || 0;
		if (length > 0) {
			return dispatch({
				type: actionTypes.GET_ECHARTS_ORDERS_SUCCESS,
				payload: {
					option: option,
					data: data
				}
			});
		} else {
			return refetch({
				method: 'post',
				url: '/echart/user/counter',
				data: {
					params: [{
						field: 'group',
						value: params.type
					}],
					startTime: params.startTime,
					endTime: params.endTime
				},
				success: function(resData) {
					return dispatch({
						type: actionTypes.GET_ECHARTS_ORDERS_SUCCESS,
						payload: {
							option: option,
							data: resData
						}
					});
				},
				fail: function(msg) {
					dispatch({
						type: actionTypes.GET_EMPLOYEE_LIST_FAILURE,
						payload: new Error(msg),
						error: true
					})
				},
				error: function(msg) {
					dispatch({
						type: actionTypes.GET_EMPLOYEE_LIST_FAILURE,
						payload: new Error(msg),
						error: true
					})
				}
			})
		}
	}
}