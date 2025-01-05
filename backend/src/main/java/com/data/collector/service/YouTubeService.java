package com.data.collector.service;

import java.io.IOException;
import java.util.List;

public interface YouTubeService {
    List<String> fetchComments(String videoId) throws IOException;
}
