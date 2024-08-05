import { Routes, Route } from "react-router-dom";

import { AuthContextProvider } from "./context/authContext";

import NavBar from "./components/nav/Nav";
import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
import AllTrades from "./components/allTrades/allTrades";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import NotFound from "./components/notFound/NotFound";
import AddTrade from "./components/addTrade/AddTrade";
import TradeDetails from "./components/tradeDetails/TradeDetails";
import EditTrade from "./components/editTrade/EditTrade";
import Logout from "./components/logout/Logout";
import RouteGuardAuthUser from "./components/common/RouteGuardAuthUser";
import RouteGuardNONAuthUser from "./components/common/RouteGuardNONAuthUser";

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
              <Route element={<RouteGuardNONAuthUser />}>
                <Route path="/register" element={<Register />} />
              </Route>
              <Route element={<RouteGuardNONAuthUser />}>
                <Route path="/login" element={<Login />} />
              </Route>
              <Route element={<RouteGuardAuthUser />}>
                <Route path="/logout" element={<Logout />} />
              </Route>
              <Route element={<RouteGuardAuthUser />}>
                <Route path="/add-trade" element={<AddTrade />} />
              </Route>
              <Route element={<RouteGuardAuthUser />}>
                <Route path="/trades/:id/edit" element={<EditTrade />} />
              </Route>

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
