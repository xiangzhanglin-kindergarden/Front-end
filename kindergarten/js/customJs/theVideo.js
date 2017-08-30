/**
 * Created by Sunshine on 2017/5/27.
 */
$(document).ready(function () {

    var usertype = sessionStorage.getItem("nub");  //0为老师，1为校长
    var theVideoMcid = sessionStorage.getItem("theVideoMcid");
    var theVideoMname = sessionStorage.getItem("upperman");
    var teacherData = sessionStorage.getItem("teacherData");


    if(typeof(teacherData)=='object'){
        var teacher = JSON.parse(teacherData);
    }else{
        // console.log(typeof(teacherData));
        var teacher = teacherData;
        // teacher = $.parseJSON(teacher);
    }
    console.log(teacher.tName);
    console.log(teacher);

    var pageNum = 1;
    if (theVideoMname=="园长") {
        if (usertype==0) {
            $(".videoAdd").css({"visibility":"hidden"});
            $(".videoManage").css({"visibility":"hidden"});
        };
    };
    

    $.ajax({
        type: "post",
        url: "http://localhost/kindergarden/MovieShowWeb",
        data: "MCid="+theVideoMcid+"&pageNum="+pageNum,
        beforeSend: function (xhr) {
            xhr.withCredentials = true;
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        },
        success: function (data) {
            // var videoData = JSON.parse(data);
            var videoData;
            if(typeof (data) == 'object'){
                // console.log("对象");
                videoData = data;
            }else {
                // console.log("字符串");
                // videoData = JSON.parse(data);
                var str = JSON.stringify(data);  
                var str1 = JSON.parse(str);  
                videoData = str1;
                // console.log(typeof(str));
                // console.log(typeof(str1));
                // console.log(typeof(videoData));
                videoData = $.parseJSON(videoData);
                console.log(typeof(videoData));
                
            }
            // console.log(data);  
            // console.log("------------------------");
            // console.log(videoData);
            if (data=="显示失败") {
                
            }else{
                var videoList = videoData.tlist;
                console.log(videoList);
                if (videoList!=null || videoList!="" || videoList!="undefined") {
                    for(var i=0;i<videoList.length;i++){
                        var mainVideo = $(".mainVideo");
                        // var videoListAdress = JSON.parse(videoList[i].mvAdress);
                        var videoListAdress = videoList[i].mvAdress;
                        // var videoListAdreeUrl = videoListAdress.url;
                        var videoListAdreeUrl = videoListAdress;
                        var divVideo = document.createElement("div");
                        divVideo.className = "everyVideo";
                        var video = document.createElement("video");
                        video.src = videoListAdreeUrl;
                        video.setAttribute("data-mcid", videoList[i].mvId);
                        mainVideo[0].appendChild(divVideo);
                        divVideo.appendChild(video);
                    }
                };
            }

            

            




            var gray = $(".gray");

            //视频上传
            var videoAdd = $("input.videoAdd");
            var uploadVideo = $(".uploadVideo");

            videoAdd.click(function () {
                var oIframe = document.createElement("iframe");
                oIframe.className = "oIframe";
                oIframe.width = "100%";
                oIframe.height = "100%";
                oIframe.src = "videoUpload.html";
                uploadVideo[0].appendChild(oIframe);
                gray.show();
                uploadVideo.show(200);

                var close = uploadVideo.find(".close");
                close.click(function () {
                    console.log("close");
                    gray.hide();
                    uploadVideo.hide(200);
                    $(".oIframe").remove();
                })

            });



            //批量管理
            var videoManage = $("input.videoManage");
            var videoDel = $("input.videoDel");
            var videoCancle = $("input.videoCancle");
            videoManage.click(function () {
                videoDel.show(400);
                videoCancle.show(400);
                videoDel.parent().append("<span class='theAttentionP' style='margin: 13px'>请选择需要删除的视频</span>");
                setTimeout(function () {
                    videoManage.hide(400);
                },500);





                //cancle
                videoCancle.click(function () {
                    videoDel.hide(400);
                    videoCancle.hide(400);
                    setTimeout(function () {
                        videoManage.show(400);
                    },500);

                    $(".theAttentionP").remove();
                    $("i.manageVideo").remove();
                });



                var divVideos = $(".mainVideo").find(".everyVideo");
                for (var j=0;j<divVideos.length;j++){
                    var oI = document.createElement("i");
                    oI.className = "manageVideo";
                    divVideos[j].appendChild(oI);
                }

                var iManagement = $("i.manageVideo");
                var iIndex = 0;
                iManagement.each(function () {
                    this.setAttribute("data-i",iIndex);
                    iIndex++;
                });
                console.log(iManagement);
                iManagement.each(function () {
                    this.setAttribute("checked","false");
                    this.addEventListener("click",function () {
                        if (this.getAttribute("checked") == "false"){
                            changeBackgroundImg(this);
                        }else if (this.getAttribute("checked") == "true"){
                            removeBackgroundImg(this);
                        }
                    });
                });


                //delete
                videoDel.click(function () {
                    var theI = $(".mainVideo").find(".everyVideo").find("i.manageVideo");
                    var delVideo = "";
                    for(var k=0;k<theI.length;k++){
                        var checked = theI[k].getAttribute("checked");
                        console.log(checked);
                        if (checked == "true"){
                            delVideo = delVideo + $(theI[k]).parent().find("video")[0].getAttribute("data-mcid") + ",";
                        }
                    }

                    var message = confirm("确定要删除吗？");
                    if(message){
                        $.ajax({
                            type: "post",
                            url: "http://localhost/kindergarden/MovieDelete",
                            data: "mvid="+delVideo,
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
                    
                });



                function changeBackgroundImg(e) {
                    e.style.background = "url(img/checked.png)";
                    e.setAttribute("checked","true");
                }
                function removeBackgroundImg(e) {
                    e.style.background = "white";
                    e.setAttribute("checked","false");
                }

            });

            showVideo();

        },
        error: function (err) {
            console.log(err.status);
        }
    });










});