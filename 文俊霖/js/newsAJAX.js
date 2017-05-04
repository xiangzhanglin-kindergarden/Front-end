$(function(){
	var username = sessionStorage.getItem("user");
	var usertype = sessionStorage.getItem("nub");  //0为老师，1为校长
	console.log(username);
	console.log(usertype);
	if (usertype == 0) {
		
	}
})



$(function(){
	$("#content-submit").bind("click",function(){
		var title = $("#title input").val();
			if (title == "") {
				alert("标题不能为空");
			}
			else{
				var type = $(".tag-chosed").prop("id");
				alert(type);
				var arr=[];
				var test = $("textarea").val();
				arr.push(test)
				console.log(arr);
				
			}
	})
})










/*

$(function(){
  var editor = new UE.ui.Editor();
  editor.render('content');
  editor.addListener('contentchange',function(){
    this.sync();
    //1.2.4+以后可以直接给textarea的id名字就行了
    $('textarea').valid();
  });
  var validator = $("#myform").submit(function() {
    editor.sync();
  }).validate({
    ignore: "",
    rules: {
      title: "required",
      content: "required"
    },
    errorPlacement: function(label, element) {
      // position error label after generated textarea
      if (element.is("textarea")) {
        label.insertAfter(element.next());
      } else {
        label.insertAfter(element)
      }
    }
  });
  validator.focusInvalid = function() {
    // put focus on tinymce on submit validation
    if( this.settings.focusInvalid ) {
      try {
        var toFocus = $(this.findLastActive() || this.errorList.length && this.errorList[0].element || []);
        if (toFocus.is("textarea")) {
          editor.focus()
        } else {
          toFocus.filter(":visible").focus();
        }
      } catch(e) {
        // ignore IE throwing errors when focusing hidden elements
      }
    }
  }
})*/


/*

$(document).ready(function(){
	var date = new Date();
	var week = date.getUTCDay();

	var myjson = "";      //传递参数的内容
	var url = "";    //物理地址
	var IP = "";     //IP地址

	var cClass = $(".differ-class-box [name='class'] option:selected").val();
	var year = $(".differ-class-box [name='year'] option:selected").val();
	var week = $(".differ-class-box [name='week'] option:selected").val();
	week=17;
	console.log(cClass);
	console.log(year);
	console.log(week);
	
	IP = "119.29.53.178:8080/";
	url = "kindergarden/LessonShow";


	//myjson  字符串
	myjson = {
		lId:null,
		cName:cClass,
		lTerm:year,
		lWeek:week,
		lMon:null,
		lTue:null,
		lWed:null,
		lThu:null,
		lfri:null,
		
	};
	myjson = JSON.stringify(myjson);

	// console.log(myjson);
	// console.log(typeof myjson);

	$.ajax({
		// type:"get",
		type:"post",
		url:"http://"+IP+url,
		data:"lessonJson="+myjson,
		dataType:"JSON",
		contentType:"application/x-www-form-urlencoded;charset=UTF-8",
		// contentType:"application/x-www-form-urlencoded;charset=UTF-8",
		beforeSend:function(xhr){
			xhr.withCredentials = true;
			xhr.setRequestHeader("X-Requested-with","XMLHttpRequest");
		},
		success:function(data){
			console.log(data);
			if (data!=null) {
				$(".class-table tr:eq(1) td:eq(1)").html(data.lMon[0]+data.lMon[1])
				$(".class-table tr:eq(2) td:eq(1)").html(data.lMon[3]+data.lMon[4])
				$(".class-table tr:eq(3) td:eq(1)").html(data.lMon[6]+data.lMon[7])
				$(".class-table tr:eq(4) td:eq(1)").html(data.lMon[9]+data.lMon[10])

				$(".class-table tr:eq(1) td:eq(2)").html(data.lTue[0]+data.lTue[1])
				$(".class-table tr:eq(2) td:eq(2)").html(data.lTue[3]+data.lTue[4])
				$(".class-table tr:eq(3) td:eq(2)").html(data.lTue[6]+data.lTue[7])
				$(".class-table tr:eq(4) td:eq(2)").html(data.lTue[9]+data.lTue[10])

				$(".class-table tr:eq(1) td:eq(3)").html(data.lWed[0]+data.lWed[1])
				$(".class-table tr:eq(2) td:eq(3)").html(data.lWed[3]+data.lWed[4])
				$(".class-table tr:eq(3) td:eq(3)").html(data.lWed[6]+data.lWed[7])
				$(".class-table tr:eq(4) td:eq(3)").html(data.lWed[9]+data.lWed[10])

				$(".class-table tr:eq(1) td:eq(4)").html(data.lThu[0]+data.lThu[1])
				$(".class-table tr:eq(2) td:eq(4)").html(data.lThu[3]+data.lThu[4])
				$(".class-table tr:eq(3) td:eq(4)").html(data.lThu[6]+data.lThu[7])
				$(".class-table tr:eq(4) td:eq(4)").html(data.lThu[9]+data.lThu[10])

				$(".class-table tr:eq(1) td:eq(5)").html(data.lfri[0]+data.lfri[1])
				$(".class-table tr:eq(2) td:eq(5)").html(data.lfri[3]+data.lfri[4])
				$(".class-table tr:eq(3) td:eq(5)").html(data.lfri[6]+data.lfri[7])
				$(".class-table tr:eq(4) td:eq(5)").html(data.lfri[9]+data.lfri[10])
			};
			
		},
		error:function(jqHXR){
			console.log("错误:"+jqHXR.status);
		}
	})
})

*/