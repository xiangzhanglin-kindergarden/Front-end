/**
 * Created by Sunshine on 2017/5/8.
 */
$(window).ready(function () {
    var main = $("#main");

    //页码
    var pageNum = 1;

    //获取相册
    $.ajax({
        type: "post",
        url: "http://119.29.53.178:8080/kindergarden/PicturecontentShowWe?pageNum="+pageNum,
        // url: "js/customJs/imgData.json",
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
            $(".adding")[0].remove();

            var imgData = JSON.parse(data);
            console.log(imgData);
            for(var i=0;i<imgData.length;i++){
                var theImgFace = imgData[i].picface;
                var imgFace;
                if (theImgFace == undefined){
                    imgFace = "img/albumFace.png";
                }else {
                    imgFace = JSON.parse(theImgFace).url;
                }
                console.log(imgFace);

                var box = document.createElement("div");
                box.className = "box";
                var pic = document.createElement("div");
                pic.className = "pic";
                var theImg = document.createElement("img");
                // theImg.src = "img/albumFace.png";//默认封面
                theImg.setAttribute("data-id",imgData[i].picid);//设置ID
                theImg.src = imgFace;
                theImg.setAttribute("data-page",pageNum);
                theImg.setAttribute("data-index",i);
                var name = document.createElement("p");
                name.innerHTML = imgData[i].picname;
                var time = document.createElement("p");
                time.innerHTML = imgData[i].picdate;
                time.className = "theTime";
                var event = document.createElement("p");
                event.className = "theDescribe";
                event.innerHTML = imgData[i].picmdescribe;

                main[0].appendChild(box);
                box.appendChild(pic);
                pic.appendChild(theImg);
                pic.appendChild(name);
                pic.appendChild(time);
                pic.appendChild(event);
            }

            //测试
            // for(var i=0;i<data.length;i++){
            //     var everyUrl;
            //     if (data[i].url.split(",") != -1){
            //         everyUrl = data[i].url.split(",");
            //     }else {
            //         everyUrl = data[i].url;
            //     }
            //     var box = document.createElement("div");
            //     box.className = "box";
            //     var pic = document.createElement("div");
            //     pic.className = "pic";
            //     var theImg = document.createElement("img");
            //     theImg.src = everyUrl[0];
            //     theImg.setAttribute("data-id",data[i].id);//设置ID
            //     var time = document.createElement("p");
            //     time.innerHTML = data[i].time;
            //     var event = document.createElement("p");
            //     event.innerHTML = data[i].event;
            //     main[0].appendChild(box);
            //     box.appendChild(pic);
            //     pic.appendChild(theImg);
            //     pic.appendChild(time);
            //     pic.appendChild(event);
            // }
            //测试end

            var imgs = $("img");
            imgs.load(function () {
                afterSeccess(imgData);
            });

        },
        error: function (err) {
            console.log("出现错误："+err.status);
        }
    })

});


function afterSeccess(data) {
    $(".adding").remove();
    var main = $("#main");
    main.show();
    waterFall();

    $(window).on('scroll',function () {
        if (checkScrollSlide()){

        }
    });


    //跳转至相册详情页
    var photos = main.find(".pic").find("img");
    // console.log(photos);
    photos.each(function () {
        var nowPhoto = this;
        nowPhoto.onclick = function () {
            // var theIndex = this.getAttribute("data-id");//获取的D
            var index = this.getAttribute("data-index");

            if (window.sessionStorage) {
                var imgData = data[index];
                imgData.pageNum = 1;

                console.log(imgData);
                var theImgData = JSON.stringify(imgData);
                sessionStorage.setItem("theImgData", theImgData);

                window.location.href = "theAlbums.html";

            }else {
                alert("你的浏览器不支持sessionStorage")
            }
            // $.ajax({
            //     type: "post",
            //     // url: "js/customJs/imgData.json",
            //     url: "http://119.29.53.178:8080/kindergarden/PictureShowWeb?pid="+theIndex+"&pageNum="+1,
            //     // dataType: "json",
            //     data:theIndex,
            //     contentType:"application/x-www-form-urlencoded;charset=UTF-8",
            //     beforeSend: function (xhr) {
            //         xhr.withCredentials = true;
            //         xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            //
            //         var oDiv = document.createElement("div");
            //         oDiv.className = "skip";
            //         var oP = document.createElement("p");
            //         oP.innerHTML = "正在打开相册，请稍等。。。";
            //         $("#main")[0].appendChild(oDiv);
            //         oDiv.appendChild(oP);
            //         $(".gray").show();
            //     },
            //     success: function (data) {
            //         console.log(theIndex);
            //
            //         if (window.sessionStorage) {
            //             var imgData = {
            //                 picId: theIndex,
            //                 imgData: data
            //             };
            //             console.log(imgData);
            //             var theImgData = JSON.stringify(imgData);
            //             sessionStorage.setItem("theImgData", theImgData);
            //        
            //             window.location.href = "theAlbums.html";
            //        
            //         }else {
            //             alert("你的浏览器不支持sessionStorage")
            //         }
            //
            //     },
            //     error: function (err) {
            //         console.log(err.status);
            //     }
            // });


        }
    })

}

function waterFall() {
    var main = $("#main");
    var boxs = main.find(".box");
    var w = boxs.eq(0).outerWidth();
    var iboxW = $(".ibox").width();

    var clos = Math.floor(iboxW/w);

    main.width(w*clos).css('margin','0 auto');
    var lastBox = boxs.last();
    var lastHeight = lastBox.offset().top + Math.floor(lastBox.outerHeight());
    main.height(lastHeight);

    var hArr = [];
    boxs.each(function (index,value) {
        var h = boxs.eq(index).outerHeight();
        if (index<clos){
            hArr[index] = h;
        }else {
            var minH = Math.min.apply(null,hArr);
            var minHIndex = $.inArray(minH,hArr);
            $(value).css({
                    'position': 'absolute',
                    'top': minH + 'px',
                    'left': minHIndex*w + 'px'
            });
            hArr[minHIndex] += boxs.eq(index).outerHeight();
        }
    });

}


function checkScrollSlide() {
    var lastBox = $("#main").find(".box").last();
    var lastBoxDis = lastBox.offset().top + Math.floor(lastBox.outerHeight()/2);
    var scrollTop = $(window).scrollTop();
    var documentH = $(window).height();
    var theH = scrollTop+documentH;
    var boolean;
    (lastBoxDis<theH)? boolean = true: boolean=false;

    return boolean;
}
