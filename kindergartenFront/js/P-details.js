
var usertype;    //用户类型，0为老师，1位校长
var userID;    //用户名
var pageid;      //文章ID


/*    NewsAdd      */
var reissuer     //发布人
var restate      //状态：通过、未通过、待审核、草稿
var retitle      //标题
var remessage    //富文本内容
var rekind       //新闻、公告
var reurl1       //封面
var reurl2 = new Array();       //附件


oldcover = $(".if-d-cover img").attr('src');

reissuer = userID;
reurl1 = oldcover;


$(function(){
	setTimeout("$('.if-d-cover-box').css({'display':'none'})",1)

	userID = sessionStorage.getItem("user");
  usertype = sessionStorage.getItem("nub");  //0为老师，1为校长
  pageid = sessionStorage.getItem("pageID");
	
	console.log(userID);
  console.log(usertype);
  console.log(pageid);
  
  

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



/* 获取内容  */
$(function(){
  $.ajax({
    type:"post",
    url:"http://"+IPADDRESS+"/kindergarden/SreachByID?idnews="+pageid,
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
      pushname = data.issuer;
      if (data.issuer!=userID) {
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
      if (data.kind=="教育随笔") {
        addTalkarea();
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



function addTalkarea(){

  let html = [];
  html.push(`<div class="talk-area">`);
    html.push(`<p class="talk-title">评论区</p>`);
    html.push(`<div class="talk-box clear">`);
      html.push(`<div class="noTalkBox"><img src="img/noTalk.png" alt="无评论"></div>`);
      html.push(`<div class="eachtalk-box"></div>`);
      html.push(`<div id="talkPagination" class="talkPage"></div>`);
      html.push(`<p class="talk-title">写下自己的评论</p>`);
      html.push(`<div id="write-talk">注意：一个用户只能评论一次（写内容时请删除这句话）</div>`);
    html.push(`</div>`);
    html.push(`<div class="upTalkBox"><input class="btn btn-primary" id="JQ-upTalk" type="button" value="发表评论" name="pushTalk"></div>`);
  html.push(`</div>`); 
  $(".mail-box").append(html.join(""))
  createWrite2();
  getuserName();
  getTalk(1);
}



/*     创建富文本     */
  var editor2; //富文本编辑器

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
    editor2.config.withCredentials = true;

    editor2.create();
  }





  















