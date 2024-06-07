import { useWindowSize } from "@app/hooks/useWindowSize";
import { setWindowSize } from "@app/store/reducers/ui";
import { calculateWindowSize } from "@app/utils/helpers";
import ForgetPassword from "@modules/forgot-password/ForgotPassword";
import Login from "@modules/login/Login";
import Main from "@modules/main/Main";
import RecoverPassword from "@modules/recover-password/RecoverPassword";
import Register from "@modules/register/Register";
import { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import SubMenu from "@app/pages/Maker";
import Vechile from "@app/pages/Vehicle";
import Blank from "@pages/Blank";
import Profile from "@pages/profile/Profile";
import Company from "./pages/Company";

import Maker from "@app/pages/Maker";
import AddUser from "./pages/AddUser";
import Dealer from "./pages/Dealer";
import Documents from "./pages/Document";
import ImageUploader from "./pages/ImageUploader";
import Insurance from "./pages/Insurance";
import Insurance_Type from "./pages/Insurance_Type";
import Model from "./pages/Model";
import Owner from "./pages/Owner";
import Ownership_Type from "./pages/Ownership_Type";
import Page from "./pages/Page";
import Site from "./pages/Site";
import Status from "./pages/Status";
import Unit from "./pages/Unit";
import Users from "./pages/Users";
import Vechile_Attachment from "./pages/Vehicle_Attachments";
import Vehicle_Type from "./pages/Vehicle_Type";
import Warranty_Type from "./pages/Warranty_Type";
import Work_Assignment from "./pages/Work_Assignment";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import { setAuthentication } from "./store/reducers/auth";
import {
  GoogleProvider,
  getAuthStatus,
  getFacebookLoginStatus,
} from "./utils/oidc-providers";

const { VITE_NODE_ENV } = import.meta.env;

const App = () => {
  const windowSize = useWindowSize();
  const screenSize = useSelector((state: any) => state.ui.screenSize);
  const dispatch = useDispatch();
  const location = useLocation();

  const [isAppLoading, setIsAppLoading] = useState(true);

  const checkSession = async () => {
    try {
      let responses: any = await Promise.all([
        getFacebookLoginStatus(),
        GoogleProvider.getUser(),
        getAuthStatus(),
      ]);

      responses = responses.filter((r: any) => Boolean(r));

      if (responses && responses.length > 0) {
        dispatch(setAuthentication(responses[0]));
      }
    } catch (error: any) {
      console.log("error", error);
    }
    setIsAppLoading(false);
  };

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    const size = calculateWindowSize(windowSize.width);
    if (screenSize !== size) {
      dispatch(setWindowSize(size));
    }
  }, [windowSize]);

  useEffect(() => {
    if (location && location.pathname && VITE_NODE_ENV === "production") {
      ReactGA.send({
        hitType: "pageview",
        page: location.pathname,
      });
    }
  }, [location]);

  if (isAppLoading) {
    return <p>Loading</p>;
  }

  return (
    <>
      <Routes>
        <Route path="/login" element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/register" element={<PublicRoute />}>
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/forgot-password" element={<PublicRoute />}>
          <Route path="/forgot-password" element={<ForgetPassword />} />
        </Route>
        <Route path="/recover-password" element={<PublicRoute />}>
          <Route path="/recover-password" element={<RecoverPassword />} />
        </Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Main />}>
            <Route path="/sub-menu-2" element={<Blank />} />
            <Route path="/sub-menu-1" element={<SubMenu />} />
            <Route path="/blank" element={<Blank />} />
            <Route path="/maker" element={<Maker />} />
            <Route path="/vechileEngineType" element={<Vechile />} />
            <Route path="/model" element={<Model />} />
            <Route path="/unit" element={<Unit />} />
            <Route path="/status" element={<Status />} />
            <Route path="/insurance" element={<Insurance />} />
            <Route
              path="/vechile_attachment"
              element={<Vechile_Attachment />}
            />
            <Route path="/vechile_type" element={<Vehicle_Type />} />
            <Route path="/site" element={<Site />} />
            <Route path="/insurance_type" element={<Insurance_Type />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/dealer" element={<Dealer />} />
            <Route path="/warranty_type" element={<Warranty_Type />} />
            <Route path="/work_assignment" element={<Work_Assignment />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/owner" element={<Owner />} />
            <Route path="/ownership_type" element={<Ownership_Type />} />
            <Route path="/" element={<AddUser />} />
            <Route path="/company" element={<Company />} />
            <Route path="/users" element={<Users />} />
            <Route path="/page" element={<Page />} />
            <Route path="/uploadImages" element={<ImageUploader />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer
        autoClose={3000}
        draggable={false}
        position="top-right"
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnHover
      />
    </>
  );
};

export default App;
