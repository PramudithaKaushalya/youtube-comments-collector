package com.data.collector.controller;

import com.data.collector.dto.Comment;
import com.data.collector.service.ExcelService;
import com.data.collector.service.YouTubeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/comments")
public class YouTubeController {
    @Autowired
    YouTubeService youTubeService;

    @Autowired
    ExcelService excelService;

    @GetMapping
    public List<String> getComments(@RequestParam String videoUrl) throws IOException {
        String videoId = extractVideoId(videoUrl);
        return youTubeService.fetchComments(videoId);
    }

    private String extractVideoId(String videoUrl) {
        // Extract video ID from URL using regex or URL parsing logic
        return videoUrl.split("v=")[1].split("&")[0];
    }

    @PostMapping("/append")
    public ResponseEntity<String> appendDataToExcel(@RequestBody List<Comment> data) {
        try {
            excelService.appendDataToExcel(data);
            return ResponseEntity.ok("Data appended to Excel successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to append data: " + e.getMessage());
        }
    }
}
