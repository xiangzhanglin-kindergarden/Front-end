
/*
 *
 *   班级课表管理 功能
 *   
 *
*/

/*++++++++++++++++++++++++++++++++++++++++++*/
/* 让课表确定时间   START*/


// 判断日期和时间 并保存已经修改的值
$(function(){
	var date = new Date();
	var week = date.getUTCDay();
	var hour = date.getHours();
	console.log(week+"周，时间："+hour)
	if (week==0||week==6) {
		$(".class-table td").addClass("class-end");
		$(".class-time").removeClass("class-end");
	}else{
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
	}
})


/* 让课表确定时间  end */
/********************************************/







/*++++++++++++++++++++++++++++++++++++++++++*/
/* 课表按钮  START */

//修改课表按钮
$(function(){
	$("#change-class").bind("click",function(){
		$("td").each(function(){
			if ($(this).attr("class") != "class-time" && $(this).attr("class") != "class-end" ){
				$(this).html("<input class='class-change-input' value='"+$(this).html()+"'>")
			}
		})
	})
})

//新增课表按钮
$(function(){
	$("#new-class").bind("click",function(){
		$(".cover").css({"z-index":1001});
		$(".new-class").css({"z-index":1002});
		$(".cover").animate({"opacity":1});
		$(".new-class").animate({"opacity":1});
	})
})

// 点击 修改课表按钮 后   取消 / 修改 按钮
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
		// $("#change-class-yes").animate({"opacity":0});
		// $("#change-class-no").animate({"opacity":0});

		// $("#change-class-yes").addClass("myHidden");
		// $("#change-class-no").addClass("myHidden");
		// setTimeout(function(){
		// 	$("#change-class").removeClass("myHidden");
		// 	$("#change-class").animate({"opacity":1});
		// },1);
		window.location.reload();
		// $(".class-change-input").each(function(){
		// 	// console.log($(this).val());
		// 	$(this).parent().html($(this).val())


		// })
		// if ($(this).attr("class") != "class-time" && $(this).attr("class") != "class-end" ){
		// 	$(this).html("<input class='class-change-input' value='"+$(this).html()+"'>")
		// }
	})
})


// 点击 新建课表按钮 后   关闭按钮
function close_new_class(){
	$(".cover").animate({"opacity":0});
	$(".new-class").animate({"opacity":0},function(){
		$(".cover").css({"z-index":'-1'});
		$(".new-class").css({"z-index":'-1'});
		$(".new-box input").val("");
	});
}

/* 课表按钮  END */
/********************************************/









/*++++++++++++++++++++++++++++++++++++++++++*/
/* 下拉选项卡  START */


//增加周数并获取周数
$(function(){
	var date = new Date();
	var week = getClassWeek();

	for(var i=1;i<=24;i++){
		var newWeek = $("<option>"+i+"</option>");
		if (i==week) {
			var newWeek = $("<option selected>"+i+"</option>");
		};
		$("[name='week']").append(newWeek);
	}

	getClassDate(week);
})


// 取得某一周的时间并写到table里面
function getClassDate(week){

}

// 获取今天是今年的第几周
function getClassWeek(){
	var d1 = new Date();
	var d2 = new Date();
	d2.setMonth(0);
	d2.setDate(1);
	var rq = d1-d2;
	var s1 = Math.ceil(rq/(24*60*60*1000));
	++s1;
	var s2 = Math.ceil(s1/7);
	++s2;
	console.log("今天是本年第"+s1+"天，第"+s2+"周");//周日做为下周的开始计算
	return s2;
}

$(function(){
	var week
})


/* 下拉选项卡  END */
/********************************************/











































