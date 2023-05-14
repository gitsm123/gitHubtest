function isIE() { //ie?
    if (window.navigator.userAgent.toLowerCase().indexOf("msie") >= 1)
        return true;
    else
        return false;
}

if (!isIE()) { //firefox innerText 定义
    HTMLElement.prototype.__defineGetter__("innerText",
    function () {
        var anyString = "";
        var childS = this.childNodes;
        for (var i = 0; i < childS.length; i++) {
            if (childS[i].nodeType == 1)
                anyString += childS[i].innerText;
            else if (childS[i].nodeType == 3)
                anyString += childS[i].nodeValue;
        }
        return anyString;
    }
    );
    HTMLElement.prototype.__defineSetter__("innerText",
    function (sText) {
        this.textContent = sText;
    }
    );
}

//判断浏览器类型
function JudgeBrowserType() {
    var type = "";
    if (window.XMLHttpRequest) { //Mozilla, Safari, IE7 
        if (!window.ActiveXObject) { // Mozilla, Safari,   
            //alert('Mozilla, Safari');
            type = "Mozilla";
        }
        else {
            //alert('IE7');  
            type = "IE7";
        }
    }
    else {
        //alert('IE6');  
        type = "IE6";
    }
    return type;
}

function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

//去空格
function Trim(value) {
    return value.replace(/(^\s*)|(\s*$)/g, "");
}

//判断是否为空
function IsEmpty(value) {
    if (value == null) {
        return true;
    }
    else {
        if (Trim(value) == "")
            return true;
        else
            return false;
    }
}

//是否正小数和0
function IsFloat(str) {
    str = Trim(str);
    var reg = /^\d+(\.\d+)?$/;
    if (str.match(reg) == null) {
        return false;
    }
    else {
        return true;
    }
}

//验证是否是数字
function IsNum(str) {
    str = Trim(str);
    var reg = /^[0-9]+\.?[0-9]?$/;
    if (str.match(reg) == null) {
        return false;
    }
    else {
        return true;
    }
}

//是否字母或数字的组合
function IsNumOrLetters(str) {
    str = Trim(str);
    var reg = /^[A-Za-z0-9]+$/;
    if (str.match(reg) == null) {
        return false;
    }
    else {
        return true;
    }
}

//是否是Email格式
function IsEmail(str) {
    str = Trim(str);
    var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    if (str.match(reg) == null) {
        return false;
    }
    else {
        return true;
    }
}

//字符串真实长度     
function GetLength(strTemp) {
    var i, sum;
    sum = 0;
    for (i = 0; i < strTemp.length; i++) {
        if ((strTemp.charCodeAt(i) >= 0) && (strTemp.charCodeAt(i) <= 255))
            sum = sum + 1;
        else
            sum = sum + 2;
    }
    return sum;
}

//验证电话号码
function IsPhone(str) {
    var reg = /^([0-9]|[\-])+$/g;
    if (str.length < 7 || str.length > 18) {
        return false;
    }
    else {
        return reg.test(str);
    }
}

//验证手机号码  仅验证11位数字
function IsMphone(str) {
    //	 var reg0=/^13\d{5,9}$/;   //130--139。至少7位
    //	 var reg1=/^153\d{8}$/;  //联通153。至少7位
    //	 var reg2=/^159\d{8}$/;  //移动159。至少7位
    //	 var reg3=/^158\d{8}$/;
    //	 var reg4=/^150\d{8}$/;
    //	 var reg5=/^15\d{9}$/;
    //	 var reg6=/^180\d{8}$/;
    //	 var reg7=/^185\d{8}$/;
    //	 var reg8=/^186\d{8}$/;
    //	 var reg9=/^187\d{8}$/;
    //	 var reg10=/^188\d{8}$/;
    //	 var reg11 = /^189\d{8}$/;
    //	 var reg12 = /^182\d{8}$/;
    //	 
    //	 var my=false;
    //	 if (reg0.test(str))
    //	    my=true;
    //	 if (reg1.test(str))
    //	    my=true;
    //	 if (reg2.test(str))
    //	    my=true;
    //	 if (reg3.test(str))
    //	    my=true;
    //	 if (reg4.test(str))
    //	    my=true;
    //	 if(reg5.test(str))
    //        my = true;
    //     if(reg6.test(str))
    //        my = true;
    //     if(reg7.test(str))
    //        my = true;
    //     if(reg8.test(str))
    //        my = true;
    //     if(reg9.test(str))
    //        my = true;
    //     if(reg10.test(str))
    //        my = true;
    //     if(reg11.test(str))
    //        my = true;
    //    if (reg12.test(str))
    //        my = true;
    //
    //	return my;
    return (str.length == 11 && !isNaN(str));
}

//验证邮编
function IsPost(str) {
    var pattern = /^[0-9]{6}$/;
    return pattern.exec(str);
}

//验证日期
function IsDate(str) {
    if (!/^\d{4}[\-\/\s]?\d{1,2}[\-\/\s]?\d{1,2}$/.test(str)) {
        return false;
    }
    else {
        var year = "";
        var month = "";
        var day = "";
        if (str.indexOf("-") > 0) {
            year = parseInt(str.split('-')[0]);
            month = parseInt(str.split('-')[1]);
            day = parseInt(str.split('-')[2]);
        }
        if (str.indexOf("/") > 0) {
            year = parseInt(str.split('/')[0]);
            month = parseInt(str.split('/')[1]);
            day = parseInt(str.split('/')[2]);
        }
        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
            if (month == 2 && day > 29) {
                return false;
            }
        }
        else if (month == 2 && day > 28) {
            return false;
        }
        if ((month == 4 || month == 6 || month == 9 || month == 11) && day > 30) {
            return false;
        }
        if ((month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) && day > 31) {
            return false;
        }
    }
}
//没有找到图片
function noFind(obj, last) {
    if (last == null)
        obj.src = "/images/noImg/noImg-size.jpg";
    else
        obj.src = "/images/noImg/noImg-" + last + ".jpg";
    obj.onerror = null;
}

//****************************************************************
//* 名　　称：DataLength
//* 功    能：计算数据的长度
//* 入口参数：fData：需要计算的数据
//* 出口参数：返回fData的长度(Unicode长度为2，非Unicode长度为1)
//*****************************************************************
function DataLength(fData) {
    var intLength = 0;
    for (var i = 0; i < fData.length; i++) {
        if ((fData.charCodeAt(i) < 0) || (fData.charCodeAt(i) > 255))
            intLength = intLength + 2;
        else
            intLength = intLength + 1;
    }
    return intLength;
}
//验证中文
function IsZH(str) {
    var regZH = /^[\u4e00-\u9fa5]+$/i;
    return regZH.test(str);
}
//验证身份证
var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];    // 加权因子   
var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];            // 身份证验证位值.10代表X
function IdCardValidate(idCard) {
    idCard = Trim(idCard.replace(/ /g, ""));               //去掉字符串头尾空格                     
    if (idCard.length == 15) {
        return isValidityBrithBy15IdCard(idCard);       //进行15位身份证的验证    
    } else if (idCard.length == 18) {
        var a_idCard = idCard.split("");                // 得到身份证数组   
        if (isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(a_idCard)) {   //进行18位身份证的基本验证和第18位的验证
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
/**  
* 判断身份证号码为18位时最后的验证位是否正确  
* @param a_idCard 身份证号码数组  
* @return  
*/
function isTrueValidateCodeBy18IdCard(a_idCard) {
    var sum = 0;                             // 声明加权求和变量   
    if (a_idCard[17].toLowerCase() == 'x') {
        a_idCard[17] = 10;                    // 将最后位为x的验证码替换为10方便后续操作   
    }
    for (var i = 0; i < 17; i++) {
        sum += Wi[i] * a_idCard[i];            // 加权求和   
    }
    valCodePosition = sum % 11;                // 得到验证码所位置   
    if (a_idCard[17] == ValideCode[valCodePosition]) {
        return true;
    } else {
        return false;
    }
}
/**  
* 验证18位数身份证号码中的生日是否是有效生日  
* @param idCard 18位书身份证字符串  
* @return  
*/
function isValidityBrithBy18IdCard(idCard18) {
    var year = idCard18.substring(6, 10);
    var month = idCard18.substring(10, 12);
    var day = idCard18.substring(12, 14);
    var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
    // 这里用getFullYear()获取年份，避免千年虫问题   
    if (temp_date.getFullYear() != parseFloat(year)
          || temp_date.getMonth() != parseFloat(month) - 1
          || temp_date.getDate() != parseFloat(day)) {
        return false;
    } else {
        return true;
    }
}
/**  
* 验证15位数身份证号码中的生日是否是有效生日  
* @param idCard15 15位书身份证字符串  
* @return  
*/
function isValidityBrithBy15IdCard(idCard15) {
    var year = idCard15.substring(6, 8);
    var month = idCard15.substring(8, 10);
    var day = idCard15.substring(10, 12);
    var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
    // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法   
    if (temp_date.getYear() != parseFloat(year)
              || temp_date.getMonth() != parseFloat(month) - 1
              || temp_date.getDate() != parseFloat(day)) {
        return false;
    } else {
        return true;
    }
}
//限制输入数字
function limitNum(evt, me) {
    evt = evt ? evt : window.event;
    if (evt.keyCode < 48 || evt.keyCode > 57) {
        evt.returnValue = false;
    }
}
//设置DIV等控件相对位置
function getTop(e) {
    var offset = e.offsetTop;
    if (e.offsetParent != null) offset += getTop(e.offsetParent);
    return offset;
}

function getLeft(e) {
    var offset = e.offsetLeft;
    if (e.offsetParent != null) offset += getLeft(e.offsetParent);
    return offset;
}
//obj 要设置的控件   ctl 源控件   rTop 相对高度   rLeft 相对左边距    isMask 是否遮罩
function setRelativePosition(obj, ctl, rTop, rLeft, isMask) {
    if (rTop == null && isNaN(rTop))
        rTop = 0;
    if (rLeft == null && isNaN(rLeft))
        rLeft = 0;
    var top = getTop(ctl);
    var left = getLeft(ctl);
    obj.style.top = (top + rTop) + "px";
    obj.style.left = (left + rLeft) + "px";
    if (isMask != null && isMask) {
        obj.style.width = ctl.offsetWidth + "px";
        obj.style.height = ctl.offsetHeight + "px";
    }
}
//DOM宽度
function getWidth(ele) {
    return ele.offsetWidth;
}
//DOM高度
function getHeight(ele) {
    return ele.offsetHeight;
}
//鼠标横坐标
function pointerX() {
    return event.pageX || (event.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
}
//鼠标纵坐标
function pointerY() {
    return event.pageY || (event.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
}
//direct 上、下、左、右  1/0
function mouseoutHide(ele, id, direct, relateId) {
    if (!!ele && !!id) {
        var ctl = document.getElementById(id);
        if (ctl.style.display != "none") {
            var mouseX = pointerX();
            var mouseY = pointerY();
            var eLeft = getLeft(ele);
            var eTop = getTop(ele);
            if (!!direct && direct.length > 0) {
                if ((direct[0] == 1 && mouseY <= eTop + 2) || (direct[1] == 1 && mouseY >= eTop + getHeight(ele) - 2) || (direct[2] == 1 && mouseX <= eLeft + 2) || (direct[3] == 1 && mouseX >= eLeft + getWidth(ele) - 2)) {
                    ctl.style.display = "none";
                    if (!!relateId)
                        document.getElementById(relateId).style.display = "none";
                }
            }
        }
    }
}
//direct 上、下、左、右  1/0
function mouseoutRun(ele, direct, script) {
    if (!!ele && !!script) {
        var mouseX = pointerX();
        var mouseY = pointerY();
        var eLeft = getLeft(ele);
        var eTop = getTop(ele);
        if (!!direct && direct.length > 0) {
            if ((direct[0] == 1 && mouseY <= eTop + 2) || (direct[1] == 1 && mouseY >= eTop + getHeight(ele) - 2) || (direct[2] == 1 && mouseX <= eLeft + 2) || (direct[3] == 1 && mouseX >= eLeft + getWidth(ele) - 2)) {
                window.eval(script);
            }
        }
    }
}
//定义哈希对象
function Hash() {
    //将输入的字符串转化为hash对象的类
    this.length = 0;
    this.item = {};
}
Hash.prototype.has = function (k) {
    //判断Hash对象中是否存在指定键
    return (k in this.item);
};
Hash.prototype.set = function (k, v) {
    if (!!k && k != "") {
        if (!this.item[k])
            this.length++;
        this.item[k] = v;
    }
};
Hash.prototype.get = function (k) {
    return this.item[k] ? this.item[k] : null;
};

//向window.onload事件添加执行方法
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}

// 判断字符串是否以指定的字符串结束   
String.prototype.EndsWith = function (A, B) {
    var C = this.length;
    var D = A.length;
    if (D > C) return false;
    if (B) {
        var E = newRegExp(A + '$', 'i');
        return E.test(this);
    } else return (D == 0 || this.substr(C - D, D) == A);
};
// 判断字符串是否以指定的字符串开始   
String.prototype.StartsWith = function (str) {
    return this.substr(0, str.length) == str;
};
// 返回字符的长度，一个中文算2个   
String.prototype.ChineseLength = function () {
    return this.replace(/[^\x00-\xff]/g, "**").length;
};


//加载真实的切换广告图片
var TabImgContainerIds = new Array();
function LoadTabImg(containerid) {
    var diff = 200;
    var att = "lazyload-src";
    var b = YAHOO.util, f = b.Dom, i = b.Event, h = YAHOO.lang;
    TabImgContainerIds.push(containerid);
    var loadImg = function () {
        var topflag = f.getDocumentScrollTop() + f.getViewportHeight() + diff;
        var j = TabImgContainerIds.length - 1;
        for (; j >= 0; j--) {
            var container = document.getElementById(TabImgContainerIds[j]);
            if (topflag > f.getY(container)) {
                var liImgs = container.getElementsByTagName("img");
                for (var n = 0; n < liImgs.length; n++) {
                    if ((liImgs[n].src + "").indexOf("spaceball.gif") != -1) {
                        liImgs[n].src = liImgs[n].getAttribute(att);
                        liImgs[n].removeAttribute(att);
                    }
                }
                TabImgContainerIds.splice(j, 1);
            }
        }
        if (TabImgContainerIds.length == 0) {
            i.removeListener(window, "load", loadImg);
            i.removeListener(window, "scroll", loadImg);
            i.removeListener(window, "resize", loadImg);
        }
    }
    if (TabImgContainerIds.length == 1) {
        i.on(window, "load", loadImg);
        i.on(window, "scroll", loadImg);
        i.on(window, "resize", loadImg);
    }
}


//HTML 的自定义方法 中获取条件sql

var $$ = function (Id) { return document.getElementById(Id); };

function IsNullOrEmpty(id) {
    var obj = $$(id);
    if (obj.tagName.toLowerCase() == "input") {
        var type = "checkbox radio";
        if (type.indexOf(obj.type.toLowerCase()) >= 0) {
            return !obj.checked;
        } else {
            return obj.value.Trim().length <= 0
        }
    }
    else if (obj.tagName.toLowerCase() == "fieldset") {
        var obj = $$(id);
        var list = obj.getElementsByTagName("input");
        var loopIndex = 0;
        for (; loopIndex < list.length; loopIndex++) {
            if (list[loopIndex].checked) {
                break;
            }
        }
        return loopIndex >= list.length;
    } else if (obj.tagName.toLowerCase() == "select") {
        var obj = $$(id);
        return obj.value.Trim().length <= 0;

    } else {
        alert("未定义标签 " + $$(id).tagName);
        return;
    }
}

function GetValueById(id) {
    var obj = $$(id);
    var val = "";
    if (obj.tagName.toLowerCase() == "input") {
        val = obj.value;
    } else if (obj.tagName.toLowerCase() == "select") {
        //        var length = obj.options.length - 1;
        //        for (var i = 0; i < length; i++) {
        //            if (obj.options[i].selected == true) {
        //                val = obj.options[i].value.Trim();
        //                break;
        //            }
        //        }
        val = obj.value;
    } else if (obj.tagName.toLowerCase() == "fieldset") {
        var list = obj.getElementsByTagName("input");
        var nodeType;
        if (list.length > 0) {
            nodeType = list[0].type.toLowerCase();
            if (nodeType == "checkbox") {
                val = val.Append("(");
                for (var i = 0; i < list.length; i++) {
                    val = val.Append(list[i].checked ? list[i].value.Trim() + "," : "");
                }
            } else if (nodeType == "radio") {
                for (var i = 0; i < list.length; i++) {
                    val = val.Append(list[i].checked ? list[i].value.Trim() : "");
                }
            }
        }
    }
    val = val.Trim();
    return val.lastIndexOf(",") == val.length - 1 ? val.substr(0, val.length - 1) + ")" : val;

}
String.prototype.Trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
String.prototype.Append = function (value) {
    var str = this;
    return str += value;
}

//返回到上一页面
function pageBack() {
    var a = window.location.href;
    var pagetype = $.Base.getQueryString(a, "pagetype");
    if (window.history.length <= 1) {
        if (pagetype == "app") {
            OpenAppPhoto();
        }
        else {
            window.location.href = $.Base.buildCurrentUrl("index.aspx");
        }
    }
    else {
        if (/#top/.test(a)) {
            window.history.go(-2);
            window.location.load(window.location.href)
        }
        else {
            window.history.back();
            //        window.location.href = window.location.href;
        }
    }
}

//打开app扫码相机
function OpenAppPhoto() {
    if (/android/i.test(navigator.userAgent)) {    //  android
        window.myjs.notifyAndroidToScan();
    } else if (/ipad|iphone|mac/i.test(navigator.userAgent)) {    //  ios
        window.location.href = "objc://backtoscan";
    } else {
        return;
    }
}

//加载页码
//参数说明：id: 页码显示所在位置id，html:当前页面的地址
// recordCount：总记录条数(int) pageSize：每页显示条数(int)
// pageIndex：当前页码(int) gotopagefun:开放的接口函数
//使用说明：当前页面地址中的页码请用pageindex
function showpage(id, html, recordcount, pagesize, pageindex, gotopagefun) {
    var recordCount = parseInt(recordcount);
    var pageSize = parseInt(pagesize);
    var strHtml = '<div class=paging> ';
    var i;
    var pageIndex = parseInt(pageindex);
    //var pagehtml = html.split('?')[1];
    //var s = '';
    //var t = false;
    //var p = "pageindex=";
    //if (pagehtml != undefined) {
    //    var pagehtml = pagehtml.split('&');
    //    for (var i = 0; i < pagehtml.length; i++) {
    //        if (pagehtml[i].indexOf("pageindex") >= 0) {
    //            s = pagehtml[i];
    //            t = true;
    //        }
    //    }
    //}
    if (recordCount > 0 && pageIndex > 0) {
        var pageCount = parseInt((((recordCount + pageSize) - 1) / pageSize).toString().split('.')[0]);
        if (pageIndex <= 1)
            strHtml += '<a class="prev" disabled="disabled">上一页</a>';
        else
            strHtml += '<a name="_page" href="javascript:;" value="' + (pageIndex - 1) + '" class="prev">上一页</a>';
        strHtml += '<div class="select-page">';
        strHtml += '<select id="pagesel">';
        for (i = 1; i <= pageCount; i++) {
            if (i == pageIndex) {
                strHtml += '<option name="_page" value="' + i + '" selected="true">';
                strHtml += i + '/' + pageCount;
                strHtml += '</option>';
            }
            else {
                strHtml += '<option name="_page" value="' + i + '">';
                strHtml += i + '/' + pageCount;
                strHtml += '</option>';
            }
        }
        strHtml += '</select>';
        strHtml += '</div>';
        if (pageIndex >= pageCount)
            strHtml += '<a class="next" disabled="disabled">下一页</a>';
        else
            strHtml += '<a name="_page" href="javascript:;" value="' + (pageIndex + 1) + '" class="next">下一页</a>';
        $("#" + id).html(strHtml);
        //上一页、下一页链接事件
        $("#" + id).find("a[name=_page]").each(function (i, item) {
            $(this).click(function () {
                pageindex = $(this).attr("value");
                gotopagefun(pageindex);
            });
        });
        //切换页码事件
        $("#pagesel").change(function () {
            pageindex = $(this).children('option:selected').val();
            gotopagefun(pageindex);
        });
    }
    else
        return '';
}

//扩展方法：转换日期格式
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

var cardnumvalue = null;
//登录按钮
function Login(username, password) {
    var url = $.Base.buildCurrentUrl("AjaxPage/webframe/LoginAndRegister.ashx");
    var obj = {};
    obj["op"] = "login";
    obj["username"] = username;
    obj["cardnum"] = username;
    obj["pwd"] = password;
    obj["jzname"] = false;   //记住我
    $.Base.AjaxSendPost(url, obj, false, function (data) {
        //加载卡类型
        //if (data.BackObject) {
        //    CreateHTMLByCardList(data.BackObject, true, name, password);
        //    return;
        //}
        if (!data.SuccFlag) {
            alert(data.ErrorMsg, "提示", null, { width: 200, height: 50 }, "error", null);
            return;
        } else {
            //            var currentUrl = window.location.href;
            //            var gotoUrl = "";
            //            if (currentUrl.indexOf("ReturnUrl") > 0) {
            //                gotoUrl = $.Base.getQueryString(currentUrl, "ReturnUrl");
            //            }
            //            if (gotoUrl != "") {
            //                window.location.href = gotoUrl;
            //            }
            window.location.href = window.location.href;
        }
    }, function (data) {
    });
}


//注销用户
function loginExit() {
    var url = $.Base.buildCurrentUrl("AjaxPage/webframe/LoginAndRegister.ashx");
    var obj = new Object();
    obj["op"] = "LoginOut";
    $.Base.AjaxSendGet(url, obj, true, function (data) {
        window.location.href = window.location.href;
    }, function (data) {
        //        alert(data);
    });
    //    alert(url);
}


function CreateHTMLByCardList(cardlist, isShowBindStatue, usrname, upwd) {
    cardnumvalue = null;
    var div = $("<div style='width: 300px;' id='divselcard'></div>");
    var ul = $("<ul style='list-style-type:none; margin-left:30px'></ul>");
    var tmpname, tmpval, tmpbind = "", displaystr = "";
    $.each(cardlist, function (index, card) {
        tmpval = card["CRMHYK_NO"];
        tmpname = card["HYKNAME"] + "       " + tmpval;
        tmpbind = isShowBindStatue ? (card["BINDSTATUS"] == '0' ? "&nbsp;&nbsp;&nbsp;未绑定" : "&nbsp;&nbsp;&nbsp;已绑定") : "";
        tmpbind = "<span>" + tmpbind + "</span>";
        if (index == 0) {
            ul.append("<li style=' height: 30px; line-height: 30px;'><span style='width:25px;" + displaystr + "' cardnum='" + tmpval + "'><input type='radio' name='selcard' value='" + tmpval + "' checked=checked /></span><span>" + tmpname + "</span>" + tmpbind + "</li>");
        } else {
            ul.append("<li style=' height: 30px; line-height: 30px;'><span style='width:25px;" + displaystr + "' cardnum='" + tmpval + "'><input type='radio' name='selcard' value='" + tmpval + "'/></span><span>" + tmpname + "</span>" + tmpbind + "</li>");
        }
    });
    div.append(ul);
    alert(div.get(0).outerHTML, "请选择会员卡", function () {
        cardnumvalue = $("input[name='selcard']").filter(":checked").val();
        Login(usrname, upwd);
        if (cardnumvalue == undefined || cardnumvalue == null) {
            return false;
        }
    });
}

function changeURLArg(url, arg, arg_val) {
    var pattern = arg + '=([^&]*)';
    var replaceText = arg + '=' + arg_val;
    if (url.match(pattern)) {
        var tmp = '/(' + arg + '=)([^&]*)/gi';
        tmp = url.replace(eval(tmp), replaceText);
        return tmp;
    } else {
        if (url.match('[\?]')) {
            return url + '&' + replaceText;
        } else {
            return url + '?' + replaceText;
        }
    }
    return url + '\n' + arg + '\n' + arg_val;
}

function error() { };