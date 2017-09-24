/**
 * Created by Sunshine on 2017/4/1.
 */


var isChecked = false;
function addTheBox(theCaption,theIndex,data) {
    var box = $(".theBox");
    var theBox = box[0];

    var body = $("body");
    var overlay = body.find("#lui_table_list_2")[0];
    overlay.style.display = "block";
    theBox.style.display = "block";
    theBox.className = "theBox boxHover";

    var top = document.createElement("div");
    top.className = "top";
    var topSpan = document.createElement("span");
    topSpan.className = "title";
    var closeSpan = document.createElement("span");
    closeSpan.className = "close";
    closeSpan.id = "closeBox";
    closeSpan.style.right = "0.3em";
    theBox.appendChild(top);
    top.appendChild(topSpan);
    top.appendChild(closeSpan);


    var closeBox = $("#closeBox")[0];
    var title = box.find(".title")[0];
    title.innerHTML = theCaption;

    var caption = ['学生姓名','身份证号码','性别','入学年龄','学生班级','入学时间','家长信息','家庭住址'];
    var optionClass = [];

    $.ajax({
        type: "get",
        url: "http://"+IPADDRESS+"/kindergarden/ClassShow",
        dataType: "JSON",
        contentType:"application/x-www-form-urlencoded;charset=UTF-8",
        beforeSend: function (xhr) {
            xhr.withCredentials = true;
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

            var adding = document.createElement("p");
            adding.className = "adding";
            adding.innerHTML = "数据加载中。。。";
            $(".theBox")[0].appendChild(adding);
        },
        success: function (classData) {
            $(".adding").remove();
            for(var clas=0;clas<classData.length;clas++){
                optionClass[clas] = classData[clas].cName;
            }



            for(var i=0;i<caption.length;i++){
                if (caption[i] == "性别"){
                    var theBoxSex = document.createElement("div");
                    theBoxSex.className = "theBoxInput";
                    theBox.appendChild(theBoxSex);

                    var spanSex = document.createElement("span");
                    spanSex.innerHTML = caption[i];
                    theBoxSex.appendChild(spanSex);
                    var selectSex = document.createElement("select");
                    theBoxSex.appendChild(selectSex);
                    var optionSex = ['男','女'];
                    for (var s=0;s<optionSex.length;s++){
                        var sexOption = document.createElement("option");
                        selectSex.appendChild(sexOption);
                        sexOption.innerHTML = optionSex[s];
                    }
                }else if (caption[i] == "入学年龄"){
                    var theBoxAge = document.createElement("div");
                    theBoxAge.className = "theBoxInput";
                    theBox.appendChild(theBoxAge);

                    var spanAge = document.createElement("span");
                    spanAge.innerHTML = caption[i];
                    theBoxAge.appendChild(spanAge);
                    var selectAge = document.createElement("select");
                    theBoxAge.appendChild(selectAge);
                    var optionAge = ['2','3','4','5','6','7'];
                    for (var a=0;a<optionAge.length;a++){
                        var ageOption = document.createElement("option");
                        selectAge.appendChild(ageOption);
                        ageOption.innerHTML = optionAge[a];
                    }
                }else if(caption[i] == "学生班级"){
                    var theBoxClass = document.createElement("div");
                    theBoxClass.className = "theBoxInput";
                    theBox.appendChild(theBoxClass);

                    var spanClass = document.createElement("span");
                    spanClass.innerHTML = caption[i];
                    theBoxClass.appendChild(spanClass);
                    var selectClass = document.createElement("select");
                    theBoxClass.appendChild(selectClass);
                    for (var c=0;c<optionClass.length;c++){
                        var classOption = document.createElement("option");
                        selectClass.appendChild(classOption);
                        classOption.innerHTML = optionClass[c];
                    }
                }else if (caption[i] == "家长信息"){
                    var theBoxParents = document.createElement("div");
                    theBoxParents.className = "theBoxParents";

                    var spanParent = document.createElement("span");
                    spanParent.innerHTML = caption[i];
                    var theBoxParentsMain = document.createElement("div");
                    theBoxParentsMain.className = "theBoxParentsMain";
                    var theBoxParentsI = document.createElement("i");
                    theBoxParentsI.className = "theAddParent";
                    var theBoxParentsInput = document.createElement("div");
                    theBoxParentsInput.className = "theBoxParentsInput";

                    theBox.appendChild(theBoxParents);
                    theBoxParents.appendChild(spanParent);
                    theBoxParents.appendChild(theBoxParentsMain);
                    theBoxParents.appendChild(theBoxParentsI);
                    theBoxParentsMain.appendChild(theBoxParentsInput);
                    for (var j=0;j<3;j++){
                        var inputParent = document.createElement("input");
                        inputParent.type = "text";
                        theBoxParentsInput.appendChild(inputParent);
                    }
                    var inputParents = $(".theBoxParentsInput").find("input");
                    inputParents[0].style.width = "110px";
                    inputParents[2].style.width = "180px";
                    inputParents[0].placeholder = "姓名";
                    inputParents[1].placeholder = "联系电话";
                    inputParents[2].placeholder = "登陆密码(身份证后六位)";
                    inputParents[2].readOnly = true;
                }else if (caption[i] == "家庭住址"){
                    var province = ['省',"直辖市","河北省","山西省","内蒙古自治区","辽宁省","吉林省","黑龙江省","江苏省","浙江省","安徽省","福建省","江西省","山东省","河南省","湖北省","湖南省","广东省","广西壮族自治区","海南省","四川省","贵州省","云南省","西藏自治区","陕西省","甘肃省","青海省","宁夏回族自治区","新疆维吾尔自治区","香港","澳门","台湾"];

                    //select
                    var theAddress = document.createElement("div");
                    theAddress.className = "theAddress";
                    var spanAddress = document.createElement("span");
                    spanAddress.innerHTML = caption[i];
                    var theBoxAddressMain = document.createElement("div");
                    theBoxAddressMain.className = "theBoxAddressMain";
                    theBox.appendChild(theAddress);
                    theAddress.appendChild(spanAddress);
                    theAddress.appendChild(theBoxAddressMain);

                    for (var d=0;d<2;d++){
                        var index = d;
                        var address = document.createElement("select");
                        theBoxAddressMain.appendChild(address);
                        address.id = "select"+index;

                        switch (d){
                            case 0://省
                                for (var p=0;p<province.length;p++){
                                    var pOptions = document.createElement("option");
                                    address.appendChild(pOptions);
                                    pOptions.value = province[p];
                                    pOptions.innerHTML = province[p];
                                }

                                break;
                            case 1://市
                                var cOptions = document.createElement("option");
                                address.appendChild(cOptions);
                                cOptions.innerHTML = "市";
                                break;
                        }
                        theBoxAddressMain.appendChild(address);
                    }
                    var inputAddress = document.createElement("input");
                    inputAddress.type = "text";
                    inputAddress.style.width = "180px";
                    inputAddress.placeholder = "详细地址";
                    theBoxAddressMain.appendChild(inputAddress);
                    var selectAddresses = $(".theBoxAddressMain").find("select");
                    selectAddresses[0].style.width = "110px";

                    var addressProvince = $("#select0")[0];
                    addressProvince.setAttribute("onChange","getCity()");

                    addressProvince.onChange = getCity();

                }else{
                    var theBoxInput = document.createElement("div");
                    theBoxInput.className = "theBoxInput";

                    var span = document.createElement("span");
                    span.innerHTML = caption[i];
                    var input = document.createElement("input");
                    input.type = "text";
                    input.placeholder = caption[i];

                    theBoxInput.appendChild(span);
                    theBoxInput.appendChild(input);
                    theBox.appendChild(theBoxInput);
                }

            }

            var theButton = document.createElement("div");
            theButton.className = "theButton";
            var inputSure = document.createElement("input");
            inputSure.type = "button";
            inputSure.value = "确定";
            var inputCancel = document.createElement("input");
            inputCancel.type = "button";
            inputCancel.value = "取消";

            theBox.appendChild(theButton);
            theButton.appendChild(inputSure);
            theButton.appendChild(inputCancel);


            //添加新家长
            var addMoreParents = $(".theAddParent")[0];
            addMoreParents.onclick = function () {
                var theBoxParentMain = $(".theBoxParentsMain")[0];
                var addtheBoxParentInput = document.createElement("div");
                addtheBoxParentInput.className = "theBoxParentsInput";
                theBoxParentMain.appendChild(addtheBoxParentInput);
                for (var j=0;j<3;j++){
                    var inputParent = document.createElement("input");
                    inputParent.type = "text";
                    addtheBoxParentInput.appendChild(inputParent);
                }
                addtheBoxParentInput.firstChild.style.width = "110px";
                addtheBoxParentInput.lastChild.style.width = "180px";
                var newParentInput = addtheBoxParentInput.getElementsByTagName("input");
                newParentInput[0].placeholder = "姓名";
                newParentInput[1].placeholder = "联系电话";
                newParentInput[2].placeholder = "默认登陆密码：123456";
                newParentInput[2].readOnly = true;
            };




            //关闭添加框
            var buttonInput = $(".theButton");
            var cancel = buttonInput.find("input")[1];
            closeBox.addEventListener("click",closeTheBox);
            cancel.addEventListener("click",closeTheBox);
            function closeTheBox() {
                var theBox = $(".theBox");
                overlay.style.display = "none";
                theBox.hide(800);

                theBox.find("div").remove();
            }



            //编辑信息
            if (theCaption == "编辑"){
                var rowData = data[theIndex-1];

                var boxInput = $(".theBoxInput");
                var editInput = boxInput.find("input");
                var editSelect = boxInput.find("select");

                editInput[0].value = rowData.sName;
                editInput[1].value = rowData.sIdentifyId;
                editInput[2].value = rowData.sComeTime;
                editSelect[0].id = "theSex";//性别
                var theSex = $("#theSex");
                if (rowData.sSex == "男"){
                    theSex.find("option")[0].selected = true;
                }else {
                    theSex.find("option")[1].selected = true;
                }
                editSelect[1].id = "comeAge";//入学年龄
                var comeAge = $("#comeAge");
                if (rowData.sComeAge>=2 && rowData.sComeAge<=7){
                    comeAge.find("option")[parseInt(rowData.sComeAge)-2].selected = true;
                }
                editSelect[2].id = "className";//班级信息
                for(var o=0;o<optionClass.length;o++){
                    if (rowData.cId == optionClass[o]){
                        $("#className").find("option")[o].selected = true;
                    }
                }

                var editTheBoxParentsMain = $(".theBoxParentsMain");//家长信息
                var editTheBoxParentsInput = $(".theBoxParentsInput");
                editTheBoxParentsInput.remove();
                var parentName = [], parentTell = [];
                if (rowData.sAcount.indexOf(".") != "-1"){
                    var everyParent = rowData.sAcount.split(".");
                    for(var e=0;e<everyParent.length-1;e++){
                        var everyParentInfo = everyParent[e].split(":");
                        parentName[e] = everyParentInfo[0];
                        parentTell[e] = everyParentInfo[1];
                    }
                }else {
                    var parents = rowData.sAcount.split(":");
                    parentName[0] = parents[0];
                    parentTell[0] = parents[1];
                }


                for (var k=0;k<parentName.length;k++){
                    var newParentsInput = document.createElement("div");
                    newParentsInput.className = "theBoxParentsInput";
                    newParentsInput.id = "newParent" + k;
                    editTheBoxParentsMain[0].appendChild(newParentsInput);
                    var newInputParent = [];
                    for (var n=0;n<3;n++){
                        newInputParent[n] = document.createElement("input");
                        newInputParent[n].type = "text";
                        newParentsInput.appendChild(newInputParent[n]);
                    }
                    newInputParent[0].value = parentName[k];
                    newInputParent[1].value = parentTell[k];
                    newInputParent[2].value = "密码：123456（无法修改）";
                    newInputParent[2].readOnly = true;
                    newParentsInput.firstChild.style.width = "110px";
                    newParentsInput.lastChild.style.width = "180px";
                }

                $(".theBoxAddressMain").remove();//家庭住址
                var newAddress = $(".theAddress");
                var newAddressMain = document.createElement("div");
                newAddressMain.className = "theBoxAddressMain";
                newAddress[0].appendChild(newAddressMain);
                var newAddressInput = document.createElement("input");
                newAddressInput.style.width = "500px";
                newAddressMain.appendChild(newAddressInput);
                newAddressInput.value = rowData.sAddress;


                //提交编辑信息
                var edit = buttonInput.find("input")[0];
                edit.addEventListener("click",function () {
                    editSubmit(rowData.sId);
                });
            }




            checkInput();

            //提交信息
            if (theCaption == "添加"){
                var add = buttonInput.find("input")[0];
                add.addEventListener("click",function () {
                    if(isChecked){
                        addSubmit();
                    }
                });
            }
        },
        error: function (err) {
            console.log(err.status);
            alert("出现错误："+err.status);
        }

    });



}


//校验
function checkInput() {
    var inputs = $(".theBox").find("input");
    var selects = $(".address");

    for (var j=0;j<inputs.length;j++){
        inputs[j].setAttribute("index",j);
    }
    for (var i=0;i<inputs.length;i++){
        inputs[i].onblur = function () {
            var now = parseInt(this.getAttribute("index"));
            switch (now){
                case 0:
                    if (inputs[0].value == ""){
                        changeBorder(this,0);
                        var p = document.createElement("p");
                        p.className = "theAttention";
                        p.innerHTML = "请输入姓名";
                        var parent = $(this).parent();
                        parent[0].appendChild(p);
                    }else {
                        changeBorder(this,1);

                    }
                    break;
                case 1:
                    var theLength = inputs[1].value;
                    if (theLength.length != "18"){
                        changeBorder(this,0);
                        var pI = document.createElement("p");
                        pI.className = "theAttention";
                        pI.innerHTML = "请输入正确18号身份证";
                        var parentI = $(this).parent();
                        parentI[0].appendChild(pI);
                    }else {
                        changeBorder(this,1);
                    }
                    break;
                case 2:
                    var time = inputs[2].value;
                    if (time == ""){
                        changeBorder(this,0);
                        var pTime = document.createElement("p");
                        pTime.className = "theAttention";
                        pTime.innerHTML = "请选择时间";
                        var parentTime = $(this).parent();
                        parentTime[0].appendChild(pTime);
                    }else {
                        changeBorder(this,1);
                    }
                    break;
                case 3:
                    var pName = inputs[3].value;
                    if (pName == ""){
                        changeBorder(this,0);
                    }else {
                        this.style.borderColor = "#52b205";
                        this.style.borderWidth = "2px";
                    }
                    break;
                case 4:
                    var pTell = inputs[4].value;
                    if (pTell.length != "11"){
                        changeBorder(this,0);
                    }else {
                        this.style.borderColor = "#52b205";
                        this.style.borderWidth = "2px";
                    }
                    break;
                case 6:
                    var address = inputs[6].value;
                    if (address == ""){
                        changeBorder(this,0);
                    }else{
                        this.style.borderColor = "#52b205";
                        this.style.borderWidth = "2px";
                    }
                    break;
                default:
            }

            function changeBorder(border,index) {

                $("p.theAttention").remove();
                if (index == 1){

                    $("p.theAttentionSure").remove();
                    border.style.borderColor = "#52b205";
                    border.style.borderWidth = "2px";
                    var sure1 = document.createElement("p");
                    sure1.className = "theAttentionSure";
                    sure1.innerHTML = "√";
                    sure1.style.color = "#52b205";
                    var parentSure1 = $(border).parent();
                    parentSure1[0].appendChild(sure1);
                }else if(index == 0){

                    border.style.borderColor = "red";
                    border.style.borderWidth = "2px";
                }
            }

        };

    }




    //时间选择
    var chooseTime = $(inputs[2]);
    $(function () {
        var currYear = (new Date()).getFullYear();
        var opt={};
        opt.date = {preset : 'date'};
        opt.datetime = {preset : 'datetime'};
        opt.time = {preset : 'time'};
        opt.default = {
            theme: 'android-ics light', //皮肤样式
            display: 'modal', //显示方式
            mode: 'scroller', //日期选择模式
            dateFormat: 'yyyy-mm',
            dateOrder: 'yymd',
            onBeforeShow: function (inst) { inst.settings.wheels[0].length>2?inst.settings.wheels[0].pop():null; },
            lang: 'zh',
            showNow: true,
            nowText: "今天",
            startYear: currYear - 50, //开始年份
            endYear: currYear + 10, //结束年份
            onSelect: function (value) {
                chooseTime.val(value);
            }
        };
        chooseTime.mobiscroll($.extend(opt['date'], opt['default']));
    });

    chooseTime.click(function () {
        $('#USER_AGE').mobiscroll('show');
    });
    chooseTime[0].readOnly = true;

    isChecked = true;
}


//提交
function addSubmit() {

    var values;
    var boxInput = $(".theBoxInput");
    var theBoxInput = boxInput.find("input");
    var theBoxSelect = boxInput.find("select");

    var sAcount = [];
    var theBoxParent = $(".theBoxParentsInput");
    var theBoxParentsInput = [];
    for(var p=0;p<theBoxParent.length;p++){
        theBoxParentsInput[p] = theBoxParent[p].getElementsByTagName("input");
        sAcount = sAcount + theBoxParentsInput[p][0].value + ":" + theBoxParentsInput[p][1].value + "."
    }

    var theBoxAddress = $(".theBoxAddressMain");
    var addressSelect = theBoxAddress.find("select");
    var addressInput = theBoxAddress.find("input");
    var address = addressSelect[0].value + addressSelect[1].value + addressInput[0].value;
    var cName = theBoxSelect[2].value;
    var cNameC = cName.substring(0,1),
        cNameT = cName.substring(1);
    var theCname = cNameC+","+cNameT;

    if(theBoxInput[0].value === ""){
        alert("请填写学生姓名！");
    }else if(theBoxInput[1].value === ""){
        alert("请输入正确18号身份证！");
    }else if(theBoxInput[2].value === ""){
        alert("请选择入学时间！");
    }else if(addressSelect[0].value === ""){
        alert("请填写家长信息！");
    }else if(addressSelect[1].value === ""){
        alert("请填写家长信息！");
    }else if(addressInput[0].value === ""){
        alert("请填写家庭住址！");
    }else {
        values = {
            sId: null,
            sName: theBoxInput[0].value,
            sIdentifyId: theBoxInput[1].value,
            sSex: theBoxSelect[0].value,
            sComeAge: theBoxSelect[1].value,
            cId: theCname,
            sComeTime: theBoxInput[2].value,
            sAcount: sAcount,
            sPassword: "123456",
            sAddress: address
        };


        $.ajax({
            type:"post",
            url:"http://"+IPADDRESS+"/kindergarden/StudentAdd",
            // dataType:"JSON",
            data:"studentjson="+JSON.stringify(values),
            contentType:"application/x-www-form-urlencoded;charset=utf-8",
            beforeSend: function (xhr) {
                xhr.withCredentials = true;
                xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            },
            success: function () {
                alert("添加成功！");
                var box = $(".theBox");
                box.hide(800);
                window.location.reload();
            },
            error: function (err) {
                console.log(err.status);
                alert("出现错误："+err.status + "，信息填写错误");
            }
        });
    }


}


//编辑操作
function editSubmit(id) {
    var values;
    var boxInput = $(".theBoxInput");
    var theBoxInput = boxInput.find("input");
    var theBoxSelect = boxInput.find("select");

    var sAcount = [];
    var theBoxParent = $(".theBoxParentsInput");
    var theBoxParentsInput = [];
    for(var p=0;p<theBoxParent.length;p++){
        theBoxParentsInput[p] = theBoxParent[p].getElementsByTagName("input");
        sAcount = sAcount + theBoxParentsInput[p][0].value + ":" + theBoxParentsInput[p][1].value + "."
    }

    var theBoxAddress = $(".theBoxAddressMain");
    var addressInput = theBoxAddress.find("input");
    var address = addressInput[0].value;
    var cName = theBoxSelect[2].value;
    var cNameC = cName.substring(0,1),
        cNameT = cName.substring(1);
    var theCname = cNameC+","+cNameT;
    console.log(sAcount);
    values = {
        sId: id,
        sName: theBoxInput[0].value,
        sIdentifyId: theBoxInput[1].value,
        sSex: theBoxSelect[0].value,
        sComeAge: theBoxSelect[1].value,
        cId: theCname,
        sComeTime: theBoxInput[2].value,
        sAcount: sAcount,
        sPassword: "123456",
        sAddress: address
    };

    console.log(values);

    $.ajax({
        type:"post",
        url:"http://"+IPADDRESS+"/kindergarden/StudentUpdate",
        // dataType:"JSON",
        data:"StudentJson="+JSON.stringify(values),
        contentType:"application/x-www-form-urlencoded;charset=utf-8",
        beforeSend: function (xhr) {
            xhr.withCredentials = true;
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        },
        success: function () {
            alert("修改成功！");
            var box = $(".theBox");
            box.hide(800);
            window.location.reload();
        },
        error: function (err) {
            console.log(err.status);
            alert("出现错误："+err.status);
        }
    });





}


//删除操作
function delData(delIndex) {
    var rowData = [];
    var rowTr = $("#table_list_2").find("tr")[delIndex];
    var rowTd = rowTr.getElementsByTagName("td");
    var delId = rowTd[rowTd.length-1].innerHTML;
    for (var d=0;d<rowTd.length-1;d++){
        rowData[d] = rowTd[d].innerHTML;
    }
    console.log(delId);
    $.ajax({
        type: "post",
        url: "http://"+IPADDRESS+"/kindergarden/StudentDlete",
        data: "sid="+delId,
        beforeSend: function (xhr) {
            xhr.withCredentials = true;
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        },
        success: function () {
            alert("删除成功！");
            window.location.reload();//刷新页面
            // $("#table_list_2").trigger("reloadGrid");
        },
        error: function (err) {
            console.log(err.status);
            alert("出现错误："+err.status);
        }
    });
}


//查看详情操作
function showDetails(data) {
    var buttons = $("#table_list_2").find("input.theDetails");
    var show = $("#details");
    var theContent = $(".showContent")[0];
    var overlay = $("body").find("#lui_table_list_2")[0];
    var caption = ['姓名：','性别：','学生班级：','学生身份证：','家长信息：','入学年龄：','入学时间：','家庭住址：','登陆密码：'];
    for(var i=0;i<buttons.length;i++){
        buttons[i].setAttribute("data-buttonsIndex",i);
        buttons[i].onclick = function () {
            var index = parseInt(this.getAttribute("data-buttonsIndex"));

            overlay.style.display = "block";
            console.log(theContent);
            var rows = data[index];
            var row = [rows.sName,rows.sSex,rows.cId,rows.sIdentifyId,rows.sAcount,rows.sComeAge,rows.sComeTime,rows. sAddress,rows.sPassword];
            show.show(400);

            for(var i=0;i<row.length;i++){
                var divContnet = document.createElement("div");
                divContnet.className = "contentData";
                
                var spanCaption = document.createElement("span");
                var spanContent = document.createElement("span");
                divContnet.appendChild(spanCaption);
                divContnet.appendChild(spanContent);
                spanCaption.innerHTML = caption[i];
                spanContent.innerHTML = row[i];
                theContent.appendChild(divContnet);
            }


        }
    }
    var closeDetails = $("#closeDetails");
    closeDetails.click(function () {
        overlay.style.display = "none";
        show.hide(400);
        $(".showContent").find("div").remove();
    })
}



function getCity(){
    var city = [
        ["市"],
        ["北京市","天津市","上海市","重庆市"],
        ["石家庄市","唐山市","秦皇岛市","邯郸市","邢台市","保定市","张家口市","承德市","沧州市","廊坊市","衡水市"],//河北省
        ["太原市","大同市","阳泉市","长治市","晋城市","朔州市","晋中市","运城市","忻州市","临汾市","吕梁市"],//山西省
        ["呼和浩特市","包头市","乌海市","赤峰市","通辽市","鄂尔多斯市","呼伦贝尔市","巴彦淖尔市","乌兰察布市","兴安盟","锡林郭勒市","阿拉善盟"],//内蒙古自治区
        ["沈阳市","大连市","鞍山市","抚顺市","本溪市","丹东市","锦州市","营口市","阜新市","辽阳市","盘锦市","铁岭市","朝阳市","葫芦岛市"],//辽宁省
        ["长春市","吉林市","四平市","辽源市","白山市","松原市","白城市","延边州"],//吉林省
        ["哈尔滨市","齐齐哈尔市","鸡西市","鹤岗市","双鸭山市","大庆市","伊春市","佳木斯市","七台河市","牡丹江市","黑河市","绥化市","大兴安岭地区"],//黑龙江省
        ["南京市","无锡市","徐州市","常州市","苏州市","南通市","连云港市","淮安市","盐城市","扬州市","镇江市","泰州市","宿迁市"],//江苏省
        ["杭州市","宁波市","温州市","嘉兴市","湖州市","绍兴市","金华市","衢州市","舟山市","台州市","丽水市"],//浙江省
        ["合肥市","芜湖市","蚌埠市","淮南市","铜陵市","安庆市","黄山市","滁州市","阜阳市","宿州市","巢湖市","六安市","亳州市","池州市","宣城市"],//安徽省
        ["福州市","厦门市","莆田市","三明市","泉州市","漳州市","南平市","龙岩市","宁德市"],//福建省
        ["南昌市","景德镇市","萍乡市","九江市","新余市","鹰潭市","赣州市","吉安市","宜春市","抚州市","上饶市"],//江西省
        ["济南市","青岛市","淄博市","枣庄市","东营市","烟台市","廊坊市","济宁市","泰安市","威海市","照市","莱芜市","临沂市","德州市","聊城市","滨州市","菏泽市"],//山东省
        ["郑州市","开封市","洛阳市","平顶山市","安阳市","鹤壁市","新乡市","焦作市","濮阳市","许昌市","漯河市","三峡门市","南阳市","南丘市","信阳市","周口市","驻马店市"],//河南省
        ["武汉市","黄石市","十堰市","宜昌市","襄樊市","鄂州市","荆门市","孝感市","荆州市","黄冈市","咸宁市","随州市","恩施市","仙桃市","潜江市","天门市","神农架林区"],//湖北省
        ["长沙市","株洲市","湘潭市","衡阳市","邵阳市","岳阳市","常德市","张家界市","益阳市","郴州市","永州市","怀化市","娄底市","湘西市"],//湖南省
        ["广州市","韶关市","深圳市","珠海市","汕头市","佛山市","江门市","湛江市","茂名市","肇庆市","惠州市","梅州市","汕尾市","河源市","阳江市","清远市","东莞市","中山市","潮州市","揭阳市","云浮市"],//广东省
        ["南宁市","柳州市","桂林市","梧州市","北海市","防城港市","钦州市","贵港市","玉林市","百色市","贺州市","河池市","来宾市","崇左市"],//广西壮族自治区
        ["海口市","三亚市","五指山市","琼海市","儋州市","文昌市","万宁市","东方市","安定县","屯昌县","澄迈县","临高县","白沙县","昌江县","乐东县","陵水县","保亭县","琼中县","西沙群岛","南沙群岛","中沙群岛"],//海南省
        ["成都市","自贡市","攀枝花市","泸州市","德阳市","绵阳市","广元市","遂宁市","内江市","乐山市","南充市","眉山市","宜宾市","广安市","达州市","雅安市","巴中市","资阳市","阿坝州","甘孜州","凉山州"],//四川省
        ["贵阳市","六盘水市","遵义市","安顺市","铜仁地区","黔西南州","毕节地区","黔东南州","黔南州"],//贵州省
        ["昆明市","曲靖市","玉溪市","保山市","昭通市","丽江市","普洱市","临沧市","文山州","红河州","西双版纳州","楚雄州","大理州","德宏州","怒江州","迪庆州"],//云南省
        ["拉萨市","昌都地区","山南地区","喀则地区","那曲地区","阿里地区","林芝地区"],//西藏自治区
        ["西安市","铜川市","宝鸡市","咸阳市","渭南市","延安市","汉中市","榆林市","安康市","南洛市"],//陕西省
        ["兰州市","嘉峪关市","金昌市","白银市","天水市","武威市","张掖市","平凉市","酒泉市","庆阳市","定西市","陇南市","临夏州","甘南州"],//甘肃省
        ["西宁市","海东地区","海北州","黄南州","海南州","果洛州","玉树州","海西州"],//青海省
        ["银川市","石嘴山市","吴忠市","固原市","中卫市"],//宁夏回族自治区"
        ["乌鲁木齐市","克拉玛依市","吐鲁番地区","哈密地区","昌吉州","博尔塔拉州","巴音郭楞州","阿克苏地区","克孜勒苏州","喀什地区","和田地区","伊犁州","塔城地区","阿勒泰地区","石河子市","阿拉尔市","图木舒克","五家渠市"],//新疆维吾尔自治区
        ["香港"],//香港
        ["澳门"],//澳门
        ["台湾"]//台湾
    ];

    //获得省份下拉框的对象
    var sltProvince = $("#select0")[0];
    //获得城市下拉框的对象
    var sltCity = $("#select1")[0];
    //得到对应省份的城市数组
    var provinceCity=city[sltProvince.selectedIndex - 0];
    //清空城市下拉框，仅留提示选项
    sltCity.length=1;

    //将城市数组中的值填充到城市下拉框中
    for(var i=0;i<provinceCity.length;i++){
        sltCity[i+1]=new Option(provinceCity[i],provinceCity[i]);
    }
}

