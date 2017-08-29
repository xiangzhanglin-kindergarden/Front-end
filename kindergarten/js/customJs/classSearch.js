/**
 * Created by Sunshine on 2017/6/15.
 */
$(window).on("load",function () {
    var inputSearch = $("input#inputSearch");
    var buttonSearch = $(".buttonSearch");

    //刷新数据
    var buttonRefresh = $("input.buttonRefresh");
    buttonRefresh.click(function () {
        window.location.reload();
    });

    buttonSearch.click(function () {
        var searchValue = inputSearch.val();
        console.log(searchValue);

        $.ajax({
            type: "post",
            url: "http://172.20.2.164:8080/kindergarden/ClassSearch",
            data: "classSearch="+searchValue,
            beforeSend: function (xhr) {
                xhr.withCredentials = true;
                xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            },
            success: function (data) {
                console.log(data);
                if (data.indexOf("查找失败") !== -1 || data.indexOf("false") !== -1){
                    alert("查找失败");
                }else {
                    var rows = [];
                    var theData = JSON.parse(data);
                    if(theData.length !== "undefined"){
                        var row = {
                            id:"1",
                            cId:theData.cId,
                            cName:theData.cName,
                            tNameOne:theData.tTeacher.split(",")[0],
                            tNameTwo:theData.tTeacher.split(",")[1],
                            tNameThree:theData.tTeacher.split(",")[2],
                            sNum:theData.sNumber
                        };
                        rows.push(row);
                    }else {
                        for(var k=0;k<theData.length;k++){
                            rows[k].id = k+1;
                            rows[k].cId = theData[k].cId;
                            rows[k].cName = theData[k].cName;
                            rows[k].tNameOne = theData[k].tTeacher.split(",")[0];
                            rows[k].tNameTwo = theData[k].tTeacher.split(",")[1];
                            rows[k].tNameThree = theData[k].tTeacher.split(",")[2];
                            rows[k].sNum = theData[k].sNumber;
                        }
                    }
                    console.log(rows);
                    //添加数据
                    var table_list_2 = $("#table_list_2");
                    table_list_2.clearGridData();
                    for(var i=0;i<rows.length;i++){
                        table_list_2.jqGrid('addRowData',i+1,rows[i]);
                    }
                }
            },
            error: function (err) {
                console.log(err.status);
                alert("出现错误："+err.status);
            }
        });
    });

});