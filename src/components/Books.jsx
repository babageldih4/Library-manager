import {
  Paper,
  Table,
  TableBody,
  Typography,
  Popover,
  Button,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import { AxiosInstance } from "../api/axiosInstance";
import { useEffect, useState } from "react";

function Books() {
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page

  const getAllBooks = async () => {
    try {
      const response = await AxiosInstance.get(
        `http://localhost:5019/api/admin/books`
      );
      setData(response.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getAllBooks(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper>
      <TableContainer sx={{ pt: "80px" }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography>Kitaplar</Typography>
              </TableCell>
              <TableCell>
                <Typography>Kitabyň yyly</Typography>
              </TableCell>
              <TableCell>
                <Typography>Kitabyň žanry</Typography>
              </TableCell>
              <TableCell>
                <Typography>Kitabyň sany</Typography>
              </TableCell>
              <TableCell>
                <Typography>Ginisleyin</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.year}</TableCell>
                  <TableCell>{item.genre}</TableCell>
                  <TableCell>{item.stock}</TableCell>
                  <TableCell>
                    <Button
                      aria-describedby={id}
                      variant="outlined"
                      onClick={handleClick}
                    >
                      Ginisleyin
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
                      {item.received_books.map((subItem, id) => (
                        <div key={id}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Ady/familyasy</TableCell>
                                <TableCell>Fakulteti</TableCell>
                                <TableCell>topary</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell>{subItem.name}</TableCell>
                                <TableCell>{subItem.faculty}</TableCell>
                                <TableCell>{subItem.group}</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      ))}
                    </Popover>
                  </TableCell>
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
          rowsPerPageOptions={[10]}
        />
      </TableContainer>
    </Paper>
  );
}

export default Books;
