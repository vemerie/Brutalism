import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router";


import { lazy } from "react";
// import paths from "./path";


// import ErrorComponent from "./components/Error/ErrorComponet";
import ProtectedRoute from './components/protected/ProtectedRoute';
import Layout from "./pages/modules/layout";
import AuthLayout from "./pages/authentication/AuthLayout";
import LoginPage from "./pages/authentication/login/Login";

// Lazy load modules
const Dashboard = lazy(() => import("./pages/modules/dashboard"));
const Marketting = lazy(() => import("./pages/modules/marketting"));
const EmailInbox = lazy(() => import("./pages/modules/apps/email"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route
        index
        element={
          <ProtectedRoute>
            <Navigate to="/modules/dashboard" replace />
          </ProtectedRoute>
        }
      />
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
      <Route path={"/modules"} element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="marketting" element={<Marketting />} />
        <Route path="apps/emails" element={<EmailInbox />} />
      </Route>
    </Route>
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
