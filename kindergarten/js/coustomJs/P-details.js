
var usertype    //用户类型，0为老师，1位校长
var username    //用户名
var pageid      //文章ID


var oldcover    //存储原封面
var newcover    //存储新封面



/*    NewsAdd      */
var reissuer     //发布人
var restate      //状态：通过、未通过、待审核、草稿
var retitle      //标题
var remessage    //富文本内容
var rekind       //新闻、公告
var reurl1       //封面
var reurl2 = new Array();       //附件


oldcover = $(".if-d-cover img").attr('src');

reissuer = username;
reurl1 = oldcover;


$(function(){
	setTimeout("$('.if-d-cover-box').css({'display':'none'})",1)

	username = sessionStorage.getItem("user");
  usertype = sessionStorage.getItem("nub");  //0为老师，1为校长
	pageid = sessionStorage.getItem("pageID");  //0为老师，1为校长
	console.log(username);
  console.log(usertype);
	console.log(pageid);
	// usertype = 0;
	if (usertype == 0) {
		$(".if-d-page-status input[name='change']").remove();
		$(".if-d-page-status input[name='save']").remove();
		$(".if-d-page-status input[name='cancel']").remove();
		$(".if-d-page-status input[name='edit']").css({
			"display":"block",
			"opacity":1,
			"right":0
		});
		$(".if-d-page-status input[name='edit']").attr("disabled",false);
		

	}

})


//   点击修改、取消的动画

$(function(){
	$(".if-d-page-status input[name='change']").bind("click",function(){
		$(".if-d-page-status input[name='change']").attr("disabled",true);
		$(".if-d-page-status select").removeAttr("disabled");
		$(".if-d-page-status select").addClass("gtw");
		setTimeout("$('.if-d-page-status select').css({'background-color':'#fff'})",1000);
		
		$(".if-d-page-status input[name='save']").addClass("rtl");
		$(".if-d-page-status input[name='save']").css({"display":"block"});
		setTimeout(function(){
			$(".if-d-page-status input[name='save']").css({
				'opacity':1,
				'right':0
			})
		},1000)
		
		$(".if-d-page-status input[name='cancel']").addClass("rtl");
		$(".if-d-page-status input[name='cancel']").css({"display":"block"});
		setTimeout(function(){
			$(".if-d-page-status input[name='cancel']").css({
				'opacity':1,
				'right':0
			})
		},1000)

		$(".if-d-page-status input[name='edit']").addClass("rtl");
		$(".if-d-page-status input[name='edit']").css({"display":"block"});
		setTimeout(function(){
			$(".if-d-page-status input[name='edit']").css({
				'opacity':1,
				'right':0
			})
		},1000)

		setTimeout(function(){
			$(".if-d-page-status input[name='change']").addClass("ltr1")
			$(".if-d-page-status input[name='save']").addClass("ltr2");
			$(".if-d-page-status input[name='cancel']").addClass("ltr2");
			$(".if-d-page-status input[name='edit']").addClass("ltr2");
			
		},1000)

		setTimeout(function(){
			$(".if-d-page-status input[name='change']").css({
				'opacity':0,
				'margin-right':'-100px',
				'display':'none'
			})
			$(".if-d-page-status input[name='save']").attr("disabled",false);
			$(".if-d-page-status input[name='cancel']").attr("disabled",false);
			$(".if-d-page-status input[name='edit']").attr("disabled",false);
		},2000)

		setTimeout(function(){
			$(".if-d-page-status input[name='change']").removeClass("ltr1")
			$(".if-d-page-status input[name='save']").removeClass("ltr2");
			$(".if-d-page-status input[name='cancel']").removeClass("ltr2");
			$(".if-d-page-status input[name='edit']").removeClass("ltr2");
			$(".if-d-page-status input[name='cancel']").removeClass("rtl");
			$(".if-d-page-status input[name='save']").removeClass("rtl");
			$(".if-d-page-status input[name='edit']").removeClass("rtl");
			$(".if-d-page-status select").removeClass("gtw");
		},2001)
	})


	$(".if-d-page-status input[name='cancel']").bind("click",function(){
		$(".if-d-page-status input[name='cancel']").attr("disabled",true);
		$(".if-d-page-status input[name='save']").attr("disabled",true);
		$(".if-d-page-status input[name='edit']").attr("disabled",true);
		$(".if-d-page-status select").attr("disabled","true");
		$(".if-d-page-status select").addClass("wtg");
		setTimeout("$('.if-d-page-status select').css({'background-color':'#D0D0D0'});$('.if-d-page-status select').removeClass('wtg');",1000);
		
		$(".if-d-page-status input[name='change']").addClass("ltrB");
		$(".if-d-page-status input[name='change']").css({"display":"block"});
		setTimeout(function(){
			$(".if-d-page-status input[name='change']").css({
				'opacity':1,
				'margin-right':"15px"
			})
		},1000)
		setTimeout(function(){
			$(".if-d-page-status input[name='save']").animate({"opacity":0},function(){
				$(".if-d-page-status input[name='save']").css({"display":"none"});
			})
			$(".if-d-page-status input[name='cancel']").animate({"opacity":0},function(){
				$(".if-d-page-status input[name='cancel']").css({"display":"none"});
			})
			$(".if-d-page-status input[name='edit']").animate({"opacity":0},function(){
				$(".if-d-page-status input[name='edit']").css({"display":"none"});
			})
			$(".if-d-page-status input[name='change']").attr("disabled",false);
		},1000)


		setTimeout(function(){
			$(".if-d-page-status input[name='change']").removeClass("ltrB");
		},1001)
		
	})

	$(".if-d-page-status input[name='edit']").bind("click",function(){
		$(".if-d-p-s-e-btn").addClass("dtu");
		$(".if-d-page-status input[name='edit']").addClass("dtu2");
		setTimeout(function(){
			$(".if-d-page-status input[name='edit']").css({
				'margin-top':"-70px"
			})
			$(".if-d-p-s-e-btn").css({
				'margin-top':"-8px"
			})
		},1000)
		setTimeout(function(){
			$(".if-d-p-s-e-btn").removeClass("dtu");
			$(".if-d-page-status input[name='edit']").removeClass("dtu2");
		},1001)
			
		if (usertype==0) {
			
		}else{
			$(".if-d-page-status input[name='save']").addClass("dtu2");
			$(".if-d-page-status input[name='cancel']").addClass("dtu2");
			$(".if-d-page-status select").attr("disabled","true");
			$(".if-d-page-status select").addClass("wtg");
			setTimeout("$('.if-d-page-status select').css({'background-color':'#D0D0D0'});$('.if-d-page-status select').removeClass('wtg');",1000);

			setTimeout(function(){
				$(".if-d-page-status input[name='save']").css({
					'margin-top':"-70px",
				})
				$(".if-d-page-status input[name='cancel']").css({
					'margin-top':"-70px"
				})
			},1000)

			setTimeout(function(){
				$(".if-d-page-status input[name='save']").removeClass("dtu2");
				$(".if-d-page-status input[name='cancel']").removeClass("dtu2");
			},1001)
		}
	})

	$(".if-d-no").bind("click",function(){
		$(".if-d-p-s-e-btn").addClass("utd");
		$(".if-d-page-status input[name='edit']").addClass("utd2");
		setTimeout(function(){
			$(".if-d-page-status input[name='edit']").css({
				'margin-top':"0px"
			})
			$(".if-d-p-s-e-btn").css({
				'margin-top':"70px"
			})
		},1000)

		setTimeout(function(){
			$(".if-d-p-s-e-btn").removeClass("utd");
			$(".if-d-page-status input[name='edit']").removeClass("utd2");
		},1001)
		if (usertype ==0) {
			
		}else{
			$(".if-d-page-status input[name='save']").addClass("utd2");
			$(".if-d-page-status input[name='cancel']").addClass("utd2");
			$(".if-d-page-status select").attr("disabled",false);
			$(".if-d-page-status select").addClass("gtw");
			setTimeout("$('.if-d-page-status select').css({'background-color':'#fff'})",1000);
			
			setTimeout(function(){
				$(".if-d-page-status input[name='save']").css({
					'margin-top':"0px"
				})
				$(".if-d-page-status input[name='cancel']").css({
					'margin-top':"0px"
				})
				$(".if-d-page-status input[name='edit']").css({
					'margin-top':"0px"
				})
				$(".if-d-p-s-e-btn").css({
					'margin-top':"70px"
				})
			},1000)

			setTimeout(function(){
				$(".if-d-p-s-e-btn").removeClass("utd");
				$(".if-d-page-status input[name='save']").removeClass("utd2");
				$(".if-d-page-status input[name='cancel']").removeClass("utd2");
				$(".if-d-page-status input[name='edit']").removeClass("utd2");
			},1001)
		}
	})
})

//   点击编辑 修改文章内容
$(function(){
	$(".if-d-page-status input[name='edit']").bind("click",function(){
		//创建富文本
		createWrite();

		//创建标题的修改
		inputTitle();

		//创建封面修改
		changeCover();

		//创建附件修改
		changefile();
	})
})

//  取消修改 按钮
$(function(){
	$(".if-d-no").bind("click",function(){
		$(".if-d-content").css("display","block");
		$(".if-d-write-box").css({"display":"none"})
		editor.destroy();
		$(".if-d-change-title input").val("");
		$(".if-d-t-c-box").css({"display":"block"});
		$(".if-d-change-title").css({"display":"none"});
		$(".if-d-cover-box").css({"display":"none"});
		$(".ibox").css({"display":"none"});
	})
})



/*     富文本     */
	var editor
	/* 创建富文本  */
		function createWrite(){
			$(".if-d-write-box").css({"display":"block"});


			editor = new wangEditor('div1');

			// 图片上传路径
			//editor.config.uploadImgUrl = 'http://119.29.53.178:8080/retirement/uploadPic/fileUpLoad.action';
			// editor.config.uploadImgUrl = 'http://119.29.53.178:8080/kindergarden/Upload';
			editor.config.uploadImgUrl = 'http://119.29.53.178:8080/kindergarden/imageUpload';

			// 隐藏掉插入网络图片功能
	    editor.config.hideLinkImg = true;


		//editor.config.withcredentials = true;

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
			//editor.config.uploadHeaders = 'x-requested-with'

			/*editor.config.uploadheaders = {
				'Accept':'text/x-json',
				'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
			}*/
			editor.config.withCredentials = true;

			editor.create();

			


			//获取原页面的内容 
			var content = getPageCont();
			editor.$txt.html(content);

			

			$(".if-d-content").css("display","none");
		}

	/* 获取页面中的文本 */
		function getPageCont(){
			var words = $(".if-d-content").html();
			return words;
		}

	/* 创建 修改标题 */
		function inputTitle(){
			var words = $(".if-d-t-c-box p").text();
			$(".if-d-change-title input").val(words);

			$(".if-d-t-c-box").css({"display":"none"});
			$(".if-d-change-title").css({"display":"block"});
		}

	/* 开启封面修改 */
		function changeCover(){
			$(".if-d-cover-box").css({"display":"block"});
		}

	/* 创建附件修改 */
		function changefile(){
			$(".ibox").css({"display":"block"});
		}


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
    url:"http://119.29.53.178:8080/kindergarden/Upload",
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
      this.on("success", function(files, response) {
        console.log(response);
      });
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





/* 获取内容  */
$(function(){
  $.ajax({
    type:"post",
    url:"http://119.29.53.178:8080/kindergarden/SreachByID?idnews="+pageid,
    dataType:"JSON",
    contentType:"application/x-www-form-urlencoded;charset=UTF-8",

    beforeSend:function(xhr){
      xhr.withCredentials = true;
      xhr.setRequestHeader("X-Requested-with","XMLHttpRequest");
    },
    success:function(data){
      console.log(data);

      //修改状态
      if (data.state=="通过") {
        $("#if-d-status option[value='pass']").attr("selected",true);
        console.log(1);
        $(".if-d-page-status input[name='edit']").remove();
      }else if(data.state=="未通过"){
        $("#if-d-status option[value='unpass']").attr("selected",true);
        console.log(2);
      }else if(data.state=="待审核"){
        $("#if-d-status option[value='waiting']").attr("selected",true);
        console.log(3);
      }

      //修改标题
      $(".if-d-t-c-box p[name='title']").html(data.title);

      //修改发布人
      $(".if-d-t-name").html(data.issuer);
      if (data.issuer!=username) {
        $(".if-d-page-status input[name='edit']").remove();
      };

      //修改时间
      $(".if-d-t-time").html(data.time);

      //修改封面
      var photoUrl
      if (data.url1=="0") {
        photoUrl = "img/logo.png";
      }else{
        photoUrl = data.url1;
      }
        $(".if-d-c-border img").attr("src",photoUrl);
      
      //修改内容
      $(".if-d-content").html(data.message);

      //修改附件
      if (data.url2=="0") {
        $(".mail-attachment p span").append('&nbsp;'+'&nbsp;'+'&nbsp;'+"没有附件");
      }else{
        console.log(data.url2);
        showFJ(data);
      }
    },
    error:function(jqHXR){
      console.log("错误:"+jqHXR.status);
    }
  })
})

function showFJ(data){

  console.log(data);
  console.log(data.url2);
  data.url2 = data.url2.split(",");
  console.log(data.url2.length);
  console.log(data.url2[0]);
  $(".mail-attachment p span").append('&nbsp;'+'&nbsp;'+'&nbsp;'+"<span class='fjnub'>"+data.url2.length+"</span>个附件 - ");


  for(var i=0; i<data.url2.length; i++){
    var str =data.url2[i];
    var reg = /.+(:\^:)/g;
    var reg2 = /(:\^:).+/g;

    var theUrl = str.match(reg);
    console.log(theUrl); 
    theUrl = JSON.stringify(theUrl);  
    
    theUrl = theUrl.replace(":^:","");
    theUrl = theUrl.replace("[","");
    theUrl = theUrl.replace("]","");
    theUrl = theUrl.replace("\"","");
    theUrl = theUrl.replace("\"","");

    console.log(theUrl); 

    var theName = str.match(reg2);
    console.log(theName); 
    theName = JSON.stringify(theName);  
    
    theName = theName.replace(":^:","");
    theName = theName.replace("[","");
    theName = theName.replace("]","");
    theName = theName.replace("\"","");
    theName = theName.replace("\"","");

    console.log(theName); 


    var Odiv = $("<div class='file-box'></div>");
    var O2div = $("<div class='file'></div>");
    var Ia = $("<a href='"+theUrl+"' target='_blank'></a>");

    var Ispan = $("<span class='corner'></span>");
    var Idiv = $("<div class='image imagebox'>")

    var photo = suffixPD(theUrl);

    var Iimg = $("<img alt='image' class='img-responsive' src='"+photo+"'>");
    
    var I2div = $("<div class='file-name'>"+theName+"</div>");

    Idiv.append(Iimg);
    Ia.append(Ispan);
    Ia.append(Idiv);
    Ia.append(I2div);
    O2div.append(Ia);
    Odiv.append(O2div);
    $(".attachment").prepend(Odiv);
  }

}



/* 上传审核状态AJAX */
  $(function(){
  	$(".if-d-page-status input[name='save']").click(function(){
  		var status = $(".mail-box-header select option:selected").text();
  		console.log(status);

  		$.ajax({
  			type:"post",
  			url:"http://119.29.53.178:8080/kindergarden/StateChange?idnews="+pageid+"&state="+status,
  			dataType:"JSON",
  			contentType:"application/x-www-form-urlencoded;charset=UTF-8",

  			beforeSend:function(xhr){
  				xhr.withCredentials = true;
  				xhr.setRequestHeader("X-Requested-with","XMLHttpRequest");
  			},
  			success:function(data){
          alert("修改成功！");
  				window.location.reload();
  			},
  			error:function(jqHXR){
  				console.log("错误:"+jqHXR.status);
  			}
  		})
  	})
  })



/*   上传AJAX   */
  $(function(){
    $(".if-d-yes").click(function(){
      var pdstate = "待审核";
      UpAJAX(pdstate);
    })

  function UpAJAX(pdstate){

    restate = pdstate;

    retitle = $(".if-d-change-title input").val(); //获取标题

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
    if (pdurl1 == "img/logo.png"||pdurl1 == "0") {
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

    console.log(pageid);
    console.log(retitle);
    console.log(remessage);
    console.log(reurl1);
    console.log(reurl2);



    $.ajax({
      type:"post",
      url:"http://119.29.53.178:8080/kindergarden/UpdateNews?idnews="+pageid+"&title="+retitle+"&message="+remessage+"&url1="+reurl1+"&url2="+reurl2,
      dataType:"JSON",
      contentType:"application/x-www-form-urlencoded;charset=UTF-8",
      beforeSend:function(xhr){
        xhr.withCredentials = true;
        xhr.setRequestHeader("X-Requested-with","XMLHttpRequest");
      },
      success:function(data){
        console.log(data);
        alert("修改成功！");
        window.location.reload();
      },
      error:function(jqHXR){
        console.log("错误:"+jqHXR.status);
      }
  	})
	}
})











  















