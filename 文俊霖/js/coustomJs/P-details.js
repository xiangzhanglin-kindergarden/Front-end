var usertype
var username

$(function(){
	setTimeout("$('.if-d-cover-box').css({'display':'none'})",1)

	username = sessionStorage.getItem("user");
	usertype = sessionStorage.getItem("nub");  //0为老师，1为校长
	console.log(username);
	console.log(usertype);
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
		
		var status = $(".mail-box-header select option:selected").text();
		if (status == '通过') {
			$(".if-d-page-status input[name='edit']").remove();
		};


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
			editor.config.uploadImgUrl = 'http://119.29.53.178:8080/kindergarden/Upload';

			// 隐藏掉插入网络图片功能
	    editor.config.hideLinkImg = true;


		//editor.config.withcredentials = true;

			editor.config.uploadImgFns.onload = function (resultText, xhr) {

				console.log(resultText);

				// 上传图片时，已经将图片的名字存在
				var originalName = editor.uploadImgOriginalName || '';

				// editor.command(null, 'insertHtml', '<img src="' +resultText + '" alt="' + originalName + '/>');
				editor.command(null, 'InsertImage', resultText);
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
    // url:"http://119.29.53.178:8080/kindergarden/imageUpload",
    url:"#",
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
    // 文件接收服务端
	});
})


/* 上传审核状态AJAX */
$(function(){
	$(".if-d-page-status input[name='save']").click(function(){
		var status = $(".mail-box-header select option:selected").text();
		console.log(status);
/*
		$.ajax({
			type:"post",
			url:"http://"+IP+url,
			dataType:"JSON",
			contentType:"application/x-www-form-urlencoded;charset=UTF-8",

			beforeSend:function(xhr){
				xhr.withCredentials = true;
				xhr.setRequestHeader("X-Requested-with","XMLHttpRequest");
			},
			success:function(data){
				window.location.reload;
			},
			error:function(jqHXR){
				console.log("错误:"+jqHXR.status);
			}
		})

*/




	})
})









  















