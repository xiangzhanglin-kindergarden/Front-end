
/*
 *
 *   班级课表管理 功能
 *   
 *
*/

var nowWeek;
var secondTeamFweek;
var nowTeamFweek;



/*++++++++++++++++++++++++++++++++++++++++++*/
/* 与时间有关的函数  START */


//增加周数并获取周数
$(function(){
	var date = new Date();
	var week = getClassWeek();

	if (nowTeamFweek>=secondTeamFweek) {
		week = nowTeamFweek - secondTeamFweek+1;
	};
	$(".classtable table").attr("name",week)
	$(".reremove").html("第"+week+"周")
})


//下拉框发生改变时候的触发函数
	$(function(){
		//切换周数的时候的功能函数
		$(".form-group select").on("change",function(){
			var newWeek = $(this).val().replace(/[\u4E00-\u9FA5]/g,"");

			if (nowTeamFweek>=secondTeamFweek) {
				newWeek = parseInt(newWeek);
				newWeek=newWeek+secondTeamFweek-1;
			};
			console.log(newWeek);
			getXDate(newWeek);
		})
		//切换班级的时候的功能函数
		$(".class-group select").on("change",function(){
			var newWeek = $(".form-group select").val().replace(/[\u4E00-\u9FA5]/g,"");
			console.log(newWeek);

			if (nowTeamFweek>=secondTeamFweek) {
				newWeek = parseInt(newWeek);
				newWeek=newWeek+secondTeamFweek-1;
			};
			console.log(newWeek);
			getXDate(newWeek);
		})
	})

// 这个方法将取得某年(year)第几周(weeks)的星期几(weekDay)的日期 
	function getXDate(theWeek){ 
		// 用指定的年构造一个日期对象，并将日期设置成这个年的1月1日 
		var nowyear = new Date();
		year = nowyear.getFullYear();
		weeks = theWeek;
		weekday = 1;
		var date = new Date(year,"0","1"); 
		 
		// 取得这个日期对象 date 的长整形时间 time 
		var time = date.getTime(); 
		 
		// 将这个长整形时间加上第N周的时间偏移 
		// 因为第一周就是当前周,所以有:weeks-1,以此类推 
		time+=(weeks-1)*7*24*3600000; 
		 
		// 为日期对象 date 重新设置成时间 time 
		date.setTime(time); 

		getSelectWeek(date);
	}

////////////////////////////////////////////////////////////////////////////////////////////////////
//获取某一周的具体日期       START
////////////////////////////////////////////////////////////////////////////////////////////////////

	function getMonDate(theDate){
		day=theDate.getDay(),
		date=theDate.getDate();
		if(day==1)
		return theDate;
		if(day==0)
		theDate.setDate(date-6);
		else
		theDate.setDate(date-day+1);
		return theDate;
	}
	// 0-6转换成中文名称
	function getDayName(day){
		var day=parseInt(day);
		if(isNaN(day) || day<0 || day>6)
		return false;
		var weekday=["周天","周一","周二","周三","周四","周五","周六"];
		return weekday[day];
	}
	// d是当前星期日的日期对象
	function getSelectWeek(theDate){
		var d=getMonDate(theDate);
		var arr=[];
		console.log(d.getMonth()+1);
		var nowDayTime = d.getMonth();


		// $(".class-table thead th:eq(0) span").html(d.getMonth()+1+"月");

		for(var i=0; i<7; i++){
			if (i<7) {
				$(".classtable thead tr th:eq("+(i+2)+") span").html((d.getDate())+"日");
			};
			arr.push((d.getMonth()+1)+'月'+d.getDate()+'日 （'+getDayName(d.getDay())+'）');
			d.setDate(d.getDate()+1);
			console.log(arr[i]);
		}
		
		$(".classtable thead tr th:eq(1) span").html(nowDayTime+1+"月");




	}




////////////////////////////////////////////////////////////////////////////////////////////////////
//获取当前日期在当前年第几周
////////////////////////////////////////////////////////////////////////////////////////////////////


function getClassWeek(){
	var d1 = new Date();
	var d2 = new Date();
	var d3 = new Date();
	
	d2.setMonth(0);
	d2.setDate(1);

	d3.setMonth(7);
	d3.setDate(1);


	var yearFirstDay = d2.getDay();
	console.log("本年第一天是周："+yearFirstDay);
	if (yearFirstDay==0) {
		yearFirstDay=7;
	};

	var newteamDay = d3.getDay();
	console.log("7月第一天是周："+newteamDay);
	if (newteamDay==0) {
		newteamDay=7;
	};

	var rqa = d3-d2;
	var s1a = Math.ceil(rqa/(24*60*60*1000));
	++s1a;

	var s2a;
	var s3a = s1a-1;
	s2a = Math.ceil((s3a+yearFirstDay)/7);
	
	nowWeek = s2a;
	console.log("7月一日"+"是本年第"+s1a+"天，第"+s2a+"周");//周日做为下周的开始计算
	secondTeamFweek = s2a;


	// var weekday = yearFirstDay == 0?1:(7-yearFirstDay+1);


	var rq = d1-d2;
	var s1 = Math.ceil(rq/(24*60*60*1000));
	++s1;

	var s2;
	var s3 = s1-1;
	s2 = Math.ceil((s3+yearFirstDay)/7);
	
	nowWeek = s2;
	console.log("今天"+d1+"是本年第"+s1+"天，第"+s2+"周");//周日做为下周的开始计算
	nowTeamFweek = s2;
	return s2;
}


$(function(){
	var newWeek = $(".differ-class-box [name='week']").val();
	if (nowTeamFweek>=secondTeamFweek) {
		newWeek=nowTeamFweek;
	};
	console.log(newWeek);
	getXDate(newWeek);
})



/* 与时间有关的函数  END */
/********************************************/














































