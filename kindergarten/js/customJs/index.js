/**
 * Created by Sunshine on 2017/6/1.
 */
$(document).ready(function () {
    var teacherData = sessionStorage.getItem("teacherData");
    var manager = sessionStorage.getItem("user");
    var usertype = sessionStorage.getItem("nub");  //0为老师，1为校长

    console.log(typeof (teacherData));

    if (usertype == 1){//园长
        console.log(manager);$("#username").html("园长");

    }else {
        /*
         *
         *   教师信息管理 功能
         *
         *
         */
        var data = JSON.parse(teacherData);
        console.log(data);
        var username = data.tName;
        $("#username").html(username);


        //教师删除某些功能
        $(".classManagement").remove();
        $(".teacherInfo").remove();
        $(".albums").find("span.theAlbumsChange").html("班级图鉴");

    }

});