# Table to Excel 2

[![Build Status](https://travis-ci.org/linways/table-to-excel.svg?branch=master)](https://travis-ci.org/linways/table-to-excel)

Export HTML table to valid excel file effortlessly.
This library uses [exceljs/exceljs](https://github.com/exceljs/exceljs) under the hood to create the excel.  
(Initial version of this library was using [protobi/js-xlsx](https://github.com/linways/table-to-excel/tree/V0.2.1), it can be found [here](https://github.com/linways/table-to-excel/tree/V0.2.1))

# Installation

## Browser

Just add a script tag:

```html
<script type="text/javascript" src="../dist/tableToExcel.js"></script>
```

## Node

```bash
npm install @linways/table-to-excel --save
```

```javascript
import TableToExcel from "@linways/table-to-excel";
```

# Usage

Create your HTML table as normal.  
To export content of table `#table1` run:

```javascript
TableToExcel.convert(document.getElementById("table1"));
```

or

```javascript
TableToExcel.convert(document.getElementById("table1"), {
  name: "table1.xlsx",
  sheet: {
    name: "Sheet 1"
  }
});
```
Check [this pen](https://codepen.io/rohithb/pen/YdjVbb) for working example.


<!-- See [samples/index.html]() or [this fiddle](https://jsfiddle.net/rohithb/e2h4mbc5/)for working example. -->

# Cell Types

Cell types can be set using the following data attributes:

| Attribute        | Description                        | Possible Values                                                            |
| ---------------- | ---------------------------------- | -------------------------------------------------------------------------- |
| `data-t`         | To specify the data type of a cell | `s` : String (Default)<br> `n` : Number <br> `b` : Boolean <br> `d` : Date |
| `data-hyperlink` | To add hyper link to cell          | External URL or hyperlink to another sheet                                 |
| `data-error`     | To add value of a cell as error    |                                                                            |

Example:

```html
<!-- for setting a cell type as number -->
<td data-t="n">2500</td>
<!-- for setting a cell type as date -->
<td data-t="d">05-23-2018</td>
<!-- for setting a cell type as boolean. String "true/false" will be accepted as Boolean-->
<td data-t="b">true</td>
<!-- for setting a cell type as boolean using integer. 0 will be false and any non zero value will be true -->
<td data-t="b">0</td>
<!-- For adding hyperlink -->
<td data-hyperlink="https://google.com">Google</td>
```

# Cell Styling

All styles are set using `data` attributes on `td` tags.
There are 5 types of attributes: `data-f-*`, `data-a-*`, `data-b-*`, `data-fill-*` and `data-num-fmt` which corresponds to five top-level attributes `font`, `alignment`, `border`, `fill` and `numFmt`.

| Category  | Attribute              | Description                   | Values                                                                                      |
| --------- | ---------------------- | ----------------------------- | ------------------------------------------------------------------------------------------- |
| font      | `data-f-name`          | Font name                     | "Calibri" ,"Arial" etc.                                                                     |
|           | `data-f-sz`            | Font size                     | "11" // font size in points                                                                 |
|           | `data-f-color`         | Font color                    | A hex ARGB value. Eg: FFFFOOOO for opaque red.                                              |
|           | `data-f-bold`          | Bold                          | `true` or `false`                                                                           |
|           | `data-f-italic`        | Italic                        | `true` or `false`                                                                           |
|           | `data-underline`       | Underline                     | `true` or `false`                                                                           |
|           | `data-f-strike`        | Strike                        | `true` or `false`                                                                           |
| Alignment | `data-a-h`             | Horizontal alignment          | `left`, `center`, `right`, `fill`, `justify`, `centerContinuous`, `distributed`             |
|           | `data-a-v`             | Vertical alignment            | `bottom`, `middle`, `top`, `distributed`, `justify`                                         |
|           | `data-a-wrap`          | Wrap text                     | `true` or `false`                                                                           |
|           | `data-a-indent`        | Indent                        | Integer                                                                                     |
|           | `data-a-rtl`           | Text direction: Right to Left | `true` or `false`                                                                           |
|           | `data-a-text-rotation` | Text rotation                 | 0 to 90                                                                                     |
|           |                        |                               | -1 to -90                                                                                   |
|           |                        |                               | vertical                                                                                    |
| Border    | `data-b-a-s`           | Border style (all borders)    | Refer `BORDER_STYLES`                                                                       |
|           | `data-b-t-s`           | Border top style              | Refer `BORDER_STYLES`                                                                       |
|           | `data-b-b-s`           | Border bottom style           | Refer `BORDER_STYLES`                                                                       |
|           | `data-b-l-s`           | Border left style             | Refer `BORDER_STYLES`                                                                       |
|           | `data-b-r-s`           | Border right style            | Refer `BORDER_STYLES`                                                                       |
|           | `data-b-a-c`           | Border color (all borders)    | A hex ARGB value. Eg: FFFFOOOO for opaque red.                                              |
|           | `data-b-t-c`           | Border top color              | A hex ARGB value.                                                                           |
|           | `data-b-b-c`           | Border bottom color           | A hex ARGB value.                                                                           |
|           | `data-b-l-c`           | Border left color             | A hex ARGB value.                                                                           |
|           | `data-b-r-c`           | Border right color            | A hex ARGB value.                                                                           |
| Fill      | `data-fill-color`      | Cell background color         | A hex ARGB value.                                                                           |
| numFmt    | `data-num-fmt`         | Number Format                 | "0"                                                                                         |
|           |                        |                               | "0.00%"                                                                                     |
|           |                        |                               | "0.0%" // string specifying a custom format                                                 |
|           |                        |                               | "0.00%;\\(0.00%\\);\\-;@" // string specifying a custom format, escaping special characters |

**`BORDER_STYLES:`** `thin`, `dotted`, `dashDot`, `hair`, `dashDotDot`, `slantDashDot`, `mediumDashed`, `mediumDashDotDot`, `mediumDashDot`, `medium`, `double`, `thick`

# Exclude Cells and rows

To exclude a cell or a row from the exported excel add `data-exclude="true"` to the corresponding `td` or `tr`.  
Example:

```html
<!-- Exclude entire row -->
<tr data-exclude="true">
  <td>Excluded row</td>
  <td>Something</td>
</tr>

<!-- Exclude a single cell -->
<tr>
  <td>Included Cell</td>
  <td data-exclude="true">Excluded Cell</td>
  <td>Included Cell</td>
</tr>
```

# Column Width

Column width's can be set by specifying `data-cols-width` in the `<table>` tag.
`data-cols-width` accepts comma separated column widths specified in character count .
`data-cols-width="10,20"` will set width of first coulmn as width of 10 charaters and second column as 20 characters wide.  
Example:

```html
<table data-cols-width="10,20,30">
  ...
</table>
```

# Row Height

Row Height can be set by specifying `data-height` in the `<tr>` tag.  
Example:

```html
<tr data-height="42.5">
  <td>Cell 1</td>
  <td>Cell 2</td>
</tr>
```

# Page Setup

All properties that can affect the printing of a sheet are held in a pageSetup object on the sheet.
Copied from https://github.com/exceljs/exceljs

```javascript
// create new sheet with pageSetup settings for A4 - landscape
var worksheet =  workbook.addWorksheet('sheet', {
  pageSetup:{paperSize: 9, orientation:'landscape'}
});

// create a new sheet writer with pageSetup settings for fit-to-page
var worksheetWriter = workbookWriter.addSheet('sheet', {
  pageSetup:{fitToPage: true, fitToHeight: 5, fitToWidth: 7}
});

// adjust pageSetup settings afterwards
worksheet.pageSetup.margins = {
  left: 0.7, right: 0.7,
  top: 0.75, bottom: 0.75,
  header: 0.3, footer: 0.3
};

// Set Print Area for a sheet
worksheet.pageSetup.printArea = 'A1:G20';

// Repeat specific rows on every printed page
worksheet.pageSetup.printTitlesRow = '1:3';

// Repeat specific columns on every printed page
worksheet.pageSetup.printTitlesColumn = 'A:C';
```

**Supported pageSetup settings**

| Name                  | Default       | Description |
| --------------------- | ------------- | ----------- |
| margins               |               | Whitespace on the borders of the page. Units are inches. |
| orientation           | 'portrait'    | Orientation of the page - i.e. taller (portrait) or wider (landscape) |
| horizontalDpi         | 4294967295    | Horizontal Dots per Inch. Default value is -1 |
| verticalDpi           | 4294967295    | Vertical Dots per Inch. Default value is -1 |
| fitToPage             |               | Whether to use fitToWidth and fitToHeight or scale settings. Default is based on presence of these settings in the pageSetup object - if both are present, scale wins (i.e. default will be false) |
| pageOrder             | 'downThenOver'| Which order to print the pages - one of ['downThenOver', 'overThenDown'] |
| blackAndWhite         | false         | Print without colour |
| draft                 | false         | Print with less quality (and ink) |
| cellComments          | 'None'        | Where to place comments - one of ['atEnd', 'asDisplayed', 'None'] |
| errors                | 'displayed'   | Where to show errors - one of ['dash', 'blank', 'NA', 'displayed'] |
| scale                 | 100           | Percentage value to increase or reduce the size of the print. Active when fitToPage is false |
| fitToWidth            | 1             | How many pages wide the sheet should print on to. Active when fitToPage is true  |
| fitToHeight           | 1             | How many pages high the sheet should print on to. Active when fitToPage is true  |
| paperSize             |               | What paper size to use (see below) |
| showRowColHeaders     | false         | Whether to show the row numbers and column letters |
| showGridLines         | false         | Whether to show grid lines |
| firstPageNumber       |               | Which number to use for the first page |
| horizontalCentered    | false         | Whether to center the sheet data horizontally |
| verticalCentered      | false         | Whether to center the sheet data vertically |

**Example Paper Sizes**

| Name                          | Value     |
| ----------------------------- | --------- |
| Letter                        | undefined |
| Legal                         |  5        |
| Executive                     |  7        |
| A3                            |  8        |
| A4                            |  9        |
| A5                            |  11       |
| B5 (JIS)                      |  13       |
| Envelope #10                  |  20       |
| Envelope DL                   |  27       |
| Envelope C5                   |  28       |
| Envelope B5                   |  34       |
| Envelope Monarch              |  37       |
| Double Japan Postcard Rotated |  82       |
| 16K 197x273 mm                |  119      |


# Release Changelog

## 1.0.0

[Migration Guide](https://github.com/linways/table-to-excel/wiki/Migration-guide-for-V0.2.1-to-V1.0.0) for migrating from V0.2.1 to V1.0.0

- Changed the backend to Exce[exceljs/exceljs](https://github.com/exceljs/exceljs)lJS
- Added border color
- Option to set style and color for all borders
- Exclude row
- Added text underline
- Added support for hyperlinks
- Text intent
- RTL support
- Extra alignment options
- String "true/false" will be accepted as Boolean
- Changed border style values
- Text rotation values changed

## 1.0.2

- Fixed bug in handling multiple columns merges in a sheet

## 1.0.3

- Option to specify row height

## 1.0.4

- Option to add pageSetup (based on Exceljs)
- Not written in Exceljs but A3 paperSize value = 8

