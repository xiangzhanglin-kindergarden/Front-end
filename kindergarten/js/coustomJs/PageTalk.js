createWrite2();  

/*     创建富文本     */
	var editor2
	function createWrite2(){

		editor2 = new wangEditor('write-talk');

    editor2.config.menus = [
      'bold',
      'underline',
      'italic',
      'strikethrough',
      'forecolor',
      'bgcolor',
      '|',
      'fontsize',
      '|',
      'img',
   ];
   

		// 图片上传路径
		//editor2.config.uploadImgUrl = 'http://172.20.2.164:8080/retirement/uploadPic/fileUpLoad.action';
		// editor2.config.uploadImgUrl = 'http://172.20.2.164:8080/kindergarden/Upload';
		editor2.config.uploadImgUrl = 'http://'+IPADDRESS+'/kindergarden/imageUpload';

		// 隐藏掉插入网络图片功能
    editor2.config.hideLinkImg = true;


	  //editor2.config.withcredentials = true;

		editor2.config.uploadImgFns.onload = function (resultText, xhr) {

			console.log(resultText);
			
			var obj = JSON.parse(resultText);

			// var pa = /.*\{(.*)\}/;
			// alert(resultText.match(pa)[1]);


			// 上传图片时，已经将图片的名字存在
			var originalName = editor2.uploadImgOriginalName || '';

			// editor.command(null, 'insertHtml', '<img src="' +obj[0] + '" alt="' + originalName + '/>');
			editor2.command(null, 'InsertImage', obj.url);
		};

  	editor2.config.uploadImgFns.ontimeout = function (xhr) {
        // xhr 是 xmlHttpRequest 对象，IE8、9中不支持
        alert('上传超时');
    };

    // 自定义error事件
    editor2.config.uploadImgFns.onerror = function (xhr) {
        // xhr 是 xmlHttpRequest 对象，IE8、9中不支持
        alert('上传错误');
    };
		//editor.config.uploadHeaders = 'x-requested-with'

		/*editor.config.uploadheaders = {
			'Accept':'text/x-json',
			'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
		}*/
		editor2.config.withCredentials = true;

		editor2.create();
	}



$("input[name='talkreback']").bind("click",function(){
  let thisPOS = $(this).parents(".talk-content-box2");
  createReTakle(thisPOS);
})
$(".talkreback2btn").bind("click",function(){
  let thisPOS = $(this).parents(".talk-content-box2");
  let thisWord = $(this).parent().find(".talkreback-name").text();
  createReTakle(thisPOS,thisWord);
})


/**
 * 点击回复后出现的回复框
 * @param  {[type]} obj  [位置]
 * @param  {[type]} word [默认内容]
 * @return {[type]}      [无]
 */
function createReTakle(obj,word){
  console.log(obj);
  console.log(word);
  $(".retalkareaBox").remove();
  let rtareaBox = $("<div class='retalkareaBox'></div>");
  let rtTextarea = "null";
  if (word!=undefined) {
    rtTextarea = $("<textarea name='retalk' id='retalkarea' placeholder=' 回复 "+word+"'></textarea>");
  }else{
    rtTextarea = $("<textarea name='retalk' id='retalkarea'></textarea>");
  }
  let rtInput = $("<div class='pushTalkbox'></div>");
  let rtInput1 = $("<input class='btn btn-primary' type='button' value='发表评论' name='pushreTalk''>");
  let rtInput2 = $("<input class='btn btn-danger' type='button' value='×' name='closereTalk' onclick='remove()'>");
  rtInput.append(rtInput1);
  rtInput.append(rtInput2);

  rtareaBox.append(rtTextarea);
  rtareaBox.append(rtInput);
  obj.append(rtareaBox);
}

function remove(){
  $(".retalkareaBox").remove();
}



  















