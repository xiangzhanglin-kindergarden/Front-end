/**
 * Created by Sunshine on 2017/5/27.
 */
$(document).ready(function () {
    var body = $("body");
    var addVideoBox = $(".addVideoBox");
    var gray = $(".gray");

    var addVideos = $("input.buttonAdd");
    var close = $(".close");
    var cancle = $("input.cancle");
    var videoData;

    addVideos.click(function () {
        gray.show();
        addVideoBox.show(400);
        releaseVide();
    });
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
    $.ajax({
        type: "post",
        url: "http://119.29.53.178:8080/kindergarden/MCShowAdmini",
        contentType:"application/x-www-form-urlencoded;charset=UTF-8",
        data: "pageNum="+pageNum,
        beforeSend: function (xhr) {
            xhr.withCredentials = true;
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        },
        success: function (data) {
            videoData = JSON.parse(data).tlist;

            showData(videoData);


            var enterTheVideo = $("a.enterTheVideo");
            enterTheVideo.click(function () {
                var mcid = $(this).parent().parent()[0].getAttribute("data-mcid");
                console.log(mcid);
                
                var theVideoMcid = mcid;
                
                sessionStorage.setItem("theVideoMcid", theVideoMcid);

                window.location.href = "theVideo.html";
                

            });



        },
        error: function (err) {
            console.log(err.status);
        }
    });











    var optionClass = [];

    //加载班级
    $.ajax({
        type: "post",
        url: "http://119.29.53.178:8080/kindergarden/ClassShow",
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
            var classData = JSON.parse(classdata);
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




    function showData(videoData) {
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

        }
    }




    function closeAddAlbumsBox() {
        gray.hide();
        addVideoBox.hide(400);
    }

    function releaseVide() {
        console.log("releaseVide");
        var addVideoBox = $(".addVideoBox");

        addVideoBox.click(function () {
            releaseVideoAjax();
        });


    }


    function releaseVideoAjax() {
        console.log("releaseVideoAjax");

        var addVideos = $(".addVideoBox");
        var textArea = addVideos.find(".everyInput").find("textarea.describ");
        var buttonsSure = addVideos.find(".buttonsSure").find("input.sure");


        buttonsSure.click(function () {
            var mcPeople = "园长";
            var mcclassid = "1";



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
                url: "http://119.29.53.178:8080/kindergarden/MovieContentAdd",
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
                }
            });

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
                url: "http://119.29.53.178:8080/kindergarden/MovieContentDelete",
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
            url: "http://119.29.53.178:8080/kindergarden/MCClassApp",
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
            }
        });



    }

});