/*
 *
 *   显示课表内容
 *   
 *
*/

$(document).ready(function(){

	var myjson;      //传递参数的内容
	var url = "";    //物理地址
	var IP = "";     //IP地址
	IP = "119.29.53.178:8080/";
	url = "kindergarten/LessonShow";
	// myjson = JSON.stringify({Tphone:userName,TWorkId:userPwd});

	$.ajax({
		// type:"get",
		type:"post",
		url:"http://"+IP+url,
		// data:myjson,
		dataType:"JSON",
		contentType:"application/x-www-form-urlencoded;charset=UTF-8",
		beforeSend:function(xhr){
			xhr.withCredentials = true;
			xhr.setRequestHeader("X-Requested-with","XMLHttpRequest");
		},
		success:function(data){
			console.log(data);
		},
		error:function(jqHXR){
			console.log("错误:"+jqHXR.status);
		}
	})
})
