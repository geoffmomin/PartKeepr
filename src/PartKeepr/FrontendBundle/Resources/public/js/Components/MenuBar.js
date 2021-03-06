Ext.define('PartKeepr.MenuBar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: "widget.MenuBar",
    menu: {
        text: "Root",
        menu: []
    },

    createMenu: function (target, menuPath, root) {
        var item = menuPath.shift(), newItem;

        if (item === undefined) {
            newItem = {text: target.title, iconCls: target.iconCls, target: target};

            root.menu.push(newItem);
            return root;
        }

        var foundItem = false;

        for (var i = 0; i < root.menu.length; i++) {
            if (root.menu[i].text == item.text) {
                Ext.applyIf(root.menu[i], item);
                foundItem = i;
            }
        }

        if (foundItem === false) {
            newItem = {menu: []};

            Ext.applyIf(newItem, item);

            var data = this.createMenu(target, menuPath, newItem);
            root.menu.push(data);
        } else {
            this.createMenu(target, menuPath, root.menu[foundItem]);

        }

        return root;
    },
    initComponent: function () {
        var target, menuItemIterator;

        this.ui = "mainmenu";

        var menuItems = [
            // System Menu
            "PartKeepr.UserPreferencePanel",
            "PartKeepr.Components.SystemPreferences.Panel",
            "PartKeepr.Actions.LogoutAction",

            // Edit Menu
            "PartKeepr.ProjectEditorComponent",
            "PartKeepr.FootprintEditorComponent",
            "PartKeepr.ManufacturerEditorComponent",
            "PartKeepr.StorageLocationEditorComponent",
            "PartKeepr.DistributorEditorComponent",
            "PartKeepr.UserEditorComponent",
            "PartKeepr.PartMeasurementUnitEditorComponent",
            "PartKeepr.UnitEditorComponent",
            "PartKeepr.BatchJobEditorComponent",

            // View Menu
            "PartKeepr.SummaryStatisticsPanel",
            "PartKeepr.StatisticsChartPanel",
            "PartKeepr.SystemInformationGrid",
            "PartKeepr.ProjectReportView",
            'PartKeepr.ProjectRunEditorComponent',
            "PartKeepr.SystemNoticeEditorComponent",
            "PartKeepr.StockHistoryGrid",
        ];


        for (menuItemIterator = 0; menuItemIterator < menuItems.length; menuItemIterator++) {
            target = Ext.ClassManager.get(menuItems[menuItemIterator]);

            if (!target) {
                Ext.raise("Error: " + menuItems[menuItemIterator] + " not found!");
            }

            if (!target.menuPath) {
                Ext.raise("Error: " + menuItems[menuItemIterator] + " has no menuPath defined!");
            }
            this.createMenu(target, target.menuPath, this.menu);
        }

        this.items = this.menu.menu;

        this.callParent();
    }
});
