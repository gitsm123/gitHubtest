(function ($) {
    /**
　　* @description Base Jquery 扩展对象
　　* @class 封装Base对Jquery的扩展方法
　　*/
    $.Base = {
        cacheTime: function (minutes) {
            return new Date().getMinutes() * minutes;
        },
        /**
        *@description 解决url上中文乱码问题
        *
        */
        urlEncode: function (str) {
            return escape(str).replace(/\+/g, "%2b");
        },
        /**
　　    * @description  根据当前页面域名构造url
        * @param {string} relativePath 相对路径
        * @returns {string} 绝对路径
　　    */
        buildCurrentUrl: function (relativePath) {
            if (relativePath.indexOf("/") == 0) {
                relativePath = relativePath.substring(1)
            }

            //获取当前网址，如： http://localhost:8083/abcd/index.aspx
            var curUrlPath = window.document.location.href;
            //获取主机地址之后的目录，如： abcd/index.aspx
            var pathName = window.document.location.pathname;
            var pos = curUrlPath.indexOf(pathName);
            //获取主机地址，如： http://localhost:8083
            var localhostPath = "";
            if (pos == 5) {
                localhostPath = curUrlPath;
            }
            else {
                localhostPath = curUrlPath.substring(0, pos);
            }
            //获取带"/"的项目名，如：/abcd
            var projectName = ""; //pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
            return localhostPath + projectName + '/' + relativePath;
        },
        /**
　　    * @description  验证是否为数字
        * @param {string} 传入的字符串
        * @returns {bool} 返回bool值
　　    */
        isNumber: function (oNum) {
            if (!oNum) return false;
            var strP = /^\d+(\.\d+)?$/;
            if (!strP.test(oNum)) return false;
            try {
                if (parseFloat(oNum) != oNum) return false;
            }
            catch (ex) {
                return false;
            }
            return true;
        },
        /**
　　    * @description  验证是否为可用用户名称
        * @param {string} 传入的字符串
        * @returns {bool} 返回bool值
　　    */
        isUserName: function (name) {
            if (name && $.trim(name).length > 0 && name.match("^[a-zA-Z][a-zA-Z0-9_]{3,100}$")) {
                return true;
            } else {
                return false;
            }


        },

        /**
　　    * @description  验证是否为电话号码
        * @param {string} 传入的字符串
        * @returns {bool} 返回bool值
　　    */
        PhoneCheck: function (obj) {
            var phoneRegWithArea = /^[0][1-9]{2,3}-[0-9]{5,10}$/;
            var phoneRegNoArea = /^[1-9]{1}[0-9]{5,8}$/;
            if (obj.length > 9) {
                if (phoneRegWithArea.test(obj)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                if (phoneRegNoArea.test(obj)) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        /**
　　    * @description  验证邮箱格式
        * @param {string} 传入的字符串
        * @returns {bool} 返回bool值
　　    */
        EmailValid: function (email) {
            var hasError = false;
            var patten = new RegExp(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/);
            hasError = patten.test(email);
            return hasError;
        },
        is_weixn: function () {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                return true;
            } else {
                return false;
            }
        },
        /**
　　    * @description  获取Url中参数值
        * @param {url} rul串
        * @param {name} 参数名称
        * @returns {string} 参数值
　　    */
        getQueryString: function (url, name, charsettype) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var strArr = url.split('?');
            if (strArr.length < 2)
                return;
            var str = strArr[1];
            //过滤掉#及后面的内容
            if (str.indexOf("#") > 0) {
                str = str.substr(0, str.indexOf("#"));
            }
            var r = str.match(reg);
            if (r != null) {
                if (charsettype && charsettype == "1") {
                    return decodeURI(r[2]);
                } else {
                    return unescape(r[2]);
                }
            } else { return null };
        },
        AjaxSendPost: function (url, data, asyncflag, callback, errcallback) {
            $.Base.AjaxBase("POST", url, data, true, false, callback, errcallback);
        },
        AjaxSendGet: function (url, data, asyncflag, callback, errcallback) {
            //增加Ajax缓存时间
            data._ = this.cacheTime(3);
            $.Base.AjaxBase("GET", url, data, true, true, callback, errcallback);
        },
        AjaxSendGetCache: function (url, data, asyncflag, cacheflag, callback, errcallback) {
            $.Base.AjaxBase("GET", url, data, true, cacheflag, callback, errcallback);
        },
        /**
　　    * 程序中不要使用此方法
　　    */
        AjaxBase: function (type, url, data, asyncflag, cacheflag, callback, errcallback) {
            $.ajax({
                type: type,
                url: url,
                data: data,
                async: asyncflag,
                cache: cacheflag,
                dataType: "json",
                success: callback,
                error: errcallback
            });
        },
        /**
　　    * jsonp 程序中不要使用此方法
　　    */
        AjaxBaseJson: function (url, data, asyncflag, cacheflag, jsonpcallbackname, callback, errcallback) {
            $.ajax({
                type: "Get",
                url: url,
                data: data,
                jsonp: "callback",
                jsonpCallback: jsonpcallbackname,
                async: asyncflag,
                cache: cacheflag,
                dataType: "jsonp",
                success: callback,
                error: errcallback
            });
        },
        /**
　　    * jsonp nocache 程序中不要使用此方法
　　    */
        AjaxBaseJsonpNoCache: function (url, data, asyncflag, cacheflag, callback, errcallback) {
            $.ajax({
                type: "Get",
                url: url,
                data: data,
                jsonp: "callback",
                async: asyncflag,
                cache: cacheflag,
                dataType: "jsonp",
                success: callback,
                error: errcallback
            });
        },
        /**
　　    * jsonp  jsonpcallbackname 名称不能重复 缓存
　　    */
        AjaxJsonp: function (url, data, asyncflag, jsonpcallbackname, callback, errcallback) {
            $.Base.AjaxBaseJson(url, data, asyncflag, true, jsonpcallbackname, callback, errcallback);
        },
        /**
　　    * jsonp  无缓存
　　    */
        AjaxJsonpNoCache: function (url, data, asyncflag, callback, errcallback) {
            $.Base.AjaxBaseJsonpNoCache(url, data, asyncflag, false, callback, errcallback);
        },
        TJRecord: function () {
            var tj = $("#_tjscript", $("script"));
            if (tj.length > 0) {
                tj.remove();
            }
            var t = new Date();
            var time = t.getTime();
            var script = "\<script  id='_tjscript' language=\"javascript\" type=\"text/javascript\" src=\"../js/tj.js?_=" + time + "\"><\/script\>";
            // document.write(script);
            $(document).append(script);
        },

        //获取页面get参数
        Request: function (argname) {
            var url = document.location.href;
            var arrStr = url.substring(url.indexOf("?") + 1).split("&");
            //return arrStr;
            for (var i = 0; i < arrStr.length; i++) {
                var loc = arrStr[i].indexOf(argname + "=");

                if (loc != -1) {
                    return arrStr[i].replace(argname + "=", "").replace("?", "");
                    break;
                }
            }
            return "";
        },
        alertInfo: function (msg, _title, func) {
            var def_option = {
                content: msg,
                btn: '确定',
                time: 3
            };
            if (_title && typeof _title == "string") {
                def_option["title"] = _title;
            }
            if (typeof func == "function") {
                def_option["yes"] = func;
            }           
            layer.open(def_option);
        },

        ModalDialog: function (msg, okFun, cancelFun, okValue, noValue) {
            if (!okValue)
                okValue = "确定";
            if (!noValue)
                noValue = "取消";
            layer.open({
                content: msg,
                btn: [okValue, noValue],
                no: function (index) {
                    if (cancelFun)
                        cancelFun();
                },
                yes: function (index) {
                    if (okFun)
                        okFun();
                    layer.close(index)
                }
            });
        },
        InitHeader: function () {
            if (/ipad|iphone|mac/i.test(navigator.userAgent)) {
                if ($("header.header").length != 0) {
                    $("header.header").eq(0).css("padding-top", "20px");
                    $(".header a.back").css("margin-top", "0px");
                    $("header.header").siblings("div").eq(0).css("margin-top", ($("header.header").eq(0).height() + 20) + "px");
                }
            }
        }

    };

    window.alert = $.Base.alertInfo;
    if (parent) {
        window.alert = parent.window.alert;
    };

    $(function () {
        $.Base.InitHeader();
    })
})(jQuery);
/*end 通用函数*/

//上一页签
; window.goappback = function () {
    try {
        if (/android/i.test(navigator.userAgent) && typeof myjs.goBack == "function") {
            myjs.goBack();
        } else if (/ipad|iphone|mac/i.test(navigator.userAgent) && typeof tryToClose == "function") {
            tryToClose();
        } else {
            window.history.back();
        }
    } catch (e) {
        window.history.back();
    }
};

//最顶层
window.goappallback = function () {
    try {
        if (/android/i.test(navigator.userAgent) && typeof myjs.goAllBack == "function") {
            myjs.goAllBack();
        } else if (/ipad|iphone|mac/i.test(navigator.userAgent) && typeof backToHomePage == "function") {
            backToHomePage();

        } else {
            window.history.back();
        }
    } catch (e) {
        window.history.back();
    }
};