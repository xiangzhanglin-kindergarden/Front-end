/**
 * Created by Sunshine on 2017/5/20.
 */
function showPhoto() {
    var imgs = $(".mainPhoto").find(".everyImg").find("img");
    var gray = $(".gray");
    var show = $(".showPhoto");

    imgs.each(function () {
        var nowImg = this;
        $(nowImg).click(function () {
            var nowUrl = this.src;

            gray.show();
            var oImg = document.createElement("img");
            oImg.src = nowUrl;
            oImg.className = "nowImg";
            show.find(".content")[0].appendChild(oImg);

            var wh = $(nowImg).width()/$(nowImg).height();
            var imgW = show.width()*0.49;
            var imgH = imgW/wh;
            var theTop = (800-imgH)/2;
            // var imgH = (minH-)/2;
            $(oImg).css("margin-top",theTop);
            var theChangeImg = show.find(".changePhoto").find("img");
            var theChangeImgH = (800-60)/2;
            theChangeImg.each(function () {
                $(this).css("margin-top",theChangeImgH);
            });
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
                $(".mainComment").find(".mainCommentContent").remove();
                $(".mainCommentInput").remove();
            }
            


            //显示评论
            function theComment() {
                console.log("theComment");
                // console.log(nowImg);
                var nowImgId = nowImg.getAttribute("data-pid");
                $.ajax({
                    type: "post",
                    url: "http://119.29.53.178:8080/kindergarden/CommunicateShow",
                    contentType:"application/x-www-form-urlencoded;charset=UTF-8",
                    data: "XId="+nowImgId,
                    beforeSend: function (xhr) {
                        xhr.withCredentials = true;
                        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

                        var pLoading = document.createElement("p");
                        pLoading.innerHTML = "评论加载中。。。";
                        pLoading.className = "pLoading";
                        $(".thepLoading")[0].appendChild(pLoading);
                    },
                    success: function (data) {
                        var theComment = $(".comment");
                        var mainComment = $(".mainComment");
                        $(".pLoading").remove();
                        mainComment.find(".mainCommentContent").remove();
                        var comment = JSON.parse(data);

                        // console.log(comment);
                        theComment.find("h3").html("评论"+"("+comment.length+")");
                        for(var i=comment.length-1;i>=0;i--){
                            var mainCommentContent = document.createElement("div");
                            mainCommentContent.className = "mainCommentContent";
                            if (comment[i].ptwoId == "null" || comment[i].ptwoId == undefined){
                                var spanOne = document.createElement("span");
                                spanOne.className = "people single";
                                spanOne.innerHTML = comment[i].poneId;
                                var theCommentValue = document.createElement("span");
                                theCommentValue.className = "theCommentValue";
                                theCommentValue.innerHTML = "：" + comment[i].comContent;
                                mainComment[0].appendChild(mainCommentContent);
                                mainCommentContent.appendChild(spanOne);
                                mainCommentContent.appendChild(theCommentValue);
                            }else {
                                var span1 = document.createElement("span");
                                span1.className = "people";
                                span1.innerHTML = comment[i].poneId;
                                var spanHui = document.createElement("span");
                                spanHui.innerHTML = "&nbsp;回复了&nbsp;";
                                var span2 = document.createElement("span");
                                span2.className = "people";
                                span2.innerHTML = comment[i].ptwoId;
                                var theCommentValues = document.createElement("span");
                                theCommentValues.className = "theCommentValue";
                                theCommentValues.innerHTML = "：" + comment[i].comContent;
                                mainComment[0].appendChild(mainCommentContent);
                                mainCommentContent.appendChild(span1);
                                mainCommentContent.appendChild(spanHui);
                                mainCommentContent.appendChild(span2);
                                mainCommentContent.appendChild(theCommentValues);
                            }
                        }
                        var mainCommentInput = document.createElement("div");
                        mainCommentInput.className = "mainCommentInput";
                        var clickSpan = document.createElement("span");
                        clickSpan.innerHTML = "点击对应家长即可回复他（她）";
                        var editComment = document.createElement("input");
                        editComment.className = "editComment";
                        editComment.type = "text";
                        editComment.placeholder = "我也说一句";
                        var buttonSure = document.createElement("div");
                        buttonSure.className = "buttonSure";
                        var button = document.createElement("input");
                        button.type = "button";
                        button.value = "发表";

                        theComment[0].appendChild(mainCommentInput);
                        mainCommentInput.appendChild(clickSpan);
                        mainCommentInput.appendChild(editComment);
                        mainCommentInput.appendChild(buttonSure);
                        buttonSure.appendChild(button);

                        releaseComment();

                    },
                    error: function (err) {
                        console.log(err.status);
                    }
                });
            }
            
            theComment();



            function releaseComment() {
                console.log("releaseComment");

                //发表评论
                var nowImgId = nowImg.getAttribute("data-pid");
                var mainCommentInput = $(".mainCommentInput");
                var editComment = mainCommentInput.find("input.editComment");//评论框
                var buttonRelease = mainCommentInput.find(".buttonSure").find("input");


                //回复某人
                var reply = $(".mainCommentContent").find("span.people");
                reply.each(function () {
                    this.addEventListener("click",function () {
                        replySomeBody(this);
                    });
                });
                function replySomeBody(e) {
                    console.log(e);
                    var thisPerson = $(e).html();
                    console.log(thisPerson);

                    var mainCommentInput = document.createElement("div");
                    mainCommentInput.className = "mainCommentInput";
                    var replyComment = document.createElement("input");
                    replyComment.className = "replyComment";
                    replyComment.type = "text";
                    replyComment.placeholder = "回复他（她）";
                    var replyButton = document.createElement("input");
                    replyButton.className = "replyButton";
                    replyButton.type = "button";
                    replyButton.value = "发表";

                    $(e).parent()[0].appendChild(mainCommentInput);
                    mainCommentInput.appendChild(replyComment);
                    mainCommentInput.appendChild(replyButton);
                    console.log("remove");
                    e.removeEventListener("click",replySomeBody);
                }


                //对图片评论
                buttonRelease.click(function () {
                    var editCommentValue = editComment.val();
                    var theValue = {
                        comId: null,
                        poneId: "园长",//demo 暂时未园长，实际为登陆系统的管理员
                        ptwoId: null,
                        comTime: null,
                        comContent: editCommentValue,
                        xId: nowImgId
                    };

                    // console.log(theValue);
                    $.ajax({
                        type: "post",
                        url: "http://119.29.53.178:8080/kindergarden/CommunicateAdd",
                        contentType:"application/x-www-form-urlencoded;charset=UTF-8",
                        data: "CommuniJson="+JSON.stringify(theValue),
                        beforeSend: function (xhr) {
                            xhr.withCredentials = true;
                            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                        },
                        success: function () {
                            // console.log("success");
                            $(".mainComment").find(".mainCommentContent").remove();
                            alert("评论成功！");
                            $(".mainCommentInput").remove();
                            theComment();

                        },
                        error: function (err) {
                            console.log(err.status);
                        }
                    });
                });
            }



        });
    });

    
}