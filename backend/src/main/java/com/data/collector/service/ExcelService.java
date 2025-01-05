package com.data.collector.service;

import com.data.collector.dto.Comment;
import java.util.List;

public interface ExcelService {
    void appendDataToExcel(List<Comment> data);
}
