sap.ui.controller("HCMMissingTimesheets.views.Detail.Results.TableView.TableView", {

	onTogglePersonnelInfo: function(oEvent) {
	    var container = oEvent.getSource().getParent();
	    var containerId = container.getId();
	    $("#" + containerId + " .personnelInfo").toggleClass("invisible");
	}

});
