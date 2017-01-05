jQuery.sap.declare("HCMMissingTimesheets.utils.BusyDialogHelper");

BusyDialogHelper = {

    _busyDialog: null,

    _getBusyDialog: function () {
        if (!this._busyDialog)
            this._busyDialog = new sap.m.BusyDialog();
        return this._busyDialog;
    },

    _getTranslation: function(message) {
        var i18nModel = sap.ui.getCore().byId("App").getModel("i18n");
        return i18nModel.getResourceBundle().getText(message);
    },

    open: function(i18nTitle, i18nMessage) {
        var t = (i18nMessage) ? this._getTranslation(i18nTitle) : this._getTranslation('Loading');
        var m = (i18nMessage) ? i18nMessage : i18nTitle;
        m = this._getTranslation(m);
        var busyDialog = this._getBusyDialog();
        busyDialog.setTitle(t);
        busyDialog.setText(m);
        busyDialog.addStyleClass("busyDialogLoading");
        busyDialog.open();
    },

    close: function() {
        this._getBusyDialog().close();
    }
};
