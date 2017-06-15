/**
 * Created by Sunshine on 2017/6/15.
 */

function initData(data) {
    var row = data;
    var sParent = {
        name: "",
        tell: ""
    };
    var everyParent = [];
    for (var j=0;j<data.length;j++){
        if (data[j].sAcount == undefined){
            data[j].sAcount = "未填写家长.未填写电话";
        }else if (data[j].sAcount.indexOf(".") != "-1"){
            everyParent = data[j].sAcount.split(".");
            var sParentNow = [];
            for(var p=0;p<everyParent.length-1;p++){
                sParentNow[p]= everyParent[p].split(":");
                sParent.name = sParent.name + sParentNow[p][0] + "  ";
                sParent.tell = sParent.tell + sParentNow[p][1] + "  ";
            }

            row[j].sParentName = sParent.name;//家长姓名
            row[j].sTell = sParent.tell;//家长电话
            sParent = {name: "", tell: ""};
        }else {
            var sParents = data[j].sAcount.split(":");
            row[j].sParentName = sParents[0];//家长姓名
            row[j].sTell = sParents[1];//家长电话
        }
        row[j].id = j+1;
        row[j].sId = data[j].sId;//ID
        row[j].sName = data[j].sName;//姓名
        row[j].sSex = data[j].sSex;//性别
        row[j].cId = data[j].cId;//班级
        row[j].sIdentifyId = data[j].sIdentifyId;//身份证号
        row[j].sPassword = data[j].sPassword;//密码
    }

    return row;
}