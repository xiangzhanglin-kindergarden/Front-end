var oldcover    //存储原封面
var newcover    //存储新封面



oldcover = $(".if-d-cover img").attr('src');








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








/*++++++++++++++   添加   +++++++++++++++++++++++++*/

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




/*    上传封面  */

	$(function(){
		var control = $("#file-0");
		control.fileinput({
			language: 'zh', //设置语言
			uploadUrl: "http://172.20.2.164:8080/kindergarden/imageUpload", //上传的地址
			allowedFileExtensions: ['jpg', 'gif', 'png'],//接收的文件后缀
			uploadAsync: true, //默认异步上传
			showUpload: true, //是否显示上传按钮
			showRemove : true, //显示移除按钮
			showPreview : true, //是否显示预览
			showCaption: false,//是否显示标题
			enctype: 'multipart/form-data',
			// uploadExtraData:{wid:123},
			browseClass: "btn btn-primary", //按钮样式
			dropZoneEnabled: true,//是否显示拖拽区域
			maxFileCount: 1, //表示允许同时上传的最大文件个数
			validateInitialCount:true,
			previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
			msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
			previewSettings:{width: "auto", height: "50px"},
			textEncoding:"utf-8"
			//{}

		}).on('filepreupload', function(event, data, previewId, index) {     //上传中
			var form = data.form, files = data.files, extra = data.extra,
				response = data.response, reader = data.reader;
			console.log('文件正在上传');
		}).on("fileuploaded", function (event, data, previewId, index) {    //一个文件上传成功
			alert('文件上传成功');
			console.log(data.response);
			console.log(data.response.url);

			newcover = data.response.url;


			$(".if-d-recover").css({"display":"block"});
			$(".if-d-recover").animate({"opacity":1},700);

			$(".if-d-cover img").attr('src',newcover)
			$(".if-d-cover span").html("新封面");
			//上传附件部分

		}).on('fileerror', function(event, data, msg) {  //一个文件上传失败
			console.log('文件上传失败！'+data.id);


		})
	})

/*    上传封面  END*/


/*   还原封面 按钮 */
	$(function(){
		$(".if-d-recover").click(function(){
			$(".if-d-cover img").attr('src',oldcover)
			$(".if-d-cover span").html("原封面");
			$(".if-d-recover").animate({"opacity":0},700,function(){
				$(".if-d-recover").css({"display":"none"});
			});
		})
	})
/*   还原封面 按钮  END*/


/*    弹出添加框  */
	$(function(){
		$(".know-newpage-btn button").click(function(){
			// 移出隐藏
			$(".know-new-box").removeClass("myHidden");
			$(".cover").removeClass("myHidden");
			// 移出关闭特效
			$(".know-new-box").removeClass("bounceOut");
			$(".cover").removeClass("fadeOut");
			// 增加开启特效
			$(".know-new-box").addClass("bounceIn");
			$(".cover").addClass("fadeIn");

			// “新增”按钮不可使用
			$(".know-newpage-btn button").attr("disable",true);
		})
	})

/*    弹出添加框  END*/



/*    取消添加  */
	$(function(){
		$(".know-new-no").click(function(){
			// 移除开启特效
			$(".know-new-box").removeClass("bounceIn");
			$(".cover").removeClass("fadeIn");
			// 开启关闭特效
			$(".know-new-box").addClass("bounceOut");
			$(".cover").addClass("fadeOut");
			// 执行清除操作
			$(".if-d-recover").trigger("click");
			$(".if-d-cover-c-b .fileinput-remove-button").trigger("click");
			$(".know-new-title input").val("");
			$(".know-new-a input").val("");

			// 动画结束后处理
			setTimeout(function(){
				$(".know-new-box").addClass("myHidden");
				$(".cover").addClass("myHidden");
				$(".know-newpage-btn button").attr("disable",false);
			}, 1000);
		})
	})

/*    取消添加  END*/


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




