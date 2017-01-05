jQuery.sap.declare("HCMMissingTimesheets.services.MailService");

MailService = {

    emailTest: "",
    _runMode: "Gateway",
    _entity: "EmailNotificationSet",

    sendEmails: function(entries, success, error)
    {
        var model = this._getModel();
        var entity = this._entity;
        var formattedEntries = {"Entries" : this.formatEntries(entries)};

        model.refreshSecurityToken();
        model.create('/' + entity, formattedEntries, {
            success: jQuery.proxy(success, this),
            error: jQuery.proxy(error, this),
            async: true
        });
    },

    formatEntries: function(entries) {
        var outEntries = [];
        
        var oDateRange = sap.ui.getCore().byId("rangeDates");

        for(var i in entries)
        {
            var formattedEntry = {
                "Status" : entries[i].Status,
                "Orgeh" : entries[i].Orgeh,
                "OrgehT" : entries[i].OrgehT,
                "Pernr" : entries[i].Pernr,
                "Sname" : entries[i].Sname,
                "Email" : MailService.emailTest ? MailService.emailTest : entries[i].Email, //Hardoceo para testing de envio de mails
                "Catshours" : entries[i].Catshours,
                "MinHs" : entries[i].MinHs,
                "Diff" : entries[i].Diff,
                "Plans" : entries[i].Plans,
                "PlansT" : entries[i].PlansT,
                "PviBegda" : FormatHelper.getWashingtonDate(oDateRange.getDateValue()),
                "PviEndda" : FormatHelper.getWashingtonDate(oDateRange.getSecondDateValue())
            };
            outEntries.push(formattedEntry);
        }
        return outEntries;
    },

    _getModel: function () {
        switch (this._runMode) {
            case "Gateway": return this._getGatewayModel();
        }
    },

    _getGatewayModel: function ()
    {
        var serviceUrl = ProxyHelper.getUrl("/sap/opu/odata/sap/Z_HCM_MISSING_TIMESHEET_SRV");
        var oModel = new sap.ui.model.odata.ODataModel(serviceUrl, false);
        oModel.setCountSupported(false);
        oModel.attachRequestFailed(this.showLoadError);
        return oModel;
    },

    showLoadError: function (oEvent)
    {
        MessageBoxHelper.showAlert("Error", "ServiceNotAvailable");
        if(BusyDialogHelper._busyDialog.isActive())
            BusyDialogHelper.close();
    }

};
