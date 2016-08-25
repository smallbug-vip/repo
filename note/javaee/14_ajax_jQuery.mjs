Lesson1

	一、JavaScript中定义函数的三种方式
		1、正常方法：如同Java中定义方法一样。
		function 函数名(参数1,参数2){
			//函数体
		}
		要想使用，必须通过名称去调用。

	2、使用函数构造方法
		var 函数名=new Function("参数1","参数2","函数体");

		要想使用，必须通过名称去调用。

	3、函数直接量的形式（最为常用的）
		var 函数名 = function(参数1,参数2){
			//语句1;语句2;
			语句1
			语句2;
		}
	二、JavaScript中的逻辑判断
		在逻辑运算中，0、""、false、null、undefined、NaN均表示false
	三、JavaScript中的数组是可变长度的
	
Lesson2
一、DOM练习：
	1、左右选择搞定
	2、省市二级联动
	3、checkbox的全选、全不选
二、JavaScript中的窗口操作
三、基于JavaScript的客户端验证
******四、AJAX原理
	4.1概述
	4.2编写步骤
		1、测试与服务器的通信
			a、创建XmlHttpRequest对象，固定写法：
					function createXmlHttpRequest(){
					   var xmlHttp;
					   try{    //Firefox, Opera 8.0+, Safari
							   xmlHttp=new XMLHttpRequest();
						}catch (e){
							   try{    //Internet Explorer
									  xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
								}catch (e){
									  try{
											  xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
									  }catch (e){}  
							   }
						}
					   return xmlHttp;
					 }
					 
					 var xhr = createXmlHttpRequest();
			b、注册状态变化的事件处理：
				xhr.onreadystatechange=function(){
					if(xhr.readyState==4){
						//真正的处理
						if(xhr.status==200||xhr.status==304){
							//服务器正确返回
							var data = xhr.responseText;//服务器返回的数据
							//把返回的数据写到div中
							document.getElementById("d1").innerHTML=data;
						}
					}
				}
			c、初始化xhr对象
				xhr.open("GET","/ajaxday02/servlet/ServletDemo1?time="+new Date().getTime());
			d、向服务器发送数据
				xhr.send(null);
	4.3XmlHttpRequest详解（JavaScript对象）
		常用属性：
			readyState：代表着XmlHttpRequest对象的当前状态
				0 (未初始化) 对象已建立，但是尚未初始化（尚未调用open方法） 
				1 (初始化) 对象已建立，尚未调用send方法 
				2 (发送数据) send方法已调用，但是当前的状态及http头未知 
				3 (数据传送中) 已接收部分数据，因为响应及http头不全，
				4 (完成) 数据接收完毕,此时可以通过通过responseBody和responseText获取完整的回应数据 
			只有为4，客户端操作相应的处理
			-------------------------------------------------
			status：代表服务器的HTTP相应码。200是成功。304服务器端内容没有改变。
			-------------------------------------------------
			responseText：服务器返回文本数据。
			
			onreadystatechange：当XmlHttpRequest对象的readyState发生变化时，都会触发该事件。
			
		常用方法：
			open(method,url,isAsync):初始化XmlHttpRequest对象。
				method：请求方式。一般使用get或者post
				url：请求的服务器地址。可以使用相对路径或者绝对路径。
						特别注意：如果该地址没有变化，浏览器一般不会再次发出请求的。解决办法，加上一个时间戳。
							/ajaxday02/servlet/ServletDemo1?time="+new Date().getTime()
				isAsync：是否是异步请求。默认是true。
			send(requestData):向服务器发送请求数据。没有传递null。
				数据时用在POST请求方式的。数据形式：username=admin&password=123
				
		通过XmlHttpRequest向服务器发送POST请求：
			//设置请求消息头，告知服务器，发送的正文数据的类型。
				xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");//固定写法
				//发送数据
				xhr.send("username=admin&password=123");
	4.4服务端返回的数据
		HTML数据
			responseText：他是XmlHttpRequest对象的一个属性。服务器返回的数据会封装到此属性中。
			
		XML数据
			responseXML:返回的是xml对象的DOM对象。
			
		*****JSON数据
		
jQuery
一、与DOM之间的相互转换
	1、DOM-->jQuery $obj = $(obj)
	2、jQuery-->DOM 
		 //jQuery对象是一个数组对象，可以通过[index]的方法，来得到相应的DOM对象
		 var obj = $obj[0];
		 get方式得到DOM对象
		 var obj = $obj.get(0);
二、选择器
	基本
		1、$("#myDiv");  //查找 ID 为"myDiv"的元素。
		2、$("div");     //根据给定的元素名匹配所有元素
		3、$(".myClass");  //根据给定的类匹配元素。
		4、$("*")  //匹配所有元素
		5、$("div,span,p.myClass")  //将每一个选择器匹配到的元素合并后一起返回。取的是并集
	属性
		27、$("div[id]")  //查找所有含有 id 属性的 div 元素
		28、$("input[name='newsletter']")  //查找所有 name 属性是 newsletter 的 input 元素
		29、$("input[name!='newsletter']")  //查找所有 name 属性不是 newsletter 的 input 元素
		30、$("input[name^='news']")  //查找所有 name 以 'news' 开始的 input 元素
		31、$("input[name$='letter']")  //查找所有 name 以 'letter' 结尾的 input 元素
		32、$("input[name*='man']")  //查找所有 name 包含 'man' 的 input 元素
		33、$("input[id][name$='man']")  //找到所有含有 id 属性，并且它的 name 属性是以 man 结尾的  [selector1][selector2][selectorN]
	层级
		6、$("form input")  //在给定的祖先元素下匹配所有的后代元素
		7、$("form > input")  //在给定的父元素下匹配所有的子元素
		8、$("label + input")  //在同一级上，匹配所有跟在 label 后面的 input 元素（可以深入查找）
		9、$("form ~ input")  //找到所有与表单同辈的 input 元素
	基本
		10、$('li:first')  //获取第一个元素
		11、$('li:last')  //获取最后个元素
		12、$("input:not(:checked)")  //查找所有未选中的 input 元素
		13、$("tr:even")  //查找表格的1、3、5...行（即索引值0、2、4...）;匹配所有索引值为偶数的元素，从 0 开始计数
		14、$("tr:odd")  //查找表格的2、4、6行（即索引值1、3、5...） ;匹配所有索引值为奇数的元素，从 0 开始计数
		15、$("tr:eq(1)")  //匹配一个给定索引值的元素
		16、$("tr:gt(0)")  //匹配所有大于给定索引值的元素
		17、$("tr:lt(2)")  //匹配所有小于给定索引值的元素
		18、$(":header").css("background", "#EEE");  //匹配如 h1, h2, h3之类的标题元素
		19、$("#run").click(function(){  $("div:not(:animated)").animate({ left: "+=20" }, 1000);  });匹配所有正在执行动画效果的元素
		20、$("#login:focus");  //当页面加载后将 id 为 'login' 的元素设置焦点:
	内容
		21、$("div:contains('John')")  //查找所有包含文本的元素
		22、$("td:empty")  //匹配所有不包含子元素或者文本的空元素
		23、$("div:has(p)").addClass("test");  //匹配含有选择器所匹配的元素的元素
		24、$("td:parent")  //查找所有含有子元素或者文本的 td 元素
	可见性
		25、$("tr:hidden")  //匹配所有不可见元素，或者type为hidden的元素
		26、$("tr:visible")  //匹配所有的可见元素

	子元素
		34、$("ul li:nth-child(2)")  //在每个 ul 查找第 2 个li
		35、$("ul li:first-child")   //在每个 ul 中查找第一个 li
		36、$("ul li:last-child")    //在每个 ul 中查找最后一个 li
		37、$("ul li:only-child")    //在 ul 中查找是唯一子元素的 li
	表单
		38、$(":input")  //匹配所有 input, textarea, select 和 button 元素
		39、$(":text")  //匹配所有的单行文本框
		40、$(":password")  //匹配所有密码框
		41、$(":radio")  //匹配所有单选按钮
		42、$(":checkbox")  //匹配所有复选框
		43、$(":submit")  //匹配所有提交按钮
		44、$(":image")  //匹配所有图像域
		45、$(":reset")  //匹配所有重置按钮
		46、$(":button")  //匹配所有按钮
		47、$(":file")  //匹配所有文件域
		48、$("tr:hidden")  //匹配所有不可见元素，或者type为hidden的元素
	表单对象属性
		49、$("input:enabled")  //查找所有可用的input元素
		50、$("input:disabled")  //查找所有不可用的input元素
		51、$("input:checked")  //查找所有选中的复选框元素
		52、$("select option:selected")  //查找所有选中的选项元素
三、属性
	属性
		1、 attr(name|properties|key,value|fn)
				$("img").attr("src");  //返回文档中所有图像的src属性值。
				$("img").attr({ src: "test.jpg", alt: "Test Image" });  //为所有图像设置src和alt属性。
				$("img").attr("src","test.jpg");  //为所有图像设置src属性。
				$("img").attr("title", function() { return this.src });  //把src属性的值设置为title属性的值。
		2、 removeAttr(name)
				$("img").removeAttr("src");  //将文档中图像的src属性删除
		3、 prop(name|properties|key,value|fn)
				$("input[type='checkbox']").prop("checked");  //选中复选框为true，没选中为false
				$("input[type='checkbox']").prop({ disabled: true });  //禁用页面上的所有复选框。
				
				$("input[type='checkbox']").prop("disabled", false);
				$("input[type='checkbox']").prop("checked", true);   //禁用和选中所有页面上的复选框。
				
				$("input[type='checkbox']").prop("checked", function( i, val ) { return !val; });  //通过函数来设置所有页面上的复选框被选中。
		4、 removeProp(name)
				//用来删除由.prop()方法设置的属性集
	CSS类
		5、addClass(class|fn)
			$("p").addClass("selected1 selected2");  //为匹配的元素加上 'selected' 类    为每个匹配的元素添加指定的类名。
		6、removeClass([class|fn])
			$("p").removeClass("selected");  //从所有匹配的元素中删除全部或者指定的类。
		7、toggleClass(class|fn[,sw])  //如果存在（不存在）就删除（添加）一个类。
	HTML代码/文本/值
		8、html([val|fn])
			$('p').html();  //返回p元素的内容。
			$("p").html("Hello <b>world</b>!");  //设置所有 p 元素的内容
		9、text([val|fn])
			$('p').text();  //返回p元素的文本内容。
			$("p").text("Hello world!");  //设置所有 p 元素的文本内容
			$("p").text(function(n){ return "这个 p 元素的 index 是：" + n; });
		10、val([val|fn|arr])
			$("input").val();  //获取文本框中的值
			$("input").val("hello world!");  //设定文本框的值
四、文档处理
	内部插入
		1、$("p").append("<b>Hello</b>");  //向每个匹配的元素内部追加内容。
		2、$("p").appendTo("div");  //把所有段落追加到ID值为foo的元素中。
		3、$("p").prepend("<b>Hello</b>");  //向所有段落中前置一些HTML标记代码。  向每个匹配的元素内部前置内容。
		4、$("p").prependTo("#foo");  //把所有匹配的元素前置到另一个、指定的元素元素集合中
	外部插入
		5、$("p").after("<b>Hello</b>");  //在每个匹配的元素之后插入内容。
		6、$("p").before("<b>Hello</b>");  //在每个匹配的元素之前插入内容。
		7、$("p").insertAfter("#foo");  //把所有段落插入到一个元素之后。与 $("#foo").after("p")相同
		8、$("p").insertBefore("#foo");  //把所有匹配的元素插入到另一个、指定的元素元素集合的前面。
	包裹
		9、 $("p").wrap("<div class='wrap'></div>");  
			$("p").wrap(document.getElementById('content'));//把所有匹配的元素用其他元素的结构化标记包裹起来。
		10、$("p").unwrap()  //这个方法将移出元素的父元素。这能快速取消 .wrap()方法的效果。匹配的元素（以及他们的同辈元素）会在DOM结构上替换他们的父元素。
		11、$("p").wrapAll("<div></div>");  //将所有匹配的元素用单个元素包裹起来
		12、$("p").wrapInner("<b></b>");  //把所有段落内的每个子内容加粗    将每一个匹配的元素的子内容(包括文本节点)用一个HTML结构包裹起来
	替换
		13、$("p").replaceWith("<b>Paragraph. </b>");  //将所有匹配的元素替换成指定的HTML或DOM元素   把所有的段落标记替换成加粗的标记。
		14、$("<b>Paragraph. </b>").replaceAll("p");  //把所有的段落标记替换成加粗标记
	删除
		15、$("p").empty();  //删除匹配的元素集合中所有的子节点。
		16、$("p").remove();  //从DOM中删除所有匹配的元素
		17、$("p").detach();              //从DOM中删除所有匹配的元素。
			$("p").detach(".hello");      //与remove()不同的是，所有绑定的事件、附加的数据等都会保留下来。
	复制
	18、$("b").clone().prependTo("p");  //克隆所有b元素（并选中这些克隆的副本），然后将它们前置到所有段落中。
五、CSS
六、事件
七、效果
八、AJAX_jQuery


$(function(){//
			
	// 增加onclick事件处理函数			
	$("input[name=privilegeIds]").click(function(){
		// 当选中或取消某个权限时，同时也选中或取消所有的下级权限
		$(this).siblings("ul").find("input").attr("checked", this.checked);

		// 当选中某个权限时，应同时选中他的直系上的权限。
		if(this.checked == true){ // 可以直接写为 if(this.checked){..}
			$(this).parents("li").children("input[name=privilegeIds]").attr("checked", true);
		}
		
		// 当取消某个权限时，如果同级的权限都没有选择，就也取消上级权限
		else{
			if( $(this).parent().siblings("li").children("input:checked").size() == 0 ){
				$(this).parent().parent().siblings("input").attr("checked", false);
			}
		}
		
	});
});