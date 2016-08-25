*****一、HTTP协议
		1.1协议的作用及版本
			1.1.1HTTP是Hyper Text Transfer Protocol（超文本--html传输协议）。
			1.1.2HTTP协议的作用用户描述客户端与服务器间的数据传递的。
			1.1.3：Http协议的版本：
					1.0：特点：每次请求服务器上的资源都要建立新的连接，响应完毕后都会关闭连接。是无状态的协议。
					1.1:特点：在一次TCP/IP连接的基础上可以发出多次请求和得到多次的响应。比1.0多了一些请求和响应头。
					
		1.2协议的组成
			1.2.1请求部分：
				GET /App1/1.html HTTP/1.1
				Accept: */*
				Accept-Language: zh-cn
				Accept-Encoding: gzip, deflate
				User-Agent: Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729)
				Host: localhost:8080
				Connection: Keep-Alive
				
				username=admin&password=123
				
				请求部分由三部分组成的：
					请求行：位于第一行
					请求消息头：从第二行开始至第一个空行结束
					请求正文：从第一个空行之后的都是正文
					
			1.2.2响应部分：
				HTTP/1.1 200 OK
				Server: Apache-Coyote/1.1
				Accept-Ranges: bytes
				ETag: W/"65-1366335797484"
				Last-Modified: Fri, 19 Apr 2013 01:43:17 GMT
				Content-Type: text/html
				Content-Length: 65
				Date: Fri, 19 Apr 2013 02:06:23 GMT
				Warnning：w1
				Warnning: w2

				hello http
				<a href="b.html">click</a>
				<img src="1.jpg"/>

				响应部分由三部分组成的：
					响应行：位于第一行
					响应消息头：从第二行开始至第一个空行结束
					响应正文：从第一个空行之后的都是正文
		1.3协议详细讲解
				请求行：GET /App1/1.html HTTP/1.1
						GET：请求方式。默认的请求方式。其他常用的请求方式还有POST。
							GET的特点：默认的请求方式。
								/App1/c.html?username=sdsfds&password=234324
								把表单的请求的数据放在了请求的URI的后面。?username=sdsfds&password=234324
								这样不好:暴露数据；请求行长度有限。
							POST的特点(经常使用的)：借助HTML中的form表单。<form action="c.html" method="post">
								请求参数出现在正文部分。长度木有限制。相对安全。
						---------------------------
						/App1/1.html:请求的资源的URI。
						---------------------------
						HTTP/1.1：客户端使用的协议的版本
						
				响应行：HTTP/1.1 200 OK
						HTTP/1.1：服务器用的协议版本
						200：响应码。代表服务器处理的结果的一种表示
								200：正常
								302/307：重定向
								304:服务器的资源没有被修改
								404：请求的资源不存在
								500：服务器报错了
						OK：响应码描述
				请求消息头：向服务器传递附加信息
					Accept:通知服务器，浏览器可以接受的MIME类型。（文件系统中用文件扩展名区分数据的类型。网络上用MIME类型来区分数据类型。Tomcat\conf\web.mxl）
														MIME类型名称：大类型/小类型
					Accept-Charset:通知服务器，浏览器支持的字符集
					Accept-Encoding:通知服务器，浏览器能够解码的数据压缩方式。比如：gzip
					Accept-language:通知服务器，所希望的语言
					Host：请求的主机和端口
					*Referer：是一个URL地址。取值是当前页面之前的那个页面地址的。防盗链
					*Content-Type:通知服务器，请求正文的MIME类型。
							取值：application/x-www-form-urlencoded默认值
							对应的是form表单的enctype属性
					If-Modified-Since:通知服务器，缓存的文件的最后修改时间。
					User-Agent:通知服务器，浏览器类型.
					Content-Length:表示请求消息正文的长度 
					Connection:表示是否需要持久连接。如果服务器看到这里的值为“Keep -Alive”，或者看到请求使用的是HTTP 1.1（HTTP 1.1默认进行持久连接 
					*****Cookie:这是最重要的请求头信息之一（会话有关）
				响应消息头：
					*Location:通知客户端，指示新的资源的位置（结合302/307来用。请求重定向）
					Server:通知客户端，服务器的类型
					*Content-Encoding:通知客户端，响应正文的压缩编码方式。常用的是gzip。
					*Content-Length：通知客户端响应正文的数据大小
					*Content-Type:通知客户端响应正文的MIME类型
					*Refresh：让浏览器自动刷新。取值为整数（刷新的时间间隔，单位是秒）
								Refresh:3
								Refresh:3;URL=其他资源的URI
					*Content-Disposition：通知客户端，以下载的方式打开资源。
								Content-Disposition：attachment;filename=1.jpg
					*****Set-Cookie:SS=Q0=5Lb_nQ; path=/search服务器端发送的Cookie（会话有关）
					
					*Expires: -1                                            网页的有效时间。单位是毫秒
					*Cache-Control: no-cache (1.1)  
					*Pragma: no-cache   (1.0)                               通知客户端不要缓存