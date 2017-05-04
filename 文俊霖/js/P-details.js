
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
		$(".if-d-page-status input[name='save']").addClass("dtu2");
		$(".if-d-page-status input[name='cancel']").addClass("dtu2");
		$(".if-d-page-status input[name='edit']").addClass("dtu2");
		$(".if-d-page-status select").attr("disabled","true");
		$(".if-d-page-status select").addClass("wtg");
		setTimeout("$('.if-d-page-status select').css({'background-color':'#D0D0D0'});$('.if-d-page-status select').removeClass('wtg');",1000);

		setTimeout(function(){
			$(".if-d-page-status input[name='save']").css({
				'margin-top':"-60px"
			})
			$(".if-d-page-status input[name='cancel']").css({
				'margin-top':"-60px"
			})
			$(".if-d-page-status input[name='edit']").css({
				'margin-top':"-60px"
			})
			$(".if-d-p-s-e-btn").css({
				'margin-top':"-8px"
			})
		},1000)

		setTimeout(function(){
			$(".if-d-p-s-e-btn").removeClass("dtu");
			$(".if-d-page-status input[name='save']").removeClass("dtu2");
			$(".if-d-page-status input[name='cancel']").removeClass("dtu2");
			$(".if-d-page-status input[name='edit']").removeClass("dtu2");
		},1001)
	})

	$(".if-d-no").bind("click",function(){
		$(".if-d-p-s-e-btn").addClass("utd");
		$(".if-d-page-status input[name='save']").addClass("utd2");
		$(".if-d-page-status input[name='cancel']").addClass("utd2");
		$(".if-d-page-status input[name='edit']").addClass("utd2");
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
				'margin-top':"60px"
			})
		},1000)

		setTimeout(function(){
			$(".if-d-p-s-e-btn").removeClass("utd");
			$(".if-d-page-status input[name='save']").removeClass("utd2");
			$(".if-d-page-status input[name='cancel']").removeClass("utd2");
			$(".if-d-page-status input[name='edit']").removeClass("utd2");
		},1001)
	})
})


//   点击编辑 修改文章内容
$(function(){
	$(".if-d-page-status input[name='edit']").bind("click",function(){
		createWrite();
	})
})

//  编辑取消 按钮
$(function(){
	$(".if-d-no").bind("click",function(){
		$(".if-d-content").css("display","block");
		$(".if-d-write-box").css({"display":"none"})
		editor.destroy();
		$(".if-d-change-title input").val("");
		$(".if-d-t-c-box").css({"display":"block"});
		$(".if-d-change-title").css({"display":"none"});
		$(".if-d-cover-box").css({"display":"none"});
	})
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

			//获取原页面的内容 
			var content = getPageCont();
			editor.$txt.html(content);

			//创建封面、标题的修改
			inputTitle();
			changeCover();

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
		 // server: 'http://119.29.53.178:8080/retirement/uploadPic/fileUpLoad.action',
	});
})













  















