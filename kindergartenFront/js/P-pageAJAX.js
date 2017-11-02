/*
*
*     校园知识交互 
*
*/



  var address;  //存储地址
  var trans   //传递的参数

  var nowpage  //分页 当前页
  var maxpage  //分页 总页数

  var pgmarkurl;   //用于存储分页用的url信息；

  var usertype    //用户类型，0为老师，1位校长
  var username    //用户名
  var teacherData    //发布人的名字

  var className;  //班级名字


  // IPnub = ""+IPADDRESS+"/";



$(function(){
  $(".show-page-btn").bind("click",function(){

    username = sessionStorage.getItem("user");
    usertype = sessionStorage.getItem("nub");  //0为老师，1为校长

    console.log(username);
    console.log(usertype);

    if (usertype==2) {
      className = $(".classtable table caption span").attr("name");
    }else if (usertype==0) {
      className = $("#awd-site-logo span").html();
    }
    
    
    if (usertype==0) {
      address = "kindergarden/SreachEducationTecher?issuer="+className;
      trans = "&pageNum=";
    }else if(usertype==1){
      address = "kindergarden/SreachEducationManger";
      trans = "?pageNum=";
    }else if(usertype==2){
      address = "kindergarden/ClassEduction?cid="+className;
      trans = "&pageNum=";
    }

    
    pgmarkurl = "http://"+IPADDRESS+address+trans;
    
    pgfindAJAX();
  })
})


/*   查询AJAX   */

  function pgfindAJAX(){
    $.ajax({
      type:"get",
      url:"http://"+IPADDRESS+address+trans+1,
      dataType:"JSON",
      contentType:"application/x-www-form-urlencoded;charset=UTF-8",
      beforeSend:function(xhr){
        xhr.withCredentials = true;
        xhr.setRequestHeader("X-Requested-with","XMLHttpRequest");
      },
      success:function(data){
        if (data.length==0) {
          $(".pg-details").remove();
        }else{
          $(".pg-details").remove();
          pgflag = 1;
          pgpreviousNub = 0; //前一页
          pgnextNub = 2; //下一页
          pgaddList(data);
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
  function pgaddList(data){
    $(".page-lists").remove();
    console.log(data);
    maxpage = data[0].totalPage;
    pgpage(maxpage);
    //动态添加 开始
    for (var i = 0; i < data.length; i++) {

      //图片url
      var photoUrl;
      if (data[i].url1!="0") {
        photoUrl = data[i].url1;
      }else{
        photoUrl = "img/logo.jpeg";
      }

      //动态添加
        var p_d = $("<div class='col-lg-12 page-details'></div>");
          var p_l = $("<div class='page-lists' name='"+data[i].idnews+"'></div>");

            var p_l_t = $("<div class='page-list-title'></div>");
              var p_l_t_s1 = $("<span class='page-list-kind'>"+data[i].kind+"</span>");
              var p_l_t_s2 = $("<span class='page-list-time'>"+data[i].time+"</span>");

             p_l_t.append(p_l_t_s1);
             p_l_t.append(p_l_t_s2);
           
           p_l.append(p_l_t);

            var p_l_c_b = $("<div class='page-list-content-box'></div>");

              var p_l_c = $("<div class='page-list-content'></div>");
                var a = $("<a href='#'></a>");
                  // var p_l_c_p = $("<div class='p-l-c-photo'></div>");
                  //   var img = $("<img src='"+photoUrl+"'>");
                  //  p_l_c_p.append(img);
                 // a.append(p_l_c_p);
               p_l_c.append(a);
              
                var p_l_c_w = $("<div class='n-l-c-w'></div>");

                 p_l_c_w.append(data[i].title);

              
               p_l_c.append(p_l_c_w);

             p_l_c_b.append(p_l_c);

              var p_l_f = $("<div class='page-list-func'></div>");

                var a2 = $("<a href='#' class='hvr-sweep-to-right button' onclick='toDetail(this)'>详情</a>");
               p_l_f.append(a2);
             p_l_c_b.append(p_l_f);

           p_l.append(p_l_c_b);

         p_d.append(p_l);
       $(".page-table .row").append(p_d);
    };

    //动态添加结束
  }


/*+++++++++++++++++++++++++++++++++++++++*/

/*   进入详情页  START*/

  function toDetail(obj){
    var pageID = $(obj).parent().parent().parent().attr("name");
    console.log(pageID);
    sessionStorage.setItem("pageID",pageID);
    console.log(sessionStorage.getItem("pageID"));
    window.open("newsDetail.html","_self");
  }

/*    进入详情页  END*/
/*****************************************/






/*+++++++++++++++++++++++++++++++++++++++*/

/*   分页  START*/
  
  var pgApage;  //一页多少行内容
  var pgflag;   // 当前页数
  var pgpreviousNub; //前一页
  var pgnextNub; //下一页
  var pgmax; //总页数

  pgflag = 1;
  pgApage = 10;  //一页多少行内容
  pgpreviousNub = 0; //前一页
  pgnextNub = 2; //下一页
  

  function pgpage(maxpage){
    pgmax = maxpage; //总页数
    

    if (pgmax/10 <10 && pgmax/10 >=1) {
      $("#pg-write-nub").css({"width":"71px"});
    }else if (pgmax/100 <10 && pgmax/10 >=10) {
      $("#pg-write-nub").css({"width":"80px","text-align":"center"});
    };

    $("#pg-write-nub").attr("placeholder",pgflag+"/"+pgmax+"页");
    $("#pg-write-nub").val("");

    if (pgnextNub > pgmax){
      $("#pg-next-btn").prop("disabled",true);
      console.log("a1");
    }else if(pgnextNub <= pgmax) {
      $("#pg-next-btn").prop("disabled",false);
      console.log("a2");
    }
    if (pgpreviousNub == 0){
      $("#pg-previous-btn").prop("disabled",true);
      console.log("b1");
    }else if(pgpreviousNub > 0) {
      $("#pg-previous-btn").prop("disabled",false);
      console.log("b2");
    }
  }

  function pgtoshow(){
    $("#pg-write-nub").attr("placeholder",pgflag+"/"+pgmax+"页");
    $("#pg-write-nub").val("");

    console.log(pgnextNub);
    console.log(pgpreviousNub);
    console.log(pgmax);

    if (pgnextNub > pgmax){
      $("#pg-next-btn").prop("disabled",true);
      console.log("a1");
    }else if(pgnextNub <= pgmax) {
      $("#pg-next-btn").prop("disabled",false);
      console.log("a2");
    }
    if (pgpreviousNub == 0){
      $("#pg-previous-btn").prop("disabled",true);
      console.log("b1");
    }else if(pgpreviousNub > 0) {
      $("#pg-previous-btn").prop("disabled",false);
      console.log("b2");
    }

    pgjumpAJAX();
  }



  //下一页
  $(function(){
    $("#pg-next-btn").bind(
      "clicpg",
      function(){
        // if (nextNub > max){
        //  $("#pg-next-btn").attr("disabled","disabled");
        // }else{
          pgnextNub++;
          pgpreviousNub++;
          pgflag++;
          pgtoshow();
        // };
      })
  })
  
  //上一页
  $(function(){
    $("#pg-previous-btn").bind(
      "clicpg",
      function(){
        // if (previousNub == 0){
        //  $("#pg-previous-btn").attr("disabled","disabled");
        // }else{
          pgnextNub--;
          pgpreviousNub--;
          pgflag--;
          pgtoshow();
        // };
      })
  })
  
  //页面跳转
  $(document).pgeypress(function(){
    var inputNub = $("#pg-write-nub").val();
    if (event.pgeyCode == 13) {
      if (inputNub != null && inputNub != "") {
        if (inputNub<=0 || inputNub>max) {
          alert("最多"+max+"页");
        }else{
          pgflag = Math.round(inputNub);   // 当前页数
          pgpreviousNub = Math.round(inputNub)-1; //前一页
          pgnextNub = Math.round(inputNub)+1;
          pgtoshow();
        };
      };
    };
  })


  function pgjumpAJAX(){
    console.log(pgflag);

    $.ajax({
      type:"get",
      url:pgmarkurl+pgflag,
      dataType:"JSON",
      contentType:"application/x-www-form-urlencoded;charset=UTF-8",
      beforeSend:function(xhr){
        xhr.withCredentials = true;
        xhr.setRequestHeader("X-Requested-with","XMLHttpRequest");
      },
      success:function(data){
        console.log(data);
        if (data.length==0||data.false=="false") {
          $(".page-lists").remove();
          pgpage(1);
        }else{
          $(".page-lists").remove();
          pgaddList(data);
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
























































