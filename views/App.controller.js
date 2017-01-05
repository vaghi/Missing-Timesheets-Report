sap.ui.controller("HCMMissingTimesheets.views.App", {

    setResults: function (results)
    {
        /*if (results == undefined || results == null)
        {//empty results
            NavigationHelper.back("EmptyResults");
        }
        else
        {
            //hay PO*/
            NavigationHelper.to({ pageId: "HCMMissingTimesheets.views.Detail.Results.Results" });
            //sap.ui.getCore().byId("PurchaseOrder").setBindingContext(results, "purchaseOrders");
        //}
	},

});
