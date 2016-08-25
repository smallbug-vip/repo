<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>

<title>注册</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<meta http-equiv="content-type" content="text/html;charset=utf-8">
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<link rel="stylesheet" type="text/css"
	href="<c:url value='/css/css.css'/>">
<link rel="stylesheet" type="text/css"
	href="<c:url value='/jsps/css/user/regist.css'/>">
<script type="text/javascript"
	src="<c:url value='/jquery/jquery-1.9.1.min.js'/>"></script>
<script type="text/javascript"
	src="<c:url value='/jquery/jquery.metadata.js'/>"></script>
<script type="text/javascript"
	src="<c:url value='/jquery/jquery.validate.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/common.js'/>"></script>
<script type="text/javascript"
	src="<c:url value='/jsps/js/user/regist.js'/>"></script>
<script type="text/javascript">
	$(function() {
		$("#registerForm")
				.validate(
						{
							rules : {
								username : {
									required : true,
									maxlength : 10,
									minlength : 5,
									remote : $("#url").val()
								},
								password : {
									required : true,
									rangelength : [ 5, 10 ]
								},
								rePassword : {
									required : true,
									equalTo : "input[name='password']"
								},
								email : {
									required : true,
									email : true
								},
								verifyCode : {
									required : true
								}
							},
							messages : {
								username : {
									required : "<label class='labelError'>用户名不能为空!</label>",
									maxlength : "<label class='labelError'>用户名最长为10个字符!</label>",
									minlength : "<label class='labelError'>用户名最小为5个字符!</label>",
									remote : "<label class='labelError'>用户名已存在!</label>"
								},
								password : {
									required : "<label class='labelError'>密码不能为空！</label>",
									rangelength : "<label class='labelError'>密码应介于5~10个字符之间！</label>"
								},
								rePassword : {
									required : "<label class='labelError'>密码不能为空！</label>",
									equalTo : "<label class='labelError'>两次输入密码应保持一致！</label>"
								},
								email : {
									required : "<label class='labelError'>邮箱不能为空！</label>",
									email : "<label class='labelError'>请输入正确的邮箱！</label>"
								},
								verifyCode : {
									required : "<label class='labelError'>验证码不能为空！</label>"
								}
							},
							errorPlacement : function(error, element) {
								$(element).closest("form").find(
										"#" + element.attr("name") + "Error")
										.append(error);
							}
						});
	});
	function update() {
		var src = $("#vCode").attr("src");
		if (src.indexOf("?") != -1) {
			src = src.substring(0, src.indexOf("?"));
		}
		$("#vCode").attr("src", src + "?time=" + new Date().getTime());
	}
</script>
</head>

<body>
	<jsp:useBean id="user" class="com.smallBug.domain.User" scope="request"></jsp:useBean>
	<input type="hidden"
		value="<c:url value='/client/user/validateUser'></c:url>" id="url" />
	<c:url value="/client/user" var="path" />
	<div class="divBody">
		<div class="divTitle">
			<span class="spanTitle">新用户注册</span>
		</div>
		<div class="divCenter">
			<form:form action="${path }" method="post" id="registerForm"
				modelAttribute="user">
				<input type="hidden" name="_method" value="POST" />
				<table>
					<tr>
						<td class="tdLabel">用户名：</td>
						<td class="tdInput"><form:input path="username"
								id="loginname" class="input" />
						<td class="tdError" id="usernameError"><form:errors
								path="username" class='labelError'></form:errors></td>
					</tr>
					<tr>
						<td class="tdLabel">登录密码：</td>
						<td class="tdInput"><form:password path="password"
								id="loginpass" class="input" />
						<td class="tdError" id="passwordError"><form:errors
								path="password" class='labelError'></form:errors></td>
					</tr>
					<tr>
						<td class="tdLabel">确认密码：</td>
						<td class="tdInput"><input type="password" name="rePassword"
							id="reloginpass" class="input" value="" /></td>
						<td class="tdError" id="rePasswordError"><form:errors
								path="rePassword" class='labelError'></form:errors></td>
					</tr>
					<tr>
						<td class="tdLabel">Email：</td>
						<td class="tdInput"><form:input path="email" id="email"
								class="input" />
						<td class="tdError" id="emailError"><form:errors path="email"
								class='labelError'></form:errors></td>
					</tr>
					<tr>
						<td class="tdLabel">图形验证码：</td>
						<td class="tdInput"><input type="text" name="verifyCode"
							id="verifyCode" class="input" value="" /></td>
						<td class="tdError" id="verifyCodeError"><form:errors
								path="verifyCode" class='labelError'></form:errors></td>
					</tr>
					<tr>
						<td>&nbsp;</td>
						<td><span class="verifyCodeImg"><img id="vCode"
								width="235" height="62"
								src="<c:url value='/client/login/getRegisterCode'></c:url>" /></span>
						</td>
						<td><a href="javascript:update()">换一张</a></td>
					</tr>
					<tr>
						<td>&nbsp;</td>
						<td><input type="image"
							src="<c:url value='/images/regist1.jpg'/>" id="submit" /></td>
						<td>&nbsp;</td>
					</tr>
				</table>
			</form:form>
		</div>
	</div>
</body>
</html>
