/**
 * Created by Sunshine on 2017/5/15.
 */
$(document).ready(function () {

    var theImgData = sessionStorage.getItem("theImgData");
    var imgData = JSON.parse(JSON.parse(theImgData).imgData);

    console.log(imgData);


    // var mainPhoto = $(".mainPhoto");
    // for (var i=0;i<imgs.length;i++){
    //     var divImg = document.createElement("div");
    //     divImg.className = "everyImg";
    //     var img = document.createElement("img");
    //     img.src = imgs[i];
    //     // var oI = document.createElement("i");
    //     // oI.className = "manageImg";
    //
    //     mainPhoto[0].appendChild(divImg);
    //     // divImg.appendChild(oI);
    //     divImg.appendChild(img);
    // }


    //上传图片
    var photoAdd = $("input.photoAdd");
    var uploadPhoto = $(".uploadPhoto");
    var gray = $(".gray");
    photoAdd.click(function () {
        var oIframe = document.createElement("iframe");
        oIframe.className = "oIframe";
        oIframe.width = "100%";
        oIframe.height = "100%";
        oIframe.src = "albumUpload.html";
        uploadPhoto[0].appendChild(oIframe);
        gray.show();
        uploadPhoto.show(200);
        // window.location.href = "albumUpload.html";
        
        var close = uploadPhoto.find(".close");
        close.click(function () {
            console.log("close");
            gray.hide();
            uploadPhoto.hide(200);
            $(".oIframe").remove();
        })
        
    });



    //批量管理
    var management = $("input.photoManage");
    var photoDel = $("input.photoDel");
    var photoCancle = $("input.photoCancle");

    management.click(function () {
        photoDel.show(200);
        photoCancle.show(200);

        photoCancle.click(function () {
            photoCancle.hide(200);
            photoDel.hide(200);
        });

        var divImgs = $(".mainPhoto").find(".everyImg");
        for (var j=0;j<divImgs.length;j++){
            var oI = document.createElement("i");
            oI.className = "manageImg";
            divImgs[j].appendChild(oI);
        }

        var iManagement = $("i.manageImg");
        var iIndex = 0;
        iManagement.each(function () {
            this.setAttribute("data-i",iIndex);
            iIndex++;
        });
        console.log(iManagement);
        iManagement.each(function () {
            this.setAttribute("checked",false);
            this.addEventListener("click",function () {
                if (this.getAttribute("checked") == "false"){
                    changeBackgroundImg(this);
                }else if (this.getAttribute("checked") == "true"){
                    removeBackgroundImg(this);
                }
            });
        });
        
        function changeBackgroundImg(e) {
            e.style.background = "url(img/checked.png)";
            e.setAttribute("checked",true);
        }
        function removeBackgroundImg(e) {
            e.style.background = "white";
            e.setAttribute("checked",false);
        }
    });

});