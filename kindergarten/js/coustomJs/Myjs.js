$(function(){
	var username = sessionStorage.getItem("user");
	var usertype = sessionStorage.getItem("nub");  //0为老师，1为校长
	$("#username").html(username);
	$(".logo-element").html(username);
	console.log(usertype);
	console.log(username);
	if (usertype == 0) {
		$("#usertype").html("老师");
	}
})







































