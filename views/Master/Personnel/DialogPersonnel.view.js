sap.ui.jsview("HCMMissingTimesheets.views.Master.Personnel.DialogPersonnel", {

    getControllerName: function () {
        return "HCMMissingTimesheets.views.Master.Personnel.DialogPersonnel";
    },

    createContent: function (oController) {
        var controls = [];

        var hbox = new sap.m.HBox({
            id: "hboxPersonnelSearch",
            alignItems: sap.m.FlexAlignItems.Center,
            justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
            items: [
                new sap.m.HBox({
                	width: "100%",
                    alignItems: sap.m.FlexAlignItems.Center,
                    items: [
                        new sap.m.Text({
                            text: "{i18n>Name}",
                            textAlign: sap.ui.core.TextAlign.Right,
                        }).addStyleClass("dialogPersonnelLabel"),
                        new sap.m.Input({
                        	width: '100%',
                            id: "txtPersonnelName"
                        })
                    ]
                }),
                new sap.m.Image({
                    src: FormatHelper.getPath() + "/img/white/search.png",
                    press: [oController.handleSearchPersonnel, oController]
                }).addStyleClass("btnHeader")
            ]
        });
        controls.push(hbox);
        
        //tabla de customers
        var tablePersonnels = new sap.m.Table({
            id: "tblPersonnels",
            width: "100%",
            enableBusyIndicator: false,
            noDataText: "{i18n>NoData}",
            mode: sap.m.ListMode.None,
            columns: [
                new sap.m.Column({ header: new sap.m.Text({ text: "{i18n>Name}" }) }),
            ]
        });
        
        controls.push(tablePersonnels);

        return controls;
    }
});