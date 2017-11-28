var username;   //登陆者名字
var pushname;   //该条随笔的发布者名字
var usertype;   //0老师 1管理员 2家长

function getuserName(){
  const teacherData = sessionStorage.getItem("teacherData");
  usertype = sessionStorage.getItem("nub");  //0为老师，1为校长，2位家长
  let data = JSON.parse(teacherData);
  if (usertype==0) {
    username = data.tName;
  }else if (usertype==1){
    username = "管理员";
  }else if (usertype==2){
    username = data.Object.sName;
  }
  console.log(username);
}




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
        html.push(`<div class="talk-user">${data[i].name}</div>`);
        html.push(`<div class="talk-content-box2">`);
          html.push(`<div class="talk-content">${data[i].message}</div>`);
          PDTalkdel(html,data[i]);
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
 * 评论判断添加删除功能
 * @param {[type]} obj  [let html]
 * @param {[type]} data [获取name]
 */
function PDTalkdel(obj,data){
  if (usertype==1) {  //管理员
    obj.push(`<a class="talkreback3btn" href="###" data-delbtn="Talk">删除</a>`);
  }else if (usertype==0) {  //老师
    if (pushname == username) {
      obj.push(`<a class="talkreback3btn" href="###" data-delbtn="Talk">删除</a>`);
    }else if(data.name == username+"老师"){
      obj.push(`<a class="talkreback3btn" href="###" data-delbtn="Talk">删除</a>`);
    }
  }else if(usertype==2){  //家长
    if(data.name == username+"家长"){
       obj.push(`<a class="talkreback3btn" href="###" data-delbtn="Talk">删除</a>`);
     }
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
  // console.log(data,idcomment);
  let talkBox = $(".eachtalk-box").find(`.talk-content-box[data-talkID=${idcomment}]`);
  let retalkBox = talkBox.find(".talkreback-box");
  if (data.length!=0) {
    for(let i=data.length-1; i>=0;i--){
      let html = [];
      html.push(`<div class="talkreback-content" data-retalkID='${data[i].idreply}'>`);
        html.push(`<span class="talkreback-name">${data[i].a}</span>`);
        html.push(`<span class="talkreback-rename">${data[i].b}：</span>`);
        html.push(`<span class="talkreback-content">${data[i].message}</span>`);
        PDreTalkdel(html,data[i]);
        // html.push(`<a class="talkreback3btn" href="###" data-delbtn="reTalk">删除</a>`);
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

function PDreTalkdel(obj,data){
  if (usertype==1) {  //管理员
    obj.push(`<a class="talkreback3btn" href="###" data-delbtn="reTalk">删除</a>`);
  }else if (usertype==0) {  //老师
    if (pushname == username) {
      obj.push(`<a class="talkreback3btn" href="###" data-delbtn="reTalk">删除</a>`);
    }else if(data.a == username+"老师"){
      obj.push(`<a class="talkreback3btn" href="###" data-delbtn="reTalk">删除</a>`);
    }
  }else if(usertype==2){  //家长
    if(data.a == username+"家长"){
       obj.push(`<a class="talkreback3btn" href="###" data-delbtn="reTalk">删除</a>`);
     }
  }
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

$("body").delegate("#JQ-upTalk","click",function() {
  let name;
  if (usertype==1) {
    name = "管理员";
  }else if(usertype==0){
    name = username+"老师";
  }else if(usertype==2){
    name = username+"家长";
  }
  const message = editor2.$txt.html();
  console.log(name,pageid);
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
    chatone = username+"老师";
  }else if(usertype==2){
    chatone = username+"家长";
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





