jQuery.sap.declare("HCMMissingTimesheets.utils.ExcelExportHelper");

ExcelExportHelper = {
    _save: function (exportCsv)
    {
        exportCsv.saveFile().always(function ()
        {
            this.destroy();
        });
    },
    
    openSeparatorDialog: function()
    {
        this._dialog = new sap.m.Dialog({
            title: "{i18n>Confirmation}",
            type: sap.m.DialogType.Message,
            afterClose: function ()
            {
                this.destroy();
            },
            content: [
                new sap.m.VBox({
                    items: [
                        new sap.m.HBox({
                            alignItems: sap.m.FlexAlignItems.Center,
                            items: [
                                new sap.m.Text({ text: "{i18n>CsvSeparator}" }),
                                new sap.m.ComboBox({
                                    id: "cboSeparators",
                                    selectedKey: ",",
                                    items: [
                                        new sap.ui.core.ListItem({ key: ";", text: "{i18n>SemiColon}(;)" }),
                                        new sap.ui.core.ListItem({ key: ",", text: "{i18n>Comma}(,)" })
                                    ]
                                })
                            ]
                        }),
                        new sap.m.FlexBox({
                            justifyContent: sap.m.FlexJustifyContent.End,
                            items: [
                                new sap.m.Image({
                                    src: FormatHelper.getPath() + "/img/white/confirm.png",
                                    press: [this.handleDownloadConfirm, this]
                                }),
                                new sap.m.Image({
                                    src: FormatHelper.getPath() + "/img/white/close.png",
                                    press: [this.handleDownloadClose, this]
                                })
                            ]
                        })
                    ]
                })
            ],
        }).addStyleClass("dialogCustom");
        //setea modelos
        this._dialog.setModel(sap.ui.getCore().byId("App").getModel("i18n"), "i18n");
        this._dialog.open();
    },

    handleDownloadConfirm: function ()
    {
    	//verifica si hay un separador
        var separator = sap.ui.getCore().byId("cboSeparators").getSelectedKey();
        if (!separator)
        {
            MessageBoxHelper.showAlert("Information", "NoSeparatorSelected");
            return;
        }
    	
      //columns
      var columns = [
          { name: i18nTranslationHelper.getTranslation("Status"), template: { content: "{Status}" } },
          { name: i18nTranslationHelper.getTranslation("OrganizationUnit"), template: { content: "{OrgehT}" } },
          { name: i18nTranslationHelper.getTranslation("Personnel Number"), template: { content: "{Pernr}" } },
          { name: i18nTranslationHelper.getTranslation("Personnel"), template: { content: "{Sname}" } },
          { name: i18nTranslationHelper.getTranslation("Email"), template: { content: "{Email}" } },
          { name: i18nTranslationHelper.getTranslation("Phone"), template: { content: "{Phone}" } },
          { name: i18nTranslationHelper.getTranslation("Difference"),
              template: {
                  content: {
                    parts: [{path: "Diff"},{path: "Catshours"},{path: "MinHs"}],
                    formatter: function(diff, catsHours, minHs) {
                        return parseInt(diff) + " " + i18nTranslationHelper.getTranslation("Hs")
                        + " (" + parseInt(catsHours) + '/' + parseInt(minHs) + ")";
                    }
                  }
             } },
          { name: i18nTranslationHelper.getTranslation("Position"), template: { content: "{Plans}" } }
      ];

      var jsonModel = sap.ui.getCore().byId("App").getModel("Results");
      //descarga a Excel
      ExcelExportHelper.ExportModel(jsonModel, "/Results", columns, separator);
      //busy
      this._dialog.close();
    },
    
    handleDownloadClose: function ()
    {
        this._dialog.close();
    },

    //export de modelo
    ExportModel: function(model, contextPath, columns, csvSeparator)
    {
        var oExport = new sap.ui.core.util.Export({
            exportType: new sap.ui.core.util.ExportTypeCSV({
                separatorChar: (csvSeparator) ? csvSeparator : ";"
            }),
            models: model,
            rows: {
                path: contextPath
            },
            columns: columns
        });
        //descarga
        this._save(oExport);
    }
};
