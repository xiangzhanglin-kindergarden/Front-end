/*
*
*     课表交互 
*
*/
var cClass;    //存储班级信息
var myweek;     //存储周数


var usertype = sessionStorage.getItem("nub");



$(document).ready(function(){

  $(".show-class-btn").click(function(){
      var date = new Date();
      var week = date.getUTCDay();

      var myjson = "";      //传递参数的内容
      var url = "";    //物理地址
      var IP = "";     //IP地址


      var week = $(".dform-group option:selected").val();
      
      IP = "172.20.2.164:8080/";
      url = "kindergarden/LessonShow";



    /*
      cClass = "大一班";
    */

      myweek = "1";
      cClass = $(".classtable table caption span").html();
      console.log(cClass);

      //myjson  字符串
      myjson = {
        lId:null,
        cName:cClass,
        lWeek:myweek,
        lMon:null,
        lTue:null,
        lWed:null,
        lThu:null,
        lfri:null,
      };
      myjson = JSON.stringify(myjson);
      console.log(cClass);
      console.log(myjson);
      ajax("http://"+IP+url,"lessonJson="+myjson,showLesson);
  })    




  //切换周的时候的功能函数
  $(".form-group select").on("change",function(){
    myweek = $(this).val().replace(/[\u4E00-\u9FA5]/g,"");
    var lesson = JSON.stringify({
      "lId":null,
      "cName":cClass,
      "lWeek":$(this).val().replace(/[\u4E00-\u9FA5]/g,""),
      "lMon":null,
      "lTue":null,
      "lWed":null,
      "lThu":null,
      "lfri":null
    });
    console.log(lesson);
    ajax("http://172.20.2.164:8080/kindergarden/LessonShow","lessonJson="+lesson,showLesson);
  })

  //切换班的时候的功能函数
  $(".class-group select").on("change",function(){
    cClass = $(this).val();
    console.log(myweek);
    $(".classtable table caption span").html(cClass);
    var lesson = JSON.stringify({
      "lId":null,
      "cName":$(this).val(),
      "lWeek":myweek,
      "lMon":null,
      "lTue":null,
      "lWed":null,
      "lThu":null,
      "lfri":null
    });
    console.log(lesson);
    ajax("http://172.20.2.164:8080/kindergarden/LessonShow","lessonJson="+lesson,showLesson);
  })


  function ajax(url,data,callback){
    $.ajax({
      url : url,
      type : "POST",
      dataType : "json",
      data : data,
      contentType:"application/x-www-form-urlencoded;charset=UTF-8",
      success : function(res){
        if(res != null){
          callback(res);
        }
      },
      error : function(jqHXR){
        console.log("错误:"+jqHXR.status);
      }
    })
  }

  //课表显示的函数
  function showLesson(data){
    console.log(data);
    console.log(data.cName);
    if (usertype != 2) {
      $(".classtable table caption span").html(data.cName);
    };
    
    if(data.result == false){
      alert("当前周和班级的课程还未添加")
      $(".classtable table tr:eq(1) td:eq(1)").html("")
      $(".classtable table tr:eq(2) td:eq(1)").html("")
      $(".classtable table tr:eq(3) td:eq(1)").html("")
      $(".classtable table tr:eq(4) td:eq(1)").html("")

      $(".classtable table tr:eq(1) td:eq(2)").html("")
      $(".classtable table tr:eq(2) td:eq(2)").html("")
      $(".classtable table tr:eq(3) td:eq(2)").html("")
      $(".classtable table tr:eq(4) td:eq(2)").html("")

      $(".classtable table tr:eq(1) td:eq(3)").html("")
      $(".classtable table tr:eq(2) td:eq(3)").html("")
      $(".classtable table tr:eq(3) td:eq(3)").html("")
      $(".classtable table tr:eq(4) td:eq(3)").html("")

      $(".classtable table tr:eq(1) td:eq(4)").html("")
      $(".classtable table tr:eq(2) td:eq(4)").html("")
      $(".classtable table tr:eq(3) td:eq(4)").html("")
      $(".classtable table tr:eq(4) td:eq(4)").html("")

      $(".classtable table tr:eq(1) td:eq(5)").html("")
      $(".classtable table tr:eq(2) td:eq(5)").html("")
      $(".classtable table tr:eq(3) td:eq(5)").html("")
      $(".classtable table tr:eq(4) td:eq(5)").html("")
    }else{
      localStorage.setItem("ll",data.lId);
      var reg = /[^,]+/g;

      var oneDay = JSON.stringify(data.lMon);
      var twoDay = JSON.stringify(data.lTue);
      var threeDay = JSON.stringify(data.lWed);
      var fourDay = JSON.stringify(data.lThu);
      var fiveDay = JSON.stringify(data.lfri);

      oneDay = oneDay.match(reg);
      twoDay = twoDay.match(reg);
      threeDay = threeDay.match(reg);
      fourDay = fourDay.match(reg);
      fiveDay = fiveDay.match(reg);

      oneDay = delWord(oneDay);
      twoDay = delWord(twoDay);
      threeDay = delWord(threeDay);
      fourDay = delWord(fourDay);
      fiveDay = delWord(fiveDay);


      function delWord(obj){
        obj[0] = obj[0].replace(/"/g,"");
        obj[3] = obj[3].replace(/"/g,"");
        
        for(i=0;i<=3;i++){
          if (obj[i]==0) {
            obj[i]=null;
          };
        }
        return obj;
      }
      $(".classtable table tr:eq(1) td:eq(1)").html(oneDay[0]);
      $(".classtable table tr:eq(2) td:eq(1)").html(oneDay[1]);
      $(".classtable table tr:eq(3) td:eq(1)").html(oneDay[2]);
      $(".classtable table tr:eq(4) td:eq(1)").html(oneDay[3]);

      $(".classtable table tr:eq(1) td:eq(2)").html(twoDay[0]);
      $(".classtable table tr:eq(2) td:eq(2)").html(twoDay[1]);
      $(".classtable table tr:eq(3) td:eq(2)").html(twoDay[2]);
      $(".classtable table tr:eq(4) td:eq(2)").html(twoDay[3]);

      $(".classtable table tr:eq(1) td:eq(3)").html(threeDay[0]);
      $(".classtable table tr:eq(2) td:eq(3)").html(threeDay[1]);
      $(".classtable table tr:eq(3) td:eq(3)").html(threeDay[2]);
      $(".classtable table tr:eq(4) td:eq(3)").html(threeDay[3]);

      $(".classtable table tr:eq(1) td:eq(4)").html(fourDay[0]);
      $(".classtable table tr:eq(2) td:eq(4)").html(fourDay[1]);
      $(".classtable table tr:eq(3) td:eq(4)").html(fourDay[2]);
      $(".classtable table tr:eq(4) td:eq(4)").html(fourDay[3]);

      $(".classtable table tr:eq(1) td:eq(5)").html(fiveDay[0]);
      $(".classtable table tr:eq(2) td:eq(5)").html(fiveDay[1]);
      $(".classtable table tr:eq(3) td:eq(5)").html(fiveDay[2]);
      $(".classtable table tr:eq(4) td:eq(5)").html(fiveDay[3]);
    }
  }
})




































































