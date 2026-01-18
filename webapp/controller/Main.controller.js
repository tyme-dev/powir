sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/Text"
], function (Controller, JSONModel, Text) {
  "use strict";

  return Controller.extend("powir.controller.Main", {
    onInit: function () {
      // get app meta model from component
      var oComponent = this.getOwnerComponent();
      var oModel = oComponent.getModel("appMeta");
      if (!oModel) {
        oModel = new JSONModel({
          appTitle: "Powir"
        });
        oComponent.setModel(oModel, "appMeta");
      }
    },

    onOpenRepo: function () {
      var sUrl = "https://github.com/tyme-dev/powir";
      // Prefer Electron shell if available (preload/contextBridge recommended)
      if (window && window.require) {
        try {
          const { shell } = window.require("electron");
          shell.openExternal(sUrl);
          return;
        } catch (e) {
          // fallback to window.open
        }
      }
      window.open(sUrl, "_blank");
    },

    onNavSelect: function (oEvent) {
      var oItem = oEvent.getParameter("listItem") || oEvent.getParameter("item");
      if (!oItem) return;
      var sTitle = oItem.getTitle();
      var oContainer = this.byId("detailContainer");
      oContainer.destroyItems();

      // Simple view switching — replace with fragments or full views for production.
      if (sTitle === "Information") {
        oContainer.addItem(new Text({ text: "Information view (to be implemented - port InformationWindow.jsx here)" }));
      } else if (sTitle === "About") {
        oContainer.addItem(new Text({ text: "About view (port AboutWindow.jsx here)" }));
      } else if (sTitle === "Links") {
        oContainer.addItem(new Text({ text: "Links view (port LinksWindow.jsx here)" }));
      } else if (sTitle === "Actions") {
        oContainer.addItem(new Text({ text: "Actions (export features, etc.)" }));
      }
    }
  });
});
