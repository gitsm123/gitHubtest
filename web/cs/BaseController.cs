using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using YGTTGWebApi.Models;
using YGTTGWebApi.BLL;


namespace YGTTGWebApi.Controllers
{
    public class BaseController : ApiController
    {

        private static BFLogFactory.LogWriter p_log;
  
        protected BFLogFactory.LogWriter _log
        {
            get
            {
                if (p_log == null)
                {
                    p_log = new BFLogFactory.LogWriter("ApiController");
                }
                return p_log;
            }
        }

        private ApiSystemInfo _sysInfo = null;
        private string _requestId;
        private string _memberId;

        /// <summary>
        /// 系统信息
        /// </summary>
        public ApiSystemInfo SystemInfo
        {
            get { return _sysInfo; }
        }

        /// <summary>
        /// 为每个请求分配一个requestid
        /// </summary>
        protected string RequestId
        {
            get
            {
                return _requestId;
            }
        }

        /// <summary>
        /// 会员ID
        /// </summary>
        protected string MemberId
        {
            get
            {
                return _memberId;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        public BaseController()
        {
            _requestId = System.Guid.NewGuid().ToString();
        }

        /// <summary>
        /// 获取应用级参数单个值
        /// </summary>
        /// <param name="interfaceName"></param>
        /// <param name="paramKey"></param>
        /// <param name="rMsg"></param>
        /// <returns></returns>
        public string GetParamString(string interfaceName, string paramKey, out MsgInfo rMsg)
        {
            string _paramValue = String.Empty;
            JObject jobject = GetParamObject<JObject>(interfaceName, out rMsg);
            if (!String.IsNullOrEmpty(paramKey))
            {
                _paramValue = BaseUtil.GetJObjectValue(jobject, paramKey);
            }
            return _paramValue;
        }

        /// <summary>
        /// 获取应用级参数对象-无会员登录
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="interfaceName"></param>
        /// <param name="rMsg"></param>
        /// <returns></returns>
        public T GetParamObject<T>(string interfaceName, out MsgInfo rMsg) where T : class
        {
            rMsg = null;
            return GetParamObject<T>(interfaceName, false, out rMsg);
        }

        /// <summary>
        /// 获取应用级参数对象
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="interfaceName"></param>
        /// <param name="isCheckLogin"></param>
        /// <param name="rMsg"></param>
        /// <returns></returns>
        public T GetParamObject<T>(string interfaceName, bool isCheckLogin, out MsgInfo rMsg) where T : class
        {
            rMsg = null;
            T t = null;
            string interfaceId = interfaceName;
            BaseParamInfo paramInfo = GetBaseParamInfo(interfaceId);            
            if (paramInfo == null)
            {
                rMsg = ErrorMsg.E1004();
                return t;
            }
            if (SystemInfo == null)
            {
                rMsg = ErrorMsg.E1006("系统访问");
                return t;
            }
            bool result = ValidateParam(paramInfo, out rMsg);
            if (result == false)
            {
                rMsg = ErrorMsg.E1005();
                return t;
            }
            if (isCheckLogin)
            {
                CheckMemberLoginToken(paramInfo.token, out rMsg);
                if (rMsg != null)
                {
                    return t;
                }
            }
            if (typeof(T).FullName == "System.String")
            {
                t = paramInfo.Params_json as T;
            }
            else
            {
                t = BaseUtil.DeserializeObject<T>(paramInfo.Params_json);
            }
            return t;
        }
        
        /// <summary>
        /// 获取参数
        /// </summary>
        /// <returns></returns>
        protected BaseParamInfo GetBaseParamInfo(string interfaceId="")
        {
            BaseParamInfo paramInfo = new BaseParamInfo();
            try
            {
                paramInfo.sys_key = BaseUtilsNew.WebRequest.GetRequestParam("sys_key");
                paramInfo.timestamp = BaseUtilsNew.WebRequest.GetRequestParam("timestamp");
                paramInfo.format = BaseUtilsNew.WebRequest.GetRequestParam("format");
                paramInfo.version = BaseUtilsNew.WebRequest.GetRequestParam("version");
                paramInfo.sign = BaseUtilsNew.WebRequest.GetRequestParam("sign");
                paramInfo.Params_json = BaseUtilsNew.WebRequest.GetRequestParam("Params_json");
                paramInfo.token = BaseUtilsNew.WebRequest.GetRequestParam("token");

                //字符转义
                if (!String.IsNullOrEmpty(paramInfo.Params_json))
                {
                    paramInfo.Params_json = HttpUtility.UrlDecode(paramInfo.Params_json, System.Text.Encoding.GetEncoding("UTF-8"));
                    paramInfo.Params_json = paramInfo.Params_json.Replace("&quot;", "\"").Replace("&nbsp;", "").Replace("&amp;", "&");
                }

                _log.Info(interfaceId + "-request", "requestId:" + this.RequestId, paramInfo);

                //_syskey = paramInfo.sys_key;
                //获取系统标示和签名key
                BaseBLL BLL = new BaseBLL();                              
                BLL.GetApiSysInfo(paramInfo.sys_key, interfaceId, out _sysInfo);
                if (_sysInfo == null)
                {
                    _sysInfo = new ApiSystemInfo();
                }
                else
                {
                    paramInfo.sys_id = SystemInfo.sysId;
                    //    paramInfo.secretkey = SystemInfo.secretKey;                    
                }
            }
            catch (Exception ex)
            {
                paramInfo = null;
                _log.Info("GetBaseParamInfo", interfaceId, paramInfo, ex);
            }
            return paramInfo;
        }

        /// <summary>
        ///参数基础验证，与签名
        /// </summary>
        /// <param name="paramInfo"></param>
        /// <param name="rMsg"></param>
        /// <returns></returns>
        public bool ValidateParam(BaseParamInfo paramInfo, out MsgInfo rMsg)
        {
            rMsg = null;
            try
            {
                if (String.IsNullOrEmpty(paramInfo.sys_key))
                {
                    rMsg = ErrorMsg.E1001("sys_key");
                    return false;
                }               
                if (String.IsNullOrEmpty(paramInfo.sys_id))
                {
                    rMsg = ErrorMsg.E1006();
                    return false;
                }
                if (String.IsNullOrEmpty(paramInfo.timestamp))
                {
                    rMsg = ErrorMsg.E1001("timestamp");
                    return false;
                }
                if (String.IsNullOrEmpty(paramInfo.format))
                {
                    rMsg = ErrorMsg.E1001("format");
                    return false;
                }
                if (paramInfo.format != "json")
                {
                    rMsg = ErrorMsg.E1003("format", "必须为json");
                    return false;
                }
                if (String.IsNullOrEmpty(paramInfo.version))
                {
                    rMsg = ErrorMsg.E1001("version");
                    return false;
                }
                if (String.IsNullOrEmpty(paramInfo.version))
                {
                    rMsg = ErrorMsg.E1001("version");
                    return false;
                }
                if (String.IsNullOrEmpty(paramInfo.sign))
                {
                    rMsg = ErrorMsg.E1001("sign");
                    return false;
                }
                if (String.IsNullOrEmpty(paramInfo.Params_json))
                {
                    rMsg = ErrorMsg.E1001("Params_json");
                    return false;
                }
                string SignStr = GetSignStr(paramInfo);
                if (!SignStr.ToUpper().Equals(paramInfo.sign))
                {
                    rMsg = ErrorMsg.E1005();
                    return false;
                }
            }
            catch (Exception ex)
            {
                rMsg = ErrorMsg.E2001(null, "签名验证", "服务内部异常");
                _log.Error("签名验证异常", paramInfo, ex);
                return false;
            }
            return true;
        }

        /// <summary>
        /// 会员登录
        /// </summary>
        /// <param name="token"></param>
        /// <param name="msgInfo"></param>
        public void CheckMemberLoginToken(string token, out MsgInfo msgInfo)
        {
            msgInfo = null;
            if (String.IsNullOrEmpty(token))
            {
                msgInfo = ErrorMsg.E3001();
            }
            HyBLL hyBLL = new HyBLL(this.RequestId);
            _memberId = hyBLL.GetHyIdByToken(SystemInfo.sysId, token, out msgInfo);
        }

        /// <summary>
        /// 获取签名
        /// </summary>
        /// <param name="paramInfo"></param>
        /// <returns></returns>
        public string GetSignStr(BaseParamInfo paramInfo)
        {
            if (paramInfo == null) return String.Empty;
            Dictionary<string, object> dicParam = new Dictionary<string, object>();
            dicParam.Add("sys_key", paramInfo.sys_key);
            dicParam.Add("timestamp", paramInfo.timestamp);
            dicParam.Add("format", paramInfo.format);
            dicParam.Add("version", paramInfo.version);
            dicParam.Add("Params_json", paramInfo.Params_json);
            if (!String.IsNullOrEmpty(paramInfo.token))
            {
                dicParam.Add("token", paramInfo.token);
            }
            return MakeSign(dicParam, SystemInfo.secretKey);
        }

        /// <summary>
        /// 产生签名
        /// </summary>
        /// <param name="dicParam"></param>
        /// <param name="appSecret"></param>
        /// <param name="OAuth"></param>
        /// <returns></returns>
        public string MakeSign(Dictionary<string, object> dicParam, string SecretKey)
        {
            string sign = String.Empty;
            StringBuilder dataString = new StringBuilder();
            if (dicParam == null || dicParam.Count == 0)
            {
                return sign;
            }
            Dictionary<string, object> dicParamSort = (from d in dicParam orderby d.Key ascending select d).ToDictionary(k => k.Key, v => v.Value);
            foreach (var item in dicParamSort)
            {
                dataString.Append(item.Key).Append(item.Value);
            }
            string signString = dataString.ToString();
            if (!String.IsNullOrEmpty(SecretKey))
            {
                signString = SecretKey + signString + SecretKey;
            }
            sign = BaseUtil.GetMD5(signString, "UTF-8");
            return sign;
        }      
    }
}