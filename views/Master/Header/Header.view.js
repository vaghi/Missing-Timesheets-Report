sap.ui.jsview("HCMMissingTimesheets.views.Master.Header.Header", {

    createContent: function (oController)
    {
        var bar = new sap.m.Bar({
            contentLeft: [
              new sap.m.Image({
                src: FormatHelper.getPath() + "/img/bid.png",
                height: "80%"
              }),
            ],
            contentRight: [
                new sap.m.Text({ text: "" }).addStyleClass("appTitle").addStyleClass("bold"),              
            ]
    	}).addStyleClass('mainBar');
        return bar;
    }

});
