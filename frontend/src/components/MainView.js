import "./MainView.css";
import React, { useState } from "react";
import { Alert, Row, Col, Input, Space } from "antd";
import { Button, Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axiosInstance from "../axiosInstance";
import Comments from "./Comments";

function MainView() {
  const [videoUrl, setVideoUrl] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const fetchComments = async () => {
    setOpen(true);
    setLoading(true);
    setComments([]);
    try {
      const response = await axiosInstance.get("/comments", {
        params: { videoUrl },
      });
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments", error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Space
      direction="vertical"
      size="middle"
      style={{
        display: "flex",
      }}
    >
      <b>
        <Alert
          message="Sinhala Text Collector"
          type="success"
          className="mt-5"
        />
      </b>
      <Row>
        <Col span={21}>
          <Input
            placeholder="Insert a youtube video URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </Col>
        <Col span={3} style={{ paddingLeft: "15px" }}>
          <Button
            variant="contained"
            type="primary"
            size="small"
            disabled={videoUrl === "" || loading}
            onClick={fetchComments}
            block
          >
            Fetch Comments
          </Button>
        </Col>
      </Row>

      {loading && <p>Loading...</p>}

      {comments.length > 0 && !loading ? (
        <Comments comments={comments} />
      ) : null}

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Fetching Comments...."
        action={action}
      />
    </Space>
  );
}

export default MainView;
