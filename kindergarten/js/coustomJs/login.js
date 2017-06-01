/*
 *
 *   登录 功能
 *   
 *
*/
$(document).ready(function(){
	$("#submit-btn").bind(
		"click",
		function(){
			
			var userName = $("#username").val();     //存储用户名
			var userPwd = $("#userpassword").val();  //存储密码
			var userClass = $("input[name='user-class']:checked").attr("class"); //获取老师or管理员登录

			var myjson;      //传递参数的内容
			var url = "";    //物理地址
			var IP = "";     //IP地址


			IP = "119.29.53.178:8080/";

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
				$.ajax({
					// type:"get",
					type:"post",
					url:"http://"+IP+url,
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
							alert(data.msg);
							window.location.href = "index.html";
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
                            alert("登录成功");
                            window.location.href = "index.html";
						}
					},
					error:function(jqHXR){
						console.log("错误:"+jqHXR.status);
					}
				})
			};

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

			// sessionStorage
			function set_sessionStorage(ID,kind){
				sessionStorage.setItem("user",ID);
				sessionStorage.setItem("nub",kind);
				console.log(sessionStorage.getItem("user"));
				console.log(sessionStorage.getItem("nub"));
			}
		})
})
