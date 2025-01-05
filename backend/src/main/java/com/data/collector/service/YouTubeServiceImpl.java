package com.data.collector.service;

import com.google.api.services.youtube.YouTube;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.util.*;

@Service
public class YouTubeServiceImpl implements YouTubeService {

    private static final String apiKey = "AIzaSyC4ipY-sVrrDggNoye8DsK0Sru-yESy7Ww";
    private static final Long maxLimit = 100L;
    private final YouTube youTube;

    @Autowired
    public YouTubeServiceImpl(YouTube youTube) {
        this.youTube = youTube;
    }

    public List<String> fetchComments(String videoId) throws IOException {
        List<String> commentSnippets = new ArrayList<>();
        YouTube.CommentThreads.List request = youTube.commentThreads()
                .list(Collections.singletonList("snippet"))
                .setVideoId(videoId)
                .setKey(apiKey)
                .setMaxResults(maxLimit);

        System.out.println("Request: "+request);
        var response = request.execute();

        do {
            YouTube.CommentThreads.List secondRequest = youTube.commentThreads()
                    .list(Collections.singletonList("snippet"))
                    .setVideoId(videoId)
                    .setKey(apiKey)
                    .setMaxResults(maxLimit)
                    .setPageToken(response.getNextPageToken());

            response = secondRequest.execute();

            response.getItems().forEach(
                    thread -> commentSnippets.add(thread.getSnippet().getTopLevelComment().getSnippet().getTextDisplay())
            );
        }
        while(response.getNextPageToken()!=null);

        return commentSnippets;
    }
}
