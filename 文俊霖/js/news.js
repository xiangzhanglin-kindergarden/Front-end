/*
 *
 *   资讯管理 功能
 *   
 *
*/

// 获取用户名和用户类型
$(function(){
	var c_usertype = sessionStorage.getItem("nub");
	console.log(c_usertype);
	if (c_usertype==0) {
		$(".c-f-b-schoolmaster").remove();
		$("#push-news").remove();
		$(".review-box").remove();
	}else if (c_usertype==1) {
		$(".c-f-b-teacher").remove();
	}else if(c_usertype==null){
		console.log("没有账号");
	}
})



/*+++++++++++++++++++++++++++++++++++++++*/

/*   执行删除、通过、不通过 操作  START*/


var data = new Array();    //存放具体内容

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
				$("#news-allBtn").html("<i class='glyphicon glyphicon-ok'></i>全选");
				flag = 0;
			}
		}
	)
})

//删除功能
$(function(){
	$("#news-delBtn").bind(
		"click",
		function(){
			var i = -1;
			var flag = 0;
			$(".i-checks").each(function(){		//查找哪些被选择了
				if ($(this).prop("checked")) {

					//获取内容
					++i;
					data[i] = new Array();
					for(var j=0; j<=6; j++){
						if (j==3) {
							continue;
						}else{
							data[i][j] = $(this).parents(".read").children().eq(j+1).children().html();
						}
					}

					remove_notice();
					
					flag = 1;
				}else if (flag == 0) {
					remove_notice();
					notice($("#news-delBtn"));
				}
			})
			if (flag==1) {
				var nub = 0;
				secon_ensure(data,nub);
			};
		}
	)
})

//审核通过 
$(function(){
	$("#news-passBtn").bind(
		"click",
		function(){
			var i = -1;
			var flag = 0;
			$(".i-checks").each(function(){		//查找哪些被选择了
				if ($(this).prop("checked")) {
					//获取内容
					++i;
					data[i] = new Array();
					for(var j=0; j<=6; j++){
						if (j==3) {
							continue;
						}else{
							data[i][j] = $(this).parents(".read").children().eq(j+1).children().html();
						}
					}

					remove_notice();
					
					flag = 1;

				}else if (flag == 0) {
					remove_notice();
					notice($("#news-passBtn"));
				}
			})
			if (flag==1) {
				var nub = 1;
				secon_ensure(data,nub);
			};
		}
	)
})

//审核未通过 
$(function(){
	$("#news-unpassBtn").bind(
		"click",
		function(){
			var i = -1;
			var flag = 0;
			$(".i-checks").each(function(){		//查找哪些被选择了
				if ($(this).prop("checked")) {
					//获取内容
					++i;
					data[i] = new Array();
					for(var j=0; j<=6; j++){
						if (j==3) {
							continue;
						}else{
							data[i][j] = $(this).parents(".read").children().eq(j+1).children().html();
						}
					}

					remove_notice();
					
					flag = 1;

				}else if (flag == 0) {
					remove_notice();
					notice($("#news-unpassBtn"));
				}
			})
			if (flag==1) {
				var nub = 2;
				secon_ensure(data,nub);
			};
		}
	)
})



//未选择时弹出提示
function notice(obj){
	var notice = $("<div class='nochose-box'><span class='triangle-up2'></span><span class='triangle-up'></span><div class='nochose-notice badge'>请选择内容</div></div>");
	obj.before(notice);
	$(".nochose-box").animate({"opacity":1});
}
//移除提示框
function remove_notice(){
	$(".nochose-box").animate({"opacity":0});
	$(".nochose-box").remove();
}




//二次确认        type = 0 删除， 1 通过，  2未通过  
function secon_ensure(obj,type){
	for(var i=0; i<obj.length; i++){
		for(var j=0; j<obj[i].length;j++){
			if (j==3) {
				continue;
			}else{
				console.log(obj[i][j]);
			}
		}
	}
	switch(type){
		case 0:
			console.log("删除");
			break;
		case 1:
			console.log("通过");
			break;
		case 2:
			console.log("未通过");
			break;
	}
	console.log(" ");
	show_second(obj,type);
	function show_second(obj,type){
		$(".cover").css({"z-index":1001});
		$(".news-second-ensure-box").css({"z-index":1002});
		$(".cover").animate({"opacity":1});
		$(".news-second-ensure-box").animate({"opacity":1});
		for(var i=0; i<obj.length; i++){
			var atr = $("<tr></tr>");
			for(var j=0; j<obj[i].length;j++){
				if (j==3) {
					continue
				}else{
					var atd = $("<td>"+obj[i][j]+"</td>");
					atr.append(atd);
				}
			}
			$(".show-box tbody").append(atr);
		}
		switch(type){
			case 0:
				$(".show-notice").html("确定要删除这些内容吗？");
				break;
			case 1:
				$(".show-notice").html("确定让这些内容通过审核吗？");
				break;
			case 2:
				$(".show-notice").html("确定让这些内容不通过审核吗？");
				break;
		}		
	}
}

// 二次确认中的  YES与NO  
$(function(){
	$("#s-no").bind("click",function(){
		$(".cover").animate({"opacity":0});
		$(".news-second-ensure-box").animate({"opacity":0},function(){
			$(".cover").css({"z-index":'-1'});
			$(".news-second-ensure-box").css({"z-index":'-1'});
			$(".show-box tbody tr").remove();
		});
		
	})
})




/*   执行删除、通过、不通过 操作  END*/
/*****************************************/









/*+++++++++++++++++++++++++++++++++++++++*/

/*    发布新公告或者新闻  START  */

//发布公告/新闻按钮动画

$(function(){
	$("#push-notice").bind(
		"click",
		function(){
			$(".write-box").removeClass("myHidden");
			$(".write-box").animate({"opacity":1});
			$("#push-news").removeClass("tag-chosed");
			$("#push-notice").addClass("tag-chosed");
			$("#push-notice").blur();
		});
	$("#push-news").bind(
		"click",
		function(){
			$(".write-box").removeClass("myHidden");
			$(".write-box").animate({"opacity":1});
			$("#push-notice").removeClass("tag-chosed");
			$("#push-news").addClass("tag-chosed");
			$("#push-news").blur();
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
				window.location.reload();
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



/*    发布新公告或者新闻  END   */
/*****************************************/


// 分页按钮
$(function(){

	var Apage = 10;  //一页多少行内容
	var flag = 1;   // 当前页数
	var previousNub = 0; //前一页
	var nextNub = 2; //下一页
	var max = Math.ceil($("tr").length/Apage);	//最大页数

	if (max/10 <10 && max/10 >=1) {
		$("#write-nub").css({"width":"71px"});
	}else if (max/100 <10 && max/10 >=10) {
		$("#write-nub").css({"width":"80px","text-align":"center"});
	};

	toshow();
	function toshow(){
		$("tr").css("display","none");
		for (var i = (flag-1)*Apage; i <= (flag-1)*Apage+Apage-1; i++) {
			$("tr:eq("+i+")").css("display","table-row");
		};
		$("#write-nub").attr("placeholder",flag+"/"+max+"页");
		$("#write-nub").val("");

		console.log(nextNub);
		console.log(previousNub);
		console.log(max);

		if (nextNub > max){
			$("#next-btn").prop("disabled",true);
			console.log("a1");
		}else if(nextNub <= max) {
			$("#next-btn").prop("disabled",false);
			console.log("a2");
		}
		if (previousNub == 0){
			$("#previous-btn").prop("disabled",true);
			console.log("b1");
		}else if(previousNub > 0) {
			$("#previous-btn").prop("disabled",false);
			console.log("b2");
		}
	}
	//下一页
	$("#next-btn").bind(
		"click",
		function(){
			// if (nextNub > max){
			// 	$("#next-btn").attr("disabled","disabled");
			// }else{
				nextNub++;
				previousNub++;
				flag++;
				toshow();
			// };
		})
	//上一页
	$("#previous-btn").bind(
		"click",
		function(){
			// if (previousNub == 0){
			// 	$("#previous-btn").attr("disabled","disabled");
			// }else{
				nextNub--;
				previousNub--;
				flag--;
				toshow();
			// };
		})
	//页面跳转
	$(document).keypress(function(){
		var inputNub = $("#write-nub").val();
		if (event.keyCode == 13) {
			if (inputNub != null && inputNub != "") {
				if (inputNub<=0 || inputNub>max) {
					alert("最多"+max+"页");
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