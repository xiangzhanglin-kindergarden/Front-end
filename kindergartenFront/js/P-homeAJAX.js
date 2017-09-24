/*
*
*     首页 新闻公告 
*
*/
  // var hIPnub;   //存储ip地址
  var haddress;  //存储后半部地址
  var htrans   //传递的参数

  var hbtnkind   // 全部、新闻、公告分类btn


  var h_markurl;   //用于存储分页用的url信息；




// hIPnub = "localhost/";



$(function(){
  hbtnkind = "全部";
  htoSurehAddress(hbtnkind);
})

$(function(){
  $(".show-home-btn").click(function(){
    hbtnkind = "全部";
    htoSurehAddress(hbtnkind)
  })
})


/*   判断地址   */
  function htoSurehAddress(hbtnkind){
    if (hbtnkind=="全部") {
      haddress = "kindergarden/AllStateSreach";
      oldclick = "全部";
    }

    htrans = "?A=&B=通过&C=&D=&pageNum="+1;


    hfindAJAX();
  }



/*   查询AJAX   */

  function hfindAJAX(){
    console.log("http://"+IPADDRESS+haddress+htrans);
    h_markurl = "http://"+IPADDRESS+haddress+htrans;

    $.ajax({
      // type:"get",
      type:"post",
      // url:"http://"+IPADDRESS+haddress+htrans,
      url:"http://"+IPADDRESS+haddress,
      data: {A:"",B:encodeURI(encodeURI("通过")),C:"",D:"",pageNum:1},
      dataType:"JSON",
      contentType:"application/x-www-form-urlencoded;charset=UTF-8",
      beforeSend:function(xhr){
        xhr.withCredentials = true;
        xhr.setRequestHeader("X-Requested-with","XMLHttpRequest");
      },
      success:function(data){
        if (data.length==0) {
          $(".thenewetbox").remove();
        }else{
          $(".thenewetbox").remove();
          haddList(data);
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
  function haddList(data){
    console.log(data);
    
    //动态添加 开始
    for (var i = 0; i < 5; i++) {

      //类别
      var kind;
      if (data[i].kind=="新闻") {
        kind = "img/newestNew.png";
      }else if (data[i].kind=="公告"){
        kind = "img/newestNotice.png";
      }

      //动态添加
      var tnba = $("<a href='##' onclick='htoDetail(this)' name='"+data[i].idnews+"'></a>");
      var tnb = $("<div class='col-lg-12 thenewetbox'></div>");
        var ib = $("<div class='imgbox'><img src='"+kind+"'></div>");
        var pm = $("<div class='pushMan'>"+data[i].issuer+"&nbsp;&nbsp;发布了&nbsp;&nbsp;<span>"+data[i].kind+"</span></div>");
        var pi = $("<div class='pushInfo'><span>"+data[i].title+"</span></div>")
      tnb.append(ib);
      tnb.append(pm);
      tnb.append(pi);
      tnba.append(tnb);
      $(".theNews").append(tnba);
    };

    //动态添加结束

  }





/*+++++++++++++++++++++++++++++++++++++++*/

/*   进入详情页  START*/

  function htoDetail(obj){
    var pageID = $(obj).attr("name");
    console.log(pageID);
    sessionStorage.setItem("pageID",pageID);
    console.log(sessionStorage.getItem("pageID"));
    window.open("newsDetail.html","_self");
  }

/*    进入详情页  END*/
/*****************************************/




