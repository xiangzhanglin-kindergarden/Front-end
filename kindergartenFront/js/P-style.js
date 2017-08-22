var teacherData;

$(function(){
  username = sessionStorage.getItem("user");
  usertype = sessionStorage.getItem("nub");  //0为老师，1为校长，2位家长

  console.log(usertype);
  console.log(username);
  if (usertype == null||usertype == "") {
    window.location.href = "logIn.html";
  };
  allClass();
  if (usertype == 1){//园长



  }else if (usertype == 0) {

    teacherData = sessionStorage.getItem("teacherData");
    var data = JSON.parse(teacherData);
    console.log(data);
    var username = data.tName;
    $("#awd-site-logo span").html(username);

    $(".theClassChose").remove();


  }else if (usertype == 2) {

    teacherData = sessionStorage.getItem("teacherData");
    var data = JSON.parse(teacherData);
    console.log(data);
    console.log(data.Object.sName);

    var username = data.Object.sName;
    $(".classtable table caption span").html(username);
    username = username+"家长";
    $("#awd-site-logo span").html(username);

    $(".enterBack").remove();

  }
})

function allClass(){
  //加载班级
  $.ajax({
    type: "post",
    url: "http://172.20.2.164:8080/kindergarden/ClassShow",
    contentType:"application/x-www-form-urlencoded;charset=UTF-8",
    beforeSend: function (xhr) {
      xhr.withCredentials = true;
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    },
    success: function (classdata) {
      var data = JSON.parse(teacherData);
      var classId = data.cId;

      var classData = JSON.parse(classdata);
      var classlang = classData.length-2;

      for(var i=0;i<classlang;i++){
        if (classData[i].cId == classId) {
          $(".classtable table caption span").html(classData[i].cName);
        };
        $(".removeTclassse").append("<option value='"+classData[i].cName+"'>"+classData[i].cName+"</option>")
        $(".addNewClass").append("<option value='"+classData[i].cName+"'>"+classData[i].cName+"</option>")
      }
    },
    error: function (err) {
      console.log(err.status);
    }
  });
}