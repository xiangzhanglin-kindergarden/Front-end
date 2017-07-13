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

   

})



  var IPnub;   //存储ip地址
  var address;  //存储后半部地址
  var trans   //传递的参数

  var markurl;   //用于存储分页用的url信息；


  IPnub = "172.20.2.164:8080/";


/*    打开页面初始化AJAX     */

	$(function(){
		address = "kindergarden/ShowAllGrowth";
		trans = "?pageNum="+1;
		findAJAX();
    markurl = "http://"+IPnub+address+trans;
    
  })


/*   查询AJAX   */

  function findAJAX(){

    $.ajax({
      type:"get",
      url:"http://"+IPnub+address+trans,
      dataType:"JSON",
      contentType:"application/x-www-form-urlencoded;charset=UTF-8",
      beforeSend:function(xhr){
        xhr.withCredentials = true;
        xhr.setRequestHeader("X-Requested-with","XMLHttpRequest");
      },
      success:function(data){
        $(".know-lists").remove();
        addList(data);
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

              var a2 = $("<a href='"+data[i].url2+"' target='_blank'></a>");
                var input = $("<input class='n-l-f-btn-c btn btn-success btn-lg' type='button' value='详情'>");
               
               a2.append(input);
             k_l_f.append(a2);

              var input2 = $("<input class='n-l-f-btn-del btn btn-danger btn-lg' type='button' onclick='toDel(this)' value='删除''>");
             k_l_f.append(input2);
            
           k_l_c_b.append(k_l_f);

         k_l.append(k_l_c_b);

      $(".know-lists-box").append(k_l);

    };

    //动态添加结束
    addPD();
  }

/*   判断用不用删东西   */
  function addPD(){
    // 权限判断
      //0为老师，1为校长
      if (usertype==0) {
        $(".know-list-func .n-l-f-btn-del").remove();
        $(".know-list-func .n-l-f-btn-c").css({"width":"40%"});
      };
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
          url:"http://172.20.2.164:8080/kindergarden/DeleteGrowth?idnews="+ID,
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

/*   输入搜索  START*/

	$(function(){
	  $(".know-search button").bind("click",function(){
	    var keyword = $(".k-i-keyword input").val();
	    var keytime = $(".k-i-time input").val();
	    var keyname = $(".k-i-person input").val();
	    if (keyword==""&&keytime==""&&keyname=="") {
	      // alert("请输入要查询的内容！");
        $.ajax({
          type:"get",
          url:"http://"+IPnub+address+trans,
          dataType:"JSON",
          contentType:"application/x-www-form-urlencoded;charset=UTF-8",
          beforeSend:function(xhr){
            xhr.withCredentials = true;
            xhr.setRequestHeader("X-Requested-with","XMLHttpRequest");
          },
          success:function(data){
            $(".know-lists").remove();
            addList(data);
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
	        url:"http://172.20.2.164:8080/kindergarden/GrowthSreach?title="+keyword+"&time="+keytime+"&issuer="+keyname+"&pageNum="+1,
	        dataType:"JSON",
	        contentType:"application/x-www-form-urlencoded;charset=UTF-8",
	        beforeSend:function(xhr){
	          xhr.withCredentials = true;
	          xhr.setRequestHeader("X-Requested-with","XMLHttpRequest");
	        },
	        success:function(data){
	          
            console.log(data);
            if (data.length==0) {
              $(".know-lists").remove();
              page(1);
            }else{
              $(".know-lists").remove();
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

/*   新增  START*/
	
	$(".know-new-yes").click(function(){
		var gkind = "成长知识";

		//获取标题
		var gtitle = $(".know-new-title input").val();
    if (gtitle=="" || gtitle==null) {
      alert("请输入标题！");
    }else{
      //获取封面
      var reurl1;
      var gurl1 = $(".if-d-c-border img").attr("src");
      if (gurl1 == "img/logo.png") {
        reurl1 = "0";
      }else{
        reurl1 = gurl1;
      }

      //用户名
      var guser = pushname;

      //获取地址
      var gurl2 = $(".know-new-a input").val();

      if (gurl2=="" || gurl2==null) {
        alert("请输入要分享的地址!");
      }else{
        inNewsAdd = {
          issuer:pushname,
          title:gtitle,
          kind:"成长知识",
          url1:reurl1,
          url2:gurl2,
        }
        console.log(inNewsAdd);
        myjson = JSON.stringify(inNewsAdd);

        $.ajax({
          type:"post",
          url:"http://172.20.2.164:8080/kindergarden/GrowthAdd",
          data:"NewsAdd="+myjson,
          dataType:"JSON",
          contentType:"application/x-www-form-urlencoded;charset=UTF-8",
          beforeSend:function(xhr){
            xhr.withCredentials = true;
            xhr.setRequestHeader("X-Requested-with","XMLHttpRequest");
          },
          success:function(data){
           alert("添加成功！");
           window.location.reload();
          },
          error:function(jqHXR, textStatus, errorThrown){
            console.log("错误:"+jqHXR.status);
            console.log("错误:"+textStatus);
            console.log("错误:"+errorThrown);
          }
        })
      }
    }

	})

/*    新增  END*/
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
    markurl = markurl.substr(0, markurl.length - 1);  
    markurl = markurl + flag;
    console.log(markurl);

    $.ajax({
      type:"get",
      url:markurl,
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
          page(1);
        }else{
          $(".know-lists").remove();
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




















