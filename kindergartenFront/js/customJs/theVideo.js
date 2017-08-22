/**
 * Created by Sunshine on 2017/5/27.
 */
$(document).ready(function () {

    var theVideoMcid = sessionStorage.getItem("theVideoMcid");
    var pageNum = 1;

    $.ajax({
        type: "post",
        url: "http://119.29.53.178:8080/kindergarden/MovieShowWeb",
        data: "MCid="+theVideoMcid+"&pageNum="+pageNum,
        beforeSend: function (xhr) {
            xhr.withCredentials = true;
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        },
        success: function (data) {
            var videoData = JSON.parse(data);
            console.log(videoData);






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
                            // delVideo = delVideo + $(theI[k]).parent().find("video")[0].getAttribute("data-pid") + ",";
                        }
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


        },
        error: function (err) {
            console.log(err.status);
        }
    });










});