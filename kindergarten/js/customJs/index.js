/**
 * Created by Sunshine on 2017/6/1.
 */
$(document).ready(function () {
    var teacherData;
    var manager = sessionStorage.getItem("user");
    var usertype = sessionStorage.getItem("nub");  //0为老师，1为校长

    

    if (usertype == 1){//园长
        console.log(manager);
        
        $("#username").html("园长");

    }else {
        $("#usertype").html("老师");
        
        /*
         *
         *   教师信息管理 功能
         *
         *
         */
        teacherData = sessionStorage.getItem("teacherData");
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