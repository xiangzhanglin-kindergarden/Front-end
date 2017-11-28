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

/*   选择审核状态  START*/

	$(function(){
		$(".news-status span").bind("click",function(){
			var tID = $(this).attr("id");
			var tClass = $(this).attr("class");
			// console.log(tID);
			if (tID == "n-s-all") {
				$(".news-status span").removeClass("n-s-chosed");
				$(this).addClass("n-s-chosed");
			}else if(tID != "n-s-all") {
				setTimeout(function(){
					var nub2 = 0;
					$(".n-s-kind").each(function(){
						var tclass2 = $(this).attr("class");
						// console.log(tclass2);
						if (tclass2 == "n-s-kind n-s-chosed") {
							nub2++;
						};
					})
					// console.log("nub2  : "+nub2);
					if(nub2==3){
						$(".news-status span").removeClass("n-s-chosed");
						$("#n-s-all").addClass("n-s-chosed");
					}
				}, 1);
				

				if (tClass == "n-s-kind n-s-chosed") {
					$(this).removeClass("n-s-chosed");
					var nub = 0;
					$(".news-status span").each(function(){
						var tclass2 = $(this).attr("class");
						// console.log(tclass2);
						if (tclass2 == "n-s-kind n-s-chosed") {
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
		})
	})


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

$(function(){
	$(".news-newpage-btn button").click(function(){
		$(this).css({"color":"#fff"});
	})
})










