var usertype;
var userClass;
var teacherData;
var teacherClass;


$(document).ready(function(){
	$(function(){
		// var username = sessionStorage.getItem("user");
		usertype = sessionStorage.getItem("nub");  //0为老师，1为校长
		// console.log(username);
		// console.log(usertype);

		allClass();
		if (usertype == 0) {
			teacherData = sessionStorage.getItem("teacherData");
			var data = JSON.parse(teacherData);
			// usertype = 0;
			userClass = data.cId;
			tClass();
			$(".new-class .removeTclass").remove();
			$(".new-class .class").remove();
			$(".differ-class-box .removeTclass").remove();
			$(".differ-class-box .removeTclassse").remove();

			$("#new-class").attr("disabled",false);
			$("#change-class").attr("disabled",false);
			$(".c-week").attr("disabled",false);
		}
	})

	function allClass(){
    //加载班级
    $.ajax({
      type: "post",
      url: "http://"+IPADDRESS+"/kindergarden/ClassShow",
      contentType:"application/x-www-form-urlencoded;charset=UTF-8",
      beforeSend: function (xhr) {
        xhr.withCredentials = true;
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      },
      success: function (classdata) {
        var classData = JSON.parse(classdata);
        var classlang = classData.length-2;
        for(var i=0;i<classlang;i++){
	        $(".removeTclassse").append("<option value='"+classData[i].cName+"'>"+classData[i].cName+"</option>")
	        $(".addNewClass").append("<option value='"+classData[i].cName+"'>"+classData[i].cName+"</option>")
        }
      },
      error: function (err) {
        console.log(err.status);
      }
 	 });
	}


	    

	function tClass(){
		console.log(userClass);
		getTClass();
	}

	function getTClass(){
		var lesson = JSON.stringify({
			"lId":null,
			"cName":userClass,
			"lWeek":$(".differ-class-box [name='week']").val(),
			"lMon":null,
			"lTue":null,
			"lWed":null,
			"lThu":null,
			"lfri":null,
			"lsat":null,
			"lsun":null
			// "cid":userClass,
		});
		ajax(
			"http://"+IPADDRESS+"/kindergarden/Lessonshowteacher",
			"lessonJson="+lesson,
			showLesson
		);

	}



	//点击 提交新建课表
	$("#new-ok-btn").on("click",function(){
		$("#new-table tr td textarea").each(function(){
			if ($(this).val()==null||$(this).val()=="") {
				$(this).val(0);
				$(this).css({"color":"rgba(0,0,0,0)"});
			};
		})
		var lMon = String([
			$(".new-table tr:eq(1) td:eq(2) textarea").val(),
			$(".new-table tr:eq(2) td:eq(2) textarea").val(),
			$(".new-table tr:eq(3) td:eq(2) textarea").val(),
			$(".new-table tr:eq(4) td:eq(2) textarea").val(),
			$(".new-table tr:eq(5) td:eq(2) textarea").val(),
			$(".new-table tr:eq(6) td:eq(2) textarea").val(),
			$(".new-table tr:eq(7) td:eq(2) textarea").val()
			// ""
		])
		var lTue = String([
			$(".new-table tr:eq(1) td:eq(3) textarea").val(),
			$(".new-table tr:eq(2) td:eq(3) textarea").val(),		
			$(".new-table tr:eq(3) td:eq(3) textarea").val(),
			$(".new-table tr:eq(4) td:eq(3) textarea").val(),
			$(".new-table tr:eq(5) td:eq(3) textarea").val(),
			$(".new-table tr:eq(6) td:eq(3) textarea").val(),
			$(".new-table tr:eq(7) td:eq(3) textarea").val()
		])
		var lWed = String([
			$(".new-table tr:eq(1) td:eq(4) textarea").val(),
			$(".new-table tr:eq(2) td:eq(4) textarea").val(),		
			$(".new-table tr:eq(3) td:eq(4) textarea").val(),
			$(".new-table tr:eq(4) td:eq(4) textarea").val(),
			$(".new-table tr:eq(5) td:eq(4) textarea").val(),
			$(".new-table tr:eq(6) td:eq(4) textarea").val(),
			$(".new-table tr:eq(7) td:eq(4) textarea").val()
		])
		var lThu = String([
			$(".new-table tr:eq(1) td:eq(5) textarea").val(),
			$(".new-table tr:eq(2) td:eq(5) textarea").val(),		
			$(".new-table tr:eq(3) td:eq(5) textarea").val(),
			$(".new-table tr:eq(4) td:eq(5) textarea").val(),
			$(".new-table tr:eq(5) td:eq(5) textarea").val(),
			$(".new-table tr:eq(6) td:eq(5) textarea").val(),
			$(".new-table tr:eq(7) td:eq(5) textarea").val()
		])
		var lfri = String([
			$(".new-table tr:eq(1) td:eq(6) textarea").val(),
			$(".new-table tr:eq(2) td:eq(6) textarea").val(),		
			$(".new-table tr:eq(3) td:eq(6) textarea").val(),
			$(".new-table tr:eq(4) td:eq(6) textarea").val(),
			$(".new-table tr:eq(5) td:eq(6) textarea").val(),
			$(".new-table tr:eq(6) td:eq(6) textarea").val(),
			$(".new-table tr:eq(7) td:eq(6) textarea").val()
		])
		var lsat = String([
			$(".new-table tr:eq(1) td:eq(7) textarea").val(),
			$(".new-table tr:eq(2) td:eq(7) textarea").val(),		
			$(".new-table tr:eq(3) td:eq(7) textarea").val(),
			$(".new-table tr:eq(4) td:eq(7) textarea").val(),
			$(".new-table tr:eq(5) td:eq(7) textarea").val(),
			$(".new-table tr:eq(6) td:eq(7) textarea").val(),
			$(".new-table tr:eq(7) td:eq(7) textarea").val()
		])
		var lsun = String([
			$(".new-table tr:eq(1) td:eq(8) textarea").val(),
			$(".new-table tr:eq(2) td:eq(8) textarea").val(),		
			$(".new-table tr:eq(3) td:eq(8) textarea").val(),
			$(".new-table tr:eq(4) td:eq(8) textarea").val(),
			$(".new-table tr:eq(5) td:eq(8) textarea").val(),
			$(".new-table tr:eq(6) td:eq(8) textarea").val(),
			$(".new-table tr:eq(7) td:eq(8) textarea").val()
		])
		var classshuxin = String([
			$(".new-table tr:eq(1) td:eq(1) textarea").val(),
			$(".new-table tr:eq(2) td:eq(1) textarea").val(),		
			$(".new-table tr:eq(3) td:eq(1) textarea").val(),
			$(".new-table tr:eq(4) td:eq(1) textarea").val(),
			$(".new-table tr:eq(5) td:eq(1) textarea").val(),
			$(".new-table tr:eq(6) td:eq(1) textarea").val(),
			$(".new-table tr:eq(7) td:eq(1) textarea").val()
		])
		var workspace = $(".writeworkspace").val();
		console.log(workspace);

		if (usertype == 0) {
			var courseMsg = JSON.stringify({
				"lId":null,
				"cName":userClass,
				"lWeek":$(".c-week").val(),
				"lMon":lMon,
				"lTue":lTue,
				"lWed":lWed,
				"lThu":lThu,
				"lfri":lfri,
				"lsat":lsat,
				"lsun":lsun,
				"workimportant":workspace,
				"shuxin":classshuxin
				// "cid":userClass
			});
			console.log(courseMsg);
			ajax(
				"http://"+IPADDRESS+"/kindergarden/LessonAddteacher",
				"lessonInJson="+courseMsg,
				function(res){

					close_new_class();

					var lesson = JSON.stringify({
						"lId":null,
						"cName":userClass,
						"lWeek":$(".c-week").val(),
						"lMon":null,
						"lTue":null,
						"lWed":null,
						"lThu":null,
						"lfri":null,
						"lsat":null,
						"lsun":null,
						"workimportant":null,
						"shuxin":null
						// "cid":userClass,
					});
					ajax(
						"http://"+IPADDRESS+"/kindergarden/Lessonshowteacher",
						"lessonJson="+lesson,
						showLesson
					);
					$(".c-week").val($(".c-week").val());
					$("#change-class").attr("disabled",false);
					// $(".c-week option").each(function(){
					// 	if ($(".c-week").val()==$(this).html()) {
					// 		$(this).attr("selected",true);
					// 	};
					// }) 
				}
			)
		}else{
			var courseMsg = JSON.stringify({
				"lId":null,
				"cName":$(".removeTclassse").val(),
				"lWeek":$(".c-week").val(),
				"lMon":lMon,
				"lTue":lTue,
				"lWed":lWed,
				"lThu":lThu,
				"lfri":lfri,
				"lsat":lsat,
				"lsun":lsun,
				"workimportant":workspace,
				"shuxin":classshuxin
			});
			console.log(courseMsg);
			ajax(
				"http://"+IPADDRESS+"/kindergarden/LessonAdd",
				"lessonInJson="+courseMsg,
				function(res){

					close_new_class();

					var lesson = JSON.stringify({
						"lId":null,
						"cName":$(".removeTclassse").val(),
						"lWeek":$(".c-week").val(),
						"lMon":null,
						"lTue":null,
						"lWed":null,
						"lThu":null,
						"lfri":null,
						"lsat":null,
						"lsun":null,
						"workimportant":null,
						"shuxin":null
						// "cid":userClass,
					});
					ajax(
						"http://"+IPADDRESS+"/kindergarden/LessonShow",
						"lessonJson="+lesson,
						showLesson
					);
					$(".c-week").val($(".c-week").val());
					// $(".c-week option").each(function(){
					// 	if ($(".c-week").val()==$(this).html()) {
					// 		$(this).attr("selected",true);
					// 	};
					// });
					$(".removeTclassse").val($(".removeTclassse").val());
					$("#change-class").attr("disabled",false);
					// $(".removeTclassse option").each(function(){
					// 	if ($(".removeTclassse").val()==$(this).html()) {
					// 		$(this).attr("selected",true);
					// 	};
					// });

				
				}
			)
		}
		
	})
	//切换周的时候的功能函数
	$(".differ-class-box [name='week']").on("change",function(){
		if (usertype == 0) {
			var lesson = JSON.stringify({
				"lId":null,
				"cName":userClass,
				"lWeek":$(this).val(),
				"lMon":null,
				"lTue":null,
				"lWed":null,
				"lThu":null,
				"lfri":null,
				"lsat":null,
				"lsun":null,
				"workimportant":null,
				"shuxin":null
			});
			// console.log(lesson);
			ajax(
				"http://"+IPADDRESS+"/kindergarden/Lessonshowteacher",
				"lessonJson="+lesson,
				showLesson
			);
		}else{
			var lesson = JSON.stringify({
				"lId":null,
				"cName":$(".differ-class-box [name='class']").val(),
				"lWeek":$(this).val(),
				"lMon":null,
				"lTue":null,
				"lWed":null,
				"lThu":null,
				"lfri":null,
				"lsat":null,
				"lsun":null,
				"workimportant":null,
				"shuxin":null
			});
			ajax(
				"http://"+IPADDRESS+"/kindergarden/LessonShow",
				"lessonJson="+lesson,
				showLesson
			);
		}
		
	})

	//切换班级的时候的功能函数
	$(".differ-class-box [name='class']").on("change",function(){
		var lesson = JSON.stringify({"lId":null,"cName":$(this).val(),"lWeek":$(".differ-class-box [name='week']").val(),"lMon":null,"lTue":null,"lWed":null,"lThu":null,"lfri":null});
		$(".class-wait").remove();
		$("#new-class").attr("disabled",false);
		$("#change-class").attr("disabled",false);
		$(".c-week").attr("disabled",false);
		ajax("http://"+IPADDRESS+"/kindergarden/LessonShow","lessonJson="+lesson,showLesson);
	})
	var value = [];
	//点击修改按钮
	$("#change-class").on("click",function(){
		$(".differ-class-box [name='class']").attr("disabled",true);
		$(".differ-class-box [name='week']").attr("disabled",true);
		// console.log("this");
		$("td").each(function(){
			// console.log($(this).attr("class"));
			// if ($(this).attr("class")!="class-time CT-B class-end"|| $(this).attr("class")!="class-time CT-B CT-T class-end" || $(this).attr("class")!="class-time CT-T class-end"){
			if ($(this).attr("class")==undefined || $(this).attr("class")=="" || $(this).attr("class")=="class-time class-end2 class-end" || $(this).attr("class")=="class-time class-end2" || $(this).attr("class")=="class-end"){
				$(this).html("<textarea class='class-change-input'>"+$(this).html().replace(/<br>/g,'\n')+"</textarea>")
			}
			if ($(this).attr("class")=="workspace class-end" || $(this).attr("class")=="workspace"){
				$(this).html("<textarea class='class-change-input'>"+$(this).html().replace(/<br>/g,'\n')+"</textarea>")
			}
		})
		// console.log(value);
	})

	//修改的方法
	$(".mail-box-header").delegate("#change-class-yes","click",function(){
		$("#new-class").attr("disabled",true);
		$("#change-class").attr("disabled",true);
		$(".class-table tr td input").each(function(){
			if ($(this).val()==null||$(this).val()=="") {
				$(this).val(0);
				$(this).css({"color":"rgba(0,0,0,0)"});
			};
		})
		var lMon = String([
			$(".class-table tr:eq(1) td:eq(2) textarea").val(),
			$(".class-table tr:eq(2) td:eq(2) textarea").val(),
			$(".class-table tr:eq(3) td:eq(2) textarea").val(),
			$(".class-table tr:eq(4) td:eq(2) textarea").val(),
			$(".class-table tr:eq(5) td:eq(2) textarea").val(),
			$(".class-table tr:eq(6) td:eq(2) textarea").val(),
			$(".class-table tr:eq(7) td:eq(2) textarea").val(),
		])
		var lTue = String([
			$(".class-table tr:eq(1) td:eq(3) textarea").val(),
			$(".class-table tr:eq(2) td:eq(3) textarea").val(),		
			$(".class-table tr:eq(3) td:eq(3) textarea").val(),
			$(".class-table tr:eq(4) td:eq(3) textarea").val(),
			$(".class-table tr:eq(5) td:eq(3) textarea").val(),
			$(".class-table tr:eq(6) td:eq(3) textarea").val(),
			$(".class-table tr:eq(7) td:eq(3) textarea").val()
		])
		var lWed = String([
			$(".class-table tr:eq(1) td:eq(4) textarea").val(),
			$(".class-table tr:eq(2) td:eq(4) textarea").val(),		
			$(".class-table tr:eq(3) td:eq(4) textarea").val(),
			$(".class-table tr:eq(4) td:eq(4) textarea").val(),
			$(".class-table tr:eq(5) td:eq(4) textarea").val(),
			$(".class-table tr:eq(6) td:eq(4) textarea").val(),
			$(".class-table tr:eq(7) td:eq(4) textarea").val()
		])
		var lThu = String([
			$(".class-table tr:eq(1) td:eq(5) textarea").val(),
			$(".class-table tr:eq(2) td:eq(5) textarea").val(),		
			$(".class-table tr:eq(3) td:eq(5) textarea").val(),
			$(".class-table tr:eq(4) td:eq(5) textarea").val(),
			$(".class-table tr:eq(5) td:eq(5) textarea").val(),
			$(".class-table tr:eq(6) td:eq(5) textarea").val(),
			$(".class-table tr:eq(7) td:eq(5) textarea").val()
		])
		var lfri = String([
			$(".class-table tr:eq(1) td:eq(6) textarea").val(),
			$(".class-table tr:eq(2) td:eq(6) textarea").val(),		
			$(".class-table tr:eq(3) td:eq(6) textarea").val(),
			$(".class-table tr:eq(4) td:eq(6) textarea").val(),
			$(".class-table tr:eq(5) td:eq(6) textarea").val(),
			$(".class-table tr:eq(6) td:eq(6) textarea").val(),
			$(".class-table tr:eq(7) td:eq(6) textarea").val()
		])
		var lsat = String([
			$(".class-table tr:eq(1) td:eq(7) textarea").val(),
			$(".class-table tr:eq(2) td:eq(7) textarea").val(),		
			$(".class-table tr:eq(3) td:eq(7) textarea").val(),
			$(".class-table tr:eq(4) td:eq(7) textarea").val(),
			$(".class-table tr:eq(5) td:eq(7) textarea").val(),
			$(".class-table tr:eq(6) td:eq(7) textarea").val(),
			$(".class-table tr:eq(7) td:eq(7) textarea").val()
		])
		var lsun = String([
			$(".class-table tr:eq(1) td:eq(8) textarea").val(),
			$(".class-table tr:eq(2) td:eq(8) textarea").val(),		
			$(".class-table tr:eq(3) td:eq(8) textarea").val(),
			$(".class-table tr:eq(4) td:eq(8) textarea").val(),
			$(".class-table tr:eq(5) td:eq(8) textarea").val(),
			$(".class-table tr:eq(6) td:eq(8) textarea").val(),
			$(".class-table tr:eq(7) td:eq(8) textarea").val()
		])
		var classshuxin = String([
			$(".class-table tr:eq(1) td:eq(1) textarea").val(),
			$(".class-table tr:eq(2) td:eq(1) textarea").val(),		
			$(".class-table tr:eq(3) td:eq(1) textarea").val(),
			$(".class-table tr:eq(4) td:eq(1) textarea").val(),
			$(".class-table tr:eq(5) td:eq(1) textarea").val(),
			$(".class-table tr:eq(6) td:eq(1) textarea").val(),
			$(".class-table tr:eq(7) td:eq(1) textarea").val()
		])
		var workspace = $(".workspace textarea").val();
		console.log(workspace);
		if (usertype == 0) {
			var courseMsg = JSON.stringify({
				"lId":localStorage.getItem("ll"),
				"cName":userClass,
				"lWeek":$(".c-week").val(),
				"lMon":lMon,
				"lTue":lTue,
				"lWed":lWed,
				"lThu":lThu,
				"lfri":lfri,
				"lsat":lsat,
				"lsun":lsun,
				"workimportant":workspace,
				"shuxin":classshuxin
				// "cid":userClass
			});
			console.log(courseMsg);
			ajax(
				"http://"+IPADDRESS+"/kindergarden/LessonUpdate",
				"lessonJson="+courseMsg,
				function(res){
					$(".delayimg").css({"opacity":1});
					setTimeout(function(){
						$(".delayimg").css({"opacity":0});
						$("#new-class").attr("disabled",true);
						$("#change-class").attr("disabled",false);
					},500);
			})
			window.location.reload()

		}else{
			var courseMsg = JSON.stringify({
				"lId":localStorage.getItem("ll"),
				"cName":$(".differ-class-box [name='class']").val(),
				"lWeek":$(".c-week").val(),
				"lMon":lMon,
				"lTue":lTue,
				"lWed":lWed,
				"lThu":lThu,
				"lfri":lfri,
				"lsat":lsat,
				"lsun":lsun,
				"workimportant":workspace,
				"shuxin":classshuxin
			});
			console.log(courseMsg);
			ajax("http://"+IPADDRESS+"/kindergarden/LessonUpdate","lessonJson="+courseMsg,function(res){
				$(".delayimg").css({"opacity":1});
				$(".mail-box td").each(function(){
					if ($(this).attr("class") != "class-time"){
						var value = $(this).children().val()
						console.log(value);
						if (value!="0") {
							if ($(this).attr("class")=="workspace" || $(this).attr("class")=="workspace class-end") {
								value = value.match(/[^\n]+/g);
								// console.log(value);
								var newWorkSpace = "";
								if (value!= null) {
									for(var i = 0; i<value.length; i++){
										newWorkSpace = newWorkSpace+value[i]+'</br>';
									}
								}else{newWorkSpace=""}
								
								$(this).append(newWorkSpace);
							}else{
								$(this).append(value);
								// $("#change-class-yes").animate({"opacity":0});
								// $("#change-class-no").animate({"opacity":0});

								$("#change-class-yes").addClass("myHidden");
								$("#change-class-no").addClass("myHidden");
								setTimeout(function(){
									$("#change-class").removeClass("myHidden");
									$("#change-class").animate({"opacity":1});
									// $("#change-class-yes").animate({"opacity":1});
									// $("#change-class-no").animate({"opacity":1});
								},1);
								$(".differ-class-box [name='class']").attr("disabled",false);
								$(".differ-class-box [name='week']").attr("disabled",false);
								close_new_class();
							}
						};
						
					}
				})
				$(".mail-box td input").remove();
				$(".mail-box td textarea").remove();
				setTimeout(function(){
					$(".delayimg").css({"opacity":0});
					$("#new-class").attr("disabled",true);
					$("#change-class").attr("disabled",false);
				},500);
			})
		}
		
	})

	function ajax(url,data,callback){
		$.ajax({
			url : url,
			type : "POST",
			dataType : "json",
			data : data,
			contentType:"application/x-www-form-urlencoded;charset=UTF-8",
			success : function(res){
				// teacherClass = res.cName;
				if(res != null){
					callback(res);
				}
				// console.log(teacherClass);
			},
			error : function(jqHXR){
				console.log("错误:"+jqHXR.status);
			}
		})
	}

	//课表显示的函数
	function showLesson(data){
		console.log(data);
		if(data.result == false){
			$("#change-class").attr("disabled",true);
			$("#new-class").attr("disabled",false)
			alert("当前周和班级的课程还未添加")
			$(".class-table tr:eq(1) td:eq(2)").html("")
			$(".class-table tr:eq(2) td:eq(2)").html("")
			$(".class-table tr:eq(3) td:eq(2)").html("")
			$(".class-table tr:eq(4) td:eq(2)").html("")
			$(".class-table tr:eq(5) td:eq(2)").html("")
			$(".class-table tr:eq(6) td:eq(2)").html("")
			$(".class-table tr:eq(7) td:eq(2)").html("")

			$(".class-table tr:eq(1) td:eq(3)").html("")
			$(".class-table tr:eq(2) td:eq(3)").html("")
			$(".class-table tr:eq(3) td:eq(3)").html("")
			$(".class-table tr:eq(4) td:eq(3)").html("")
			$(".class-table tr:eq(5) td:eq(3)").html("")
			$(".class-table tr:eq(6) td:eq(3)").html("")
			$(".class-table tr:eq(7) td:eq(3)").html("")

			$(".class-table tr:eq(1) td:eq(4)").html("")
			$(".class-table tr:eq(2) td:eq(4)").html("")
			$(".class-table tr:eq(3) td:eq(4)").html("")
			$(".class-table tr:eq(4) td:eq(4)").html("")
			$(".class-table tr:eq(5) td:eq(4)").html("")
			$(".class-table tr:eq(6) td:eq(4)").html("")
			$(".class-table tr:eq(7) td:eq(4)").html("")

			$(".class-table tr:eq(1) td:eq(5)").html("")
			$(".class-table tr:eq(2) td:eq(5)").html("")
			$(".class-table tr:eq(3) td:eq(5)").html("")
			$(".class-table tr:eq(4) td:eq(5)").html("")
			$(".class-table tr:eq(5) td:eq(5)").html("")
			$(".class-table tr:eq(6) td:eq(5)").html("")
			$(".class-table tr:eq(7) td:eq(5)").html("")

			$(".class-table tr:eq(1) td:eq(6)").html("")
			$(".class-table tr:eq(2) td:eq(6)").html("")
			$(".class-table tr:eq(3) td:eq(6)").html("")
			$(".class-table tr:eq(4) td:eq(6)").html("")
			$(".class-table tr:eq(5) td:eq(6)").html("")
			$(".class-table tr:eq(6) td:eq(6)").html("")
			$(".class-table tr:eq(7) td:eq(6)").html("")

			$(".class-table tr:eq(1) td:eq(7)").html("")
			$(".class-table tr:eq(2) td:eq(7)").html("")
			$(".class-table tr:eq(3) td:eq(7)").html("")
			$(".class-table tr:eq(4) td:eq(7)").html("")
			$(".class-table tr:eq(5) td:eq(7)").html("")
			$(".class-table tr:eq(6) td:eq(7)").html("")
			$(".class-table tr:eq(7) td:eq(7)").html("")

			$(".class-table tr:eq(1) td:eq(8)").html("")
			$(".class-table tr:eq(2) td:eq(8)").html("")
			$(".class-table tr:eq(3) td:eq(8)").html("")
			$(".class-table tr:eq(4) td:eq(8)").html("")
			$(".class-table tr:eq(5) td:eq(8)").html("")
			$(".class-table tr:eq(6) td:eq(8)").html("")
			$(".class-table tr:eq(7) td:eq(8)").html("")

			$(".class-table tr:eq(1) td:eq(1)").html("")
			$(".class-table tr:eq(2) td:eq(1)").html("")
			$(".class-table tr:eq(3) td:eq(1)").html("")
			$(".class-table tr:eq(4) td:eq(1)").html("")
			$(".class-table tr:eq(5) td:eq(1)").html("")
			$(".class-table tr:eq(6) td:eq(1)").html("")
			$(".class-table tr:eq(7) td:eq(1)").html("")

			$(".workspace").html("")
		}else{
			$("#new-class").attr("disabled",true);
			$("#change-class").attr("disabled",false)
			localStorage.setItem("ll",data.lId);
			var reg = /[^,]+/g;
			var reg2 = /[^\\n]+/g;

			var oneDay = JSON.stringify(data.lMon);
			var twoDay = JSON.stringify(data.lTue);
			var threeDay = JSON.stringify(data.lWed);
			var fourDay = JSON.stringify(data.lThu);
			var fiveDay = JSON.stringify(data.lfri);
			var satDay = JSON.stringify(data.lsat);
			var sunDay = JSON.stringify(data.lsun);
			var classType = JSON.stringify(data.shuxin);
			var workSpace = JSON.stringify(data.workimportant);


			oneDay = oneDay.match(reg);
			twoDay = twoDay.match(reg);
			threeDay = threeDay.match(reg);
			fourDay = fourDay.match(reg);
			fiveDay = fiveDay.match(reg);
			satDay = satDay.match(reg);
			sunDay = sunDay.match(reg);
			classType = classType.match(reg);
			workSpace = workSpace.match(reg2);


			

			oneDay = delWord(oneDay);
			twoDay = delWord(twoDay);
			threeDay = delWord(threeDay);
			fourDay = delWord(fourDay);
			fiveDay = delWord(fiveDay);
			satDay = delWord(satDay);
			sunDay = delWord(sunDay);
			classType = delWord(classType);
			workSpace = delWord2(workSpace);
			// console.log(workSpace)

			changeword(oneDay);
			changeword(twoDay);
			changeword(threeDay);
			changeword(fourDay);
			changeword(fiveDay);
			changeword(satDay);
			changeword(sunDay);
			changeword(classType);

			function changeword(obj){
				var rewrite = "";
			
				for(var i = 0; i<obj.length; i++){
					if (obj[i]!=null) {
						obj[i]=obj[i].match(reg2);
					}
				}
				for(var i = 0; i<obj.length-1; i++){
					if (obj[i]==null) {
						continue;
					}else{
						for(var j=0; j<obj[i].length; j++){
							rewrite = rewrite+obj[i][j]+'</br>';
							console.log(rewrite)
						}
						obj[i]=rewrite;
						rewrite="";
					}
					
				}

			}
			

			var newWorkSpace = "";
			for(var i = 0; i<workSpace.length; i++){
				newWorkSpace = newWorkSpace+workSpace[i]+'</br>';
			}

			function delWord(obj){
				obj[0] = obj[0].replace(/"/g,"");
				// obj[3] = obj[3].replace(/"/g,"");
				obj[obj.length-1] = obj[obj.length-1].replace(/"/g,"");
				
				for(i=0;i<=6;i++){
					if (obj[i]==0) {
						obj[i]=null;
					};
				}
				return obj;
			}
			function delWord2(obj){
				obj[0] = obj[0].replace(/"/g,"");
				obj[obj.length-1] = obj[obj.length-1].replace(/"/g,"");
				return obj;
			}

			$(".class-table tr:eq(1) td:eq(2)").html(oneDay[0]);
			$(".class-table tr:eq(2) td:eq(2)").html(oneDay[1]);
			$(".class-table tr:eq(3) td:eq(2)").html(oneDay[2]);
			$(".class-table tr:eq(4) td:eq(2)").html(oneDay[3]);
			$(".class-table tr:eq(5) td:eq(2)").html(oneDay[4]);
			$(".class-table tr:eq(6) td:eq(2)").html(oneDay[5]);
			$(".class-table tr:eq(7) td:eq(2)").html(oneDay[6]);

			$(".class-table tr:eq(1) td:eq(3)").html(twoDay[0]);
			$(".class-table tr:eq(2) td:eq(3)").html(twoDay[1]);
			$(".class-table tr:eq(3) td:eq(3)").html(twoDay[2]);
			$(".class-table tr:eq(4) td:eq(3)").html(twoDay[3]);
			$(".class-table tr:eq(5) td:eq(3)").html(twoDay[4]);
			$(".class-table tr:eq(6) td:eq(3)").html(twoDay[5]);
			$(".class-table tr:eq(7) td:eq(3)").html(twoDay[6]);

			$(".class-table tr:eq(1) td:eq(4)").html(threeDay[0]);
			$(".class-table tr:eq(2) td:eq(4)").html(threeDay[1]);
			$(".class-table tr:eq(3) td:eq(4)").html(threeDay[2]);
			$(".class-table tr:eq(4) td:eq(4)").html(threeDay[3]);
			$(".class-table tr:eq(5) td:eq(4)").html(threeDay[4]);
			$(".class-table tr:eq(6) td:eq(4)").html(threeDay[5]);
			$(".class-table tr:eq(7) td:eq(4)").html(threeDay[6]);

			$(".class-table tr:eq(1) td:eq(5)").html(fourDay[0]);
			$(".class-table tr:eq(2) td:eq(5)").html(fourDay[1]);
			$(".class-table tr:eq(3) td:eq(5)").html(fourDay[2]);
			$(".class-table tr:eq(4) td:eq(5)").html(fourDay[3]);
			$(".class-table tr:eq(5) td:eq(5)").html(fourDay[4]);
			$(".class-table tr:eq(6) td:eq(5)").html(fourDay[5]);
			$(".class-table tr:eq(7) td:eq(5)").html(fourDay[6]);

			$(".class-table tr:eq(1) td:eq(6)").html(fiveDay[0]);
			$(".class-table tr:eq(2) td:eq(6)").html(fiveDay[1]);
			$(".class-table tr:eq(3) td:eq(6)").html(fiveDay[2]);
			$(".class-table tr:eq(4) td:eq(6)").html(fiveDay[3]);
			$(".class-table tr:eq(5) td:eq(6)").html(fiveDay[4]);
			$(".class-table tr:eq(6) td:eq(6)").html(fiveDay[5]);
			$(".class-table tr:eq(7) td:eq(6)").html(fiveDay[6]);

			$(".class-table tr:eq(1) td:eq(7)").html(satDay[0]);
			$(".class-table tr:eq(2) td:eq(7)").html(satDay[1]);
			$(".class-table tr:eq(3) td:eq(7)").html(satDay[2]);
			$(".class-table tr:eq(4) td:eq(7)").html(satDay[3]);
			$(".class-table tr:eq(5) td:eq(7)").html(satDay[4]);
			$(".class-table tr:eq(6) td:eq(7)").html(satDay[5]);
			$(".class-table tr:eq(7) td:eq(7)").html(satDay[6]);

			$(".class-table tr:eq(1) td:eq(8)").html(sunDay[0]);
			$(".class-table tr:eq(2) td:eq(8)").html(sunDay[1]);
			$(".class-table tr:eq(3) td:eq(8)").html(sunDay[2]);
			$(".class-table tr:eq(4) td:eq(8)").html(sunDay[3]);
			$(".class-table tr:eq(5) td:eq(8)").html(sunDay[4]);
			$(".class-table tr:eq(6) td:eq(8)").html(sunDay[5]);
			$(".class-table tr:eq(7) td:eq(8)").html(sunDay[6]);

			$(".class-table tr:eq(1) td:eq(1)").html(classType[0]);
			$(".class-table tr:eq(2) td:eq(1)").html(classType[1]);
			$(".class-table tr:eq(3) td:eq(1)").html(classType[2]);
			$(".class-table tr:eq(4) td:eq(1)").html(classType[3]);
			$(".class-table tr:eq(5) td:eq(1)").html(classType[4]);
			$(".class-table tr:eq(6) td:eq(1)").html(classType[5]);
			$(".class-table tr:eq(7) td:eq(1)").html(classType[6]);

			$(".workspace").html(newWorkSpace);

		}

	}
})
