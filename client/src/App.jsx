import { Routes, Route } from "react-router-dom";

import NavBar from "./components/nav/Nav";
import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
import AllTrades from "./components/allTrades/allTrades";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import NotFound from "./components/notFound/NotFound";
import AddTrade from "./components/addTrade/AddTrade";
import TradeDetails from "./components/tradeDetails/TradeDetails";
import { AuthContextProvider } from "./context/authContext";
import EditTrade from "./components/editTrade/EditTrade";

function App() {
  return (
    <AuthContextProvider>
      <>
        <div id="box">
          <NavBar />
          <main id="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/trades" element={<AllTrades />} />
              <Route path="/trades/:id" element={<TradeDetails />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/add-trade" element={<AddTrade />} />
              <Route path="/trades/:id/edit" element={<EditTrade />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </>
    </AuthContextProvider>
  );
}

export default App;
