import Parser from "./parser";
import saveAs from "file-saver";
import ExcelJS from "../node_modules/exceljs/dist/es5/exceljs.browser";

const TableToExcel = (function(Parser) {
  let methods = {};

  methods.initWorkBook = function() {
    let wb = new ExcelJS.Workbook();
    return wb;
  };

  methods.initSheet = function(wb, sheetName,pageSetup,properties) {
    let ws = wb.addWorksheet(sheetName,{pageSetup,properties});
    return ws;
  };

  methods.save = function(wb, fileName) {
    wb.xlsx.writeBuffer().then(function(buffer) {
      saveAs(
        new Blob([buffer], { type: "application/octet-stream" }),
        fileName
      );
    });
  };

  methods.tableToSheet = function(wb, table, opts) {
    console.log("HEHE");
    let ws;
    for(let x= 0; x <opts.length; x++){
        ws = this.initSheet(wb, opts[x].sheet.name,opts[x].pageSetup,opts[x].properties);
        ws = Parser.parseDomToTable(ws, table, opts[x]);
    }
    return wb;
  };

  methods.tableToBook = function(table, opts) {
    let wb = this.initWorkBook();
    wb = this.tableToSheet(wb, table, opts);
    return wb;
  };
  
  methods.convert = function(table, opts = []) {
    let defaultOpts = [{
      name: "export.xlsx",
      autoStyle: false,
      sheet: {
        name: "Sheet 1"
      },
      pageSetup: {
        orientation: 'portrait',
        pageSize: 9
      },
      properties: {
        showGridLines: true
      }
    }, 
    {
      name: "export.xlsx",
      autoStyle: false,
      sheet: {
        name: "Sheet 2"
      },
      pageSetup: {
        orientation: 'portrait',
        pageSize: 9
      },
      properties: {
        showGridLines: true
      }
    }];
    opts = { ...defaultOpts, ...opts };
    let wb = this.tableToBook(table, opts);
    this.save(wb, opts.name);
  };

  return methods;
})(Parser);

export default TableToExcel;
window.TableToExcel = TableToExcel;
