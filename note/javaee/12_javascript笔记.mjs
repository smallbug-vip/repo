一、基本数据类型

	number(数字,浮点型,整型) 

	string(js语言的突破,没有char类型.)

	boolean

	null  (用来标示引用数据类型的占位符.通常都是人为赋值.)var person = null;

	undefined  (由null衍生出来的值,是当我们声明一个变量,) 
			//1.没有给该变量初始化值,那么系统会默认赋值为undefined
			//2.函数中没有返回值,那么默认返回undefined
			//3.array中没初始化

	原始数据类型 判断符:
			typeof ==> 用来判断一个变量是哪种原始类型的.

二、细节：

	***使用var与不使用var的区别：在函数中，使用var为局部变量不使用var为全局变量

	一元加法,减法
		var a = +1;
		var b = -1;
		在js中的高级应用.
		var c = +"1";  //这样写是在进行类型转换
		var d = +"abc"; // 这样写会转换失败,返回number中的特殊值 NaN.

	Boolean 运算符 ! && ||
		js中自动类型转换.
			//转换规律 (重点)
			//string ==>  ""==>转换为false 其他都为true;
			//number ==>  除了NaN,+0和-0.其他都转换为true.
			//null ==>  false
			//undefined ==> false
		//NaN特性:
			//NaN参与的任何boolean运算返回值都是false. 除了!=
		//因为undefined是null衍生出的,所以 
			alert(undefined == null);// true

	比较运算符
		alert(11>3);//true
		//当运算符两端 , 一端是数字,一端是其他类型时, 其他类型会自动向数字类型转换
		alert("11">3);// true
		alert(11>"3");//true
		//字符串在进行比较时 ,规律是: 比较首字符asc码. 如果一样,比较第2位...
		alert("11">"3");// false
		alert("11">"1");// true
		alert("abc">11);//false

	等性运算符  == != ===
		全等于: === ==> 比较时包括类型.

三、基础语句

		js中有for(var xxx in xxx) 语句. ==> 用的很少,用来遍历对象的属性.
		
四、Object《ECMAScript中的对象》
	1> 知道他是所有对象的超类. 
	2> toString打印出函数定义

五、Function对象
	1> Function的创建
	 方式1:var fun1 = new Function("a","b","alert(a+b);");
	 方式2:var fun2 = function (a,b){alert(a+b);}
	 方式3:function fun3(a,b){alert(a+b)}

	2>Function的调用 ==> js中函数的调用只看函数名称.
		调用时内置对象arguments
			arguments代表 函数运行期间实际参数列表.
			arguments.length ==> 实际参数个数
			arguments[0] ==> 第一个参数.
		应用: arguments 实现函数的重载.

	3> 函数的返回
		1>如果函数没有显示指定返回值 那么函数返回值为undefined.
		2>使用return 关键字,返回内容
		3>return 关键字,在js中也可以作为结束方法运行的功能.
		4>void运算符的应用.

六、String Number Boolean
	
		伪对象: string number boolean 这3个原始类型可以看作是伪对象, 能直接调用包装对象的方法和属性.


七、String对象
	属性
		length
	方法
		//1 没用的方法
		alert(str1.big());
		alert(str1.sub()); 
		alert(str1.bold());
	2 重要的方法
		1> indexOf
		2> lastIndexOf
		3> charAt 
		alert(str1.charAt(0));//a
		4> charCodeAt 返回所在字符的asc码
		alert(str1.charCodeAt(0));//97
		5> subString 
		alert(str1.substring(0, 1));//a 
		6> slice 支持负数. 从右往左.
		alert(str1.slice(0, -1));//a

	3 与正则结合的方法(正则对象讲完回来看.)
		1 构造方法
			//参数1 正则字符串 ,参数2 匹配模式
			//用户名必须 以字母开头,长度在6到10位之间.
			//匹配模式有两种 
				//"i": 忽略大小写. ignoredCase
				//"g": 全局匹配 global
			var reg1 = new RegExp("^[a-zA-Z][a-zA-Z_0-9]{5,9}$","g");
			var reg2 = /^[a-zA-Z][a-zA-Z_0-9]{5,9}$/g;

		2 方法
			//test方法 ==> 测试字符串与正则是否匹配.
			var username = "a3456";
			//alert(reg1.test(username));//true
				
			//与String对象结合的4个方法
			var str = "hello world";
			//split 切割字符串
			alert(str.split(/o/g));
			//replace 查找替换
			alert(str.replace(/o/g, "haha"));
			//search 只能找第一个出现的位置. 如果需要查找第n个出现的位置使用exec方法.
			alert(str.search(/o/g));
			//match ==> 找到字符串中符合正则表达式的部分并返回.
			alert(str.match(/o/g));

八、Global 对象

	encodeURI	根据utf-8编码
	decodeURI	根据utf-8解码

	encodeURIComponent	将符号也进行转码
	decodeURIComponent	解码

	escape
	unescape//编码（过时）

	isNaN	判断是否是NaN

	parseInt	转换成整数
	parseFloat	转换成浮点数


九、Array 对象
	1.创建方式
		1>创建方式1 创建一个数组并初始化值
			var arr1 = ["abc",2,true,null,undefined,new Object()]; 
		2>创建方式2 同方式1
			var arr2 = new Array(1,2,3);
		3>创建方式3 ==> 创建一个长度为3的数组. 数组Array的构造函数,如果只传一个参数,并且这个参数是整数.那么这个整数就是数组的初始化长度.
			var arr3 = new Array(3);
	2.属性
		length ==> 数组的长度

	3.js中数组的特点:
		1.js中的数组,类型任意.
		2.数组的长度不是固定的.用到哪里,就有多长.

	4.方法
		1> join方法==> 将数组中的每个元素连接起来返回一个字符串.参数就是连接符.(默认连接符是",")
		   join方法的高级应用:拼接字符串起到StringBuilder的作用

		2> push/pop ==> 模拟栈的结构.

		3> shift/unshift==> 模拟队列的结构

		4> reverse方法 ==> 将数组中的元素顺序倒置

		5> sort方法 ==> 排序的方法，默认是按字符串规则排序. 
						定义比较器：function abc(a,b){return a-b;}以参数的形式传给sort函数

十、
	ECMAScript中对对象的分类
			本地对象
				内建对象 ==> 不需要创建实例.直接使用 Global  Math
			主机对象 ==> DOM BOM 两部分.

十一、js自定义对象
	1、function People(name,age){
			this.name = name;
			this.age = age;
			this.setName = function(name){this.name = name};
			this.getName = function(){return this.name};
		}
		var p = new People("小虫", 23);
		for(x in p){
			document.write(x+"="+p[x]);
			}
	2、function People(){
			
		}
	   var p = new People();
	   p.name = "小虫";
	   p.age = 23;
	   p.setName = function(name){this.name = name;};
	   p.getName = function(){return this.name};
	   for(x in p){
			document.write(x+"="+p[x]);
			}
	3、var = {
				"name" : "小虫",
				"age" : 23
				}

十二、名称空间

	(function($) {
		$.namespace = function(namespaceString) {
			var temp = [];
			var array = namespaceString.split(".");
			for (var i = 0; i < array.length; i++) {
				temp.push(array[i]);
				eval("window." + temp.join(".") + "={}")
			}
		}
	})($);


十三、prototype
	1、函数对象拥有json没有

	2、obj.prototype={} 	//一个空的json对象

	3、new会创建一个与prototype相同的域

	4、只有new出的对象才能使用prototype的属性，函数直接调用不行

	5、b.prototype = a.prototype;是引用传递

十四、编写类
	function Student(){}

	Student.prototype.setName(name){
		this.name = name;
	}
	Student.prototype.setAge(age){
		this.age = age;
	}
	Student.prototype.getName(){
		return this.name;
	}
	Student.prototype.getAge(){
		return this.age;
	}


十五、继承
	1、
		subStudent.prototype = Student.prototype;
		subStudent.prototype = new Student();
	2、
		function extends(json){
			var F = function(){}
			for(var i in json){
				F.prototype[i] = json[i];
			}
			return F;
		}
	3、

十六、
	ajaxJSON.callback(fn); 	//this为ajaxJSON对象
	ajaxJSON.callback.call(window,fn); 	//this为window对象

	Person.apply(Student);	//相当于Student.Person()
	//以此改变this的指向


十七、闭包
	在函数内部定义的函数在函数外部使用
	(function(param){//形参

	})(param);//实参










==============================================================================================

通知浏览器无缓存
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Cache-Control" content="no-cache" />
<meta http-equiv="Expires" content="0" />



if(window.parent != window){window.parent.location.reload(true);}