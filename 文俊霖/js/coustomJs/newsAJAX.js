// 获取用户名和用户类型
$(function(){
	var c_usertype = sessionStorage.getItem("nub");
	console.log(c_usertype);
	if (c_usertype==0) {
		$(".c-f-b-schoolmaster").remove();
		$("#push-news").remove();
		$(".review-box").remove();
	}else if (c_usertype==1) {
		$(".c-f-b-teacher").remove();
	}else if(c_usertype==null){
		console.log("没有账号");
	}
})


