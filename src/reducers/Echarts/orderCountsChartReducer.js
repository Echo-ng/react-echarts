import * as actionTypes from '../../constants/types';

const initialState = {
	loading: true
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.GET_ECHARTS_ORDERS_REQUEST:
			return {
				...state,
				loading: false
			}
		case actionTypes.GET_ECHARTS_ORDERS_SUCCESS:
			// return{
			// 	 ...state,
			//              loading: false,
			// 	employeeList: action.employeeList
			// }
			return Object.assign({}, state, {
				option: action.payload.option,
				data: action.payload.data,
				loading: false
			});
		case actionTypes.GET_EMPLOYEE_LIST_FAILURE:
			return {
				...state,
				loading: false
			}
		default:
			return state;
	}
}