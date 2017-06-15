/**
 * Created by Sunshine on 2017/6/15.
 */
function initClassData(data) {
    var row = data;
    var evergTeacher = [];
    for(var i=0;i<data.length;i++){
        if (data[i].tTeacher != undefined){
            if (data[i].tTeacher.indexOf(",") != "-1"){
                evergTeacher[i] = data[i].tTeacher.split(",");
                for (var t = 0;t<evergTeacher.length;t++){
                    row[i].tNameOne = evergTeacher[i][0];
                    row[i].tNameTwo = evergTeacher[i][1];
                    row[i].tNameThree = evergTeacher[i][2];
                }
            }else {
                row[i].tNameOne = "无";
                row[i].tNameTwo = "无";
                row[i].tNameThree = "无";
            }
        }else {
            row[i].tNameOne = "无";
            row[i].tNameTwo = "无";
            row[i].tNameThree = "无";
        }

        row[i].id = i + 1;
        row[i].cId = data[i].cId;
        row[i].cName = data[i].cName;
        row[i].sNum = data[i].sNumber;
    }

    return row;
}