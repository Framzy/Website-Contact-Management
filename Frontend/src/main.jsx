import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./components/Layout";
import UserRegister from "./components/Users/UserRegister";
import UserLogin from "./components/Users/UserLogin";
import DashboardLayout from "./components/DashboardLayout";
import UserProfile from "./components/Users/UserProfile";
import ContactCreate from "./pages/Contacts/ContactCreate";
import ContactEdit from "./pages/Contacts/ContactEdit";
import ContactList from "./components/Contacts/ContactList";
import ContactDetail from "./components/Contacts/ContactDetail";
import AddressCreate from "./pages/Addresses/AddressCreate";
import AddressEdit from "./pages/Addresses/AddressEdit";
import UserCheck from "./components/Users/UserCheck";
import ErrorPage from "./pages/Error/ErrorPage";
import "./styles/loader.css";
import "./styles/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Middleware route */}
        <Route path="/" element={<UserCheck />}>
          {/* Public routes */}
          <Route element={<Layout />}>
            <Route path="register" element={<UserRegister />} />
            <Route path="login" element={<UserLogin />} />
          </Route>

          {/* Protected routes */}
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route path="users/profile" element={<UserProfile />} />
            <Route path="contacts">
              <Route index element={<ContactList />} />
              <Route path="create" element={<ContactCreate />} />
              <Route path=":id">
                <Route index element={<ContactDetail />} />
                <Route path="edit" element={<ContactEdit />} />
                <Route path="addresses">
                  <Route path="create" element={<AddressCreate />} />
                  <Route path=":addressId/edit" element={<AddressEdit />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>

        {/* Error pages (di luar UserCheck agar universal) */}
        <Route
          path="/unauthorized"
          element={
            <ErrorPage
              code="401"
              title="Unauthorized"
              message="You don't have permission to access this page."
              buttonText="Login"
              buttonLink="/login"
            />
          }
        />
        <Route
          path="/server-error"
          element={
            <ErrorPage
              code="500"
              title="Internal Server Error"
              message="Something went wrong on our end. Please try again later."
            />
          }
        />
        <Route
          path="*"
          element={
            <ErrorPage
              code="404"
              title="Page Not Found"
              message="Sorry, we couldn't find that page."
              buttonText="Exist Page"
            />
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
