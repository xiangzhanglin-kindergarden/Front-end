/*
 *
 *   资讯管理 功能
 *   
 *
*/

/*+++++++++++++++++++++++++++++++++++++++*/

/*   选择日期  START*/

	laydate({
    elem: '#J-xl',
    format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
	});


/*    选择日期  END*/
/*****************************************/

/*+++++++++++++++++++++++++++++++++++++++*/

/*   分类按钮  START*/

	$(function(){
		$(".news-nchange-btn button").bind("click",function(){
			if ($(this).hasClass("btn-info")) {

			}else{
				$(".news-nchange-btn button").addClass("btn-white");
				$(".news-nchange-btn button").removeClass("btn-info");
				$(this).removeClass("btn-white");
				$(this).addClass("btn-info");

				if ($(this).hasClass("n-btn-o")) {
					$(".news-nchange-btn button").removeClass("btn-info");

					$(".n-btn-o").addClass("btn-info");
					$(".n-btn-o").removeClass("btn-white");
					$(".n-s-kind").animate({"opacity":0},500,function(){
						$(".n-s-kind").css({"display":"none"});
					})
					$("#n-s-all").animate({"opacity":0},500,function(){
						$("#n-s-all").css({"display":"none"});
					})
				}else{
					$(".n-s-kind").css({"display":"block"});
					$(".n-s-kind").animate({"opacity":1});
					$("#n-s-all").css({"display":"block"});
					$("#n-s-all").animate({"opacity":1});
				}
			}
		})
	})



/*    分类按钮  END*/
/*****************************************/




// 分页按钮
$(function(){

	var Apage = 10;  //一页多少行内容
	var flag = 1;   // 当前页数
	var previousNub = 0; //前一页
	var nextNub = 2; //下一页
	var max = Math.ceil($(".know-lists").length/Apage);	//最大页数

	if (max/10 <10 && max/10 >=1) {
		$("#write-nub").css({"width":"71px"});
	}else if (max/100 <10 && max/10 >=10) {
		$("#write-nub").css({"width":"80px","text-align":"center"});
	};

	toshow();
	function toshow(){
		$(".know-lists").css("display","none");
		for (var i = (flag-1)*Apage; i <= (flag-1)*Apage+Apage-1; i++) {
			$(".know-lists:eq("+i+")").css("display","table-row");
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


