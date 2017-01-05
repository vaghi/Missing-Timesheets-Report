jQuery.sap.require("HCMMissingTimesheets.services.MailService");
sap.ui.controller("HCMMissingTimesheets.views.Detail.Results.Results", {
    onShowTableView: function(oEvent) {
      $("#TableView").show("fade");
      sap.ui.getCore().byId("TableView").removeStyleClass("invisible");
      $("#ChartView").hide("fade");

      btnSendEmail = sap.ui.getCore().byId("btnSendEmail");
      btnSendEmail.setVisible(true);
    },

    onShowChartView: function(oEvent) {
      $("#TableView").hide("fade");
      $("#ChartView").show("fade", function() {
        GaugeChartHelper.flushGauge();
        if(DeviceHelper.isDesktop())
        {
            StyleHelper.updateTextSize();
        }
      });

      btnSendEmail = sap.ui.getCore().byId("btnSendEmail");
      btnSendEmail.setVisible(false);
    },

    onSendEmail: function() {

        if(this.validEmailSend())
        {
           MessageBoxHelper.showConfirm("Confirm","ConfirmEmailSend", this.onConfirmEmailSend);
        }
    },
    
    onExportToExcel: function() {
    	ExcelExportHelper.openSeparatorDialog();
    },

    onConfirmEmailSend: function() {
        var entry = [];
        var selectedItems = sap.ui.getCore().byId("tblResults").getSelectedItems();

        for(var i in selectedItems)
        {
            entry.push(selectedItems[i].getBindingContext("Results").getObject());
        }

        var controller = sap.ui.getCore().byId("Results").getController();
        MailService.sendEmails(entry, controller.emailSent, controller.emailError)
    },

    validEmailSend: function() {
        var selectedItems = sap.ui.getCore().byId("tblResults").getSelectedItems();
        if(selectedItems.length == 0)
        {
            MessageBoxHelper.showAlert("Error","NoRecordsSelected");
            return false;
        }

        for(var i in selectedItems)
        {
            var item = selectedItems[i].getBindingContext("Results").getObject();
            if(!item.Email)
            {
                MessageBoxHelper.showAlert("Error","RecordWithoutEmail");
                return false;
            }
        }

        return true;
    },

    emailSent: function() {
        MessageBoxHelper.showMessageToast("EmailsSent");
    },

    emailError: function(error) {
        MessageBoxHelper.showMessageToast("EmailError");
    },

    backToSearch: function() {
        $("#Results").hide("fade");
        $("#Search").show("fade");
    }

});
