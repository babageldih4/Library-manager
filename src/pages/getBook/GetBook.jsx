import { useEffect, useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { Typography } from "@mui/material";
import { AxiosInstance } from "../../api/axiosInstance";

const GetBook = () => {
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState();
  const [scannedBook, setScannedBook] = useState(false);
  const [studentscanned, setStudentscanned] = useState(false);
  const handleScanStudent = (text) => {
    console.log(19, text);
    setScanned(true);
    setData({ studentId: text });

    // Perform any actions with the scanned data, such as fetching data using Axios
  };
  const handleErrorStudent = (err) => {
    console.error(err);
  };
  const handleScanBook = (text) => {
    console.log(28, text, data);
    setScannedBook(true);
    // setResultBook(text);
    const data2 = { studentId: data.studentId, bookId: text };
    console.log(data2);
    setData(data2);
    try {
      AxiosInstance.post("/api/admin/books/give", data2).then((res) =>
        console.log(res)
      );
    } catch (err) {
      console.error(err);
    }
    // Perform any actions with the scanned data, such as fetching data using Axios
  };
  const handleErrorBook = (err) => {
    console.error(err);
  };
  useEffect(() => {
    // Use setTimeout to update the message after 2000 milliseconds (2 seconds)
    const timeoutId = setTimeout(() => {
      setStudentscanned(true); // Scanned after 5 seconds
    }, 5000);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div
      style={{
        paddingTop: "80px",
      }}
    >
      {scanned ? (
        <>
          {scannedBook ? (
            <div
              style={{
                width: "100%",
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                  color: "green",
                  pt: "100px",
                  pb: "70px",
                }}
              >
                Ustunliki kabul edildi
              </Typography>
            </div>
          ) : (
            <>
              <Typography
                variant="h3"
                sx={{
                  display: "flex",
                  textAlign: "center",
                  justifyContent: "center",
                  pt: "20px",
                  pb: "70px",
                }}
              >
                Kitabyn qr kodyny okadyn:
              </Typography>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    textAlign: "center",
                    justifyContent: "center",
                    width: "30%",
                  }}
                >
                  {" "}
                  <Scanner
                    onResult={handleScanBook}
                    onError={handleErrorBook}
                    enabled={studentscanned}
                  />
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <Typography
            variant="h3"
            sx={{
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
              pt: "20px",
              pb: "70px",
            }}
          >
            Talybyn qr-kodyny okadyn:
          </Typography>
          <div
            style={{
              display: "flex",
              width: "100%",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                width: "30%",
              }}
            >
              {" "}
              <Scanner
                onResult={handleScanStudent}
                onError={handleErrorStudent}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GetBook;
