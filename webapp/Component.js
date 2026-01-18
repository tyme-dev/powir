sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/model/json/JSONModel"
], function (UIComponent, JSONModel) {
  "use strict";

  return UIComponent.extend("powir.Component", {
    metadata: {
      manifest: "json"
    },

    init: function () {
      // call the base component's init function
      UIComponent.prototype.init.apply(this, arguments);

      // set a simple model for app metadata (could be replaced with actual config)
      var oModel = new JSONModel({
        appTitle: "Powir",
        version: "2.0.0"
      });
      this.setModel(oModel, "appMeta");
    }
  });
});
