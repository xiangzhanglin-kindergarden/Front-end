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
            url: "http://172.20.2.164:8080/kindergarden/ClassSearch",
            data: "classSearch="+searchValue,
            beforeSend: function (xhr) {
                xhr.withCredentials = true;
                xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            },
            success: function (data) {
                console.log(data);
                if (data == "查找失败"){
                    alert(data);
                }else {
                    var theData = JSON.parse(data);
                    var row = initClassData(theData);
                    console.log(row);
                    //添加数据
                    var table_list_2 = $("#table_list_2");
                    table_list_2.clearGridData();
                    for(var i=0;i<row.length;i++){
                        table_list_2.jqGrid('addRowData',i+1,row[i]);
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