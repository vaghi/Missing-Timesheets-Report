sap.ui.controller("HCMMissingTimesheets.views.Detail.Results.TableViewMobile.TableViewMobile", {
	onToggleDetailInfo: function(oEvent) {
	    var container = oEvent.getSource().getParent();
	    var containerId = container.getId();
	    $("#" + containerId + " .detailInfo").toggleClass("invisible");
	}
});
