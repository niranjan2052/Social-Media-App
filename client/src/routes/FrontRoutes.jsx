import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as Pages from "../pages";
import PageNotFound from "../pages/PageNotFound";
import { useSelector } from "react-redux";

export const FrontRoutes = () => {
  const user = useSelector((state) => state.user.value);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <Pages.Home /> : <Pages.Login />}
        ></Route>
        <Route path="/login" element={<Pages.Login />}></Route>
        <Route path="/register" element={<Pages.Register />}></Route>
        <Route path="/profile/:username" element={<Pages.Profile />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
