/**
 * Created by LeiTing on 2017/3/21.
 */

var CHECK_EMPTY=false;
var DATA=" ";
var URL="http://119.29.53.178:8080/kindergarden/TeacherUpdate";

window.onload=function(){

	$("#submit-btn").click(function(e){
		CheckEmpty();
		// var Rype=0;
		// for ( var i = 0; i < radios.length; i++) {
		// 	if (radios[i].checked) {
		// 		Rype=i;
		// 	}
		// }
		var Uer_num= document.getElementById("username").value;
		var Uer_pwd= document.getElementById("userpassword").value;
		var userClass = $("input[name='user-class']:checked").attr("class"); 
		if (userClass=="user-manager") {
				// console.log("管理人");
				DATA = JSON.stringify({Mid:Uer_num,Mpassword:Uer_pwd});
			}else if (userClass=="user-teacher") {
				// console.log("老师");
				DATA = JSON.stringify({Tphone:Uer_num,TWorkId:Uer_pwd});
			};

		
			$.ajax({
				type:"POST",
				url:URL,
				data:DATA,
				dataType:"json",
				contentType:"application/json;charset=UTF-8",
				success:function(data){
					console.log(data);
					if(data.managerId==null){
						alert("用户名错误");
					}else if(data.password==null){
						alert("密码错误");
					}else{
						sessionStorage.setItem("key",data.managerName);
							window.location.assign("首页.html");
					}
				},
				error:function(E_request){
					alert("发生错误："+E_request.status);
				}
			})
		
	})
};


/*判断输入值是否为空*/
function CheckEmpty(){
	// var radios = document.getElementsByName("inlineRadioOptions");
	var Uer_num=document.getElementById("username");
	var Uer_pwd=document.getElementById("userpassword");
	var radios_check=false;

	// for ( var i = 0; i < radios.length; i++) {
	// 	if (radios[i].checked) {
	// 		radios_check = true;
	// 		break;
	// 	}
	// }

	if(Uer_num.value==""){
		CHECK_EMPTY=false;
	}else if(Uer_pwd.value==""){
		CHECK_EMPTY=false;
	}else {
		CHECK_EMPTY=true;
	}
}
