/**
 * Created by Sunshine on 2017/5/27.
 */
$(document).ready(function () {
    var body = $("body");
    var addVideoBox = $(".addVideoBox");
    var gray = $(".gray");

    var addVideos = $("input.buttonAdd");
    var close = $(".close");
    var cancle = $("input.cancle");

    addVideos.click(function () {
        gray.show();
        addVideoBox.show(400);
        releaseVide();
    });
    close.click(function () {
        closeAddAlbumsBox();
    });
    cancle.click(function () {
        closeAddAlbumsBox();
    });
    

    function closeAddAlbumsBox() {
        gray.hide();
        addVideoBox.hide(400);
    }
    
    
    var buttonDel = $("input.buttonDel");

    buttonDel.click(function () {
        delVideo();
    });


    function releaseVide() {
        console.log("releaseVide");
        var addVideoBox = $(".addVideoBox");
        


    }


    
    function delVideo() {
        console.log("delVideo");
        var inputCheck = $("#main").find(".inputCheck");
        inputCheck.each(function () {
            var span = document.createElement("span");
            span.className = "spanCheck";
            this.appendChild(span);
        });

        var spanManagement = $("span.spanCheck");
        spanManagement.each(function () {
            this.setAttribute("checked","false");
            this.addEventListener("click",function () {
                if (this.getAttribute("checked") == "false"){
                    changeBackgroundImg(this);
                }else if (this.getAttribute("checked") == "true"){
                    removeBackgroundImg(this);
                }
            });
        });

        var buttonSure = $("input.buttonSure");
        var buttonCancle = $("input.buttonCancle");

        buttonSure.show(400);
        buttonCancle.show(400);

        setTimeout(function () {
            buttonDel.hide(400);
        },500);

        buttonSure.click(function () {
            delVideoAjax();
        });

        buttonCancle.click(function () {
            buttonSure.hide(400);
            buttonCancle.hide(400);
            setTimeout(function () {
                buttonDel.show(400);
            },500);
            $("span.spanCheck").remove();
        });


        function changeBackgroundImg(e) {
            e.style.background = "url(img/checked.png)";
            e.setAttribute("checked","true");
        }
        function removeBackgroundImg(e) {
            e.style.background = "white";
            e.setAttribute("checked","false");
        }

    }


    function delVideoAjax() {
        var theCheck = $("#main").find(".every").find("span.spanCheck");
        var delVideo = "";
        theCheck.each(function () {
            var check = this.getAttribute("checked");

            if (check == "true"){
                delVideo = delVideo + $(this).parent().parent() + ",";
            }
        });

        console.log(delVideo);

        var message = confirm("确定要删除吗？");
        if(message){
            $.ajax({
                type: "post",
                url: "",
                data: "="+delVideo,
                beforeSend: function (xhr) {
                    xhr.withCredentials = true;
                    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                },
                success: function () {
                    console.log("success");
                    alert("删除成功！");
                    // window.location.reload();

                },
                error: function (err) {
                    console.log(err.status);
                }
            });
        }

        
    }
    
    
});