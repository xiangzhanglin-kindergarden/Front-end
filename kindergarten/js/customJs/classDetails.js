/**
 * Created by Sunshine on 2017/4/24.
 */
$(document).ready(function () {

    var getrow=window.sessionStorage? sessionStorage.getItem("row"): document.cookie.read("row");
    function clearCookie(){//清除cookie
        var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (var i = keys.length; i--;)
                document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString()
        }
    }
    console.log(getrow);

    var rows;
    if (getrow.split("=") != "-1"){
        rows = getrow.split(",");
        console.log(getrow);
    }else {
        rows = getrow.split("=")[1].split(",");
        console.log(getrow);
    }

    var rowId = rows[0];
    var spans = $(".content").find(".everyContent").find("span");
    for(var s=0;s<spans.length;s++){
        spans[s].innerHTML = rows[s+1];
    }

    
    var backClass = $("#backClass")[0];
    var goHome = $(".goHome");

    backClass.onclick = function () {
        window.history.back(-1);
        clearCookie();
    };

    var changeInfo = $(".change").find("input");

    var cancle = document.createElement("input");
    changeInfo[0].addEventListener("click",editRow);


    $(".buttonDel").click(function(){
        var message = confirm("确定要删除吗？");
        if(message){
            delTheClass();
        }
        
    });

    /*var delClass = $("input.buttonDel");
    delClass.onclick = function () {
        var dIndex = $("#table_list_2").jqGrid("getGridParam", "selrow");
        if (dIndex == null){
            alert("请选择要删除的行！");
        }else {
            var message = confirm("确定要删除吗？");
            if(message){
                delTheClass();
            }
        }
    };
*/
    function editRow() {
        for(var s=0;s<spans.length;s++){
            spans[s].innerHTML = "";
            var inputSpan = document.createElement("input");
            var inputI = document.createElement("i");
            inputI.className = "teacher";
            inputSpan.value = rows[s+1];

            if (s>0){
                spans[s].appendChild(inputSpan);
                spans[s].appendChild(inputI);
                inputSpan.readOnly = true;
            }else {
                var selects = document.createElement("select");
                var optionClass = ['大','中','小'];
                for(var op = 0;op<optionClass.length;op++){
                    var option = document.createElement("option");
                    option.value = optionClass[op];
                    option.innerHTML = optionClass[op];
                    selects.appendChild(option);
                }
                console.log(spans[0]);
                spans[0].appendChild(selects);
                inputSpan.className = "theFirstInput";
                spans[s].appendChild(inputSpan);
                var className = rows[1].slice(1);
                var classT = rows[1].slice(0,1);
                var classIndex;
                for(var c=0;c<optionClass.length;c++){
                    if(optionClass[c] === classT){
                        classIndex = c;
                    }
                }
                if(classIndex !== undefined){
                    $(selects).find("option")[classIndex].selected = true;
                }
                console.log(classIndex);
                inputSpan.value = className;
            }
        }
        $("i.teacher")[1].style.left = "245px";

        changeInfo[0].value = "提交修改";
        changeInfo[0].id = "submit";
        changeInfo.css("background-color","#18a689");

        cancle.type = "button";
        cancle.value = "取消";
        cancle.style.backgroundColor = "#f7a54a";
        $(".change")[0].appendChild(cancle);





        cancle.onclick = function () {
            var removeSpan = $(".content").find("span").find("input");
            for (var f=0;f<spans.length;f++){
                removeSpan[f].remove();
                spans[f].innerHTML = rows[f+1];
            }
            cancle.remove();
            changeInfo[0].value = "修改";
            changeInfo[0].id = "";
            changeInfo[0].removeEventListener("click",submitChange);
            changeInfo[0].addEventListener("click", editRow);
            changeInfo.css("background-color","#1ab394");
        };

        getTeacher();

        var theSubmit =  $("#submit")[0];
        theSubmit.removeEventListener("click",editRow);
        theSubmit.addEventListener("click",submitChange);


    }


    function getTeacher() {
        var choseTeacher = $("i.teacher");
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

                var closeSpan = document.createElement("span");
                closeSpan.className = "close";
                closeSpan.id = "closeBox";
                closeSpan.style.right = "0.3em";
                teacherDiv.appendChild(closeSpan);

                $(closeSpan).click(function () {
                    $(".teacherDiv").remove();
                });

                var pTitle = document.createElement("h2");
                pTitle.className = "teacherSpan";
                pTitle.innerHTML = "请选择教师";
                teacherDiv.appendChild(pTitle);

                var theUrl = "";
                switch (index) {
                    case "0":
                        theUrl = "http://"+IPADDRESS+"/kindergarden/TeacherBymoniter";//班主任http://119.29.225.57:8080/kindergarden/TeacherBymoniter
                        break;
                    case "1":
                        theUrl = "http://"+IPADDRESS+"/kindergarden/TeacherByCommontea";//老师
                        break;
                    case "2":
                        theUrl = "http://"+IPADDRESS+"/kindergarden/TeacherByBaoyu";//保育员
                        break;
                    default:
                }

                $.ajax({
                    type: "get",
                    url: theUrl,
                    // dataType: "JSON",
                    contentType:"application/x-www-form-urlencoded;charset=utf-8",
                    beforeSend: function (xhr) {
                        xhr.withCredentials = true;
                        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

                        var adding = document.createElement("p");
                        adding.className = "adding";
                        adding.innerHTML = "数据加载中。。。";
                        teacherDiv.appendChild(adding);
                    },
                    success: function (theData) {
                        var data = JSON.parse(theData);
                        var nowTeacher;
                        $(".adding")[0].remove();
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
    }

    function submitChange() {
        var inputs = $(".content").find("span").find("input");
        var select = $(".content").find("span").find("select");
        var classNameS = select[0].value;
        var className = inputs[0].value;
        console.log(classNameS,className);

        // var classNameT = className.substring(0,1),
            // classNameC = className.substring(1);
        var cName = classNameS +","+ className;
        if(classNameS === ""){
            alert("班级名称不能为空");
        }else if(inputs[1].value === ""){
            alert("请选择班主任");
        }else if(inputs[2].value ===""){
            alert("请选择普通教师！");
        }else if(inputs[3].value ===""){
            alert("请选择保育员！");
        }else {
            var values = {
                cId: rowId,
                cName: cName,
                tTeacher: inputs[1].value+","+inputs[2].value+","+inputs[3].value
            };
            $.ajax({
                type:"post",
                url:"http://"+IPADDRESS+"/kindergarden/ClassUpate",
                data:"classUpdate="+JSON.stringify(values),
                contentType:"application/x-www-form-urlencoded;charset=utf-8",
                beforeSend: function (xhr) {
                    xhr.withCredentials = true;
                    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                },
                success: function () {
                    alert("修改成功！");
                    console.log("success");
                    console.log(values);
                    // window.location.reload();
                    window.location.href = "classManagement.html";
                },
                error: function (err) {
                    console.log(err.status);
                    alert("出现错误："+err.status);
                }
            });
        }






    }



    function delTheClass() {
        $.ajax({
            type: "post",
            url: "http://"+IPADDRESS+"/kindergarden/ClassDelete",
            data: "classDelete="+rowId,
            beforeSend: function (xhr) {
                xhr.withCredentials = true;
                xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            },
            success: function () {
                alert("删除成功！");
                // $(".if-d-backbtn a").trigger("click");
                // window.location.reload();//刷新页面
                // window.history.go(-1);
                window.location.href = "classManagement.html";
                // window.location.reload(); 
            },
            error: function (err) {
                console.log(err.status);
                alert("出现错误："+err.status);
            }
        });
    }



    //班级学生信息
    var theRow = {};
    var table_list_1 = $("#table_list_1");
    $.ajax({
        type: "get",
        url: "http://"+IPADDRESS+"/kindergarden/ClassDetails?classid="+rowId,
        contentType:"application/x-www-form-urlencoded;charset=utf-8",
        beforeSend: function (xhr) {
            xhr.withCredentials = true;
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

            var adding = document.createElement("p");
            adding.className = "adding";
            adding.innerHTML = "数据加载中。。。";
            $(".ibox-content")[0].appendChild(adding);
        },
        success: function (rowData) {
            $(".adding").remove();
            theRow = JSON.parse(rowData);
            console.log(theRow);
            
            for(var j=0;j<theRow.length;j++){
                theRow[j].id = j+1;
                theRow[j].sParent = theRow[j].sAcount.split(".")[0].split(":")[0];
            }
            
            $.jgrid.defaults.styleUI = 'Bootstrap';
            table_list_1.jqGrid({
                datatype: "local",
                ajaxGridOptions: { contentType: 'application/json; charset=utf-8' },
                loadonce: true,
                gridview: true, //加速显示
                sortable: true,
                sortorder: "asc",//排序方式：正序
                height: 493,
                autowidth: true,
                shrinkToFit: true,
                rowNum: 12,
                colNames: ['学生序号', '学生姓名', '学生家长', '性别', '操作'],
                colModel: [
                    {name: 'id', index: 'id', width: 30, sortable: true, sortorder: "asc"},
                    {name: 'sName', index: 'sName', width: 30},
                    {name: 'sParent', index:'sParent', width: 60},
                    {name: 'sSex', index: 'sSex', width: 20},
                    {
                        name: 'edit', index: 'edit', width: 40, sortable: false, formatter: function () {
                        return "<input type='button' class='theDetails' value='查看详情'>"
                    }
                    }
                ],
                pager: "#pager_list_1",
                viewrecords: true,
                caption: "重邮幼儿园教师信息",
                add: true,
                edit: true,
                addtext: 'Add',
                edittext: 'Edit',
                hidegrid: false,
                loadError: function (xhr, status, error) {
                    console.log(xhr.status, xhr, status, error);
                }
            });

            //添加数据
            for(var i=0;i<theRow.length;i++){
                table_list_1.jqGrid('addRowData',i+1,theRow[i]);
            }

            //分页
            table_list_1.setGridParam({rowNum:12}).trigger("reloadGrid");

            showDetails(theRow);

            
        }
    });








//查看详情操作
    function showDetails(data) {
        var buttons = $("#table_list_1").find("input.theDetails");
        var show = $("#details");
        var theContent = $(".showContent")[0];
        var caption = ['姓名：','性别：','学生班级：','学生身份证：','家长信息：','入学年龄：','入学时间：','家庭住址：','登陆密码：'];
        for(var i=0;i<buttons.length;i++){
            buttons[i].setAttribute("data-buttonsIndex",i);
            buttons[i].onclick = function () {
                var index = parseInt(this.getAttribute("data-buttonsIndex"));

                console.log(theContent);
                var rows = data[index];
                var row = [rows.sName,rows.sSex,rows.cId,rows.sIdentifyId,rows.sAcount,rows.sComeAge,rows.sComeTime,rows. sAddress,rows.sPassword];
                show.show(400);

                console.log(data);
                for(var i=0;i<row.length;i++){
                    var divContnet = document.createElement("div");
                    divContnet.className = "contentData";
                    theContent.append(divContnet);
                    var spanCaption = document.createElement("span");
                    var spanContent = document.createElement("span");
                    divContnet.appendChild(spanCaption);
                    divContnet.appendChild(spanContent);
                    spanCaption.innerHTML = caption[i];
                    spanContent.innerHTML = row[i];
                }


            }
        }
        var closeDetails = $("#closeDetails");
        closeDetails.click(function () {
            show.hide(400);
            $(".showContent").find("div").remove();
        })
    }



});