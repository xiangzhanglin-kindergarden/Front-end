$(function(){
	var username = sessionStorage.getItem("user");
	var usertype = sessionStorage.getItem("nub");  //0为老师，1为校长
	console.log(username);
	console.log(usertype);
	if (usertype == 0) {
		
	}
})



$(document).ready(function(){

	//点击新建课表
	$("#new-ok-btn").on("click",function(){
		var lMon = String([
			$(".new-table tr:eq(1) td:eq(1) input").val(),
			$(".new-table tr:eq(2) td:eq(1) input").val(),
			$(".new-table tr:eq(3) td:eq(1) input").val(),
			$(".new-table tr:eq(4) td:eq(1) input").val()
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
		var courseMsg = JSON.stringify({"lId":null,"cName":$(".differ-class-box [name='class']").val(),"lWeek":$(".week").val(),"lMon":lMon,"lTue":lTue,"lWed":lWed,"lThu":lThu,"lfri":lfri});
		ajax("http://119.29.53.178:8080/kindergarden/LessonAdd","lessonInJson="+courseMsg,function(res){
			alert("添加成功!");
			window.location.reload();
		})
	})
	//切换周的时候的功能函数
	$(".differ-class-box [name='week']").on("change",function(){
		var lesson = JSON.stringify({"lId":null,"cName":$(".differ-class-box [name='class']").val(),"lWeek":$(this).val(),"lMon":null,"lTue":null,"lWed":null,"lThu":null,"lfri":null});
		ajax("http://119.29.53.178:8080/kindergarden/LessonShow","lessonJson="+lesson,showLesson);
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
		for(var i = 0;i < $(".class-end").length;i++){
			value.push($(".class-end:eq("+i+")").html());
			$(".class-end:eq("+i+")").html("<input type='text' class='col-sm-12 edit' value='"+$(".class-end:eq("+i+")").html()+"'/>");
		}
		console.log(value);
	})

	//修改的方法
	$(".mail-box-header").delegate("#change-class-yes","click",function(){
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
		var courseMsg = JSON.stringify({"lId":localStorage.getItem("ll"),"cName":$(".differ-class-box [name='class']").val(),"lWeek":$(".week").val(),"lMon":lMon,"lTue":lTue,"lWed":lWed,"lThu":lThu,"lfri":lfri});
		ajax("http://119.29.53.178:8080/kindergarden/LessonUpdate","lessonJson="+courseMsg,function(res){
			alert("修改成功!");
			window.location.reload();
		})
	})

	function ajax(url,data,callback){
		$.ajax({
			url : url,
			type : "POST",
			dataType : "json",
			data : data,
			contentType:"application/x-www-form-urlencoded;charset=UTF-8",
			success : function(res){
				if(res != null){
					callback(res);
				}
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
		}
	}
})



