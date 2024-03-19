import { useState, useEffect } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Paper,
  TablePagination,
} from "@mui/material";
import { AxiosInstance } from "../api/axiosInstance";

function Actions() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page

  const getAllBooks = async () => {
    try {
      const res = await AxiosInstance.get("/api/admin/actions");
      setData(res.data);
    } catch (error) {
      console.log(error);
      alert("Error");
    }
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when changing rows per page
  };

  return (
    <div>
      <TableContainer
        sx={{
          pt: "80px",
        }}
        component={Paper}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography>Ady, Familyasy</Typography>
              </TableCell>
              <TableCell>
                <Typography>Fakulteti</Typography>
              </TableCell>
              <TableCell>
                <Typography>Topary</Typography>
              </TableCell>
              <TableCell>
                <Typography>Kitabyn ady</Typography>
              </TableCell>
              <TableCell>
                <Typography>Kitaby alan senesi:</Typography>
              </TableCell>
              <TableCell>
                <Typography>Kitaby tabsyran senesi:</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Pagination logic
              .map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.student.name}</TableCell>
                  <TableCell>{item.student.faculty}</TableCell>
                  <TableCell>{item.student.group}</TableCell>
                  <TableCell>{item.book.name}</TableCell>
                  <TableCell>{item.givenDate}</TableCell>
                  <TableCell>{item.receivedDate}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          sx={{
            position: "sticky",
            bottom: 0,
            right: 0,
            pt: "10px",
          }}
          component="div"
          count={data.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10]} // You can customize rows per page options as per your requirement
        />
      </TableContainer>
    </div>
  );
}

export default Actions;
