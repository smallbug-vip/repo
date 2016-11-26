
$(function(){
	
	var url="http://api.vip.pptv.com/paycenter/pay?username=mjs00000&token=hUzgibHvm-id3dvZYbB6DnPWNTUbSkUF0GX30gJIEmj48iHlVuWnj0wcwzrE__Q9nJMGRg8GVCxp%0D%0ASH1zYU25zncI5J7o5EvGdoYoWgHYl6sP2obOovRGOqGCnZvUf3KH6JXKoxqdPbz4b8rU-UWfnsem%0D%0AHG4AopMzOpWUk70GhFU%0D%0A&pricecode=discount_pay_onem_h5&detailid=one_month&months=1&fromchannel=pricecode%3Ddiscount_pay_onem_h5%26detailid%3Done_month%26aid%3Dweixin%26plt%3D%26time%3D547%26openId%3DonfjBjpiTLyj40xBRFwO64Frmx_4%26accessToken%3DjHSS08Sik5qi0MWRMsz_Wr_K9o135X9gvkAmT9wue-Vi-3mjNotWdJVuNvn_10iF52nLOl9LZYwno89mvl5D4RInlN0W5EVMJM_mn0uXWb0&openid=onfjBjpiTLyj40xBRFwO64Frmx_4&plt=h5&paytype=wx_js&format=jsonp&cb=?";
	$.getJSON(url,function(data){

		if(data.errorCode!=0){
		 alert("«Î«Û÷ß∏∂ ß∞‹:"+data.message);
		 return;
		}

        var result=JSON.parse(data["paycontent"]);
        var splitarr = result["package"].split("&");
        var tmparr;
        for(var spliteach in splitarr){
            tmparr = splitarr[spliteach].split("=");
            if(tmparr[0]=="out_trade_no"){
                window.orderid = tmparr[1];
            }else if(tmparr[0]=="total_fee"){
                window.payAmount = tmparr[1]/100;
            }
        }

        window.noncestr=result["nonceStr"];
        window.timestamp=result["timeStamp"];
        window.appid=result["appId"];
        window.package=result["package"];
        window.signtype=result["signType"];
        window.paysign=result["paySign"];
        window.close();

        WXSendUrl(window.appid,window.noncestr,window.package,window.signtype,window.paysign,window.timestamp);

	}); 

});

