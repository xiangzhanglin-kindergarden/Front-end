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
 *   班级课表管理 功能
 *   
 *
*/

// 判断日期和时间 并保存已经修改的值
$(function(){
	var date = new Date();
	var week = date.getUTCDay();
	var hour = date.getHours();
	for(var i=1; i<=4; i++){
		for(var j=1; j<week; j++){
			// console.log("第"+i+"列，第"+j+"行:"+$(".class-table tbody tr:nth-child("+i+") td:eq("+j+")").html());
			$(".class-table tbody tr:nth-child("+i+") td:eq("+j+")").addClass("class-end");
		}
	}
	if (hour>=9 && hour <10) {
		$(".class-table tbody tr:nth-child(1) td:eq("+week+")").addClass("class-end");
	}else if (hour>=10 && hour<14) {
		$(".class-table tbody tr:nth-child(1) td:eq("+week+")").addClass("class-end");
		$(".class-table tbody tr:nth-child(2) td:eq("+week+")").addClass("class-end");
	}else if (hour>=14 && hour<15) {
		$(".class-table tbody tr:nth-child(1) td:eq("+week+")").addClass("class-end");
		$(".class-table tbody tr:nth-child(2) td:eq("+week+")").addClass("class-end");
		$(".class-table tbody tr:nth-child(3) td:eq("+week+")").addClass("class-end");
	}else if (hour>=15) {
		$(".class-table tbody tr:nth-child(1) td:eq("+week+")").addClass("class-end");
		$(".class-table tbody tr:nth-child(2) td:eq("+week+")").addClass("class-end");
		$(".class-table tbody tr:nth-child(3) td:eq("+week+")").addClass("class-end");
		$(".class-table tbody tr:nth-child(4) td:eq("+week+")").addClass("class-end");
	};
})

//修改内容
$(function(){
	$("#change-class").bind("click",function(){
			$("td").each(function(){
			if ($(this).attr("class") != "class-time" && $(this).attr("class") != "class-end" ){
				$(this).html("<input class='class-change-input' value='"+$(this).html()+"'>")
			}
			
	})
		
			
		/*
		$(".class-change-input").keypress(function(){
			if(event.keyCode == 13){
				var newclass = $(".class-change-input").val();
				$(".class-change-input").parent().html(newclass);
			}s
		});
		$(this).find("input").blur(function(){
			var newclass = $(".class-change-input").val();
			$(this).parent().html(newclass);
		})*/
	})
})

$(function(){
	//出现取消选择
	$("#change-class").click(function(){
		$("#change-class").animate({"opacity":0});
		$("#change-class").addClass("myHidden");
		setTimeout(function(){
			$("#change-class-yes").css({"opacity":0});
			$("#change-class-no").css({"opacity":0});

			$("#change-class-yes").removeClass("myHidden");
			$("#change-class-no").removeClass("myHidden");

			$("#change-class-yes").animate({"opacity":1});
			$("#change-class-no").animate({"opacity":1});
		},1);
	})
	//隐藏取消选择
	$("#change-class-no").click(function(){
		$("#change-class-yes").animate({"opacity":0});
		$("#change-class-no").animate({"opacity":0});

		$("#change-class-yes").addClass("myHidden");
		$("#change-class-no").addClass("myHidden");
		setTimeout(function(){
			$("#change-class").removeClass("myHidden");
			$("#change-class").animate({"opacity":1});
		},1);
		// location.reload() 
		$(".class-change-input").each(function(){
			// console.log($(this).val());
			$(this).parent().html($(this).val())

		})
		// if ($(this).attr("class") != "class-time" && $(this).attr("class") != "class-end" ){
		// 	$(this).html("<input class='class-change-input' value='"+$(this).html()+"'>")
		// }
	})
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










































