package com.data.collector.service;

import com.data.collector.dto.Comment;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.List;

@Slf4j
@Service
public class ExcelServiceImpl implements ExcelService {

    private static final String FILE_PATH = "data.xlsx";

    @Override
    public void appendDataToExcel(List<Comment> data) {
        Workbook workbook;
        Sheet sheet;

        try {
            File file = new File(FILE_PATH);

            // Check if file exists, otherwise create a new one
            if (file.exists()) {
                // Open existing workbook
                FileInputStream fis = new FileInputStream(file);
                workbook = new XSSFWorkbook(fis);
                sheet = workbook.getSheetAt(0);
            } else {
                // Create new workbook and sheet
                workbook = new XSSFWorkbook();
                sheet = workbook.createSheet("Data");

                // Add header row
                Row header = sheet.createRow(0);
                header.createCell(0).setCellValue("Text");
                header.createCell(1).setCellValue("Label");
            }

            // Append data to the sheet
            int rowCount = sheet.getLastRowNum() + 1;
            for (Comment textLabel : data) {
                Row row = sheet.createRow(rowCount++);
                row.createCell(0).setCellValue(textLabel.getText());
                row.createCell(1).setCellValue(textLabel.getLabel());
            }

            // Write to file
            FileOutputStream fos = new FileOutputStream(FILE_PATH);
            workbook.write(fos);
            fos.close();
            workbook.close();

        } catch (Exception e) {
            log.error("Failed to append data to Excel file. {}", e.getLocalizedMessage());
            throw new RuntimeException("Failed to append data to Excel file", e);
        }
    }
}