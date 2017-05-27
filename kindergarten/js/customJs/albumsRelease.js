/**
 * Created by Sunshine on 2017/5/15.
 */
$(window).on("load",function () {
    var body = $("body");
    var addAlbumsBox = $(".addAlbumsBox");
    var gray = $(".gray");

    var addPhotos = $("input.buttonAdd");
    var close = $(".close");
    var cancle = $("input.cancle");

    addPhotos.click(function () {
        gray.show();
        // body.css("overflow","hidden");
        addAlbumsBox.show(400);
    });
    close.click(function () {
        closeAddAlbumsBox();
    });
    cancle.click(function () {
        closeAddAlbumsBox();
    });


    function closeAddAlbumsBox() {
        gray.hide();
        // body.css("overflow","scroll");
        addAlbumsBox.hide(400);
    }





    var sure = $("input.sure");

    sure.click(function () {
        addPhotoAjax();
    });


    var delPhoto = $("input.buttonDel");

    delPhoto.click(function () {
        $("input.photoCancle").show(200);
        delPhotos();
    })



});

function delPhotos() {
    var divImgs = $("#main").find(".pic");
    console.log(divImgs);
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
        this.addEventListener("click",function () {
            var thisImg = $(this).parent().find("img")[0];
            var delId = thisImg.getAttribute("data-id");

            var message = confirm("确定要删除此相册吗？");
            if(message){
                $.ajax({
                    type: "post",
                    url: "http://119.29.53.178:8080/kindergarden/PictureContentDlete",
                    data: "PidJson="+delId,
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
    });


    var cancle = $("input.photoCancle");
    cancle.click(function () {
        $("i.manageImg").remove();
        $(this).hide(200);
    })
}

function addPhotoAjax() {
    var inputs = $(".inputs");
    var input = inputs.find("input");
    var textarea = inputs.find("textarea");
    console.log(textarea[0]);
    var value = {
        picid: null,
        picname: input.val(),
        picmdescribe: textarea.val(),
        picface: null
    };

    console.log(value);

    $.ajax({
        type: "post",
        url: "http://119.29.53.178:8080/kindergarden/PicturecontentAdd",
        data: "PictureContentJson="+JSON.stringify(value),
        beforeSend: function (xhr) {
            xhr.withCredentials = true;
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        },
        success: function () {
            console.log("success");
            alert("相册创建成功，请进入相册添加照片");
            window.location.reload();
        },
        error: function (err) {
            console.log(err.status);
        }
    });


}


//
// function previewImage(file,imgNum) {
//     var MAXWIDTH  = 200;
//     var MAXHEIGHT = 200;
//     var div = document.getElementById('preview'+imgNum);
//     if (file.files && file.files[0]){
//         div.innerHTML ='<img id=imghead'+imgNum+'>';
//         var img = document.getElementById('imghead'+imgNum+'');
//         img.onload = function(){
//             var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
//             img.width  =  rect.width;
//             img.height =  rect.height;
//             img.style.marginTop = rect.top+'px';
//         };
//         var reader = new FileReader();
//         reader.onload = function(evt){img.src = evt.target.result;};
//         reader.readAsDataURL(file.files[0]);
//     }else {
//         var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
//         file.select();
//         var src = document.selection.createRange().text;
//         div.innerHTML = '<img id=imghead'+imgNum+'>';
//         var imgs = document.getElementById('imghead2');
//         imgs.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
//         var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, imgs.offsetWidth, imgs.offsetHeight);
//         status =('rect:'+rect.top+','+rect.left+','+rect.width+','+rect.height);
//         div.innerHTML = "<div id=divhead"+imgNum+" style='width:"+rect.width+"px;height:"+rect.height+"px;margin-top:"+rect.top+"px;"+sFilter+src+"\"'></div>";
//     }
// }
// function clacImgZoomParam( maxWidth, maxHeight, width, height ){
//     var param = {top:0, left:0, width:width, height:height};
//     if( width>maxWidth || height>maxHeight )
//     {
//         var rateWidth = width / maxWidth;
//         var rateHeight = height / maxHeight;
//
//         if( rateWidth > rateHeight )
//         {
//             param.width =  maxWidth;
//             param.height = Math.round(height / rateWidth);
//         }else
//         {
//             param.width = Math.round(width / rateHeight);
//             param.height = maxHeight;
//         }
//     }
//     param.left = Math.round((maxWidth - param.width) / 2);
//     param.top = Math.round((maxHeight - param.height) / 2);
//     return param;
// }
