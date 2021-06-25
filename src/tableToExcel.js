import Parser from "./parser";
import saveAs from "file-saver";
import ExcelJS from "../node_modules/exceljs/dist/es5/exceljs.browser";

const TableToExcel = (function(Parser) {
  let methods = {};

  methods.initWorkBook = function() {
    let wb = new ExcelJS.Workbook();
    return wb;
  };

  methods.initSheet = function(wb, sheetName,pageSetup,properties,views) {
    let ws = wb.addWorksheet(sheetName,{pageSetup,properties,state:'visible',views});
    // let ws =wb.addWorksheet('test',{properties:{tabColor:{argb:'FF00FF00'}},views:[
    //   {state: 'frozen', ySplit: 5, activeCell: 'A1', showGridLines:false}
    //   ]})
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
    let ws;
    ws = this.initSheet(wb, opts.sheet.name,opts.pageSetup,opts.properties,opts.views);
    ws = Parser.parseDomToTable(ws, table, opts);
    return wb;
  };

  methods.tableToBook = function(table, opts) {
    let wb = this.initWorkBook();
    wb = this.tableToSheet(wb, table, opts);
    return wb;
  };
  
  methods.convert = function(table, opts = {}) {
    let defaultOpts = {
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
    };
    opts = { ...defaultOpts, ...opts };
    let wb = this.tableToBook(table, opts);
    this.save(wb, opts.name);
  };

  methods.manyTablesToSheet = function(wb, table, opts) {
    console.log("manyTablesToSheet");
    let ws;
    for(let x= 0; x <table.length; x++){
        ws = this.initSheet(wb, opts[x].sheet.name,opts[x].pageSetup,opts[x].properties,opts[x].views);
        ws = Parser.parseDomToTable(ws, table[x], opts[x]);
    }
    return wb;
  };
  methods.manyTablesToBook = function(table, opts) {
    let wb = this.initWorkBook();
     wb = this.manyTablesToSheet(wb, table, opts);
    return wb;
  };
  methods.convertMany = function(table, opts = []) {
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

    let wb = this.manyTablesToBook(table, opts?opts :defaultOpts);
    this.save(wb, opts[0].name);
  };

  return methods;
})(Parser);

export default TableToExcel;
window.TableToExcel = TableToExcel;
