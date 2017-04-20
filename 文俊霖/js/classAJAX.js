$(function(){
	var username = sessionStorage.getItem("user");
	var usertype = sessionStorage.getItem("nub");  //0为老师，1为校长
	console.log(username);
	console.log(usertype);
	if (usertype == 0) {
		
	}
})



$(document).ready(function(){
	var date = new Date();
	var week = date.getUTCDay();

	var myjson = "";      //传递参数的内容
	var url = "";    //物理地址
	var IP = "";     //IP地址

	var cClass = $(".differ-class-box [name='class'] option:selected").val();
	var year = $(".differ-class-box [name='year'] option:selected").val();
	var week = $(".differ-class-box [name='week'] option:selected").val();

	console.log(cClass);
	console.log(year);
	console.log(week);

	var mydata = new Array();
	// mydata[0] = '{"l_id":null}';
	// mydata[1] = '{"l_term":year}';
	// mydata[2] = '{"l_week":week}';
	// mydata[3] = '{"l_mon":null}';
	// mydata[4] = '{"l_tur":null}';
	// mydata[5] = '{"l_thur":null}';
	// mydata[6] = '{"l_fri":null}';
	// mydata[7] = '{"c_id":cClass}';

	mydata[0] = null;
	mydata[1] = year;
	mydata[2] = week;
	mydata[3] = null;
	mydata[4] = null;
	mydata[5] = null;
	mydata[6] = null;
	mydata[7] = cClass;

	// console.log(mydata)
	// myjson = mydata;
	// mydata = mydata.toString();
	
	// console.log(mydata);


	IP = "119.29.53.178:8080/";
	url = "kindergarden/LessonShow";

	//myjson  对象
	// myjson = {"l_id":null,"l_term":year,"l_week":week,"l_mon":null,"l_tur":null,"l_wed":null,"l_thur":null,"l_fri":null,"c_id":cClass};

	//myjson  字符串
	// myjson = JSON.stringify(myjson);
	
	//myjson 数组
	myjson = mydata;
	
	console.log(myjson);
	console.log(typeof myjson);

	$.ajax({
		// type:"get",
		type:"post",
		url:"http://"+IP+url,
		data:myjson,
		dataType:"JSON",
		contentType:"application/x-www-form-urlencoded;charset=UTF-8",
		// contentType:"application/x-www-form-urlencoded;charset=UTF-8",
		beforeSend:function(xhr){
			xhr.withCredentials = true;
			xhr.setRequestHeader("X-Requested-with","XMLHttpRequest");
		},
		success:function(data){
			console.log(data);
		},
		error:function(jqHXR){
			console.log("错误:"+jqHXR.status);
		}
	})
})

