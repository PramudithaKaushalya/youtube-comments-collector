import React, { useState } from "react";
import { Row, Col, Input, Card } from "antd";
import {
  Checkbox,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Snackbar,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./MainView.css";
import axiosInstance from "../axiosInstance";

function Comments({ comments }) {
  const [selectedComments, selectComment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [responseMsg, setMessage] = useState("");

  const onRadioChange = (e, index) => {
    for (let i in selectedComments) {
      if (selectedComments[i].index === index) {
        selectedComments[i].label = e.target.value;
      }
    }
  };

  const onCheckboxChange = (e, index) => {
    if (e.target.checked) {
      let comment = {
        index: index,
        text: comments[index],
        label: 2,
      };
      selectComment([...selectedComments, comment]);
    } else {
      selectComment(selectedComments.filter((item) => item.index !== index));
    }
  };

  const isDisableRadio = (index) => {
    let commentWithIndex = selectedComments.filter(
      (item) => item.index === index
    );

    if (commentWithIndex.length > 0) {
      return false;
    }
    return true;
  };

  const onInputChange = (e, index) => {
    for (let i in selectedComments) {
      if (selectedComments[i].index === index) {
        selectedComments[i].text = e.target.value;
      }
    }
  };

  const writeToExcel = async () => {
    console.log(`Selected comments: ${selectedComments}`);

    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/comments/append",
        selectedComments
      );

      if (response.status === 200) {
        setMessage("Write to excel successfully");
      } else {
        setMessage("Failed to write excel");
      }
      console.log("Append successfully", response);
    } catch (error) {
      console.error("Error fetching comments", error);
    } finally {
      setLoading(false);
      setOpen(true);
      selectComment([]);
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
    <Card bordered={false}>
      <p style={{ textAlign: "left", paddingLeft: "15px" }}>
        Select the comments which are needed to collect. Then edit the text and
        categorize. After that click the button to append selected comments.
      </p>
      <div className="container">
        {comments.map((comment, index) => (
          <div className="item" key={index}>
            <Row>
              <Col span={1}>
                <Checkbox
                  onChange={(e) => onCheckboxChange(e, index)}
                  style={{ marginTop: "-5px" }}
                />
              </Col>
              <Col span={18}>
                <Input
                  defaultValue={comment}
                  onChange={(e) => onInputChange(e, index)}
                  disabled={isDisableRadio(index)}
                />
              </Col>
              <Col span={5} style={{ paddingLeft: "15px" }}>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={(e) => onRadioChange(e, index)}
                  disabled={isDisableRadio(index)}
                  style={{ marginTop: "-5px" }}
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Adult"
                    disabled={isDisableRadio(index)}
                  />
                  <FormControlLabel
                    value="0"
                    control={<Radio />}
                    label="Non Adult"
                    disabled={isDisableRadio(index)}
                  />
                </RadioGroup>
              </Col>
            </Row>
          </div>
        ))}
      </div>
      <Button
        variant="contained"
        type="primary"
        size="small"
        onClick={writeToExcel}
        loading={loading}
        disabled={selectedComments.length === 0 || loading}
      >
        {loading ? "Writing..." : "Write to Excel"}
      </Button>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={responseMsg}
        action={action}
      />
    </Card>
  );
}

export default Comments;
