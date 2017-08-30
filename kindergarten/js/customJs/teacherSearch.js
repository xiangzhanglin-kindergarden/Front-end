/**
 * Created by Sunshine on 2017/6/15.
 */
$(window).on("load",function () {
    var inputSearch = $("input#inputSearch");
    var buttonSearch = $("input.buttonSearch");

    //刷新数据
    var buttonRefresh = $("input.buttonRefresh");
    buttonRefresh.click(function () {
        window.location.reload();
    });

    buttonSearch.click(function () {
        var searchValue = inputSearch.val();

        $.ajax({
            type: "post",
            url: "http://localhost/kindergarden/TeacherSearch",
            data: "sss="+searchValue,
            beforeSend: function (xhr) {
                xhr.withCredentials = true;
                xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            },
            success: function (tData) {
                console.log(tData);
                if (tData == "null"){
                    alert("无数据");
                }else {
                    var data = JSON.parse(tData);
                    var row = data;
                    for(var i=0;i<data.length;i++){
                        row[i].id = i+1;
                        row[i].tId = data[i].tId;
                        row[i].tName = data[i].tName;
                        row[i].tgrade = data[i].tgrade;
                        row[i].tSex = data[i].tSex;
                        row[i].tClass = data[i].cId;
                        row[i].tTell = data[i].tPhone;
                        row[i].tPassword = data[i].tWorkId;
                    }
                    console.log(row);
                    //添加数据
                    var table_list_2 = $("#table_list_2");
                    table_list_2.clearGridData();
                    for(var j=0;j<row.length;j++){
                        table_list_2.jqGrid('addRowData',j+1,row[j]);
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