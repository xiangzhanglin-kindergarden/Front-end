/**
 * Created by LeiTing on 2017/4/8.
 */
var cityArray = new Array();
cityArray[0] = new Array("1新闻动态", "新闻动态");
cityArray[1] = new Array("2通知公告", "通知公告");
cityArray[2] = new Array("3组织结构", "部门简介|离退休工作党委|关工委|党支部|离退休工作处|老教授协会|高教老协老体协|片区小组");
cityArray[3] = new Array("4政策文件", "国家政策|市级政策|学校政策|处内规定|重要讲话");
cityArray[4] = new Array("5党建工作", "专项工作|行政动态|协会工作|小组工作|人员信息");
cityArray[5] = new Array("6行政管理", "专项工作|党建工作|关工委工作|教授协会工作|高教老协工作|老体协工作|党员园地|党员信息");
cityArray[6] = new Array("7特色服务", "特殊帮扶|法律咨询站点|心理咨询站点|志愿服务队");
cityArray[7] = new Array("8老年园地", "焕发风采|养生保健|作品展示");

function getCity(currProvince) {
	//当前 所选择 的 省
	var currProvince = currProvince;
	var i, j;
	//清空 城市 下拉选单
	document.all.selCity.length = 0;
	for (i = 0; i < cityArray.length; i++) {
		//得到 数组中的位置
		if (cityArray[i][0] == currProvince) {

			var tmpcityArray = cityArray[i][1].split("|");
			for (j = 0; j < tmpcityArray.length; j++) {
				//填充 下拉选单
				document.all.selCity.options[document.all.selCity.length] = new Option(tmpcityArray[j], tmpcityArray[j]);
			}
		}
	}
}
$(document).ready(function () {
	var articleId="";

	var editor = new wangEditor('div1');
	// 上传图片
	editor.config.uploadImgUrl = 'http://119.29.53.178:8080/retirement/uploadPic/fileUpLoad.action';
	// 隐藏掉插入网络图片功能。
	editor.config.hideLinkImg = true;
	// 自定义load事件
	editor.config.uploadImgFns.onload = function (resultText, xhr) {

		var obj= JSON.parse(resultText);

		// 上传图片时，已经将图片的名字存在
		var originalName = editor.uploadImgOriginalName || '';

		editor.command(null, 'insertHtml', '<img src="' + obj[0].url + '" alt="' + originalName + '" style="max-width:100%;"/>');
	};


	editor.config.uploadImgFns.ontimeout = function (xhr) {
		alert('上传超时');
	};

	editor.config.uploadImgFns.onerror = function (xhr) {
		alert('上传错误');
	};

	// 表情显示项
	editor.config.emotionsShow = 'icon';

	//自定义菜单栏
	editor.config.menus = $.map(wangEditor.config.menus, function(item, key) {
		if (item === 'insertcode') {
			return null;
		}
		if (item === 'video') {
			return null;
		}
		if (item === 'location'){
			return null;
		}
		if (item === 'source'){
			return null;
		}
		return item;
	});

	$('#edit').click(function () {
		editor.undestroy();
	});

	$('#preview').click(function () {
		editor.destroy();
	});

	$("#myTitle").blur(function(){
		document.getElementById("linkMyTitle").innerHTML=$("#myTitle").val();
	});

	editor.create();

	//富文本上传文章
	$("#save").click(function() {
		var html = editor.$txt.html(); 		//文体
		console.log(html);
		var option2=document.getElementById("selCity");	//处理文章分类
		var option1=document.getElementById("selProvince");
		var index2=option2.selectedIndex;
		var index1=option1.selectedIndex;
		var array=['A','B','C','D','E','F','G','H'];
		var type=option2.options[index2].value;
		index1=index1.toString();
		index2=index2.toString();

        var title=$("#myTitle").val();
		var value=sessionStorage.getItem("key")||"挺哥";		//作者
		var myjson={'title':title,'author':value,'content':html,'statu':0,'type':type,'location':index1+ array[index2]};
		myjson=JSON.stringify(myjson);

		if(title==""){
			alert("请给文章添加一个标题");
		}else{
			$.ajax({
				type:"POST",
				url:"http://119.29.53.178:8080/retirement/temporary/insertTeamporary.action",
				data:{"temporaryJson":myjson},
				success:function(data){
					if(data==false){
						alert("上传失败！！！");
					}else{
						/*成功上传之后显示上传附件按钮*/
						articleId=data;
						$("#file").css({
							"display":"block"
						});
						document.getElementById("linkUploadText").innerHTML="你现在可以上传附件了,上传成功之后点击文章链接即可下载文件";
						//应用插件
						initFileInput("input-id");
					}

				},
				error:function(E_request){
					alert("发生错误："+E_request.status);
				}
			})
		}

	});

	//fileinput上传附件
	function initFileInput(ctrlName) {
		var control = $('#' + ctrlName);
		control.fileinput({
			language: 'zh', //设置语言
			uploadUrl: "http://119.29.53.178:8080/retirement/affix/uploadAffix.action", //上传的地址
			allowedFileExtensions: ['txt', 'docx', 'xlsx'],//接收的文件后缀
			uploadAsync: true, //默认异步上传
			showUpload: true, //是否显示上传按钮
			showRemove : true, //显示移除按钮
			showPreview : true, //是否显示预览
			showCaption: false,//是否显示标题
			uploadExtraData:{wid:articleId},
			enctype: 'multipart/form-data',
			browseClass: "btn btn-primary", //按钮样式
			dropZoneEnabled: true,//是否显示拖拽区域
			maxFileCount: 4, //表示允许同时上传的最大文件个数
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
			console.log('文件上传成功');
			//上传附件部分
			$.ajax({
				type:"GET",
				url:"http://119.29.53.178:8080/retirement/affix/selectAffixNames.action"+"?"+"wid="+articleId,
				dataType:"json",
				contentType:"application/json;charset=utf-8",
				success:function(data){
					var linkUpload=document.getElementById("linkUpload");
					var array=[];
					linkUpload.innerHTML="";
					for(var i=0;i<data.length;i++){
						array.push((data[i].split("$"))[1]);
						var a=document.createElement("a");
						a.href="http://119.29.53.178:8080/retirement/affix/downLoadAffix.action"+"?"+"affixName="+data[i];
						a.innerHTML=array[i]+"&nbsp&nbsp";
						linkUpload.appendChild(a);
					}
				},
				error:function(E_request){
					alert("发生错误："+E_request.status);
				}
			});

		}).on('fileerror', function(event, data, msg) {  //一个文件上传失败
			console.log('文件上传失败！'+data.id);


		})
	}

});

