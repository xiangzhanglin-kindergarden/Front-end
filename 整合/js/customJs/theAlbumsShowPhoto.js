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
                        for(var i=0;i<comment.length;i++){
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

                //发表评论
                var nowImgId = nowImg.getAttribute("data-pid");
                var mainCommentInput = $(".mainCommentInput");
                var editComment = mainCommentInput.find("input.editComment");//评论框
                var buttonRelease = mainCommentInput.find(".buttonSure").find("input");


                //回复某人
                var reply = $(".mainCommentContent").find("span.people");
                reply.each(function () {
                    this.setAttribute("data-click",1);
                    this.setAttribute("data-otherClick",0);
                });

                reply.each(function () {
                    $(this).click(function () {
                        // now.setAttribute("data-otherClick",1);
                        var isClick = this.getAttribute("data-click");
                        var isOtherClick = this.getAttribute("data-otherClick");

                        if (isClick == 1 && isOtherClick == 0){
                            console.log("1 0");//首次点击
                            console.log("replySomePeople");
                            replySomeBody(this);
                        }else if(isClick == 0 && isOtherClick == 0){
                            console.log("0 0");//再次点击
                            var message = confirm("是否放弃回复？");
                            if(message){
                                $(".mainCommentInput").remove();
                                reply.each(function () {
                                    var every = this;
                                    every.setAttribute("data-click",1);
                                    every.setAttribute("data-otherClick",0);
                                });
                            }
                        }else if(isClick == 0 && isOtherClick == 1){
                            console.log("0 1");
                        }else {
                            console.log("1 1");
                            var message1 = confirm("是否放弃回复？");
                            if(message1){
                                $(".mainCommentInput").remove();
                                this.setAttribute("data-click",1);
                                this.setAttribute("data-otherClick",0);
                                replySomeBody(this);
                            }
                        }
                    });
                });


                function replySomeBody(e) {
                    var thisPerson = $(e).html();

                    var mainCommentInput = document.createElement("div");
                    mainCommentInput.className = "mainCommentInput";
                    var replyComment = document.createElement("input");
                    replyComment.className = "replyComment";
                    replyComment.type = "text";
                    replyComment.placeholder = "回复他（她）";
                    var replyButton = document.createElement("input");
                    replyButton.className = "replyButton";
                    replyButton.type = "button";
                    replyButton.value = "回复";

                    $(e).parent()[0].appendChild(mainCommentInput);
                    mainCommentInput.appendChild(replyComment);
                    mainCommentInput.appendChild(replyButton);

                    reply.each(function () {
                        this.setAttribute("data-click",1);
                        this.setAttribute("data-otherClick",1);
                    });
                    e.setAttribute("data-click",0);
                    e.setAttribute("data-otherClick",0);

                    replyButton.addEventListener("click",function () {
                        var replyValue = $(".replyComment").val();
                        commentAjax(replyValue,"园长",thisPerson);
                    });
                }


                //对图片评论
                buttonRelease.click(function () {
                    var editCommentValue = editComment.val();
                    commentAjax(editCommentValue,"园长",null);
                });

                function commentAjax(editValue,poneId,ptwoId) {
                    var theValue = {
                        comId: null,
                        poneId: poneId,//demo 暂时未园长，实际为登陆系统的管理员
                        ptwoId: ptwoId,
                        comTime: null,
                        comContent: editValue,
                        xId: nowImgId
                    };

                    console.log(theValue);
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
                            if (ptwoId == null){
                                alert("评论成功！");
                            }else {
                                alert("回复成功！");
                            }
                            $(".mainComment").find(".mainCommentContent").remove();

                            $(".mainCommentInput").remove();
                            theComment();

                        },
                        error: function (err) {
                            console.log(err.status);
                        }
                    });
                }
            }



        });
    });

    
}