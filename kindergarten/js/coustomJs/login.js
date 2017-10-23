/*
 *
 *   登录 功能
 *   
 *
*/
console.log(IPADDRESS);
$(document).ready(function(){
	$("#submit-btn").bind("click",function(){enter()})
})

$(document).keydown(function(event){
	if(event.keyCode == 13){
		enter();
	}
});


function enter(){
	
	var userName = $.trim($("#username").val());     //存储用户名
	var userPwd = $("#userpassword").val();  //存储密码
	var userClass = $("input[name='user-class']:checked").attr("class"); //获取老师or管理员登录

	var myjson;      //传递参数的内容
	var url = "";    //物理地址
	var IP = "";     //IP地址


	// IPADDRESS = "localhost/";

	if (userClass=="user-manager") {
		userClass = 1;
		console.log("管理人");
		// myjson = JSON.stringify(Mid=userName,Mpassword=userPwd);
		myjson = {Mid:userName,Mpassword:userPwd};
		// url = "kindergarden/LoginServlet?Mid="+userName+"&Mpassword="+userPwd;
		url = "kindergarden/LoginServlet";
	}else if (userClass=="user-teacher") {
		userClass = 0;
		console.log("老师");
		// myjson = JSON.stringify({Tphone:userName,TWorkId:userPwd});
		myjson = {Tphone:userName,TWorkId:userPwd};
		// url = "kindergarden/LoginServlrtTeacher?Tphone="+userName+"&TWorkId="+userPwd;
		url = "kindergarden/LoginServlrtTeacher";
	};
	console.log(userName);
	console.log(userPwd);
	console.log(myjson);
	CheckEmpty();

	if (CHECK_EMPTY==true) {
		console.log("CHECK_EMPTY==true");
		$.ajax({
			// type:"get",
			type:"post",
			url:"http://"+IPADDRESS+url,
			data:myjson,
			dataType:"JSON",
			// contentType:"application/x-www-form-urlencoded;charset=UTF-8",
			contentType:"application/x-www-form-urlencoded;charset=UTF-8",
			beforeSend:function(xhr){
				xhr.withCredentials = true;
				xhr.setRequestHeader("X-Requested-with","XMLHttpRequest");
			},
			success:function(data){
				console.log(data);
				if (data.msg == "登录成功") {
					set_sessionStorage(userName,userClass);
					sessionStorage.setItem("teacherData",data);
					// alert(data.msg);
					// window.location.href = "index.html";
					getStartTime();
				}else if (data.msg == "密码错误") {
					alert(data.msg);
				}else if (data.msg == "用户为空") {
					alert("用户不存在");
				}else if (data.msg == "教师用户不存在") {
					alert("用户不存在");
				}else {
          set_sessionStorage(userName,userClass);
          var theData = JSON.stringify(data);
          sessionStorage.setItem("teacherData",theData);
          // window.location.href = "index.html";
          getStartTime();
				}
			},
			error:function(jqHXR){
				console.log("错误:"+jqHXR.status);
			}
		})
	}

}

/*判断输入值是否为空*/
function CheckEmpty(){			
	var Uer_num=document.getElementById("username");
	var Uer_pwd=document.getElementById("userpassword");
	var radios_check=false;

	if(Uer_num.value==""){
		CHECK_EMPTY=false;
		alert("用户名不能为空");
	}else if(Uer_pwd.value==""){
		CHECK_EMPTY=false;
		alert("密码不能为空");
	}else{
		CHECK_EMPTY=true;
	}
}

/**
 * 获取开学时间
 * @return {[type]} [description]
 */
function getStartTime(){
  $.ajax({
    type: "post",
    url: "http://"+IPADDRESS+"kindergarden/KaixueShow",
    contentType:"application/x-www-form-urlencoded;charset=UTF-8",
    beforeSend: function (xhr) {
      xhr.withCredentials = true;
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    },
    success: function (classdata) {
    	data = JSON.parse(classdata);
    	console.log(classdata);

      sessionStorage.setItem("mouth",data.k_month);
    	sessionStorage.setItem("day",data.k_day);
    	console.log(sessionStorage.getItem("mouth"));
    	console.log(sessionStorage.getItem("day"));
    	window.location.href = "index.html";
    },
    error: function (err) {
      console.log(err.status);
    }
	});
}



// sessionStorage
function set_sessionStorage(ID,kind){
	sessionStorage.setItem("user",ID);
	sessionStorage.setItem("nub",kind);
	console.log(sessionStorage.getItem("user"));
	console.log(sessionStorage.getItem("nub"));
}