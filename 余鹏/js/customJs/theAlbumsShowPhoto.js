/**
 * Created by Sunshine on 2017/5/20.
 */
function showPhoto() {
    var imgs = $(".mainPhoto").find(".everyImg").find("img");
    var gray = $(".gray");
    var show = $(".showPhoto");

    console.log(imgs);
    imgs.each(function () {
        var nowImg = this;
        $(nowImg).click(function () {
            var nowUrl = this.src;

            gray.show();
            var oImg = document.createElement("img");
            oImg.src = nowUrl;
            oImg.className = "nowImg";
            show.find(".content")[0].appendChild(oImg);

            console.log($(nowImg).width(),$(nowImg).height());
            var wh = $(nowImg).width()/$(nowImg).height();
            console.log(show.width());
            var imgW = show.width()*0.49;
            var imgH = imgW/wh;
            var theTop = (800-imgH)/2;
            // var imgH = (minH-)/2;
            $(oImg).css("margin-top",theTop);
            console.log(show.height(),imgH);
            show.show();

            //关闭
            $("i.close").click(function () {
                closeShow();
            });
            gray.click(function () {
                closeShow();
            });

            function closeShow() {
                gray.hide();
                show.hide();
                $(".nowImg").remove();
            }

        });
    });

    
}