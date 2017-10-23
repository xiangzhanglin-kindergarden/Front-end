/**
 * Created by Sunshine on 2017/5/8.
 */

window.onresize=function(){
    location.reload();
};

$(window).ready(function () {
    var main = $("#main");
    var imgData;

    //页码
    var pageNum = 1;

    //班级
    var optionClass = [];

    //权限
    var url = "";
    var usertype = sessionStorage.getItem("nub");  //0为老师，1为校长
    var teacherData = sessionStorage.getItem("teacherData");

    //园长
    if (usertype == 1){
        url = "http://"+IPADDRESS+"/kindergarden/PCtShowteacher?pageNum=" + pageNum + "&cid="+1;
        loadClass();
    }else {
        var teacher = JSON.parse(teacherData);

        if(usertype == 2){
            teacher = teacher.Object;
            console.log(teacher);
        }
        console.log(teacher);
        url = "http://"+IPADDRESS+"/kindergarden/PCtShowteacher?pageNum="+pageNum + "&cid=" + teacher.cId;

        var classAlbumsChoose = $(".classAlbumsChoose");
        $(".chooseClass").remove();
        classAlbumsChoose.show();

        var theTitle = $("h3.theTitle");
        theTitle.html("班级图鉴");

        var schoolChoose = classAlbumsChoose.find("input.schoolChoose");
        schoolChoose.click(function () {
            classAlbumsChooseFun(this.value);
        });
    }


    //获取相册
    $.ajax({
        type: "post",
        url: url,
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
            $(".adding").remove();

            imgData = JSON.parse(data);
            console.log(imgData);

            showData(imgData);



        },
        error: function (err) {
            console.log("出现错误："+err.status);
            alert("出现错误："+err.status);
        }
    });



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
                            $("#main").remove();
                            var main = document.createElement("div");
                            main.id = "main";
                            $(".ibox-content")[0].appendChild(main);
                            var classTitle = document.createElement("h3");
                            classTitle.className = "mainTitle";
                            classTitle.innerHTML = "校园图鉴";
                            main.appendChild(classTitle);
                            showData(imgData);
                            chooseSchool.hide(400);

                            var addAlbums = $(".addAlbums>input");
                            $(addAlbums[0]).show(400);
                            $(addAlbums[1]).show(400);
                        });
                    }
                });



            },
            error: function (err) {
                console.log(err.status);
            }
        });
    }



    function classAlbumsChooseFun(name) {
        var backClassAlbums = $(".classAlbumsChoose").find("input.schoolChoose");

        var addAlbumsInput = $(".addAlbums").find("input");
        if (name == "校园图鉴"){
            $.ajax({
                type: "post",
                url: "http://"+IPADDRESS+"/kindergarden/PCtShowteacher?cid="+1+"&pageNum="+1,
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

                    backClassAlbums[0].value = "返回本班相册";
                    var imgData = JSON.parse(data);

                    var main = document.createElement("div");
                    main.id = "main";
                    $(".ibox-content")[0].appendChild(main);
                    var theTitle = document.createElement("h3");
                    theTitle.innerHTML = "校园图鉴";
                    main.appendChild(theTitle);

                    $(addAlbumsInput[0]).hide(400);
                    $(addAlbumsInput[1]).hide(400);

                    showData(imgData);



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
            theTitle.innerHTML = "班级图鉴";
            main.appendChild(theTitle);
            backClassAlbums[0].value = "校园图鉴";

            $(addAlbumsInput[0]).show(400);
            $(addAlbumsInput[1]).show(400);
            showData(imgData);
        }


    }




});


function afterSeccess(data) {
    $(".adding").remove();
    var main = $("#main");
    main.show();
    waterFall();

    // $(window).on('scroll',function () {
    //     if (checkScrollSlide()){
    //
    //     }
    // });


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


        }
    })

}



function searchClass() {
    var addAlbums = $(".addAlbums>input");
    addAlbums.hide(400);


    var theClass = $("select.chooseClassSelect");
    var theClassName = theClass.val();

    $.ajax({
        type: "post",
        url: "http://"+IPADDRESS+"/kindergarden/PCShowApp",
        contentType:"application/x-www-form-urlencoded;charset=UTF-8",
        data: "cid="+theClassName+"&pageNum="+1,
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
            if(classdata !== '显示失败'){
                var classData = JSON.parse(classdata);
                console.log(classData);
                $("#main").remove();
                var main = document.createElement("div");
                main.id = "main";
                $(".ibox-content")[0].appendChild(main);
                var classTitle = document.createElement("h3");
                classTitle.className = "mainTitle";
                classTitle.innerHTML = theClassName+"的相册";
                main.appendChild(classTitle);
                showData(classData);
            }else {
                alert(classdata);
            }

        },
        error: function (err) {
            console.log(err.status);
            alert("出现错误："+err.status);
        }
    });



}



function showData(imgData) {
    console.log(imgData);
    var main = $("#main");
    for(var i=0;i<imgData.length;i++){
        var theImgFace = imgData[i].picface;
        var imgFace;
        if (theImgFace == undefined){
            imgFace = "img/albumFace.png";
        }else {
            // imgFace = JSON.parse(theImgFace).url;
            imgFace = theImgFace;
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
        // theImg.setAttribute("data-page",pageNum);
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

    var imgs = $("img");
    imgs.load(function () {
        afterSeccess(imgData);
    });
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
