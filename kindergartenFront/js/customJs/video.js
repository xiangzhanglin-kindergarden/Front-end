/**
 * Created by Sunshine on 2017/5/27.
 */
$(window).ready(function () {
    var body = $("body");
    var addVideoBox = $(".addVideoBox");
    var gray = $(".gray");

    var addVideos = $("input.buttonAdd");
    var close = $(".close");
    var cancle = $("input.cancle");
    var videoData;

    var optionClass = [];


    var addVideoBoxBollean = true;


    close.click(function () {
        closeAddAlbumsBox();
    });
    cancle.click(function () {
        closeAddAlbumsBox();
    });

    var buttonDel = $("input.buttonDel");
    buttonDel.click(function () {
        delVideo();
    });


    //显示数据
    var pageNum = 1;


    //权限
    var url = "";
    var usertype = sessionStorage.getItem("nub");  //0为老师，1为校长
    var teacherData = sessionStorage.getItem("teacherData");
    var theData = "";

    //园长
    if (usertype == 1){
        url = "http://"+IPADDRESS+"/kindergarden/MCShowAdmini";
        theData = "pageNum="+pageNum;
        loadClass();

        addVideos.click(function () {
            gray.show();
            addVideoBox.show(400);
            releaseVideo();
        });
    }else {
        var teacher = JSON.parse(teacherData);

        theData = "mcJson="+teacher.cId+"&pageNum="+pageNum;
        url = "http://"+IPADDRESS+"/kindergarden/MCShowClass";

        var classVideoChoose = $(".classVideoChoose");
        $(".chooseClass").remove();
        classVideoChoose.show();

        var theTitle = $("h3.mainTitle");
        theTitle.html("班级活动");

        var schoolChoose = classVideoChoose.find("input.schoolChoose");
        schoolChoose.click(function () {
            classVideoChooseFun(this.value);
        });

        addVideos.click(function () {
            gray.show();
            var thePeople = $("span.thePeople");
            thePeople.html(teacher.tName);
            addVideoBox.show(400);
            releaseVideoAjax();
        });

    }

    $.ajax({
        type: "post",
        url: url,
        contentType:"application/x-www-form-urlencoded;charset=UTF-8",
        data: theData,
        beforeSend: function (xhr) {
            xhr.withCredentials = true;
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        },
        success: function (data) {
            //videoData = JSON.parse(data).tlist;
            if(typeof (data) == 'object'){
                videoData = data.tlist;
            }else {
                // videoData = JSON.parse(data).tlist;
                videoData = $.parseJSON(data);
                videoData = videoData.tlist;
            }

            showData(videoData);

            



        },
        error: function (err) {
            console.log(err.status);
            alert("出现错误："+err.status);
        }
    });




    function classVideoChooseFun(name) {
        var backClassVideo = $(".classVideoChoose").find("input.schoolChoose");

        var addVideoInput = $(".addVideos").find("input");
        if (name == "校园活动"){
            $.ajax({
                type: "post",
                url: "http://"+IPADDRESS+"/kindergarden/MCShowAdmini?pageNum="+pageNum,
                contentType:"application/x-www-form-urlencoded;charset=UTF-8",
                beforeSend: function (xhr) {
                    xhr.withCredentials = true;
                    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

                    var adding = document.createElement("p");
                    adding.className = "adding";
                    adding.innerHTML = "数据加载中。。。";
                    $(".ibox-content")[0].appendChild(adding);
                },
                success: function (data) {
                    $(".adding").remove();
                    $("#main").remove();

                    backClassVideo[0].value = "返回本班活动";
                    var videoData;
                    if(typeof (data) == 'object'){
                        videoData = data.tlist;
                    }else {
                        videoData = JSON.parse(data).tlist;
                    }

                    var main = document.createElement("div");
                    main.id = "main";
                    $(".ibox-content")[0].appendChild(main);
                    var theTitle = document.createElement("h3");
                    theTitle.innerHTML = "校园活动";
                    main.appendChild(theTitle);

                    $(addVideoInput[0]).hide(400);
                    $(addVideoInput[1]).hide(400);

                    showData(videoData);



                },
                error: function (err) {
                    console.log("出现错误："+err.status);
                }
            });
        }else {
            $("#main").remove();
            var main = document.createElement("div");
            main.id = "main";
            $(".ibox-content")[0].appendChild(main);
            var theTitle = document.createElement("h3");
            theTitle.innerHTML = "班级活动";
            main.appendChild(theTitle);
            backClassVideo[0].value = "校园活动";

            $(addVideoInput[0]).show(400);
            $(addVideoInput[1]).show(400);
            console.log(videoData);
            showData(videoData);

        }


    }







    //加载班级
    function loadClass() {
        $.ajax({
            type: "post",
            url: "http://"+IPADDRESS+"/kindergarden/ClassShow",
            contentType:"application/x-www-form-urlencoded;charset=UTF-8",
            beforeSend: function (xhr) {
                xhr.withCredentials = true;
                xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

                var adding = document.createElement("p");
                adding.className = "adding";
                adding.innerHTML = "数据加载中。。。";
                $(".chooseClass")[0].appendChild(adding);
            },
            success: function (classdata) {
                var classData;
                if(typeof (classdata) == 'object'){
                    classData = classdata;
                }else {
                    classData = JSON.parse(classdata);
                }
                $(".adding").remove();
                for (var clas = 0; clas < classData.length; clas++) {
                    optionClass[clas] = classData[clas].cName;
                }

                var selectClass = $("select.chooseClassSelect");

                for (var c=0;c<optionClass.length;c++){
                    var classOption = document.createElement("option");
                    selectClass[0].appendChild(classOption);
                    classOption.setAttribute("classId",classData[c].cId);
                    classOption.innerHTML = optionClass[c];
                }


                var choooseClass = $("input.chooseClassButton");
                var chooseSchool = $("input.chooseSchool");
                console.log(chooseSchool);
                choooseClass.click(function () {
                    var theClassName = $("select.chooseClassSelect").val();
                    if (theClassName == "null"){
                        alert("请选择你要查看的班级！");
                    }else {
                        searchClass();
                        chooseSchool.show(400);

                        chooseSchool.click(function () {
                            console.log(videoData);
                            $("#main").remove();
                            var main = document.createElement("div");
                            main.id = "main";
                            $(".ibox-content")[0].appendChild(main);
                            var classTitle = document.createElement("h3");
                            classTitle.className = "mainTitle";
                            classTitle.innerHTML = "校园活动";
                            main.appendChild(classTitle);
                            showData(videoData);
                            chooseSchool.hide(400);

                            var addVideos = $(".addVideos>input");
                            $(addVideos[0]).show(400);
                            $(addVideos[1]).show(400);
                        });
                    }
                });



            },
            error: function (err) {
                console.log(err.status);
            }
        });
    }





    function showData(videoData) {
        console.log(videoData);
        var main = $("#main");

        for (var i=0;i<videoData.length;i++){
            var everyDiv = document.createElement("div");
            everyDiv.className = "every";
            everyDiv.setAttribute("data-mcid",videoData[i].mcid);
            var inputCheck = document.createElement("div");
            inputCheck.className = "inputCheck f_left";
            var theVideo = document.createElement("div");
            theVideo.className = "theVideo f_left";
            var theVideoA = document.createElement("a");
            theVideoA.innerHTML = "点击进入";
            theVideoA.className = "enterTheVideo";
            // theVideoA.href = "theVideo.html";
            var information = document.createElement("div");
            information.className = "information f_left";
            var addPeople = document.createElement("div");
            addPeople.className = "addPeople";
            var addPeopleSpan = document.createElement("span");
            addPeopleSpan.innerHTML = "发布人：";
            var addPeopleName = document.createElement("span");
            addPeopleName.innerHTML = videoData[i].mcpeople;
            var addTime = document.createElement("div");
            addTime.className = "addTime";
            var addTimeSpan = document.createElement("span");
            addTimeSpan.innerHTML = "上传时间：";
            var addTheTime = document.createElement("span");
            addTheTime.innerHTML = videoData[i].mctime;
            var videoDes = document.createElement("div");
            videoDes.className = "videoDes f_left";
            var videoDesP = document.createElement("p");
            videoDesP.innerHTML = videoData[i].mccontent;

            main[0].appendChild(everyDiv);
            everyDiv.appendChild(inputCheck);
            everyDiv.appendChild(theVideo);
            theVideo.appendChild(theVideoA);
            everyDiv.appendChild(information);
            information.appendChild(addPeople);
            addPeople.appendChild(addPeopleSpan);
            addPeople.appendChild(addPeopleName);
            information.appendChild(addTime);
            addTime.appendChild(addTimeSpan);
            addTime.appendChild(addTheTime);
            everyDiv.appendChild(videoDes);
            videoDes.appendChild(videoDesP);




            sessionStorage.setItem("upperman",videoData[i].mcpeople);

        }



        var enterTheVideo = $("a.enterTheVideo");
        enterTheVideo.click(function () {
            var mcid = $(this).parent().parent()[0].getAttribute("data-mcid");
            console.log(mcid);

            sessionStorage.setItem("theVideoMcid", mcid);

            window.location.href = "theVideo.html";


        });
    }




    function closeAddAlbumsBox() {
        gray.hide();
        addVideoBox.hide(400);
    }

    function releaseVideo() {
        var addVideoBox = $(".addVideoBox");
        if(addVideoBoxBollean){
            addVideoBox.click(function () {
                releaseVideoAjax();
                addVideoBoxBollean = false;
            });
        }



    }


    function releaseVideoAjax() {

        var addVideos = $(".addVideoBox");
        var textArea = addVideos.find(".everyInput").find("textarea.describ");
        var buttonsSure = addVideos.find(".buttonsSure").find("input.sure");


        //发布权限
        var usertype = sessionStorage.getItem("nub");  //0为老师，1为校长
        var teacherData = sessionStorage.getItem("teacherData");
        // var teacher = JSON.parse(teacherData);
        if(typeof(teacherData) ==='object'){
            var teacher = JSON.parse(teacherData);
        }else{
            var teacher = teacherData;
            //teacher = $.parseJSON(teacher);
        }
        console.log(teacher);
        
        // console.log(typeof(teacher));
        // console.log(teacher.tName);

        var mcPeople = "";
        var mcclassid = "";
        if (usertype == 1){
            mcPeople = "园长";
            mcclassid = "1";
        }else {
            mcPeople = teacher.tName;
            mcclassid = teacher.cId;
        }

        buttonsSure.click(function () {
            console.log("buttonSure");
            // console.log(teacher);
            // console.log(teacher.tName);


            if (textArea.val()==""||textArea.val()==null||textArea.val()==undefined) {
                alert("请在 活动描述 框里输入内容");
            }else{
                var values = {
                    "mcpeople": mcPeople,
                    "mctime": null,
                    "mccontent": textArea.val(),
                    "mcclassid": mcclassid,
                    "mcid": null
                };

                console.log(values);

                $.ajax({
                    type: "post",
                    url: "http://"+IPADDRESS+"/kindergarden/MovieContentAdd",
                    contentType:"application/x-www-form-urlencoded;charset=UTF-8",
                    data: "MCJson="+JSON.stringify(values),
                    beforeSend: function (xhr) {
                        xhr.withCredentials = true;
                        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                    },
                    success: function (classData) {
                        alert(classData);
                        window.location.reload();

                    },
                    error: function (err) {
                        console.log(err.status);
                        alert("出现错误："+err.status);
                    }
                });
            }


            

        });




    }
    
    function delVideo() {
        console.log("delVideo");
        var inputCheck = $("#main").find(".inputCheck");
        inputCheck.each(function () {
            var span = document.createElement("span");
            span.className = "spanCheck";
            this.appendChild(span);
        });

        var spanManagement = $("span.spanCheck");
        spanManagement.each(function () {
            this.setAttribute("checked","false");
            this.addEventListener("click",function () {
                if (this.getAttribute("checked") == "false"){
                    changeBackgroundImg(this);
                }else if (this.getAttribute("checked") == "true"){
                    removeBackgroundImg(this);
                }
            });
        });

        var buttonSure = $("input.buttonSure");
        var buttonCancle = $("input.buttonCancle");

        buttonSure.show(400);
        buttonCancle.show(400);
        buttonDel.parent().append("<span class='theAttentionP' style='margin: 13px'>请选择需要删除的活动</span>");

        setTimeout(function () {
            buttonDel.hide(400);
        },500);

        buttonSure.click(function () {
            delVideoAjax();
        });

        buttonCancle.click(function () {
            buttonSure.hide(400);
            buttonCancle.hide(400);
            setTimeout(function () {
                buttonDel.show(400);
            },500);

            $(".theAttentionP").remove();
            $("span.spanCheck").remove();
        });


        function changeBackgroundImg(e) {
            e.style.background = "url(img/checked.png)";
            e.setAttribute("checked","true");
        }
        function removeBackgroundImg(e) {
            e.style.background = "white";
            e.setAttribute("checked","false");
        }

    }


    function delVideoAjax() {
        var theCheck = $("#main").find(".every").find("span.spanCheck");
        var delVideo = "";
        theCheck.each(function () {
            var check = this.getAttribute("checked");

            if (check == "true"){
                delVideo = delVideo + $(this).parent().parent()[0].getAttribute("data-mcid") + ",";
            }
        });

        console.log(delVideo);

        var message = confirm("确定要删除吗？");
        if(message){
            $.ajax({
                type: "post",
                url: "http://"+IPADDRESS+"/kindergarden/MovieContentDelete",
                data: "mcJson="+delVideo,
                beforeSend: function (xhr) {
                    xhr.withCredentials = true;
                    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                },
                success: function () {
                    console.log("success");
                    alert("删除成功！");
                    window.location.reload();

                },
                error: function (err) {
                    console.log(err.status);
                    alert("出现错误："+err.status);
                }
            });
        }

        
    }
    

    //查询班级视频
    function searchClass() {
        var addVideos = $(".addVideos>input");
        addVideos.hide(400);


        var theClass = $("select.chooseClassSelect");
        var theClassName = theClass.val();

        $.ajax({
            type: "post",
            url: "http://"+IPADDRESS+"/kindergarden/MCClassApp",
            contentType:"application/x-www-form-urlencoded;charset=UTF-8",
            data: "mcJson="+theClassName+"&pageNum="+1,
            beforeSend: function (xhr) {
                xhr.withCredentials = true;
                xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                var adding = document.createElement("p");
                adding.className = "adding";
                adding.innerHTML = "数据加载中。。。";
                $(".ibox-content")[0].appendChild(adding);
            },
            success: function (classdata) {
                $(".adding").remove();
                var classData = JSON.parse(classdata).tlist;
                console.log(classData);
                $("#main").remove();
                var main = document.createElement("div");
                main.id = "main";
                $(".ibox-content")[0].appendChild(main);
                var classTitle = document.createElement("h3");
                classTitle.className = "mainTitle";
                classTitle.innerHTML = theClassName+"的活动";
                main.appendChild(classTitle);
                showData(classData);
            },
            error: function (err) {
                console.log(err.status);
                alert("出现错误："+err.status);
            }
        });



    }

});