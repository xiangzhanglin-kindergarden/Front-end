/**
 * Created by Sunshine on 2017/5/8.
 */
$(window).ready(function () {
    var main = $("#main");
    var isload;

    $.ajax({
        type: "post",
        url: "js/customJs/imgData.json",
        dataType: "JSON",
        beforeSend: function () {
            var adding = document.createElement("p");
            adding.className = "adding";
            adding.innerHTML = "数据加载中。。。";
            $(".ibox-content")[0].appendChild(adding);
            isload = true;
        },
        success: function (data) {
            console.log(isload);

            for(var i=0;i<data.length;i++){
                var box = document.createElement("div");
                box.className = "box";
                var pic = document.createElement("div");
                pic.className = "pic";
                var theImg = document.createElement("img");
                theImg.src = data[i].url;
                var time = document.createElement("p");
                time.innerHTML = data[i].time;
                var event = document.createElement("p");
                event.innerHTML = data[i].event;

                main[0].appendChild(box);
                box.appendChild(pic);
                pic.appendChild(theImg);
                pic.appendChild(time);
                pic.appendChild(event);
            }
            
            // main.show();
            // waterFall();
            // setTimeout(function () {
            //     $(".adding").remove();
            //     main.show();
            //     waterFall();
            // },1000);
            $("img").load(function () {
                afterSeccess();
                // setTimeout(afterSeccess,800);
            });



        },
        error: function (err) {
            console.log("出现错误："+err.status);
        }
    })

});


function afterSeccess() {
    $(".adding").remove();
    var main = $("#main").show();
    waterFall();

    $(window).on('scroll',function () {
        if (checkScrollSlide()){
            //do something
            console.log("scroll");

        }
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
            if (index == boxs.length-1){
                boolean = true;
            }
        }
    });

}


function checkScrollSlide() {
    var lastBox = $("#main").find(".box").last();
    var lastBoxDis = lastBox.offset().top + Math.floor(lastBox.outerHeight()/2);
    var scrollTop = $(window).scrollTop();
    var documentH = $(window).height();
    var theH = scrollTop+documentH;


    if (lastBoxDis < theH){
        return true;
    }
}
