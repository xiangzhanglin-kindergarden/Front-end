/*
 *
 *   资讯管理 功能
 *   
 *
*/


//全选择功能
$(function(){
	var flag = 0;  //判断全选/全不选, 0 全选，1 反选
	$("#news-allBtn").bind(
		'click',
		function(){
			if (flag == 0) {
				$(":checkbox").iCheck('check');
				$("#news-allBtn").html("<i class='glyphicon glyphicon-remove'></i>全不选");
				flag = 1;
			}else{
				$(":checkbox").iCheck('uncheck');
				$("#news-allBtn").html("<i class='glyphicon glyphicon-remove'></i>全选");
				flag = 0;
			}
		}
	)
})

//删除功能
$(function(){
	var flag = 0;   //判断是否有提示出现,flag = 0 是执行添加语句的条件之一 
	$("#news-delBtn").bind(
		"click",
		function(){
			var blank = 0;
			$(".i-checks").each(function(){		//查找哪些被选择了
				if ($(this).prop("checked")) {
					$(this).parents(".read").remove();
					$("#blank-add").remove();
					blank = 1;
					flag = 0;
					// window.location.reload();
				};
			})

			//添加提示
			if (blank == 0 && flag == 0) {
				var notice = $("<div id='blank-add'>请选择内容</div>");
				$("#news-delBtn").after(notice);
				flag = 1;
			};
		}
	)
})


//发布公告/新闻按钮动画

$(function(){
	$("#push-notice").bind(
		"click",
		function(){
			$(".write-box").removeClass("myHidden");
			$(".write-box").animate({"opacity":1});
			$("#push-news").removeClass("tag-chosed");
			$("#push-notice").addClass("tag-chosed");
		});
	$("#push-news").bind(
		"click",
		function(){
			$(".write-box").removeClass("myHidden");
			$(".write-box").animate({"opacity":1});
			$("#push-notice").removeClass("tag-chosed");
			$("#push-news").addClass("tag-chosed");
		});
})

//取消按钮的动画/功能

$(function(){

	//取消发布公告

	$("#tag-del").bind(
		"click",
		function(){
			$(".write-box").animate({"opacity":0},function(){
				$(".tag-chosed").removeClass("tag-chosed");
				$(".write-box").addClass("myHidden");
				$("#div1").html("<p>请输入内容...</p>");
			});
		});
})

// 载入完成后隐藏公告发布内容

$(function(){
	$(".write-box").animate(
		{"opacity":"0"},
		1,
		function(){
			$(".write-box")
			.addClass("myHidden")
			.css({"left":"0"});
		});
})


// 发布按钮的功能

$(function(){
	$("#content-submit").bind(
		"click",
		function(){
			var $title = $("#title input").val();
			if ($title == "") {
				alert("标题不能为空");
			}
			else{
				var $type = $(".tag-chosed").prop("id");
				alert($type);
				// alert(nowData());
				// $(".tag-chosed").removeClass("tag-chosed");
				// $(".write-box").addClass("myHidden");
				// $("#div1").html("<p>请输入内容...</p>");
				window.location.reload()
			}
			
	})
})


// 分页按钮
$(function(){

	var Apage = 10;  //一页多少行内容
	var flag = 1;   // 当前页数
	var previousNub = 0; //前一页
	var nextNub = 2; //下一页
	var max = Math.ceil($("tr").length/Apage);	//最大页数
	toshow();
	function toshow(){
		$("tr").css("display","none");
		for (var i = (flag-1)*Apage; i <= (flag-1)*Apage+Apage-1; i++) {
			$("tr:eq("+i+")").css("display","table-row");
		};
		$("#write-nub").attr("placeholder","第"+flag+"页");
		$("#write-nub").val("");
	}
	//下一页
	$("#next-btn").bind(
		"click",
		function(){
			if (nextNub > max){
				alert("已经是最后一页了！")
			}else{
				nextNub++;
				previousNub++;
				flag++;
				toshow();
			};
		})
	//上一页
	$("#previous-btn").bind(
		"click",
		function(){
			if (previousNub == 0){
				alert("已经是第一页了！")
			}else{
				nextNub--;
				previousNub--;
				flag--;
				toshow();
			};
		})
	//页面跳转
	$(document).keypress(function(){
		var inputNub = $("#write-nub").val();
		if (event.keyCode == 13) {
			if (inputNub != null && inputNub != "") {
				if (inputNub<=0 || inputNub>max) {
					alert("请输入"+1+"-"+max+"范围的数");
				}else{
					flag = Math.round(inputNub);   // 当前页数
					previousNub = Math.round(inputNub)-1; //前一页
					nextNub = Math.round(inputNub)+1;
					toshow();
				};
			};
		};
	})
})








/*
 *
 *   教师信息管理 功能
 *   
 *
*/

 // AJAX

var teacherObj = {
	Tname:"",
	Tclass:"",
	Tcall:"",
	Tsex:"",
	Tpsd:""
}


// var a = JSON.parse("{\"title\":\"\",\"data\":[]}");
var a = JSON.parse("{\"title\":\"\",\"data\":[]}");

var rows = document.querySelector(".table").rows.length;
var colums = document.querySelector(".table").rows[0].cells.length;

console.log(rows);
console.log(colums);

if (rows>1) {
	for(var i=1; i<rows; i++){
		var teacherObj = new Object();
		teacherObj.Tname = document.querySelector(".table").rows[i].cells[1].innerHTML;
		teacherObj.Tclass = document.querySelector(".table").rows[i].cells[2].innerHTML;
		teacherObj.Tcall = document.querySelector(".table").rows[i].cells[3].innerHTML;
		teacherObj.Tsex = document.querySelector(".table").rows[i].cells[4].innerHTML;
		teacherObj.Tpsd = document.querySelector(".table").rows[i].cells[5].innerHTML;
	
		console.log(teacherObj);
		// a.data.add(teacherObj);
	}
	var Jobj = JSON.stringify(a);
	console.log(Jobj);
};





$(document).ready(function(){
	var myjson;	
	var userName = $("#username").val();     //存储用户名
	var userPwd = $("#userpassword").val();  //存储密码

	myjson = JSON.stringify({Mid:userName,Mpassword:userPwd});


	$.ajax({
		type:"POST",
		url:"http://119.29.53.178:8080/kindergarden/TeacherSearch",
		data:myjson,
		dataType:"JSONP",
		contentType:"application/json;charset=UTF-8",
		success:function(data){
			console.log("aaa"+data);
			if (data.success) {
				addTeacher(data);
			}else{
				alert(data.msg);
			}
		},
		error:function(jqHXR){
			console.log("错误:"+jqHXR.status);
		}
	})
})

function addTeacher(JSONobj){

}










//选择、取消选择按钮
$(function(){
	$('.i-checks').iCheck('disable');
	//出现取消选择
	$("#teacher-chose").click(function(){
		$("#teacher-chose").animate({"opacity":0});
		$("#teacher-chose").addClass("myHidden");
		setTimeout(function(){
			$("#teacher-dechose").css({"opacity":0});
			$("#teacher-del").css({"opacity":0});
			$("#teacher-change").css({"opacity":0});

			$("#teacher-dechose").removeClass("myHidden");
			$("#teacher-del").removeClass("myHidden");
			$("#teacher-change").removeClass("myHidden");

			$("#teacher-dechose").animate({"opacity":1});
			$("#teacher-del").animate({"opacity":1});
			$("#teacher-change").animate({"opacity":1});

			$('.i-checks').iCheck('enable');
		},1);
	})
	//隐藏取消选择
	$("#teacher-dechose").click(function(){
		$('.i-checks').iCheck('disable');
		$("#teacher-change").animate({"opacity":0});
		$("#teacher-del").animate({"opacity":0});
		$("#teacher-dechose").animate({"opacity":0});

		$("#teacher-change").addClass("myHidden");
		$("#teacher-del").addClass("myHidden");
		$("#teacher-dechose").addClass("myHidden");
		setTimeout(function(){
			$("#teacher-chose").removeClass("myHidden");
			$("#teacher-chose").animate({"opacity":1});
		},1);

		$(".i-checks").iCheck('uncheck');

		$("#blank-add").remove();
		flag = 0;
		$(".lastAsk").addClass("myHidden");
	})
})

//删除功能
var flag = 0;   //判断是否有提示出现,flag = 0 是执行添加语句的条件之一 
$(function(){
	//使再次确认出现
	$("#teacher-del").bind(
		"click",
		function(){
			var blank = 0;
			$(".i-checks").each(function(){		//查找哪些被选择了
				if ($(this).prop("checked")) {
					$(".lastAsk").removeClass("myHidden");
					$('.i-checks').iCheck('disable');
					
					$("#blank-add").remove();
					blank = 1;
					flag = 0;
					flag = 0;
				};
			});

			//添加提示
			if (blank == 0 && flag == 0) {
				var notice = $("<div id='blank-add'>请选择内容</div>");
				$("#teacher-del").after(notice);
				flag = 1;
			};
		} 
	);

	//确认后删除
	$(function(){
		$("#teacher-del-yes").click(function(){
			$(".i-checks").each(function(){		//查找哪些被选择了
				if ($(this).prop("checked")) {
					$(this).parents(".read").remove();
				};
			});

			$("#blank-add").remove();
			blank = 1;
			flag = 0;

			$(".lastAsk").addClass("myHidden");
			$(".i-checks").iCheck('enable');
			// window.location.reload();
		})

		$("#teacher-del-no").click(function(){
			$(".lastAsk").addClass("myHidden");
			$(".i-checks").iCheck('enable');
			$('.i-checks').iCheck('uncheck');
		})
	})


	//修改内容
	$("#teacher-change").bind(
		"click",
		function(){
			var blank = 0;
			$(".i-checks").each(function(){		//查找哪些被选择了
				if ($(this).prop("checked")) {
					var name = $(this).parents(".read").find(".teacher-name").html();
					var className = $(this).parents(".read").find(".teacher-info-class").html();
					var call = $(this).parents(".read").find(".teacher-info").html();
					var sex = $(this).parents(".read").find(".teacher-info-sex").html();
					var password = $(this).parents(".read").find(".text-right").html();
					
					console.log(name+'\n'+className+'\n'+call+'\n'+sex+'\n'+password)
					
					$('.i-checks').iCheck('disable');
					$("#blank-add").remove();
					blank = 1;
					flag = 0;
					// window.location.reload();
				};
			})

			//添加提示
			if (blank == 0 && flag == 0) {
				var notice = $("<div id='blank-add'>请选择内容</div>");
				$("#teacher-del").after(notice);
				flag = 1;
			};
		}
	)
})










































