/**
 * Created by Sunshine on 2017/5/15.
 */
$(document).ready(function () {
    var theImgData = sessionStorage.getItem("theImgData");
    var imgRow = JSON.parse(theImgData);
    var theIndex = imgRow.picid;
    var pageNum = imgRow.pageNum;
    var picname = imgRow.picname;
    var picmdescribe = imgRow.picmdescribe;

    $(".picname").html(picname);
    $(".picmdescribe").html(picmdescribe);

    $.ajax({
        type: "post",
        url: "http://172.20.2.164:8080/kindergarden/PictureShowWeb?pid="+theIndex+"&pageNum="+pageNum,
        data:theIndex,
        contentType:"application/x-www-form-urlencoded;charset=UTF-8",
        beforeSend: function (xhr) {
            xhr.withCredentials = true;
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

            var oDiv = document.createElement("div");
            oDiv.className = "skip";
            var oP = document.createElement("p");
            oP.innerHTML = "正在打开相册，请稍等。。。";
            $(".ibox")[0].appendChild(oDiv);
            oDiv.appendChild(oP);
            $(".gray").show();
        },
        success: function (theImgData) {
            var gray = $(".gray");

            $(".skip").hide();
            gray.hide();

            var imgData = JSON.parse(theImgData);

            console.log(imgData);
            var imgList = imgData.tlist;
            for (var i=0;i<imgList.length;i++){
                var mainPhoto = $(".mainPhoto");
                // var imgListAdress = JSON.parse(imgList[i].xcAdress);
                // console.log(imgList[i].xcAdress);
                var imgListAdress = imgList[i].xcAdress;
                // var imgListAdreeUrl = imgListAdress.url;
                var imgListAdreeUrl = imgListAdress;
                var divImg = document.createElement("div");
                divImg.className = "everyImg";
                var img = document.createElement("img");
                img.src = imgListAdreeUrl;
                img.setAttribute("data-pid", imgList[i].xcId);
                mainPhoto[0].appendChild(divImg);
                divImg.appendChild(img);
            }


            //上传图片
            var photoAdd = $("input.photoAdd");
            var uploadPhoto = $(".uploadPhoto");
            var uploadMultipleBoolean = false;
            if($("img").length != 0){
                uploadMultipleBoolean = true;
            }

            photoAdd.click(function () {
                var oIframe = document.createElement("iframe");
                oIframe.className = "oIframe";
                oIframe.width = "100%";
                oIframe.height = "100%";
                oIframe.src = "albumUpload.html?uploadMultipleBoolean="+uploadMultipleBoolean;
                uploadPhoto[0].appendChild(oIframe);
                gray.show();
                uploadPhoto.show(200);

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
                photoDel.show(400);
                photoCancle.show(400);
                setTimeout(function () {
                    management.hide(400);
                },500);

                console.log(photoCancle[0]);
                photoCancle.parent().append("<span class='theAttentionP' style='margin: 10px'>请选择需要删除的图片</span>");

                photoCancle.click(function () {
                    photoCancle.hide(400);
                    photoDel.hide(400);
                    setTimeout(function () {
                        management.show(400);
                    },500);

                    $(".theAttentionP").remove();
                    $("i.manageImg").remove();
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
                    this.setAttribute("checked","false");
                    this.addEventListener("click",function () {
                        if (this.getAttribute("checked") == "false"){
                            changeBackgroundImg(this);
                        }else if (this.getAttribute("checked") == "true"){
                            removeBackgroundImg(this);
                        }
                    });
                });


                //删除
                photoDel.click(function () {
                    console.log("del");
                    var theI = $(".mainPhoto").find(".everyImg").find("i.manageImg");
                    var delPhoto = "";
                    for(var k=0;k<theI.length;k++){
                        var checked = theI[k].getAttribute("checked");
                        console.log(checked);
                        if (checked == "true"){
                            delPhoto = delPhoto + $(theI[k]).parent().find("img")[0].getAttribute("data-pid") + ",";
                        }
                    }

                    var message = confirm("确定要删除吗？");
                    if(message){
                        $.ajax({
                            type: "post",
                            url: "http://172.20.2.164:8080/kindergarden/PictureDelete",
                            data: "Xidjson="+delPhoto,
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



            //图片详情
            showPhoto();
            
        },
        error: function (err) {
            console.log(err.status);
            alert("出现错误："+err.status);
        }
    });







});