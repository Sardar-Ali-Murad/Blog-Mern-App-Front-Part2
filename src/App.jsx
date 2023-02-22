import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login, Register, CreateBlog,SingleBlog } from "./pages/index";
import { Headers, ProtectedRoute } from "./components/index";
import {useSelector} from "react-redux"
const App = () => {
  let {light}=useSelector((state)=>state.store)
  return (
    <div style={{ overflowX: "hidden"}}>
      <BrowserRouter>
        <Headers />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/createBlog"
            element={
              <ProtectedRoute>
                <CreateBlog />
              </ProtectedRoute>
            }
          />

          <Route
            path="/blog/:blogId"
            element={
              <ProtectedRoute>
                <SingleBlog />
              </ProtectedRoute>
            }
          />

          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
