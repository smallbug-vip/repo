<script src="<vip:staticPath/>/plugins/layer/layer.js"></script>

-1  正常
0   叹号
1	对号
2	差号
3	问号
4	加锁
5	不开心
6	开心



////////////////////////////////////

layer.alert(dataObj.result, {
	icon: 1,
	shadeClose: true,
	title: '用户【'+username+'】的缓存信息'
});

///////////////////////////////////////

layer.confirm('确定要删除吗？', {
	  btn: ['确定','取消'],
	  icon: 0
	}, function(){
		location.href = '${pageContext.request.contextPath}/system/user/del/' + id;
	}, function(){
	 
});

///////////////////////////////////////

layer.msg('也可以这样', {
 	icon: 0,
    time: 20000,
    btn: ['明白了', '知道了']
});




if('${result_information}')
			layer.msg('${result_information}');

	/**
	 * 将结果结果显示在客户端
	 * 
	 * @timestamp 2016年9月24日 下午1:39:26
	 * @param request
	 */
	private void showInformation(HttpServletRequest request) {
		Object obj = request.getSession().getAttribute(INFORMATION);
		if (obj != null)
			request.setAttribute(INFORMATION, obj);
		request.getSession().removeAttribute(INFORMATION);
	}