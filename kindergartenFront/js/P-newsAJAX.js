/*
*
*     新闻公告交互 
*
*/
  var IPnub;   //存储ip地址
  var address;  //存储后半部地址
  var trans   //传递的参数

  var btnkind   // 全部、新闻、公告分类btn

  var statusall   // 全部 审核状态
  var statuspass   // 通过 审核状态
  var statusunpass   // 未通过 审核状态
  var statuswait  // 等待 审核状态

  var nowpage  //分页 当前页
  var maxpage  //分页 总页数

  var n_markurl;   //用于存储分页用的url信息；




IPnub = "localhost/";
nowpage = 1;


$(function(){
  $(".show-news-btn").bind("click",function(){
    $(".news-new").trigger("click");
    setTimeout(function(){
      $(".news-all").trigger("click");
    }, 1);
  })
})

  /*  点击分类按钮  */
    //记录改变的分类按钮  //每次点击会改变
    var oldclick;
    $(function(){
      $(".news-select a").bind("click",function(){
        if ($(this).hasClass("news-all")) {
          btnkind = "全部";
        }else if($(this).hasClass("news-new")){
          btnkind = "新闻";
        }
        else if($(this).hasClass("news-notice")){
          btnkind = "公告";
        }
        if (oldclick == btnkind) {

        }else{
          toSureAddress(btnkind);
        }
      })
    })


/*   判断地址   */
  function toSureAddress(btnkind){
    if (btnkind=="全部") {
      address = "kindergarden/AllStateSreach";
      oldclick = "全部";
    }else if(btnkind=="新闻") {
      address = "kindergarden/NewsStateSreach";
      oldclick = "新闻";
    }else if(btnkind=="公告") {
      address = "kindergarden/GgStateSreach";
      oldclick = "公告";
    }

    trans = "?A=&B=通过&C=&D=";

    findAJAX();
  }



/*   查询AJAX   */

  function findAJAX(){
    console.log("http://"+IPADDRESS+address+trans);
    n_markurl = "http://"+IPADDRESS+address+trans;

    $.ajax({
      type:"get",
      url:"http://"+IPADDRESS+address+trans+"&pageNum="+1,
      dataType:"JSON",
      contentType:"application/x-www-form-urlencoded;charset=UTF-8",
      beforeSend:function(xhr){
        xhr.withCredentials = true;
        xhr.setRequestHeader("X-Requested-with","XMLHttpRequest");
      },
      success:function(data){
        if (data.length==0) {
          $(".news-details").remove();
        }else{
          $(".news-details").remove();
          addList(data);
        }
        // console.log(data);
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
    console.log(data);
    maxpage = data[0].totalPage;
    n_page(maxpage);
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
        var n_d = $("<div class='col-lg-12 news-details'></div>");
          var n_l = $("<div class='news-lists' name='"+data[i].idnews+"'></div>");

            var n_l_t = $("<div class='news-list-title'></div>");
              var n_l_t_s1 = $("<span class='news-list-kind'>"+data[i].kind+"</span>");
              var n_l_t_s2 = $("<span class='news-list-time'>"+data[i].time+"</span>");

             n_l_t.append(n_l_t_s1);
             n_l_t.append(n_l_t_s2);
           
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

                var a2 = $("<a href='#' class='hvr-sweep-to-right button' onclick='toDetail(this)'>详情</a>");
               n_l_f.append(a2);
             n_l_c_b.append(n_l_f);

           n_l.append(n_l_c_b);

         n_d.append(n_l);
       $(".news-table .row").append(n_d);
    };

    //动态添加结束

    addPD();
  }


/*   判断用不用删东西   */
  function addPD(){
    // 类别判断
      $(".news-lists").each(function(){
        var kind = $(this).find(".news-list-kind").html();
        if (kind=="公告") {
          $(this).find(".news-list-content a").remove();
        };
      })
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
  
  var Apage;  //一页多少行内容
  var flag;   // 当前页数
  var previousNub; //前一页
  var nextNub; //下一页
  var max; //总页数

  flag = 1;
  Apage = 10;  //一页多少行内容
  flag = 1;   // 当前页数
  previousNub = 0; //前一页
  nextNub = 2; //下一页
  

  function n_page(maxpage){

    max = maxpage; //总页数

    if (max/10 <10 && max/10 >=1) {
      $("#n-write-nub").css({"width":"71px"});
    }else if (max/100 <10 && max/10 >=10) {
      $("#n-write-nub").css({"width":"80px","text-align":"center"});
    };

    $("#n-write-nub").attr("placeholder",flag+"/"+max+"页");
    $("#n-write-nub").val("");

    if (nextNub > max){
      $("#n-next-btn").prop("disabled",true);
      console.log("a1");
    }else if(nextNub <= max) {
      $("#n-next-btn").prop("disabled",false);
      console.log("a2");
    }
    if (previousNub == 0){
      $("#n-previous-btn").prop("disabled",true);
      console.log("b1");
    }else if(previousNub > 0) {
      $("#n-previous-btn").prop("disabled",false);
      console.log("b2");
    }
  }

  function n_toshow(){
      $("#n-write-nub").attr("placeholder",flag+"/"+max+"页");
      $("#n-write-nub").val("");

      console.log(nextNub);
      console.log(previousNub);
      console.log(max);

      if (nextNub > max){
        $("#n-next-btn").prop("disabled",true);
        console.log("a1");
      }else if(nextNub <= max) {
        $("#n-next-btn").prop("disabled",false);
        console.log("a2");
      }
      if (previousNub == 0){
        $("#n-previous-btn").prop("disabled",true);
        console.log("b1");
      }else if(previousNub > 0) {
        $("#n-previous-btn").prop("disabled",false);
        console.log("b2");
      }

      n_jumpAJAX();
    }



  //下一页
  $(function(){
    $("#n-next-btn").bind(
      "click",
      function(){
        // if (nextNub > max){
        //  $("#n-next-btn").attr("disabled","disabled");
        // }else{
          nextNub++;
          previousNub++;
          flag++;
          n_toshow();
        // };
      })
  })
  
  //上一页
  $(function(){
    $("#n-previous-btn").bind(
      "click",
      function(){
        // if (previousNub == 0){
        //  $("#n-previous-btn").attr("disabled","disabled");
        // }else{
          nextNub--;
          previousNub--;
          flag--;
          n_toshow();
        // };
      })
  })
  
  //页面跳转
  $(document).keypress(function(){
    var inputNub = $("#n-write-nub").val();
    if (event.keyCode == 13) {
      if (inputNub != null && inputNub != "") {
        if (inputNub<=0 || inputNub>max) {
          alert("最多"+max+"页");
        }else{
          flag = Math.round(inputNub);   // 当前页数
          previousNub = Math.round(inputNub)-1; //前一页
          nextNub = Math.round(inputNub)+1;
          n_toshow();
        };
      };
    };
  })


  function n_jumpAJAX(){
    console.log(n_markurl);
    // n_markurl = n_markurl.substr(0, n_markurl.length - 1);  
    var newurl = n_markurl + "&pageNum=" +flag;
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
          $(".news-details").remove();
          page(1);
        }else{
          $(".news-details").remove();
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







