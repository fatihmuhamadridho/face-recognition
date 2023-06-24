import * as XLSX from "xlsx";

export default function downloadExcel(data: any[], filename: string) {
    const workbook = XLSX.utils.book_new();
    const sheetData = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, sheetData, 'Sheet 1');
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const excelData = new Blob([excelBuffer], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(excelData);
  
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
  
    // Programmatically trigger the click event
    link.click();
  
    // Clean up the temporary URL object
    URL.revokeObjectURL(url);
}