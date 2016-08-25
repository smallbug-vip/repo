<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script src="${pageContext.request.contextPath }/js/jquery-1.8.3.js"
	type="text/javascript"></script>
<script src="${pageContext.request.contextPath }/js/jquery.form.js"
	type="text/javascript"></script>
<script type="text/javascript">
	//上传图片
	function uploadPic() {
		//定义参数
		var options = {
			url : "${pageContext.request.contextPath }/upload/uploadImage.do",
			dataType : "json",
			type : "post",
			success : function(data) {
				var img = $("<img />");
				img.attr("src",data.url);
				$("#20160202852").append(img);
			}
		};

		//jquery.form使用方式
		$("#sentImage").ajaxSubmit(options);

	}
</script>
</head>
<body>

	<form id="sentImage" action="${pageContext.request.contextPath }/upload/uploadImage.do" method="post"
		enctype="multipart/form-data">
		<input type="file" onchange="uploadPic()" name="pic" />
	</form>
	<div id="20160202852"></div>
</body>
</html>