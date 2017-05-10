
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
    maxFiles: 100,
    method:"post",
    addRemoveLinks:true,
    url:"http://119.29.53.178:8080/retirement/uploadPic/fileUpLoad.action",


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
      	// console.log(files);
      	// console.log(response);

      	// 上传完成后刷新
      	// window.location.reload();
      });
      this.on("errormultiple", function (files, response) {});

    }

	}
})

/* 上传封面 */
$(function(){
	var uploader = WebUploader.create({
    // 文件接收服务端。
    server: 'http://webuploader.duapp.com/server/fileupload.php',

	});
})













  















