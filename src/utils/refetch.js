import Refetch from 'refetch';

export function refetch(options) {
	let method = options.method || 'post';
	let dataType = options.options || {dataType: 'json', timeout: 30000};
	const fetch = Refetch.create({
		data: options.data,			// 数据，会被get等方法参数merge
		options: dataType,		// 请求参数
		promise: (f) => f.then((res, xhr) => {
			if(typeof res == 'string'){res = JSON.parse(res);}
			if(res.code.toLowerCase() == "success") {
				options.success(res);
			}else{
				options.fail(res.msg,res);
			}
		}).catch(function(error, response, xhr) {
			if(dataType.timeout > 30000){
        		options.error('请求超时，请稍后再试...');
        	}
    	})
	})
	fetch[method]('/hotelmgmt/api'+options.url);
}

export function ajax(options){
	let method = options.method || 'post';
	let dataType = options.options || {dataType: 'json', timeout: 30000};
	const fetch = Refetch.create({
		data: options.data,			// 数据，会被get等方法参数merge
		options: dataType,		// 请求参数
		promise: (f) => f.then((res, xhr) => {
			options.success(res);			
		}).catch(function(error, response, xhr) {
			if(dataType.timeout > 30000){
        		options.error('请求超时，请稍后再试...');
        	}
    	})
	})
	fetch[method](options.url);
}