// 路由配置
import React, {
	PropTypes,
	Component
} from 'react'
import {
	Router,
	Route,
	IndexRoute
} from 'react-router'

// App 入口
import App from './containers/App'


// Echart图表
import OrderCountsChart from './containers/Echart/Chart/OrderCountsChart';

// 配置 router
export default (
	<Route path="/hotelmgmt/h5" component={App}>
		<Route path="manager/echart/orderCount" component={OrderCountsChart}/>
	</Route>
)