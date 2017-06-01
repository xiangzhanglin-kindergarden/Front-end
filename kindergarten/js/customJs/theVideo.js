/**
 * Created by Sunshine on 2017/5/27.
 */
$(document).ready(function () {
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




});