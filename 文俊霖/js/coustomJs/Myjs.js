$(function(){
	var username = sessionStorage.getItem("user");
	var usertype = sessionStorage.getItem("nub");  //0为老师，1为校长
	$("#username").html(username);
	$(".logo-element").html(username);
	if (usertype == 0) {
		$("#usertype").html("管理员");
	}
})



/*
 *
 *   教师信息管理 功能
 *   
 *
*/


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










































