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
    format: 'YYYY/MM/DD', // 分隔符可以任意定义，该例子表示只显示年月
	});


/*    选择日期  END*/
/*****************************************/








/*+++++++++++++++++++++++++++++++++++++++*/

/*   删除弹窗动画  START*/

	$('.n-l-f-btn-del').click(function () {
    swal({
      title: "您确定要删除这条资讯吗",
      text: "删除后将无法恢复，请谨慎操作！",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "是的，我要删除！",
      cancelButtonText: "让我再考虑一下…",
      closeOnConfirm: false,
      closeOnCancel: false
    },
    function (isConfirm) {
      if (isConfirm) {
        swal("删除成功！", "您已经永久删除了这条信息。", "success");
      } else {
        swal("已取消", "您取消了删除操作！", "error");
      }
    });
	});


/*    删除弹窗动画  END*/
/*****************************************/












/*+++++++++++++++++++++++++++++++++++++++*/

/*   选择审核状态  START*/

	$(function(){
		$(".news-status span").bind("click",function(){
			var tID = $(this).attr("id");
			var tClass = $(this).attr("class");
			console.log(tID);
			if (tID == "n-s-all") {
				$(".news-status span").removeClass("n-s-chosed");
				$(this).addClass("n-s-chosed");
			}else if(tID == null || tID=="" || tID=="undefined") {
				
				var nub2 = 0;
				$(".news-status span").each(function(){
					var tclass2 = $(this).attr("class");
					console.log(tclass2);
					if (tclass2 == "n-s-chosed") {
						nub2++;
					};
				})
				console.log("nub2  : "+nub2);
				if(nub2==2){
					$(".news-status span").removeClass("n-s-chosed");
					// $("#n-s-all").addClass("n-s-chosed");
				}




				if (tClass == "n-s-chosed") {
					$(this).removeClass("n-s-chosed");
					var nub = 0;
					$(".news-status span").each(function(){
						var tclass2 = $(this).attr("class");
						console.log(tclass2);
						if (tclass2 == "n-s-chosed") {
							nub +=1;
						};
					})
					if (nub == 0) {
						$("#n-s-all").addClass("n-s-chosed");
					};
				}else{
					$("#n-s-all").removeClass("n-s-chosed");
					$(this).addClass("n-s-chosed");	
				}
			};

			newsStatusAjax();
		})
	})

	/*  审核状态AJAX   */
	function newsStatusAjax(){

	}



/*    选择审核状态  END*/
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
			}

			newsKindAjax();
		})
	})

	/*  审核状态AJAX   */
	function newsKindAjax(){

	}



/*    分类按钮  END*/
/*****************************************/

$(function(){
	$(".news-newpage-btn button").click(function(){
		$(this).css({"color":"#fff"});
	})
})






/*+++++++++++++++++++++++++++++++++++++++*/

/*   执行删除、通过、不通过 操作  START*/



/*   执行删除、通过、不通过 操作  END*/
/*****************************************/







// 分页按钮
$(function(){

	var Apage = 10;  //一页多少行内容
	var flag = 1;   // 当前页数
	var previousNub = 0; //前一页
	var nextNub = 2; //下一页
	var max = Math.ceil($(".news-lists").length/Apage);	//最大页数

	if (max/10 <10 && max/10 >=1) {
		$("#write-nub").css({"width":"71px"});
	}else if (max/100 <10 && max/10 >=10) {
		$("#write-nub").css({"width":"80px","text-align":"center"});
	};

	toshow();
	function toshow(){
		$(".news-lists").css("display","none");
		for (var i = (flag-1)*Apage; i <= (flag-1)*Apage+Apage-1; i++) {
			$(".news-lists:eq("+i+")").css("display","table-row");
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




