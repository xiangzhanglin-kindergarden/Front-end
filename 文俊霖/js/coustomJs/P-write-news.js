
var usertype    //用户类型，0为老师，1位校长
var username    //用户名
var oldcover    //存储原封面
var newcover    //存储新封面




oldcover = $(".if-d-cover img").attr('src');



$(function(){
	username = sessionStorage.getItem("user");
	usertype = sessionStorage.getItem("nub");  
	console.log(username);
	console.log(usertype);
	// usertype = 0;
	if (usertype == 0) {


	}

})





//   点击编辑 修改文章内容
$(function(){
	createWrite();
})

/*     富文本     */
	var editor
	/* 创建富文本  */
		function createWrite(){
			$(".if-d-write-box").css({"display":"block"});


			editor = new wangEditor('div1');

			// 图片上传路径
			editor.config.uploadImgUrl = 'http://119.29.53.178:8080/retirement/uploadPic/fileUpLoad.action';
			// 隐藏掉插入网络图片功能。该配置，只有在你正确配置了图片上传功能之后才可用。
	    editor.config.hideLinkImg = true;

			editor.create();

		}

	/* 获取富文本内容 */
	$(function(){
		$(".if-d-yes").bind("click",function(){
	  	var html = editor.$txt.html();
	  	var text = editor.$txt.text();
	  	var formatText = editor.$txt.formatText();
	  	console.log("编辑器区域完整html代码:"+html);
	  	console.log("编辑器纯文本内容:"+text);
	  	console.log("格式化后的纯文本:"+formatText);
	  })
	})


/* 上传文件、视频 */

$(function(){

	Dropzone.options.myAwesomeDropzone = {

    autoProcessQueue: false,
    uploadMultiple: true,
    parallelUploads: 100,
    maxFiles: 20,
    addRemoveLinks:true,
    dictMaxFilesExceeded: "您最多只能上传20个文件！",
    dictResponseError: '文件上传失败!',
    method:"post",
    url:"http://119.29.53.178:8080/kindergarden/imageUpload",
    // url:"#",
    paramName:"file",
    //setParameterEncoding:AFJSONParameterEncoding


    // Dropzone settings
    init: function () {
      var myDropzone = this;

      this.element.querySelector("button[type=submit]").addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        myDropzone.processQueue();
      });
      this.on("sendingmultiple", function () {});
      this.on("successmultiple", function (files, response) {
      	console.log(files);
      	console.log(response);

      	var Odiv = $("<div class='file-box'></div>");
      	var O2div = $("<div class='file'></div>");
      	var Ia = $("<a href='"+response+"'></a>");

      	var Ispan = $("<span class='corner'></span>");
      	var Idiv = $("<div class='image'>")
      	var Iimg = $("<img alt='image' class='img-responsive' src='"+response+"'>");
      	var I2div = $("<div class='file-name'>");

      	Idiv.append(Iimg);
      	// I2div.append(files.name);
      	Ia.append(Ispan);
      	Ia.append(Idiv);
      	Ia.append(I2div);
      	O2div.append(Ia);
      	Odiv.append(O2div);
      	$(".attachment").append(Odiv);


















      	// 上传完成后刷新
      	// window.location.reload();
      });
      this.on("errormultiple", function (files, response) {});

    }

	}
})






/* 上传封面 */
$(function(){
	var control = $("#file-0");
	control.fileinput({
		language: 'zh', //设置语言
		uploadUrl: "http://119.29.53.178:8080/kindergarden/imageUpload", //上传的地址
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

/* 还原封面 按钮 */
	$(function(){
		$(".if-d-recover").click(function(){
			$(".if-d-cover img").attr('src',oldcover)
			$(".if-d-cover span").html("原封面");
			$(".if-d-recover").animate({"opacity":0},700,function(){
				$(".if-d-recover").css({"display":"none"});
			});
		})
	})













  















