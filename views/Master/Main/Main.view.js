sap.ui.jsview("HCMMissingTimesheets.views.Master.Main.Main", {

    getControllerName: function() {
        return "HCMMissingTimesheets.views.Master.Main.Main";
    },

    createContent: function(oController) {
        var page = new sap.m.Page({
			id: 'Main',
            headerContent: [
				new sap.m.Bar({
				    contentLeft: [
				      new sap.m.Image({
				        src: FormatHelper.getPath() + "/img/bid.png",
				        height: "80%"
						  }),
                    ],
                    contentRight: [
                        new sap.m.Text({ text:
                        {
                            parts: [
                                {path: "Device>/isPhone"},
                                {path: "i18n>AppTitle"}
                            ],
                            formatter: function (isPhone, lblMobile)
                            {
                                return (isPhone) ? lblMobile : "";
                            }
                        }
                        }).addStyleClass("appTitle").addStyleClass("bold"),
                    ]
				}).addStyleClass('mainBar')
            ],
            footer: new sap.m.Toolbar({
                content: [
                    new sap.m.HBox({
                        width: "100%",
                        justifyContent: sap.m.FlexJustifyContent.End,
                        items: [
                            new sap.m.Button({
                                id: "btnSearchResults",
                                text: "{i18n>Search}",
                                icon: "sap-icon://search",
                                press: [oController.onSearch, oController]
                            })
                        ]
                    })
                ]
            })
        });

        var filtersBox = new sap.m.VBox({
            id: "boxFilters",
            width: "100%",
            justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
            items: [
                new sap.m.Text({
                    text: "{i18n>Date}:",
                    wrapping: false
                }).addStyleClass("filterLabel"),
                new sap.m.DateRangeSelection({
                    id: "rangeDates",
                    displayFormat: "short",
                    width: "80%",
                    change: [oController.onSelectDate, oController]
                }),
                new sap.m.Text({
                    text: "{i18n>OrganizationUnit}:",
                    wrapping: false
                }).addStyleClass("filterLabel"),
                new sap.m.Input({
                	id: "inputSearchOrgUnit",
                	width: "80%",
                	liveChange: [oController.onOrgUnitSearch, oController]
                }),
                new sap.ui.commons.Tree({
                	id: "treeOrganizationUnit",
                	width: "80%",
                	showHorizontalScrollbar: true,
                	minWidth: "80%",
                	busy: true,
                	selectMode: sap.ui.commons.TreeSelectionMode.Single,
                	selectionChange: [oController.onTreeSelectionChange,oController]
            	}),
            	new sap.m.CheckBox({
            		id: "checkBoxTreeOrgUnit",
            		text: "{i18n>TreeSelectionMode}",
            		selected: false
            	}), 
            	new sap.m.CheckBox({
            		id: "checkBoxPersonnel",
            		text: "{i18n>SearchPersonnel}",
            		enabled: false,
            		select: [oController.onChangePersonnelCheckBox, oController]
            	}),
                new sap.m.Text({
                    id: "lblPersonnel",
                    text: "{i18n>Personnel}:",
                    wrapping: false
                }).addStyleClass("filterLabel"),
                new sap.m.ComboBox({
                    id: "cboPersonnel",
                    width: "80%",
                    enabled: false
                }).bindItems({
                    path: 'PersonnelModel>/PersonnelSet',
                    template: new sap.ui.core.Item({
                        key: '{PersonnelModel>Pernr}',
                        text: '{PersonnelModel>Emnam}'
                    })
                }),/*
                new sap.m.SearchField({
                	id: "searchFieldPersonnel",
                	width: '80%',
                	search: [oController.onOpenPersonnelDialog, oController]
                }),*/
                new sap.m.Text({
                    text: "{i18n>Hits}:",
                    wrapping: false,
                    visible: false //invisible hasta nuevo aviso
                }).addStyleClass("filterLabel"),
                new sap.m.Select({
                    id: "cboMaxHits",
                    selectedKey: '500',
                    visible: false, //invisible hasta nuevo aviso
                    items: [
                        new sap.ui.core.Item({
                            key: "50",
                            text: "50"
                        }),
                        new sap.ui.core.Item({
                            key: "100",
                            text: "100"
                        }),
                        new sap.ui.core.Item({
                            key: "500",
                            text: "500"
                        })
                    ]
                })

            ]
        }).addStyleClass("addMarginLeft");
        page.addContent(filtersBox);
        return page;
    }
});
