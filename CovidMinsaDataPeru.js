(function () {
  var myConnector = tableau.makeConnector();

  myConnector.getSchema = function (schemaCallback) {
    var cols = [ {
      id: "invoiceNum",
      alias: "The Invoice Number",
      dataType: tableau.dataTypeEnum.string
  }, {
      id: "total",
      alias: "The Invoice Total",
      dataType: tableau.dataTypeEnum.int
  }];

  var tableSchema = {
      id: "Invoices",
      alias: "List of Invoices",
      columns: cols
  };

  schemaCallback([tableSchema]);
};

myConnector.getData = function(table, doneCallback) {
  $.getJSON("http://192.168.223.26:80/rest/INVOICES", function(resp) {
    
      var result = resp.__ENTITIES,
      
          tableData = [];
          console.log(result)
      // Iterate over the JSON object
      
      for (var i = 0, len = result.length; i < len; i++) {
      
          tableData.push({
              "invoiceNum": result[i].Invoice_Number,
              "total": result[i].Total
          });
      }

      table.appendRows(tableData);
      doneCallback();
  });
};

  tableau.registerConnector(myConnector);
  $(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "Invoices";
        tableau.submit();
       
    });
});
})();
