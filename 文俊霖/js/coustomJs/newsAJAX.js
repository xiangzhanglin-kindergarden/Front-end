var usertype    //用户类型，0为老师，1位校长
var username    //用户名


// 获取用户名和用户类型
$(function(){
	username = sessionStorage.getItem("user");
	usertype = sessionStorage.getItem("nub");  //0为老师，1为校长
	console.log(username);
	console.log(usertype);
	usertype = 0;
	if (usertype == 0) {

	}

})


