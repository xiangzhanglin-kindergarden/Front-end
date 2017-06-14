var usertype    //用户类型，0为老师，1位校长
var username    //用户名
var pushname    //发布人的名字



// 获取用户名和用户类型
$(function(){
	username = sessionStorage.getItem("user");
	usertype = sessionStorage.getItem("nub");  //0为老师，1为校长
	pushname = sessionStorage.getItem("pushname");
  console.log(username);
  console.log(usertype);
	console.log(pushname);
	// usertype = 0;

  lookkind = $("body").attr("name");
  if (lookkind == "all") {
    if (usertype==0) {
      $(".news-list-func .n-l-f-btn-del").remove();
      $("#n-s-all").remove();
      $("#n-s-wait").remove();
      $("#n-s-unpass").remove();
      $("#n-s-pass").addClass("n-s-chosed");
      $(".news-list-func .n-l-f-btn-c").css({"width":"40%"});
    };
  }
})


  var IPnub;   //存储ip地址
  var address;  //存储后半部地址
  var trans   //传递的参数
  var ptrans  //传递页数

  var lookkind  // 全校/我的
  var kindNub   // 全校为""，我的为"2"

  var btnkind   // 全部、新闻、公告分类btn

  var statusall   // 全部 审核状态
  var statuspass   // 全部 审核状态
  var statusunpass   // 全部 审核状态
  var statuswait  // 全部 审核状态

  var markurl;   //用于存储分页用的url信息；



  lookkind = $("body").attr("name");
  if (lookkind == "all") {
    kindNub = "";
  }else{
    kindNub = "2";
  }

  IPnub = "119.29.53.178:8080/";


/*    打开页面初始化AJAX     */

 $(function(){
    //按钮状态
    btnkind = "全部";
    
    //审核状态
    if (usertype==0) {
      statusall = ""
      statuspass = "通过";
      statusunpass = "";
      statuswait = "";
    }else{
      statusall = "全部"
      statuspass = "";
      statusunpass = "";
      statuswait = "";
    }

    if (kindNub==2) {
      statusall = "全部"
      statuspass = "";
      statusunpass = "";
      statuswait = "";
    };
    
    

    //当前页
    npage = "1";

    //url后面的内容
    trans = "?A="+statusall+"&B="+statuspass+"&C="+statusunpass+"&D="+statuswait;
    ptrans = "&pageNum="+npage;
    toSureAddress(btnkind, kindNub);

    
  })

/*    点击事件 AJAX     */
  /*  点击审核状态  */
    $(function(){
      $(".news-status span").bind("click",function(){
        setTimeout(function(){
          toSureStatus();
        }, 2);
      })
    })

  /*  点击分类按钮  */
    //记录改变的分类按钮  //每次点击会改变
    var oldKindBtn = $(".btn-info").attr("class");

    $(function(){
      $(".news-nchange-btn button").bind("click",function(){
        console.log($(this).attr("class"));
        console.log(oldKindBtn);
        if (oldKindBtn == $(this).attr("class")) {

        }else{
          setTimeout(function(){
            oldKindBtn = $(".btn-info").attr("class");
            toSureStatus();
          }, 2);
        }
      })
    })
    

  /*   判断审核状态   */
    function toSureStatus(){
      $(".news-status span").each(function(){
        var pd = $(this).hasClass("n-s-chosed");
        if (pd==true) {
          if ($(this).html()=="全部") {
            statusall="全部";
            statuspass="";
            statusunpass="";
            statuswait="";
          }else if ($(this).html()=="待审核") {
            statusall="";
            statuswait="待审核";
          }else if ($(this).html()=="通过") {
            statusall="";
            statuspass="通过";
          }else if ($(this).html()=="未通过") {
            statusall="";
            statusunpass="未通过";
          }

        };
      })
      console.log("全部："+statusall);
      console.log("通过："+statuspass);
      console.log("未通过："+statusunpass);
      console.log("待审核："+statuswait);

      trans = "?A="+statusall+"&B="+statuspass+"&C="+statusunpass+"&D="+statuswait;
      ptrans = "&pageNum="+npage;
      toSureKind()
    }

  /*   判断分类按钮   */
    function toSureKind(){
      var btnkind = $(".btn-info").html();

      console.log(btnkind);

      toSureAddress(btnkind, kindNub);
    }

/*   判断地址   */
  function toSureAddress(btnkind, kindNub){
    if (btnkind=="全部") {
      address = "kindergarden/AllStateSreach";
    }else if(btnkind=="新闻") {
      address = "kindergarden/NewsStateSreach";
    }else if(btnkind=="公告") {
      address = "kindergarden/GgStateSreach";
    }else if(btnkind=="我的草稿") {
      address = "kindergarden/SreachCg";
      // username = "123";
      trans = "?issuer="+pushname+"&pageNum="+"1";
    }

    if (kindNub=="2") {
      address = address+kindNub;
      if (btnkind!="我的草稿") {
        // username = "123";
        trans = trans+"&issuer="+pushname;
      };
    }

    findAJAX();
  }



/*   查询AJAX   */

  function findAJAX(){
    console.log(IPnub);
    console.log("");
    console.log(address);
    console.log("");
    console.log(trans);
    console.log("");
    console.log("http://"+IPnub+address+trans);
    statusall="";
    statuspass="";
    statusunpass="";
    statuswait="";
    markurl = "http://"+IPnub+address+trans;

    $.ajax({
      type:"get",
      url:"http://"+IPnub+address+trans+ptrans,
      dataType:"JSON",
      contentType:"application/x-www-form-urlencoded;charset=UTF-8",
      beforeSend:function(xhr){
        xhr.withCredentials = true;
        xhr.setRequestHeader("X-Requested-with","XMLHttpRequest");
      },
      success:function(data){
        if (data.length==0||data.false=="false") {
          $(".news-lists").remove();
        }else{
          $(".news-lists").remove();
          addList(data);
        }
      },
      error:function(jqHXR, textStatus, errorThrown){
        console.log("错误:"+jqHXR.status);
        console.log("错误:"+textStatus);
        console.log("错误:"+errorThrown);
      }
    })
  }


/*   把查询到的结果添加出来   */
  function addList(data){
    if (flag == 1) {
      console.log(data);
      maxpage = data[0].totalPage;
      page(maxpage);
    };
   
    //动态添加 开始
    for (var i = 0; i < data.length; i++) {

      //状态icon
      var statusIcon;
      if (data[i].state=="通过") {
        statusIcon = "fa fa-check-circle";
      }else if(data[i].state=="未通过"){
        statusIcon = "fa fa-times-circle";
      }else if(data[i].state=="待审核"){
        statusIcon = "fa fa-clock-o";
      }

      //图片url
      var photoUrl;
      if (data[i].url1!="0") {
        photoUrl = data[i].url1;
      }else{
        photoUrl = "img/logo.png";
      }

      //动态添加
        var n_l = $("<div class='news-lists' name='"+data[i].idnews+"'></div>");

          var n_l_t = $("<div class='news-list-title'></div>");
            var n_l_t_s1 = $("<span class='news-list-kind'>"+data[i].kind+"</span>");
            var n_l_t_s2 = $("<span>发布人：</span>");
            var n_l_t_s3 = $("<span class='news-list-name'>"+data[i].issuer+"</span>");
            var n_l_t_s4 = $("<span class='news-list-time'>"+data[i].time+"</span>");
            var n_l_t_s5 = $("<span class='news-list-status'><i class='"+statusIcon+"'></i>"+data[i].state+"</span>");

           n_l_t.append(n_l_t_s1);
           n_l_t.append(n_l_t_s2);
           n_l_t.append(n_l_t_s3);
           n_l_t.append(n_l_t_s4);
           n_l_t.append(n_l_t_s5);
         
         n_l.append(n_l_t);

          var n_l_c_b = $("<div class='news-list-content-box'></div>");

            var n_l_c = $("<div class='news-list-content'></div>");
              var a = $("<a href='#'></a>");
                var n_l_c_p = $("<div class='n-l-c-photo'></div>");
                  var img = $("<img src='"+photoUrl+"'>");
                 n_l_c_p.append(img);
               a.append(n_l_c_p);
             n_l_c.append(a);
            
              var n_l_c_w = $("<div class='n-l-c-w'></div>");

               n_l_c_w.append(data[i].title);

            
             n_l_c.append(n_l_c_w);

           n_l_c_b.append(n_l_c);

            var n_l_f = $("<div class='news-list-func'></div>");

              var a2 = $("<a href='#'></a>");
                var input = $("<input class='n-l-f-btn-c btn btn-success btn-lg' type='button' onclick='toDetail(this)' value='详情'>");
               
               a2.append(input);
             n_l_f.append(a2);

              var input2 = $("<input class='n-l-f-btn-del btn btn-danger btn-lg' type='button' onclick='toDel(this)' value='删除''>");
             n_l_f.append(input2);
            
           n_l_c_b.append(n_l_f);

         n_l.append(n_l_c_b);

      $(".news-lists-box").append(n_l);

    };

    //动态添加结束

    addPD()
  }


/*   判断用不用删东西   */
  function addPD(){
    // 权限判断
      //0为老师，1为校长
      if (usertype==0) {
        $(".news-list-func .n-l-f-btn-del").remove();
        $(".news-list-func .n-l-f-btn-c").css({"width":"40%"});
      };

    // 类别判断
      $(".news-lists").each(function(){
        var kind = $(this).find(".news-list-kind").html();
        // console.log(kind);
        if (kind=="公告") {
          $(this).find(".news-list-content a").remove();
        };
      })
  }


/*+++++++++++++++++++++++++++++++++++++++*/

/*   删除弹窗  START*/

  function toDel(obj){
    swal({
      title: "您确定要删除这条资讯吗",
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
        swal("删除成功！", "您已经永久删除了这条信息。", "success");
        var ID =  $(obj).parent().parent().parent().attr("name");
        console.log(ID);
        $.ajax({
          type:"get",
          url:"http://119.29.53.178:8080/kindergarden/DeleteNews?idnews="+ID,
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
      } else {
        swal("已取消", "您取消了删除操作！", "error");
      }
    });
  }

/*    删除弹窗  END*/
/*****************************************/



/*+++++++++++++++++++++++++++++++++++++++*/

/*   进入详情页  START*/

  function toDetail(obj){
    var pageID = $(obj).parent().parent().parent().parent().attr("name");
    console.log(pageID);
    sessionStorage.setItem("pageID",pageID);
    console.log(sessionStorage.getItem("pageID"));
    window.location.href="newsDetail.html";
  }

/*    进入详情页  END*/
/*****************************************/

/*+++++++++++++++++++++++++++++++++++++++*/

/*   输入搜索  START*/

$(function(){
  $(".news-search button").bind("click",function(){
    var keyword = $(".n-i-keyword input").val();
    var keytime = $(".n-i-time input").val();
    var keyname = $(".n-i-person input").val();
    if (keyword==""&&keytime==""&&keyname=="") {
      $.ajax({
        type:"get",
        url:"http://119.29.53.178:8080/kindergarden/AllStateSreach?A=全部&B=&C=&D=&pageNum=1",
        dataType:"JSON",
        contentType:"application/x-www-form-urlencoded;charset=UTF-8",
        beforeSend:function(xhr){
          xhr.withCredentials = true;
          xhr.setRequestHeader("X-Requested-with","XMLHttpRequest");
        },
        success:function(data){
          if (data.length==0||data.false=="false") {
            $(".news-lists").remove();
          }else{
            $(".news-lists").remove();

            $(".news-nchange-btn button").removeClass("btn-info");
            $(".news-nchange-btn button").removeClass("btn-white");
            $(".news-nchange-btn button").addClass("btn-white");
            $(".news-nchange-btn button:first-child").addClass("btn-info");
            $(".news-nchange-btn button:first-child").removeClass("btn-white");
            
            $(".n-s-kind").removeClass("n-s-chosed");
            $("#n-s-all").addClass("n-s-chosed");



            addList(data);

          }
        },
        error:function(jqHXR, textStatus, errorThrown){
          console.log("错误:"+jqHXR.status);
          console.log("错误:"+textStatus);
          console.log("错误:"+errorThrown);
        }
      })

    }else{
      $.ajax({
        type:"get",
        url:"http://119.29.53.178:8080/kindergarden/NewsSreach?title="+keyword+"&time="+keytime+"&issuer="+keyname+"&pageNum="+1,
        dataType:"JSON",
        contentType:"application/x-www-form-urlencoded;charset=UTF-8",
        beforeSend:function(xhr){
          xhr.withCredentials = true;
          xhr.setRequestHeader("X-Requested-with","XMLHttpRequest");
        },
        success:function(data){
          console.log(data);
          $(".news-nchange-btn button").addClass("btn-white");
          $(".news-nchange-btn button").removeClass("btn-info");
          if (data.length==0||data.false=="false") {
            $(".news-lists").remove();
            page(1);
          }else{
            $(".news-lists").remove();
            addList(data);

          }
        },
        error:function(jqHXR, textStatus, errorThrown){
          console.log("错误:"+jqHXR.status);
          console.log("错误:"+textStatus);
          console.log("错误:"+errorThrown);
        }
      })
    }
  })
})

/*    输入搜索  END*/
/*****************************************/



/*+++++++++++++++++++++++++++++++++++++++*/

/*   分页  START*/
  
  var Apage;  //一页多少行内容
  var flag;   // 当前页数
  var previousNub; //前一页
  var nextNub; //下一页
  var max; //总页数

  flag = 1;

  function page(maxpage){

    Apage = 10;  //一页多少行内容
    flag = 1;   // 当前页数
    previousNub = 0; //前一页
    nextNub = 2; //下一页
    max = maxpage; //总页数

    if (max/10 <10 && max/10 >=1) {
      $("#write-nub").css({"width":"71px"});
    }else if (max/100 <10 && max/10 >=10) {
      $("#write-nub").css({"width":"80px","text-align":"center"});
    };

    $("#write-nub").attr("placeholder",flag+"/"+max+"页");
    $("#write-nub").val("");

    if (nextNub > max){
      $("#next-btn").prop("disabled",true);
      console.log("a1");
    }else if(nextNub <= max) {
      $("#next-btn").prop("disabled",false);
      console.log("a2");
    }
    if (previousNub == 0){
      $("#previous-btn").prop("disabled",true);
      console.log("b1");
    }else if(previousNub > 0) {
      $("#previous-btn").prop("disabled",false);
      console.log("b2");
    }
  }

  function toshow(){
      $("#write-nub").attr("placeholder",flag+"/"+max+"页");
      $("#write-nub").val("");

      console.log(nextNub);
      console.log(previousNub);
      console.log(max);

      if (nextNub > max){
        $("#next-btn").prop("disabled",true);
        console.log("a1");
      }else if(nextNub <= max) {
        $("#next-btn").prop("disabled",false);
        console.log("a2");
      }
      if (previousNub == 0){
        $("#previous-btn").prop("disabled",true);
        console.log("b1");
      }else if(previousNub > 0) {
        $("#previous-btn").prop("disabled",false);
        console.log("b2");
      }

      jumpAJAX();
    }



  //下一页
  $(function(){
    $("#next-btn").bind(
      "click",
      function(){
        // if (nextNub > max){
        //  $("#next-btn").attr("disabled","disabled");
        // }else{
          nextNub++;
          previousNub++;
          flag++;
          toshow();
        // };
      })
  })
  
  //上一页
  $(function(){
    $("#previous-btn").bind(
      "click",
      function(){
        // if (previousNub == 0){
        //  $("#previous-btn").attr("disabled","disabled");
        // }else{
          nextNub--;
          previousNub--;
          flag--;
          toshow();
        // };
      })
  })
  
  //页面跳转
  $(document).keypress(function(){
    var inputNub = $("#write-nub").val();
    if (event.keyCode == 13) {
      if (inputNub != null && inputNub != "") {
        if (inputNub<=0 || inputNub>max) {
          alert("最多"+max+"页");
        }else{
          flag = Math.round(inputNub);   // 当前页数
          previousNub = Math.round(inputNub)-1; //前一页
          nextNub = Math.round(inputNub)+1;
          toshow();
        };
      };
    };
  })


  function jumpAJAX(){
    console.log(markurl);
    // markurl = markurl.substr(0, markurl.length - 1);  
    var newurl = markurl + "&pageNum=" +flag;
    console.log(newurl);

    $.ajax({
      type:"get",
      url:newurl,
      dataType:"JSON",
      contentType:"application/x-www-form-urlencoded;charset=UTF-8",
      beforeSend:function(xhr){
        xhr.withCredentials = true;
        xhr.setRequestHeader("X-Requested-with","XMLHttpRequest");
      },
      success:function(data){
        console.log(data);
        if (data.length==0||data.false=="false") {
          $(".news-lists").remove();
          page(1);
        }else{
          $(".news-lists").remove();
          addList(data);
        }
      },
      error:function(jqHXR, textStatus, errorThrown){
        console.log("错误:"+jqHXR.status);
        console.log("错误:"+textStatus);
        console.log("错误:"+errorThrown);
      }
    })
  }


/*    分页  END*/
/*****************************************/





















