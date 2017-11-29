if(usertype==2){
  createWrite2(); 
}else{
  $(".upTalkBox").remove();
  $(".talk-box .talk-title").remove();
  $(".talk-box #write-talk").remove();

}


$(function(){
  getTalk(1);
})

/**
 * 获取评论
 * @param  {[type]} pageNum [评论页数]
 * @return {[type]}         [description]
 */
function getTalk(pageNum){
  $.ajax({
    type:"get",
    url:`http://${IPADDRESS}kindergarden/showallcomment?pageNum=${pageNum}&idnews=${pageid}`,
    dataType:"JSON",
    contentType:"application/x-www-form-urlencoded;charset=UTF-8",
    beforeSend:function(xhr){
      xhr.withCredentials = true;
      xhr.setRequestHeader("X-Requested-with","XMLHttpRequest");
    },
    success:function(data){
      createTalk(data,pageNum);
    },
    error:function(jqHXR, textStatus, errorThrown){
      console.log("错误:"+jqHXR.status);
      console.log("错误:"+textStatus);
      console.log("错误:"+errorThrown);
    }
  })
}

/**
 * 获取到内容后更新内容
 */
function createTalk(data,pageNum){
  console.log(data);
  let index = 0;
  if (data.length!=0) {
    $(".noTalkBox").remove();
    let talkBox = $(".eachtalk-box");
    for(let i=0; i<data.length;i++){
      let html = [];
      html.push(`<div class="talk-content-box clear" data-talkID="${data[i].idcomment}">`);
        html.push(`<div class="talk-messagebox">`);
          html.push(`<div class="talk-user">${data[i].name}：</div>`);
          html.push(`<div class="talk-time">${data[i].time}</div>`);
        html.push(`</div>`);
        html.push(`<div class="talk-content-box2">`);
          html.push(`<div class="talk-content">${data[i].message}</div>`);
          html.push(`<a class="talkreback3btn" href="###" data-delbtn="Talk">删除</a>`);
          html.push(`<div class="talkreback-box"></div>`);
          html.push(`<div class="newtalkbtn"><input class="btn btn-white" type="button" value="我也来说一句" name="talkreback"></div>`);
        html.push(`</div>`);
      html.push(`</div>`); 
      talkBox.append(html.join(""))
      getReplyTalk(1,data[i].idcomment);
    }
    $("#talkPagination").pagination({
       currentPage: pageNum,// 当前页数
       totalPage: data[0].totalpage,// 总页数
       isShow: true,// 是否显示首尾页
       count: 7,// 显示个数
       prevPageText: "上一页",// 上一页文本
       nextPageText: "下一页",// 下一页文本
       callback: function(current) {
        $(".talk-content-box").remove();
        getTalk(current);
       }
    });
  }
  
}

/**
 * [获取回复评论]
 * @param  {[type]} pageNum   [页数]
 * @param  {[type]} idcomment [评论的ID]
 */
function getReplyTalk(pageNum,idcomment){
  $.ajax({
    type:"get",
    url:`http://${IPADDRESS}kindergarden/showallreply?pageNum=${pageNum}&idcomment=${idcomment}`,
    dataType:"JSON",
    contentType:"application/x-www-form-urlencoded;charset=UTF-8",
    beforeSend:function(xhr){
      xhr.withCredentials = true;
      xhr.setRequestHeader("X-Requested-with","XMLHttpRequest");
    },
    success:function(data){
      creategetReplyTalk(data,idcomment,pageNum)
    },
    error:function(jqHXR, textStatus, errorThrown){
      console.log("错误:"+jqHXR.status);
      console.log("错误:"+textStatus);
      console.log("错误:"+errorThrown);
    }
  })
}
/**
 * 获取到回复评论的内容后更新回复内容
 */
function creategetReplyTalk(data,idcomment,pageNum){
  console.log(data,idcomment);
  let talkBox = $(".eachtalk-box").find(`.talk-content-box[data-talkID=${idcomment}]`);
  let retalkBox = talkBox.find(".talkreback-box");
  if (data.length!=0) {
    for(let i=data.length-1; i>=0;i--){
      let html = [];
      html.push(`<div class="talkreback-content" data-retalkID='${data[i].idreply}'>`);
        html.push(`<span class="talkreback-name">${data[i].a}</span>`);
        html.push(`<span class="talkreback-rename">${data[i].b}：</span>`);
        html.push(`<span class="talkreback-content">${data[i].message}</span>`);
        html.push(`<a class="talkreback3btn" href="###" data-delbtn="reTalk">删除</a>`);
        html.push(`<a class="talkreback2btn" href="###">回复</a>`);
      html.push(`</div>`);

      retalkBox.prepend(html.join(""))
    }
    let reTalkPage = [];
    reTalkPage.push(`<div class="retalkPage retalkPagination"></div>`);
    retalkBox.append(reTalkPage.join(""));
    $(".retalkPagination").pagination({
       currentPage: pageNum,// 当前页数
       totalPage: data[0].totalpage,// 总页数
       isShow: true,// 是否显示首尾页
       count: 4,// 显示个数
       prevPageText: "上一页",// 上一页文本
       nextPageText: "下一页",// 下一页文本
       callback: function(current) {
        retalkBox.find(".talkreback-content").remove();
        retalkBox.find(".retalkPagination").remove();
        getReplyTalk(current,idcomment)
       }
    });
  }else{
    talkBox.find(".talkreback-box").remove();
    talkBox.find(".newtalkbtn").addClass("clear");
    talkBox.find(".talkreback3btn").css({"margin-bottom":"5px"});
  }
}




/*     创建富文本     */
	var editor2
	function createWrite2(){

		editor2 = new wangEditor('write-talk');

    editor2.config.menus = [
      'bold',
      'underline',
      'italic',
      'strikethrough',
      'forecolor',
      'bgcolor',
      'fontsize',
   ];
   

		// 图片上传路径
		//editor2.config.uploadImgUrl = 'http://172.20.2.164:8080/retirement/uploadPic/fileUpLoad.action';
		// editor2.config.uploadImgUrl = 'http://172.20.2.164:8080/kindergarden/Upload';
		editor2.config.uploadImgUrl = 'http://'+IPADDRESS+'/kindergarden/imageUpload';

		// 隐藏掉插入网络图片功能
    editor2.config.hideLinkImg = true;


	  //editor2.config.withcredentials = true;

		editor2.config.uploadImgFns.onload = function (resultText, xhr) {

			console.log(resultText);
			
			var obj = JSON.parse(resultText);

			// var pa = /.*\{(.*)\}/;
			// alert(resultText.match(pa)[1]);


			// 上传图片时，已经将图片的名字存在
			var originalName = editor2.uploadImgOriginalName || '';

			// editor.command(null, 'insertHtml', '<img src="' +obj[0] + '" alt="' + originalName + '/>');
			editor2.command(null, 'InsertImage', obj.url);
		};

  	editor2.config.uploadImgFns.ontimeout = function (xhr) {
        // xhr 是 xmlHttpRequest 对象，IE8、9中不支持
        alert('上传超时');
    };

    // 自定义error事件
    editor2.config.uploadImgFns.onerror = function (xhr) {
        // xhr 是 xmlHttpRequest 对象，IE8、9中不支持
        alert('上传错误');
    };
		//editor.config.uploadHeaders = 'x-requested-with'

		/*editor.config.uploadheaders = {
			'Accept':'text/x-json',
			'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
		}*/
		editor2.config.withCredentials = true;

		editor2.create();
	}


/**
 * 点击回复按钮
 */
$("body").delegate("input[name='talkreback']","click",function() {
  let thisPOS = $(this).parents(".talk-content-box2");
  createReTakle(thisPOS);
})
$("body").delegate(".talkreback2btn","click",function() {
  let thisPOS = $(this).parents(".talk-content-box2");
  let thisWord = $(this).parent().find(".talkreback-name").text();
  createReTakle(thisPOS,thisWord);
})


/**
 * 点击回复后出现的回复框
 * @param  {[type]} obj  [位置]
 * @param  {[type]} word [默认内容]
 * @return {[type]}      [无]
 */
function createReTakle(obj,word){
  $(".retalkareaBox").remove();
  const rtareaBox = $("<div class='retalkareaBox'></div>");
  let rtTextarea = "null";
  if (word!=undefined) {
    rtTextarea = $("<textarea name='retalk' id='retalkarea' placeholder=' 回复 "+word+"'></textarea>");
  }else{
    rtTextarea = $("<textarea name='retalk' id='retalkarea'></textarea>");
  }
  const rtInput = $("<div class='pushTalkbox'></div>");
  const rtInput1 = $("<input class='btn btn-primary' type='button' value='发表评论' name='pushreTalk''>");
  const rtInput2 = $("<input class='btn btn-danger' type='button' value='×' name='closereTalk'>");
  rtInput.append(rtInput1);
  rtInput.append(rtInput2);

  rtareaBox.append(rtTextarea);
  rtareaBox.append(rtInput);
  obj.append(rtareaBox);
}

$("body").delegate("input[name='closereTalk']","click",function() {
  $(".retalkareaBox").remove();
})


/************************************************************/
/**************   上传新的评论   ***************************/
/************************************************************/

var upNewTalk = $("#JQ-upTalk");  //绑定发表评论按钮

upNewTalk.bind("click",function(){
  const name = "阿姆";
  const message = editor2.$txt.html();
  upTalkDate(name,message,pageid);
})


/**
 * 上传新的评论
 * @param  {[type]} name    [评论发布人]
 * @param  {[type]} message [评论信息]
 * @param  {[type]} pageid  [随笔ID]
 */
function upTalkDate(name,message,pageid){
  $.ajax({
    type:"get",
    url:`http://${IPADDRESS}kindergarden/Comment?name=${name}&message=${message}&idnews=${pageid}`,
    dataType:"JSON",
    contentType:"application/x-www-form-urlencoded;charset=UTF-8",
    beforeSend:function(xhr){
      xhr.withCredentials = true;
      xhr.setRequestHeader("X-Requested-with","XMLHttpRequest");
    },
    success:function(data){
      console.log(data);
      if(data.false){
        alert("一个用户只能评论一次，你已提交过了");
      }else if(data.success){
        alert("提交成功！");
        window.location.reload();
      }
    },
    error:function(jqHXR, textStatus, errorThrown){
      console.log("错误:"+jqHXR.status);
      console.log("错误:"+textStatus);
      console.log("错误:"+errorThrown);
    }
  })
}


/************************************************************/
/************** 上传回复     A 回复 B   ***********************/
/************************************************************/

$("body").delegate(".pushTalkbox input[name='pushreTalk']","click",function() {
  let chatone;
  if (usertype==1) {
    chatone = "管理员";
  }else if(usertype==0){
    chatone = pushname+"老师";
  }
  let chattwo = $(".retalkareaBox textarea").attr("placeholder");
  if (chattwo==undefined) {
    chattwo = "";
  }
  let idcomment = $(".retalkareaBox").parent().parent().attr("data-talkID");
  let message = $(".retalkareaBox textarea").val();
  upRetalk(chatone,chattwo,idcomment,message);
})



/**
 * 上传回复     A 回复 B
 * @param  {[type]} chatone   [人A]
 * @param  {[type]} chattwo   [人B]
 * @param  {[type]} idcomment [评论ID]
 * @param  {[type]} message   [回复内容]
 */
function upRetalk(chatone,chattwo,idcomment,message){
  $.ajax({
    type:"get",
    url:`http://${IPADDRESS}kindergarden/Reply?chatone=${chatone}&chattwo=${chattwo}&idcomment=${idcomment}&message=${message}`,
    dataType:"JSON",
    contentType:"application/x-www-form-urlencoded;charset=UTF-8",
    beforeSend:function(xhr){
      xhr.withCredentials = true;
      xhr.setRequestHeader("X-Requested-with","XMLHttpRequest");
    },
    success:function(data){
      if (data.success) {
        alert("添加成功！");
        window.location.reload();
      }
    },
    error:function(jqHXR, textStatus, errorThrown){
      console.log("错误:"+jqHXR.status);
      console.log("错误:"+textStatus);
      console.log("错误:"+errorThrown);
    }
  })
}




/************************************************************/
/**************    删除评论      ***********************/
/************************************************************/


$("body").delegate(".talkreback3btn","click",function() {
  let delThis = $(this);
  swal({
    title: "您确定要删除这条评论吗",
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
      let dataValue = delThis.attr("data-delbtn");
      let url = "";
      if (dataValue=="Talk") {
        let idcomment = delThis.parent().parent().attr("data-talkid");
        url = `http://${IPADDRESS}kindergarden/deletecomment?idcomment=${idcomment}`
      }else if (dataValue=="reTalk") {
        let idreply = delThis.parent().attr("data-retalkid");
        url = `http://${IPADDRESS}kindergarden/ReplyDelete?idreply=${idreply}`
      }else{
        console.log(`没获取到数据`);
      }
      swal("删除成功！", "您已经永久删除了这条信息。", "success");
      console.log(url);
      
      $.ajax({
        type:"get",
        url:url,
        dataType:"JSON",
        contentType:"application/x-www-form-urlencoded;charset=UTF-8",
        beforeSend:function(xhr){
          xhr.withCredentials = true;
          xhr.setRequestHeader("X-Requested-with","XMLHttpRequest");
        },
        success:function(data){
          $(".sa-button-container .confirm").click(function(){
            setTimeout(function(){
              window.location.reload();
            }, 150);
          })
        },
        error:function(jqHXR, textStatus, errorThrown){
          console.log("错误:"+jqHXR.status);
          console.log("错误:"+textStatus);
          console.log("错误:"+errorThrown);
        }
      })
    }else {
      swal("已取消", "您取消了删除操作！", "error");
    }
  });
})





