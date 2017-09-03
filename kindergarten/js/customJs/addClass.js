/**
 * Created by Sunshine on 2017/4/20.
 */
$(document).ready(function () {


    var backClass = $("#backClass")[0];
    var goHome = $(".goHome");
    backClass.onclick = function () {
        window.history.back(-1);
    };


    var buttons = $(".button").find("input");

    buttons[0].onclick = function () {
        submitaddClass();
    };
    buttons[1].onclick = function () {
        window.history.back(-1);
    };

    var choseTeacher = $(".teacherI");
    var body = $("body")[0];
    var tName = [];
    for (var i=0;i<choseTeacher.length;i++){
        choseTeacher[i].setAttribute("data-index",i);
        choseTeacher[i].onclick = function () {
            var teacherDiv = document.createElement("div");
            var index = this.getAttribute("data-index");
            var tValue = this;
            teacherDiv.className = "teacherDiv";
            body.appendChild(teacherDiv);

            var pTitle = document.createElement("h2");
            pTitle.className = "teacherSpan";
            pTitle.innerHTML = "请选择教师";
            teacherDiv.appendChild(pTitle);
            
            $.ajax({
                type: "get",
                url: "http://"+IPADDRESS+"/kindergarden/TeacherShowAll",
                contentType:"application/x-www-form-urlencoded;charset=UTF-8",
                beforeSend: function (xhr) {
                    xhr.withCredentials = true;
                    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

                    var adding = document.createElement("p");
                    adding.className = "adding";
                    adding.innerHTML = "数据加载中。。。";
                    teacherDiv.appendChild(adding);
                },
                success: function (dataStr) {
                    console.log(dataStr);
                    var nowTeacher;
                    var data = JSON.parse(dataStr);
                    $(".adding").remove();
                    for (var d=0;d<data.length;d++){
                        tName[d] = data[d].tName;
                        var tInput = document.createElement("input");
                        tInput.className = "teacherNameInput";
                        tInput.value = tName[d];
                        tInput.type = "button";
                        teacherDiv.appendChild(tInput);
                    }

                    var chose = $(".teacherDiv").find("input");
                    for(var p=0;p<chose.length;p++){
                        chose[p].onclick = function () {
                            nowTeacher = this.value;
                            $(".teacherDiv").remove();

                            var nowParent = tValue.parentNode;
                            var nowValue = nowParent.getElementsByTagName("input")[0];
                            nowValue.value = nowTeacher;
                        }
                    }
                    
                },
                error: function (err) {
                    console.log(err.status);
                    alert("出现错误："+err.status);
                }
            });

            
        }
    }


    function submitaddClass() {

        var inputValus = $(".theRow").find("input");
        var theClassSize = $(".theClassSize option:selected").text();

        var className = inputValus[0].value;
        // var classNameT = className.substring(0,1),
        //     classNameC = className.substring(1);
        var tTeachers = inputValus[1].value +","+ inputValus[2].value +","+ inputValus[3].value;
        var cName = theClassSize+","+className;

        var value = {
            cId: null,
            cName: cName,
            tTeacher: tTeachers,
            sNumber: null
        };
        if(value.cName === ""){
            alert("请输入班级名称！");
        }else if(className ===""){
            alert("请输入班级名称！");
        }else if(inputValus[1].value ===""){
            alert("请选择班主任！");
        }else if(inputValus[2].value ===""){
            alert("请选择普通教师！");
        }else if(inputValus[3].value ===""){
            alert("请选择保育员！");
        }else if(tTeachers === ""){
            alert("请选择教师！");
        }else {
            $.ajax({
                type:"post",
                url:"http://"+IPADDRESS+"/kindergarden/ClassAdd",
                data:"classAdd="+JSON.stringify(value),
                contentType:"application/x-www-form-urlencoded;charset=utf-8",
                beforeSend: function (xhr) {
                    xhr.withCredentials = true;
                    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                },
                success: function (data) {
                    console.log(data.indexOf("班级名重复"));
                    if(data && data.indexOf("班级名重复") !== -1){
                        var err = data + "请重新输入班级名称!";
                        alert(err);
                    }else if(data && data.indexOf("ok") !== -1){
                        alert("班级创建成功！");
                        window.location.href = "classManagement.html";
                    }else {
                        alert(data);
                    }
                },
                error: function (err) {
                    console.log(err.status);
                    alert("出现错误："+err.status);
                }
            });
        }


    }

});