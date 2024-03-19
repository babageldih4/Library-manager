import React, { useEffect, useState } from "react";
import { AxiosInstanceFormData } from "../api/axiosInstance";
import { Button, Popover, Container, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const AddBook = () => {
  // const [selectedFile, setSelectedFile] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [upload, setUpload] = useState(false);
  const [error, setError] = useState(null);
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
  };
  const handleUpload = async () => {
    setIsLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("excelFile", file);
    try {
      AxiosInstanceFormData.post(
        "/api/admin/books/upload-excel",
        formData
      ).then((res) => {
        console.log(res);
        console.log(res.status);
        if (res.status === 200) {
          setUpload(true);
        }
      });
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => handleUpload, []);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        pt: "140px",
      }}
    >
      <Button
        sx={{ justifyContent: "center" }}
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        startIcon={<CloudUploadIcon />}
      >
        Kitap gosmak
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <input
          type="file"
          onChange={handleFileChange}
          accept=".xlsx"
          style={{ width: "100%" }}
        />
        {fileName && <p>Selected file: {fileName}</p>}
        {!upload && isLoading && <p>Uploading...</p>}
        {error && <p>Error: {error}</p>}
        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={!file}
          sx={{
            alignItems: "center",
            textAlign: "center",
            width: "100%",
            justifyContent: "center",
          }}
        >
          Upload
        </Button>
        {upload && (
          <Typography
            variant="h6"
            sx={{
              color: "green",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            Sucessfully Upladed
          </Typography>
        )}
      </Popover>
    </Container>
  );
};

export default AddBook;
