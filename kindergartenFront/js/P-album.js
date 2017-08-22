/*
*
*     相册内容 
*
*/
var flag = 1;
$(function(){
  $("video").click(function(){
    flag = flag+1;
    console.log(flag);
  })
})
  

$(function(){
  
  $(".enter-album").bind("click",function(){
    if (flag%2==0) {
      $("#playOrStop").trigger("click");
      flag = flag+1;
    };
    $(".album-list-func").animate({"opacity":"0"},700,function(){
      setTimeout(createIframe(1), 1);
    });
    
  })
  
  $(".enter-video").bind("click",function(){
    if (flag%2==0) {
      $("#playOrStop").trigger("click");
      flag = flag+1;
    };
    $(".album-list-func").animate({"opacity":"0"},700,function(){
      setTimeout(createIframe(2), 1);
    });
  })
})

function createIframe(nub){
  $(".albumsBox iframe").css({"display":"block"});
  $(".album-list-func").css({"display":"none"});
  if (nub==1) {
    $(".albumsBox iframe").attr("src","albums.html");
  }else if(nub == 2){
    $(".albumsBox iframe").attr("src","video.html");
  }
  
  $(".albumsBox iframe").animate({"opacity":"0.9"},500);

  $(".close-frame").css({"display":"block"});
  $(".close-frame").animate({"opacity":"0.9"},500)
  
}



$(function(){
  $(".close-frame").bind("click",function(){
    $(".albumsBox iframe").animate({"opacity":"0"},500,function(){
      $(".albumsBox iframe").attr("src","##");
      $(".albumsBox iframe").css({"display":"none"});
    });
    $(".close-frame").animate({"opacity":"0"},500,function(){
      $(".close-frame").css({"display":"none"});
      $(".album-list-func").css({"display":"block"});
      $(".album-list-func").animate({"opacity":"1"},500);
    })
  })
})















































