import SignUpForm from "./pages/SignUpForm";
import { Toaster } from "sonner";
import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Restaurants from "./pages/Restaurants";
import RestaurantMenu from "./pages/RestaurantMenu";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Navbar from "./components/home/Navbar";
import CheckOut from "./pages/CheckOut";
//import { Toaster } from "react-hot-toast";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import Recipes from "./pages/Recipes";
import RecipePage from "./pages/RecipePage";
import { useLocation } from "react-router-dom";
import AdminDashboard from "./components/Admin/Dashboard/AdminDashboard";
import RestaurantNavbar from "./components/restaurantAdmin/RestaurantNavbar";
import RestaurantSidebar from "./components/restaurantAdmin/RestaurantSidebar";
import Orders from "./components/restaurantAdmin/Orders/Orders";
import MenuList from "./components/restaurantAdmin/Menu/MenuList";
import AddMenu from "./components/restaurantAdmin/Menu/AddMenu";
import EmailSigninForm from "./pages/EmailSigninForm";
import EditMenu from "./components/restaurantAdmin/Menu/EditMenu";
import Order from "./components/restaurantAdmin/Orders/Order";
import RestaurantReviews from "./components/restaurantAdmin/Reviews/RestaurantReviews";
import RestaurantProfile from "./components/restaurantAdmin/Profile/RestaurantProfile";
import RestaurantSignUpForm from "./pages/ResataurantSignupForm";
import AdminSidebar from "./components/Admin/AdminSidebar";
import AdminNavbar from "./components/Admin/AdminNavbar";
import AdminReviews from "./components/Admin/Reviews/AdminReviews";
import RestaurantsList from "./components/Admin/Restaurants/RestaurantsList";
import RestaurantDetails from "./components/Admin/Restaurants/RestaurantDetails";
import CustomersList from "./components/Admin/Customers/CustomersList";
import AdminsList from "./components/Admin/Admins/AdminsList";
import CustomerDetails from "./components/Admin/Customers/CustomerDetails";
import Queries from "./components/Admin/Queries/Queries";
import RestaurantDashboard from "./components/restaurantAdmin/Dashboard/RestaurantDashboard";
import { useAuth } from "./AuthContext";

const Root = () => {
  const location = useLocation();
  // Define an array of paths where you want to hide the Navbar
  const pathsWithoutNavbar = ["/signin", "/signup", "/restaurant/dashboard"];

  // Check if the current path is in the array
  const hideNavbar = pathsWithoutNavbar.includes(location.pathname);
  return (
    <React.Fragment>
      {!hideNavbar && <Navbar />}
      <Outlet />
      <Toaster position="bottom-center" richColors />
    </React.Fragment>
  );
};

const ProtectedRestaurantAdminRoute = ({ element }) => {
  const { user, loading } = useAuth();
  const isAuthenticated = user !== null;
  const hasCorrectRole = user && user.user_role === "restaurant";
  if (loading) {
    return <p>Loading...</p>;
  }
  if (!isAuthenticated || !hasCorrectRole) {
    return <Navigate to="/restaurant/signin" replace />;
  }

  return element;
};

const ProtectedAdminRoute = ({ element }) => {
  const { user, loading } = useAuth();
  const isAuthenticated = user !== null;
  const hasCorrectRole =
    user && (user.user_role === "admin" || user.user_role == "superadmin");
  if (loading) {
    return <p>Loading...</p>;
  }
  if (!isAuthenticated || !hasCorrectRole) {
    return <Navigate to="/admin/signin" replace />;
  }

  return element;
};

const RestaurantAdmin = () => {
  return (
    <div className="max-h-full m-0">
      <RestaurantNavbar />
      <div className="flex flex-row">
        <div className="lg:flex-[2]">
          <RestaurantSidebar />
        </div>
        <div className="flex-[11] max-h-[88vh] overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const Admin = () => {
  return (
    <div className="max-h-full m-0">
      <AdminNavbar />
      <div className="flex flex-row">
        <div className="lg:flex-[2]">
          <AdminSidebar />
        </div>
        <div className="flex-[11] max-h-[88vh] overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const EmptyOutletWithToaster = () => {
  return (
    <div>
      <Outlet />
      <Toaster position="top-right" richColors />
    </div>
  );
};

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      <Route element={<Root />}>
        <Route index element={<Home />} />
        <Route path="restaurants" element={<Restaurants />} />
        <Route path="recipes" element={<Recipes />} />
        <Route path="restaurant/:id" element={<RestaurantMenu />} />
        <Route path="recipepage" element={<RecipePage />} />
        <Route path="about" element={<About />} />
        <Route path="profile" element={<Profile />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="checkout" element={<CheckOut />} />
        <Route path="signin" element={<EmailSigninForm />} />
        <Route path="signup" element={<SignUpForm />} />
      </Route>

      <Route path="restaurant" element={<EmptyOutletWithToaster />}>
        <Route path="" element={<PageNotFound />} />
        <Route
          path=""
          element={
            <ProtectedRestaurantAdminRoute element={<RestaurantAdmin />} />
          }
        >
          <Route path="dashboard" element={<RestaurantDashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<Order />} />
          <Route path="menu" element={<MenuList />} />
          <Route path="add-menu" element={<AddMenu />} />
          <Route path="edit-menu/:id" element={<EditMenu />} />
          <Route path="reviews" element={<RestaurantReviews />} />
          <Route path="profile" element={<RestaurantProfile />} />
        </Route>
        <Route path="signin" element={<EmailSigninForm />} />
        <Route path="signup" element={<RestaurantSignUpForm />} />
      </Route>

      <Route path="admin" element={<EmptyOutletWithToaster />}>
        <Route path="" element={<PageNotFound />} />
        <Route path="" element={<ProtectedAdminRoute element={<Admin />} />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="customers" element={<CustomersList />} />
          <Route path="admins" element={<AdminsList />} />
          <Route path="customers/:id" element={<CustomerDetails />} />
          <Route path="restaurants" element={<RestaurantsList />} />
          <Route path="restaurants/:id" element={<RestaurantDetails />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="queries" element={<Queries />} />
        </Route>
        <Route path="signin" element={<EmailSigninForm />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

const App = () => {
  return (
    <div className="w-screen h-screen">
      <RouterProvider router={Router} />
    </div>
  );
};

export default App;
