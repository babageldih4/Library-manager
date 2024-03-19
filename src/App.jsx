import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./components/header/Index";
import GetBook from "./pages/getBook/GetBook";
import RecieveBook from "./pages/recieveBook/RecieveBook";
import Actions from "./components/Actions";
import AddStudent from "./components/AddStudent";
import AddBook from "./components/AddBook";
import Books from "./components/Books";
// import QRScanner from "./components/QRScanner";


const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Index />}>
            <Route path="/getbook" element={<GetBook />} />
            <Route path="/submitbook" element={<RecieveBook />} />
            <Route path="/addstudent" element={<AddStudent />} />
            <Route path="/addbook" element={<AddBook />} />
            <Route path="/actions" element={<Actions />} />
            <Route path="/books" element={<Books />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
