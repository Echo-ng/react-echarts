import React from 'react';
import ReactEcharts from 'echarts-for-react';
import {
	connect
} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {
	bindActionCreators
} from 'redux';
import * as OrderCountsActionCreator from '../../../actions/Echarts/OrderCountsActionCreator'
const init_option = {
    tooltip: {},
    //工具栏
    toolbox: {
        right: '10%',
        iconStyle: {
            normal: {
                borderWidth: 1
            }
        },
        feature: {
            saveAsImage: {}
        }
    },
    legend: {
        orient: 'vertical',
        x: 'right',
        data: [{
            name: '订单总量'
        }, {
            name: '已完成订单'
        }, {
            name: '已取消订单'
        }]
    },
    grid: {
        top: 80,
        bottom: 100,
        right: 100
    },
    xAxis: {
        type: 'category',
        name: '月份',
        nameLocation: 'end',
        axisLabel: {
            'interval': 0
        },
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        splitLine: {
            show: false
        }
    },
    yAxis: {
        type: 'value',
        name: '订单数量'
    },
    series: [{
        type: 'line',
        name: '订单总量',
        connectNulls: true,
        data: [6320,8295,7545,8828,7356,5827,9445,9232,7764,5239,4374,11150]
    }, {
        type: 'bar',
        name: '已完成订单',
        data: [997, 2788, 6301, 6667, 967, 1890, 5976, 7725, 1898, 2744, 4299, 6384],
        itemStyle: {
            normal: {
                color: '#458B00'
            }
        }
    }, {
        type: 'bar',
        name: '已取消订单',
        data: [5323, 5507, 1244, 2161, 6389, 3937, 3469, 1507, 5866, 2495, 75, 4766],
        itemStyle: {
            normal: {
                color: '#8B0000'
            }
        }
    }, {
        type: 'pie',
        name: '完成订单百分比',
        radius: [0, '20%'],
        center: ['80%', '15%'],
        data: [{
            value: [48636],
            name: '已完成订单',
            itemStyle: {
                normal: {
                    color: '#458B00'
                }
            }
        }, {
            value: [42664],
            name: '已取消订单',
            itemStyle: {
                normal: {
                    color: '#8B0000'
                }
            }
        }]
    }]
};
//props与state的映射
const mapStateToProps = state => {
	return {
		option: state.option,
		notMerge: state.notMerge,
		lazyUpdate: state.lazyUpdate,
		showLoading: state.loading
	}
};
//props与action的映射
const mapDispatchToProps = dispatch => {
	return {
		OrderCountsActionCreator: bindActionCreators(OrderCountsActionCreator, dispatch)
	}
};


@connect(mapStateToProps, mapDispatchToProps)
export default class OrderCountsChart extends React.Component {
	// static propTypes = {
	// 	name: React.PropTypes.string,
	// };

	constructor(props, context) {
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			option: init_option,
			notMerge: true,
			lazyUpdate: true,
			loading: true,
			data: {},
		}
	}
	componentWillMount() {
		document.title = '报销系统-图表'
	}
	componentDidMount() {
		//action
		let {
			OrderCountsActionCreator
		} = this.props;
		OrderCountsActionCreator.queryOrderCounterChart({
			type: 'year',
			startTime: '2016-01-01 00:00:00',
			endTime: '2017-06-01 00:00:00'
		});
	}

	render() {
		return (
			<ReactEcharts option={this.state.option} notMerge={this.state.notMerge} lazyUpdate={this.state.lazyUpdate} showLoading={!this.state.loading}  />
		);
	}
}