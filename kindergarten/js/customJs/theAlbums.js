/**
 * Created by Sunshine on 2017/5/15.
 */
$(document).ready(function () {

    $(".fakeloader").fakeLoader({
        timeToHide:5000,
        bgColor:"#1ab394",
        spinner:"spinner2",
        zIndex:9999
    });

    var booleanScroll = false;
    var ajaxAddNum = 1;
    var screnWidth = window.screen.width;
    var screnHeight = window.screen.height;
    var totalPage;
    if(screnWidth <= 800){
        var showPhotoHeight = screnHeight-0.07*screnHeight;
        $(".ibox").height(screnHeight - 40);
        $(".showPhoto").css("height","auto");
    }

    var theImgData = sessionStorage.getItem("theImgData");
    var imgRow = JSON.parse(theImgData);
    var gray = $(".gray");
    var theIndex = imgRow.picid;
    var pageNum = imgRow.pageNum || 1;
    var picname = imgRow.picname;
    var picmdescribe = imgRow.picmdescribe;

    $(".picname").html(picname);
    $(".picmdescribe").html(picmdescribe);

    photoAjax(1);



    function photoAjax(thePageNum) {
        ajaxAddNum++;
        $.ajax({
            type: "post",
            url: "http://"+IPADDRESS+"/kindergarden/PictureShowWeb?pid="+theIndex+"&pageNum="+thePageNum,
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
                var imgSrcs = [];

                var imgData = JSON.parse(theImgData);
                var imgList = imgData.tlist;
                totalPage = imgData.totalPage;
                if(ajaxAddNum<=totalPage){
                    pageNum++;
                }else {
                    $(".imgloading").find("p").text("没有更多了！！！");
                }
                for (var i=0;i<imgList.length;i++){
                    var mainPhoto = $(".mainPhoto");
                    // var imgListAdress = JSON.parse(imgList[i].xcAdress);
                    // console.log(imgList[i].xcAdress);
                    var imgListAdress = imgList[i].xcAdress;
                    imgSrcs[i] = imgList[i].xcAdress;
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


                preloadimages(imgSrcs);


            },
            error: function (err) {
                console.log(err.status);
                alert("出现错误："+err.status);
            }
        });
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
                    url: "http://"+IPADDRESS+"/kindergarden/PictureDelete",
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
    function scrollPhoto() {
        $(window).on('scroll',function () {
            // booleanScroll = true;

            console.log("scroll",checkScrollSlide(),booleanScroll);
            if (checkScrollSlide()){
                if(booleanScroll){
                    console.log(ajaxAddNum,pageNum);
                    if(ajaxAddNum == pageNum){
                        console.log("-------------------------------------------------------------------ajaxphoto()");
                        photoAjax(pageNum);
                    }
                    booleanScroll = false;

                    if(ajaxAddNum<=totalPage){
                        $(".imgloading").find("p").text("图片加载中。。。");
                    }else {
                        $(".imgloading").find("p").text("没有更多了！！！");
                    }
                }
            }
        });
    }




    function preloadimages(arr){
        var newimages=[], loadedimages=0;
        var postaction=function(){
            console.log("img load success");
            $(".fakeloader").hide();
            $(".imgloading").find("p").text("下滑加载更多。。。");
            booleanScroll = true;
            scrollPhoto();
        }; //此处增加了一个postaction函数
        var arrs=(typeof arr!="object")? [arr] : arr;
        function imageloadpost(){
            loadedimages++;
            if (loadedimages==arrs.length){
                postaction(newimages) //加载完成用我们调用postaction函数并将newimages数组做为参数传递进去
            }
        }
        for (var i=0; i<arr.length; i++){
            newimages[i]=new Image();
            newimages[i].src=arr[i];
            newimages[i].onload=function(){
                imageloadpost();
            };
            newimages[i].onerror=function(){
                imageloadpost();
            }
        }
        return { //此处返回一个空白对象的done方法
            done:function(f){
                postaction=f || postaction
            }
        }
    }


    function checkScrollSlide() {
         var lastDivImg = $(".mainPhoto").find(".everyImg").last();
         var lastImgTop = lastDivImg.offset().top - $(window).height();
         var scrollTop = $(window).scrollTop();
         var boolean;
         (lastImgTop<scrollTop)? boolean = true: boolean=false;

         return boolean;
    }




});