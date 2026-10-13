import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminLayOut from "./Components/LayOut.jsx/AdminLayOut";
import Orders from "./Components/Pages/admin/Orders";
import Calinder from "./Components/Pages/admin/Calinder";
import Subcerption from "./Components/Pages/admin/Subcreption";
import WaitList from "./Components/Pages/admin/WaitList";

const App = () => {
  return (
    <div className="font-geist">
      <Routes>
        <Route path="/" element={<AdminLayOut />}>
          <Route index element={<Orders />} />
          <Route path="/calinder" element={<Calinder />} />
          <Route path="/subcerption" element={<Subcerption />} />
          <Route path="/waitlist" element={<WaitList />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;