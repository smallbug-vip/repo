required:true		必须输入的字段。
	remote:"check.php"	使用 ajax 方法调用 check.php 验证输入值。
	email:true			必须输入正确格式的电子邮件。
	url:true			必须输入正确格式的网址。
	date:true			必须输入正确格式的日期。日期校验 ie6 出错，慎用。
	dateISO:true		必须输入正确格式的日期（ISO），例如：2009-06-23，1998/01/22。只验证格式，不验证有效性。
	number:true			必须输入合法的数字（负数，小数）。
	digits:true			必须输入整数。
	creditcard:			必须输入合法的信用卡号。
	equalTo:"#field"	输入值必须和 #field 相同。
	accept:				输入拥有合法后缀名的字符串（上传文件的后缀）。
	maxlength:5			输入长度最多是 5 的字符串（汉字算一个字符）。
	minlength:10		输入长度最小是 10 的字符串（汉字算一个字符）。
	rangelength:[5,10]	输入长度必须介于 5 和 10 之间的字符串（汉字算一个字符）。
	range:[5,10]		输入值必须介于 5 和 10 之间。
	max:5				输入值不能大于 5。
	min:10				输入值不能小于 10。


//////////////////////////////////////////////////////////

$("#sport_product_mod_form").validate({
		rules: {
			productId: {
				required: true,
				remote: v.context+"/sport/product/isrepeat?id="+v.id+"&operate="+v.operate
		    },
		    productName: {
		    	required: true
		    },
		    price: {
		    	required: true,
		    	number:true
		    },
		    strategyGroupId: {
		    	required: true
		    }
		},
		messages: {
			productId: {
				required: "商品ID不能为空！",
				remote: "商品ID不能重复！"
		    },
		    productName: {
		    	required: "商品名不能为空！"
		    },
		    price: {
		    	required: "价格不能为空！",
		    	number:"请输入有效数字！"
		    },
		    strategyGroupId: {
		    	required: "决策组ID不能为空！"
		    }
		},
		errorPlacement: function(error, element) {
			var name = element.attr("name");
			var info = $("<span class='help-block m-b-none' id='" + name + "Error'></span>");
			info.html(error);
			var p = element.parent("div");
			p.append(info);
		}
	});



	<script src="<vip:staticPath/>/plugins/jquery-validation/jquery.validate.min.js"></script>
	<script src="<vip:staticPath/>/plugins/jquery-validation/additional-methods.min.js"></script>


@ResponseBody
@RequestMapping("isrepeat")
public boolean isRepeat(@RequestParam(value = "operate") String operate,
		@RequestParam(value = "userName", required = false) String userName,
		@RequestParam(value = "id", required = false) Long id) {
	if ("save".equals(operate)) {
		VipPayAccount account = vipPayAccountService.getAccountByUserName(userName);
		if (account != null)
			return false;
	}
	else if ("update".equals(operate)) {
		if (id == null)
			return false;
		VipPayAccount account = vipPayAccountService.getAccountByUserName(userName);
		if (account != null && account.getId().longValue() != id.longValue())
			return false;
	}
	return true;
}