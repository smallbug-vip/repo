(function(window) {

	var inited = false;
	
	var initFunction = {
		initValidator : function(){
			//add method to validator framework of jquery, the effect of method is according regular exception to validate data
			if(jQuery.validator!=null){
				jQuery.validator.addMethod("reg", function(value, element, regular) {
					if(Array.isArray(regular)){
						return this.optional(element) 
							|| new RegExp(regular[0],regular[1]).test(value);
					}else{
						return this.optional(element) 
							|| new RegExp(regular).test(value);
					}
				});
			}
		},
		initShowQueryCondition : function() {
			mjs.extend({
				showQueryCondition : function(query, source, target, filter) {
					if(typeof query=='string')
						query = window.jQuery.parseJSON(query);
					window.jQuery.each(query,function(key,value){
						var item = window.jQuery('<span class="simple_tag" style="margin-right: 10px;font-size: 12px;"></span>');
						var str;
						if(filter && filter[key] && filter[key][value]){
							str = source.find("[name='" + key + "']").attr("placeholder")+"："+filter[key][value];
						}else{
							str = source.find("[name='" + key + "']").attr("placeholder")+"："+value;
						}
						item.html(str);
						target.append(item);
					});
				},
				queryCondition : function(){
					this.extend({
						win : window.layer.open({
							  title: '查询条件',
							  type: 1,
							  skin: 'layui-layer-rim', //加上边框
							  area: ['420px', '440px'], //宽高
							  content: $(this).get(0)['query_alert_html']
						})
					});
				}
			});
		}
	}
	
	function BaseClass() {
		
	}

	var util = {
		//for info convenience
		info: function(string) {
			console.info(string);
		},
		//for debug convenience
		debug: function(string) {
			console.debug(string);
		},
		//for log convenience
		log: function(string) {
			console.log(string);
		},
		addCommas: function(data) {
		    var aIntNum = data.toString().split('.');
		    if (aIntNum[0].length >= 5) {
		        aIntNum[0] = aIntNum[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
		    }
		    if (aIntNum[1] && aIntNum[1].length >= 5) {
		        aIntNum[1] = aIntNum[1].replace(/(\d{3})/g, '$1 ');
		    }
		    return aIntNum.join('.');
		}
	};

	var base = {
		version: "mjs-0.1",
		init : function(){
			//if has been initialized, return
			if(inited)
				return;
			
			if(arguments.length==0){//execute all function to init mjs object
				window.jQuery.each(initFunction,function(key,value){
					value();
				});
			}else{//execute appoint function to init mjs object
				var argu = arguments[0];
				window.jQuery.each(argu,function(index,value){
					initFunction[value]();
				});
			}
			
			inited = true;
		},
		extend: function() {
			if (arguments.length > 0) {//object extend argument
				for (var i = 0; i < arguments.length; i++) {
					window.jQuery.extend(this, arguments[i]);
				}
			}
			return this;
		}
	};

	var layer = {
		//alert window
		alert: function(msg, num, t) {
			if (num == null)
				num = 0;
			if (t == null)
				t = '信息';
			window.layer.alert(msg, {
				icon: num,
				title: t
			});
		}
	};

	BaseClass.prototype = base;
	var mjs = new BaseClass();
	window.v = mjs.extend(util, layer);

})(window);