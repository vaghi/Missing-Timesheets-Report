jQuery.sap.require("sap.m.MessageToast");
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.declare("HCMMissingTimesheets.utils.MessageBoxHelper");

MessageBoxHelper = {
    
    _getTranslation: function(message) {
        var i18nModel = sap.ui.getCore().byId("App").getModel("i18n");
        var translation = i18nModel.getResourceBundle().getText(message);
        if (translation)
            return translation;
        return message;
    },

    showMessageToast: function (i18nMessage) {
        var m = this._getTranslation(i18nMessage);
        sap.m.MessageToast.show(m);
    },

    showAlert: function (i18nTitle, i18nMessage, fnOk) {
        var m = this._getTranslation(i18nMessage);
        var dialogAlert = new sap.m.Dialog({
            type: sap.m.DialogType.Message,
            title: this._getTranslation(i18nTitle),
            afterClose: function(){
            	dialogAlert.destroy();
            },
            content: [
                new sap.m.Text({ text: m }),
                new sap.m.FlexBox({
                    justifyContent: sap.m.FlexJustifyContent.End,
                    items: [
                        new sap.m.Image({
                            src: FormatHelper.getPath() + "/img/white/close.png",
                            press: function ()
                            {
                                dialogAlert.close();
                                if (fnOk)
                                    fnOk();
                            }
                        })
                    ]
                })
            ]
        }).addStyleClass("dialogCustom");
        dialogAlert.open();
    },

    showConfirm: function (i18nTitle, i18nMessage, fnOk)
    {
        var m = this._getTranslation(i18nMessage);
        var dialogConfirm = new sap.m.Dialog({
            title: this._getTranslation(i18nTitle),
            type: sap.m.DialogType.Message,
            afterClose: function(){
            	dialogConfirm.destroy();
            },
            buttons: [
                new sap.m.Image({
                    src: FormatHelper.getPath() + "/img/white/confirm.png",
                    press: function ()
                    {
                        dialogConfirm.close();
                        if (fnOk)
                            fnOk();
                    }
                }),
                new sap.m.Image({
                    src: FormatHelper.getPath() + "/img/white/close.png",
                    press: function ()
                    {
                        dialogConfirm.close();
                    }
                })
            ],
            content: [
                new sap.m.Text({ text: m })
            ]
        }).addStyleClass("dialogCustom");
        dialogConfirm.open();
    },
    
    showCustomDialog: function (title, content){
    	
    	var oFlexBox = new sap.m.FlexBox({
			justifyContent: sap.m.FlexJustifyContent.End,
			items: [
				new sap.m.Image({
					src: FormatHelper.getPath() + "/img/white/close.png",
					press: function () { dialog.close(); }
				})
			]
		});
    	
    	content.push(oFlexBox);
    	
    	var dialog = new sap.m.Dialog({
            type: sap.m.DialogType.Message,
            title: "{i18n>" + title +"}",
            content: content
        }).addStyleClass("dialogCustom");
        var i18nModel = sap.ui.getCore().byId("App").getModel("i18n");
        dialog.setModel(i18nModel, "i18n");
    	dialog.open();
    	
    },
    
    showObjectDialog: function (title, content, fnOk){
    	var dialog = new sap.m.Dialog({
    		id: "customObjectDialog",
            type: sap.m.DialogType.Message,
            title: "{i18n>" + title +"}",
            afterClose: function(){
            	dialog.destroy();
            },
            buttons: [
                new sap.m.Image({
                	id: "btnObjectDialogOk",
                    src: FormatHelper.getPath() + "/img/white/confirm.png",
                    press: function ()
                    {
                        dialog.close();
                        if (fnOk)
                            fnOk();
                    }
                }),
                new sap.m.Image({
                    src: FormatHelper.getPath() + "/img/white/close.png",
                    press: function ()
                    {
                        dialog.close();
                    }
                })
            ],
            content: content
        }).addStyleClass("dialogCustom");
        var i18nModel = sap.ui.getCore().byId("App").getModel("i18n");
        
        if(!fnOk)
        	sap.ui.getCore().byId("btnObjectDialogOk").setVisible(false);
        
        dialog.setModel(i18nModel, "i18n");
    	dialog.open();
    },
    
    onError:  function (title, shortError, longError) {
        BusyDialogHelper.close();
        var content = new sap.m.VBox({
        	items: [
    	        new sap.m.Text({text: shortError}),
    	        new sap.m.Link({
    	        	text: "{i18n>ShowDetails}",
    	        	press: [MessageBoxHelper.onShowErrorDetail,MessageBoxHelper]
    	        }).addStyleClass("marginTop"),
                new sap.m.HBox({
                    width: "100%",
                    id: "contentDetailBox",
                    items: [
                        new sap.m.TextArea({
                            id: "errorDetailText",
                            width: "100%",
                            value: longError
                        })
                    ]
                }).addStyleClass("errorDialogDetail").addStyleClass("invisible")
        	]
        });
        MessageBoxHelper.showObjectDialog(title, content);
    },
    
    onShowErrorDetail: function() {
    	
    	var display = $("#contentDetailBox").css("display");
    	var detailBox = sap.ui.getCore().byId("contentDetailBox");
    	
    	if(display.indexOf("none") > -1)
		{
    		detailBox.removeStyleClass("invisible");
		}
    	else
		{
			detailBox.addStyleClass("invisible");
		}
    }
    
};
