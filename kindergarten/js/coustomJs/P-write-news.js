
var usertype    //用户类型，0为老师，1位校长
var username    //用户名
var pushname    //发布人的名字







$(function(){
	username = sessionStorage.getItem("user");
  usertype = sessionStorage.getItem("nub");  
	pushname = sessionStorage.getItem("pushname");  
	console.log(username);
  console.log(usertype);
	console.log(pushname);
	// usertype = 0;
	if (usertype == 0) {


	}

})


var oldcover    //存储原封面
var newcover    //存储新封面

/*    NewsAdd      */
var restate      //状态：通过、未通过、待审核、草稿
var retitle      //标题
var remessage    //富文本内容
var rekind       //新闻、公告
var reurl1       //封面
var reurl2 = new Array();       //附件


oldcover = $(".if-d-cover img").attr('src');


reurl1 = oldcover;


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
			editor.config.uploadImgUrl = 'http://172.20.2.164:8080/kindergarden/imageUpload';
			// 隐藏掉插入网络图片功能。该配置，只有在你正确配置了图片上传功能之后才可用。
	    editor.config.hideLinkImg = true;

      editor.config.uploadImgFns.onload = function (resultText, xhr) {

        console.log(resultText);
        
        var obj = JSON.parse(resultText);

        // var pa = /.*\{(.*)\}/;
        // alert(resultText.match(pa)[1]);


        // 上传图片时，已经将图片的名字存在
        var originalName = editor.uploadImgOriginalName || '';

        // editor.command(null, 'insertHtml', '<img src="' +obj[0] + '" alt="' + originalName + '/>');
        editor.command(null, 'InsertImage', obj.url);
      };

      editor.config.uploadImgFns.ontimeout = function (xhr) {
        // xhr 是 xmlHttpRequest 对象，IE8、9中不支持
        alert('上传超时');
      };

      // 自定义error事件
      editor.config.uploadImgFns.onerror = function (xhr) {
        // xhr 是 xmlHttpRequest 对象，IE8、9中不支持
        alert('上传错误');
      };

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
    url:"http://172.20.2.164:8080/kindergarden/Upload",
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

        creatFJ(files, response);
        
      });
      this.on("errormultiple", function (files, response) {});

    }

	}
})

/*
*  生成附件浏览函数
*/
function creatFJ(files, response){
  var FJnub = parseInt($(".fjnub").html());
  console.log(FJnub);
  FJnub = FJnub+files.length;
  $(".fjnub").html(FJnub);

  console.log(response);
  response = JSON.parse(response);

  for(var i=0; i<response.length; i++){
    var Odiv = $("<div class='file-box'></div>");
    var O2div = $("<div class='file'></div>");
    var Ia = $("<a href='"+response[i].url+"' target='_blank'></a>");

    var Ispan = $("<span class='corner'></span>");
    var Idiv = $("<div class='image imagebox'>")

    var photo = suffixPD(response[i].url);

    var Iimg = $("<img alt='image' class='img-responsive' src='"+photo+"'>");
    
    var I2div = $("<div class='file-name'>"+files[i].name+"</div>");

    Idiv.append(Iimg);
    Ia.append(Ispan);
    Ia.append(Idiv);
    Ia.append(I2div);
    O2div.append(Ia);
    Odiv.append(O2div);
    $(".attachment").prepend(Odiv);
  }
}



/*
*  判断获取到的文件的格式
*/
function suffixPD(obj){
  var regImg = /\.(jpg|jpeg|bmp|gif|png)$/g;
  var regVideo = /\.(mp4|avi|flv|wmv|swf)$/g;
  var regdoc = /\.(pdf|txt|doc|docx)$/g;
  var regzip = /\.(zip|rar|7-zip)$/g;
  var regMusic = /\.(mp3|wma|wav|occ|flac)$/g;

  var imgPD = regImg.test(obj);
  if (imgPD==true) {
    return obj;
  }else{
    var videPD = regVideo.test(obj);
    if (videPD==true) {
      var IDcover = "img/coverVideo.png";
      return IDcover;
    }else{
      var docPD = regdoc.test(obj);
      if (docPD==true) {
        var IDcover = "img/coverFile.png";
        return IDcover;
      }else{
        var zipPD = regzip.test(obj);
        if (zipPD==true) {
          var IDcover = "img/coverZip.png";
          return IDcover;
        }else{
          var musicPD = regMusic.test(obj);
          if (musicPD==true) {
            var IDcover = "img/coverMusic.png";
            return IDcover;
          }else{
            var IDcover = "img/coverOther.png";
            return IDcover;
          }
        }
      }
    }
  }
}



/* 上传封面 */
$(function(){

  var pdkind = $("body").attr("name");
  if (pdkind == "新闻") {
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
	}
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



/*   上传AJAX   */
  $(function(){
    $(".if-w-sub-btn").click(function(){
      var pdstate = "待审核";
      UpAJAX(pdstate);
    })
    $(".if-w-save-btn").click(function(){
      var pdstate = "草稿";
      UpAJAX(pdstate);
    })
  })

  function UpAJAX(pdstate){

    restate = pdstate;

    retitle = $(".if-w-change-title input").val(); //获取标题

    //获取富文本内容
    var html = editor.$txt.html();
    remessage = html;
    // var text = editor.$txt.text();
    // var formatText = editor.$txt.formatText();
    // console.log("编辑器区域完整html代码:"+html);
    // console.log("编辑器纯文本内容:"+text);
    // console.log("格式化后的纯文本:"+formatText);



    //获取封面
    var pdurl1 = $(".if-d-c-border img").attr("src");
    if (pdurl1 == "img/logo.png") {
      reurl1 = "0";
    }else{
      reurl1 = pdurl1;
    }

    //获取新闻、公告类型
    var pdkind = $("body").attr("name");
    if (pdkind == "新闻") {
      rekind = "新闻";
    }else if(pdkind == "公告"){
      rekind = "公告";
      reurl1 = "0";
    }

    //获取附件
    var url2leng = $(".attachment .file-box").length;
    if (url2leng == 0) {
      reurl2 = "0";
    }else{
      for (var i = 0; i < url2leng; i++) {
        reurl2[i] = $(".attachment .file-box:eq("+i+") a").attr("href");
        var fileName = $(".attachment .file-box:eq("+i+") .file-name").html();
        reurl2[i] = reurl2[i]+":^:"+fileName;
      };
      reurl2 = reurl2.join(",");
    }
    console.log(reurl2);

    inNewsAdd = {
      issuer:pushname,
      time:null,
      state:restate,
      title:retitle,
      message:remessage,
      kind:rekind,
      url1:reurl1,
      url2:reurl2,
      totalPage:null,
    }
    console.log(inNewsAdd);
    myjson = JSON.stringify(inNewsAdd);

    $.ajax({
      type:"post",
      url:"http://172.20.2.164:8080/kindergarden/Newsadd",
      data:"NewsAdd="+myjson,
      dataType:"JSON",
      contentType:"application/x-www-form-urlencoded;charset=UTF-8",
      beforeSend:function(xhr){
        xhr.withCredentials = true;
        xhr.setRequestHeader("X-Requested-with","XMLHttpRequest");
      },
      success:function(data){
        console.log(data);
        console.log(data.success);
        if (data.success=="success") {
          alert("提交成功！");
          window.location.href = "allNewsManagement.html";
        };
      },
      error:function(jqHXR){
        console.log("错误:"+jqHXR.status);
      }
    })
  }









  















