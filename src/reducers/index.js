import {
	combineReducers
} from 'redux'

// import order from './Member/order';
// import person from './Member/person';
// import homeState from './User/homeState';
// import orderState from './User/orderState';
// import managerOrder from './Manager/managerOrder';
// import employeeList from './Manager/employeeList';
// import employeeDesc from './Member/employeeDesc';
// import employeeHotelDesc from './Member/employeeHotelDesc';
// import orderDetail from './Member/orderDetail';
import orderCountsChartReducer from './Echarts/orderCountsChartReducer'

// 聚合reducer
const rootReducer = combineReducers({
	orderCountsChartReducer
})

export default rootReducer;