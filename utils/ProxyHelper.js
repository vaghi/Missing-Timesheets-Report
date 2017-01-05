jQuery.sap.declare("HCMMissingTimesheets.utils.ProxyHelper");

ProxyHelper = {
    _proxyPrefix: "proxy/http/",

    _gatewayPrefix: "", //deleted for secutiry

    getUrl: function (sServiceUrl) {
        //se fija si el link es externo a SAP
        if ((sServiceUrl) && (sServiceUrl.length > 0) && (sServiceUrl[0] == '/'))
        {//interno a SAP
            //se fija si es localhost
            if (window.location.hostname == "localhost")
            {
                sServiceUrl = this._proxyPrefix + this._gatewayPrefix + sServiceUrl;
                sServiceUrl = sServiceUrl.replace("//", "/");
            }
        }
        else {
            //externo
            sServiceUrl = this._proxyPrefix + sServiceUrl;
            sServiceUrl = sServiceUrl.replace("//", "/");
        }
        return sServiceUrl;
    }
};