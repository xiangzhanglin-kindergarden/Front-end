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
		teacherData = sessionStorage.getItem("teacherData");
		var data = JSON.parse(teacherData);
		// usertype = 0;
		userClass = data.cId;
		if (usertype == 0) {
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
				// "cid":userClass,
			});
			ajax(
				"http://119.29.53.178:8080/kindergarden/Lessonshowteacher",
				"lessonJson="+lesson,
				showLesson
			);

		}



	//点击新建课表
	$("#new-ok-btn").on("click",function(){
		$("#new-table tr td input").each(function(){
			if ($(this).val()==null||$(this).val()=="") {
				$(this).val(0);
				$(this).css({"color":"rgba(0,0,0,0)"});
			};
		})
		var lMon = String([
			$(".new-table tr:eq(1) td:eq(1) input").val(),
			$(".new-table tr:eq(2) td:eq(1) input").val(),
			$(".new-table tr:eq(3) td:eq(1) input").val(),
			$(".new-table tr:eq(4) td:eq(1) input").val()
			// ""
		])
		var lTue = String([
			$(".new-table tr:eq(1) td:eq(2) input").val(),
			$(".new-table tr:eq(2) td:eq(2) input").val(),		
			$(".new-table tr:eq(3) td:eq(2) input").val(),
			$(".new-table tr:eq(4) td:eq(2) input").val()
		])
		var lWed = String([
			$(".new-table tr:eq(1) td:eq(3) input").val(),
			$(".new-table tr:eq(2) td:eq(3) input").val(),		
			$(".new-table tr:eq(3) td:eq(3) input").val(),
			$(".new-table tr:eq(4) td:eq(3) input").val()
		])
		var lThu = String([
			$(".new-table tr:eq(1) td:eq(4) input").val(),
			$(".new-table tr:eq(2) td:eq(4) input").val(),		
			$(".new-table tr:eq(3) td:eq(4) input").val(),
			$(".new-table tr:eq(4) td:eq(4) input").val()
		])
		var lfri = String([
			$(".new-table tr:eq(1) td:eq(5) input").val(),
			$(".new-table tr:eq(2) td:eq(5) input").val(),		
			$(".new-table tr:eq(3) td:eq(5) input").val(),
			$(".new-table tr:eq(4) td:eq(5) input").val()
		])
		if (usertype == 0) {
			var courseMsg = JSON.stringify({
				"lId":null,
				"cName":userClass,
				"lWeek":$(".week").val(),
				"lMon":lMon,
				"lTue":lTue,
				"lWed":lWed,
				"lThu":lThu,
				"lfri":lfri,
				// "cid":userClass
			});
			console.log(courseMsg);
			ajax(
				"http://119.29.53.178:8080/kindergarden/LessonAddteacher",
				"lessonInJson="+courseMsg,
				function(res){
					alert("添加成功!");
					window.location.reload();
				}
			)
		}else{
			var courseMsg = JSON.stringify({
				"lId":null,
				"cName":$(".differ-class-box [name='class']").val(),
				"lWeek":$(".week").val(),
				"lMon":lMon,
				"lTue":lTue,
				"lWed":lWed,
				"lThu":lThu,
				"lfri":lfri
			});
			console.log(courseMsg);
			ajax(
				"http://119.29.53.178:8080/kindergarden/LessonAdd",
				"lessonInJson="+courseMsg,
				function(res){
					alert("添加成功!");
					window.location.reload();
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
				// "cid":userClass,
			});
			ajax(
				"http://119.29.53.178:8080/kindergarden/Lessonshowteacher",
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
				"lfri":null
			});
			ajax(
				"http://119.29.53.178:8080/kindergarden/LessonShow",
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
		ajax("http://119.29.53.178:8080/kindergarden/LessonShow","lessonJson="+lesson,showLesson);
	})
	var value = [];
	//点击修改按钮
	$("#change-class").on("click",function(){
		$(".differ-class-box [name='class']").attr("disabled",true);
		$(".differ-class-box [name='week']").attr("disabled",true);
		$("td").each(function(){
			if ($(this).attr("class") != "class-time"){
				$(this).html("<input class='class-change-input' value='"+$(this).html()+"'>")
			}
		})
		// console.log(value);
	})

	//修改的方法
	$(".mail-box-header").delegate("#change-class-yes","click",function(){
		$(".class-table tr td input").each(function(){
			if ($(this).val()==null||$(this).val()=="") {
				$(this).val(0);
				$(this).css({"color":"rgba(0,0,0,0)"});
			};
		})
		var lMon = String([
			$(".class-table tr:eq(1) td:eq(1) input").val(),
			$(".class-table tr:eq(2) td:eq(1) input").val(),
			$(".class-table tr:eq(3) td:eq(1) input").val(),
			$(".class-table tr:eq(4) td:eq(1) input").val()
		])
		var lTue = String([
			$(".class-table tr:eq(1) td:eq(2) input").val(),
			$(".class-table tr:eq(2) td:eq(2) input").val(),		
			$(".class-table tr:eq(3) td:eq(2) input").val(),
			$(".class-table tr:eq(4) td:eq(2) input").val()
		])
		var lWed = String([
			$(".class-table tr:eq(1) td:eq(3) input").val(),
			$(".class-table tr:eq(2) td:eq(3) input").val(),		
			$(".class-table tr:eq(3) td:eq(3) input").val(),
			$(".class-table tr:eq(4) td:eq(3) input").val()
		])
		var lThu = String([
			$(".class-table tr:eq(1) td:eq(4) input").val(),
			$(".class-table tr:eq(2) td:eq(4) input").val(),		
			$(".class-table tr:eq(3) td:eq(4) input").val(),
			$(".class-table tr:eq(4) td:eq(4) input").val()
		])
		var lfri = String([
			$(".class-table tr:eq(1) td:eq(5) input").val(),
			$(".class-table tr:eq(2) td:eq(5) input").val(),		
			$(".class-table tr:eq(3) td:eq(5) input").val(),
			$(".class-table tr:eq(4) td:eq(5) input").val()
		])
		if (usertype == 0) {
			var courseMsg = JSON.stringify({
				"lId":localStorage.getItem("ll"),
				"cName":userClass,
				"lWeek":$(".week").val(),
				"lMon":lMon,
				"lTue":lTue,
				"lWed":lWed,
				"lThu":lThu,
				"lfri":lfri,
				// "cid":userClass
			});
			console.log(courseMsg);
			ajax(
				"http://119.29.53.178:8080/kindergarden/LessonUpdate",
				"lessonJson="+courseMsg,
				function(res){
					alert("修改成功!");
					window.location.reload();
			})
		}else{
			var courseMsg = JSON.stringify({"lId":localStorage.getItem("ll"),"cName":$(".differ-class-box [name='class']").val(),"lWeek":$(".week").val(),"lMon":lMon,"lTue":lTue,"lWed":lWed,"lThu":lThu,"lfri":lfri});
			console.log(courseMsg);
			ajax("http://119.29.53.178:8080/kindergarden/LessonUpdate","lessonJson="+courseMsg,function(res){
				alert("修改成功!");
				window.location.reload();
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
			alert("当前周和班级的课程还未添加")
			$(".class-table tr:eq(1) td:eq(1)").html("")
			$(".class-table tr:eq(2) td:eq(1)").html("")
			$(".class-table tr:eq(3) td:eq(1)").html("")
			$(".class-table tr:eq(4) td:eq(1)").html("")

			$(".class-table tr:eq(1) td:eq(2)").html("")
			$(".class-table tr:eq(2) td:eq(2)").html("")
			$(".class-table tr:eq(3) td:eq(2)").html("")
			$(".class-table tr:eq(4) td:eq(2)").html("")

			$(".class-table tr:eq(1) td:eq(3)").html("")
			$(".class-table tr:eq(2) td:eq(3)").html("")
			$(".class-table tr:eq(3) td:eq(3)").html("")
			$(".class-table tr:eq(4) td:eq(3)").html("")

			$(".class-table tr:eq(1) td:eq(4)").html("")
			$(".class-table tr:eq(2) td:eq(4)").html("")
			$(".class-table tr:eq(3) td:eq(4)").html("")
			$(".class-table tr:eq(4) td:eq(4)").html("")

			$(".class-table tr:eq(1) td:eq(5)").html("")
			$(".class-table tr:eq(2) td:eq(5)").html("")
			$(".class-table tr:eq(3) td:eq(5)").html("")
			$(".class-table tr:eq(4) td:eq(5)").html("")
		}else{
			localStorage.setItem("ll",data.lId);
			var reg = /[^,]+/g;

			var oneDay = JSON.stringify(data.lMon);
			var twoDay = JSON.stringify(data.lTue);
			var threeDay = JSON.stringify(data.lWed);
			var fourDay = JSON.stringify(data.lThu);
			var fiveDay = JSON.stringify(data.lfri);

			oneDay = oneDay.match(reg);
			twoDay = twoDay.match(reg);
			threeDay = threeDay.match(reg);
			fourDay = fourDay.match(reg);
			fiveDay = fiveDay.match(reg);

			oneDay = delWord(oneDay);
			twoDay = delWord(twoDay);
			threeDay = delWord(threeDay);
			fourDay = delWord(fourDay);
			fiveDay = delWord(fiveDay);


			function delWord(obj){
				obj[0] = obj[0].replace(/"/g,"");
				obj[3] = obj[3].replace(/"/g,"");
				
				for(i=0;i<=3;i++){
					if (obj[i]==0) {
						obj[i]=null;
					};
				}
				return obj;
			}

			$(".class-table tr:eq(1) td:eq(1)").html(oneDay[0]);
			$(".class-table tr:eq(2) td:eq(1)").html(oneDay[1]);
			$(".class-table tr:eq(3) td:eq(1)").html(oneDay[2]);
			$(".class-table tr:eq(4) td:eq(1)").html(oneDay[3]);

			$(".class-table tr:eq(1) td:eq(2)").html(twoDay[0]);
			$(".class-table tr:eq(2) td:eq(2)").html(twoDay[1]);
			$(".class-table tr:eq(3) td:eq(2)").html(twoDay[2]);
			$(".class-table tr:eq(4) td:eq(2)").html(twoDay[3]);

			$(".class-table tr:eq(1) td:eq(3)").html(threeDay[0]);
			$(".class-table tr:eq(2) td:eq(3)").html(threeDay[1]);
			$(".class-table tr:eq(3) td:eq(3)").html(threeDay[2]);
			$(".class-table tr:eq(4) td:eq(3)").html(threeDay[3]);

			$(".class-table tr:eq(1) td:eq(4)").html(fourDay[0]);
			$(".class-table tr:eq(2) td:eq(4)").html(fourDay[1]);
			$(".class-table tr:eq(3) td:eq(4)").html(fourDay[2]);
			$(".class-table tr:eq(4) td:eq(4)").html(fourDay[3]);

			$(".class-table tr:eq(1) td:eq(5)").html(fiveDay[0]);
			$(".class-table tr:eq(2) td:eq(5)").html(fiveDay[1]);
			$(".class-table tr:eq(3) td:eq(5)").html(fiveDay[2]);
			$(".class-table tr:eq(4) td:eq(5)").html(fiveDay[3]);
		}

	}
})



