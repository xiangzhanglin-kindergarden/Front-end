/*
*
*     校园知识交互 
*
*/



  // var IPnub;   //存储ip地址
  var kaddress;  //存储后半部地址
  var ktrans   //传递的参数

  var nowpage  //分页 当前页
  var maxpage  //分页 总页数

  var kmarkurl;   //用于存储分页用的url信息；


  // IPnub = ""+IPADDRESS+"/";



$(function(){
  $(".show-know-btn").bind("click",function(){
    // ktoshow()
    kfindAJAX();
  })
})


/*   查询AJAX   */

  function kfindAJAX(){
    $.ajax({
      type:"get",
      url:"http://"+IPADDRESS+"/kindergarden/ShowAllGrowth?pageNum="+1,
      dataType:"JSON",
      contentType:"application/x-www-form-urlencoded;charset=UTF-8",
      beforeSend:function(xhr){
        xhr.withCredentials = true;
        xhr.setRequestHeader("X-Requested-with","XMLHttpRequest");
      },
      success:function(data){
        if (data.length==0) {
          $(".know-details").remove();
        }else{
          $(".know-details").remove();
          kflag = 1;
          kpreviousNub = 0; //前一页
          knextNub = 2; //下一页
          kaddList(data);
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
  function kaddList(data){
    maxpage = data[0].totalPage;
    kpage(maxpage);
    //动态添加 开始
    for (var i = 0; i < data.length; i++) {


      //图片url
      var photoUrl;
      if (data[i].url1!="0") {
        photoUrl = data[i].url1;
      }else{
        photoUrl = "img/logo.png";
      }

      //动态添加
          var k_l = $("<div class='know-lists' name='"+data[i].idnews+"'></div>");

            var k_l_t = $("<div class='know-list-title'></div>");
              var k_l_t_s1 = $("<span>发布人：</span>");
              var k_l_t_s2 = $("<span class='know-list-name'>"+data[i].issuer+"</span>");
              var k_l_t_s3 = $("<span class='know-list-time'>"+data[i].time+"</span>");

             k_l_t.append(k_l_t_s1);
             k_l_t.append(k_l_t_s2);
             k_l_t.append(k_l_t_s3);
           
           k_l.append(k_l_t);

            var k_l_c_b = $("<div class='know-list-content-box'></div>");

              var k_l_c = $("<div class='know-list-content'></div>");
                var k_l_c_p = $("<div class='k-l-c-photo'></div>");
                  var img = $("<img src='"+photoUrl+"'>");
                 k_l_c_p.append(img);
               k_l_c.append(k_l_c_p);
              
                var k_l_c_w = $("<div class='k-l-c-w k-l-c-w-notice'></div>");

                 k_l_c_w.append(data[i].title);

              
               k_l_c.append(k_l_c_w);

             k_l_c_b.append(k_l_c);

              var k_l_f = $("<div class='know-list-func'></div>");

                var a2 = $("<a href='"+data[i].url2+"' target='_blank' class='hvr-sweep-to-right button'>详情</a>");
                  // var input = $("<input class='n-l-f-btn-c btn btn-success btn-lg' type='button' value='详情'>");
                 
                 // a2.append(input);
               k_l_f.append(a2);

             k_l_c_b.append(k_l_f);

           k_l.append(k_l_c_b);


          var k_d = $("<div class='col-lg-12 know-details'></div>");
           k_d.append(k_l);
        $(".know-table .row").append(k_d);
    };

    //动态添加结束

  }

/*+++++++++++++++++++++++++++++++++++++++*/

/*   分页  START*/
  
  var kApage;  //一页多少行内容
  var kflag;   // 当前页数
  var kpreviousNub; //前一页
  var knextNub; //下一页
  var kmax; //总页数

  kflag = 1;
  kApage = 10;  //一页多少行内容
  kpreviousNub = 0; //前一页
  knextNub = 2; //下一页
  

  function kpage(maxpage){
    kmax = maxpage; //总页数
    

    if (kmax/10 <10 && kmax/10 >=1) {
      $("#k-write-nub").css({"width":"71px"});
    }else if (kmax/100 <10 && kmax/10 >=10) {
      $("#k-write-nub").css({"width":"80px","text-align":"center"});
    };

    $("#k-write-nub").attr("placeholder",kflag+"/"+kmax+"页");
    $("#k-write-nub").val("");

    if (knextNub > kmax){
      $("#k-next-btn").prop("disabled",true);
      console.log("a1");
    }else if(knextNub <= kmax) {
      $("#k-next-btn").prop("disabled",false);
      console.log("a2");
    }
    if (kpreviousNub == 0){
      $("#k-previous-btn").prop("disabled",true);
      console.log("b1");
    }else if(kpreviousNub > 0) {
      $("#k-previous-btn").prop("disabled",false);
      console.log("b2");
    }
  }

  function ktoshow(){
    $("#k-write-nub").attr("placeholder",kflag+"/"+kmax+"页");
    $("#k-write-nub").val("");

    console.log(knextNub);
    console.log(kpreviousNub);
    console.log(kmax);

    if (knextNub > kmax){
      $("#k-next-btn").prop("disabled",true);
      console.log("a1");
    }else if(knextNub <= kmax) {
      $("#k-next-btn").prop("disabled",false);
      console.log("a2");
    }
    if (kpreviousNub == 0){
      $("#k-previous-btn").prop("disabled",true);
      console.log("b1");
    }else if(kpreviousNub > 0) {
      $("#k-previous-btn").prop("disabled",false);
      console.log("b2");
    }

    kjumpAJAX();
  }



  //下一页
  $(function(){
    $("#k-next-btn").bind(
      "click",
      function(){
        // if (nextNub > max){
        //  $("#k-next-btn").attr("disabled","disabled");
        // }else{
          knextNub++;
          kpreviousNub++;
          kflag++;
          ktoshow();
        // };
      })
  })
  
  //上一页
  $(function(){
    $("#k-previous-btn").bind(
      "click",
      function(){
        // if (previousNub == 0){
        //  $("#k-previous-btn").attr("disabled","disabled");
        // }else{
          knextNub--;
          kpreviousNub--;
          kflag--;
          ktoshow();
        // };
      })
  })
  
  //页面跳转
  $(document).keypress(function(){
    var inputNub = $("#k-write-nub").val();
    if (event.keyCode == 13) {
      if (inputNub != null && inputNub != "") {
        if (inputNub<=0 || inputNub>max) {
          alert("最多"+max+"页");
        }else{
          kflag = Math.round(inputNub);   // 当前页数
          kpreviousNub = Math.round(inputNub)-1; //前一页
          knextNub = Math.round(inputNub)+1;
          ktoshow();
        };
      };
    };
  })


  function kjumpAJAX(){
    console.log(kflag);

    $.ajax({
      type:"get",
      url:"http://"+IPADDRESS+"/kindergarden/ShowAllGrowth?pageNum="+kflag,
      dataType:"JSON",
      contentType:"application/x-www-form-urlencoded;charset=UTF-8",
      beforeSend:function(xhr){
        xhr.withCredentials = true;
        xhr.setRequestHeader("X-Requested-with","XMLHttpRequest");
      },
      success:function(data){
        console.log(data);
        if (data.length==0||data.false=="false") {
          $(".know-lists").remove();
          kpage(1);
        }else{
          $(".know-lists").remove();
          // console.log("执行");
          kaddList(data);
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
























































