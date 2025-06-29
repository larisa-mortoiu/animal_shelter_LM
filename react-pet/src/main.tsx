import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import HomePage from "./Pages/HomePage.tsx";
import Contact from "./Pages/Contact.tsx";
import MyAccount from "./Pages/MyAccount.tsx";
import Servicii from "./Pages/Servicii.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/LoginPage.tsx";
import { AuthProvider } from "./Auth.tsx";
import Register from "./Pages/Register.tsx";
import RegisterConfirm from "./Pages/RegisterConfirm.tsx";
import Animals from "./Pages/Animals.tsx";
import AdminPage from "./Pages/AdminPage.tsx";
import AnimalsTable from "./Pages/AnimalsTable.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import AddAnimalForm from "./Pages/AddAnimalForm.tsx";
import { AnimalProvider } from "./ContextAnimal";
import VisitForm from "./Pages/VisitForm.tsx";
import VisitsTable from "./Pages/VisitsTable.tsx";
import AdoptedAnimalsTable from "./Pages/AdoptedAnimalsTable.tsx";
import { AdminRoute } from "./AdminRoute.tsx";
import DonatieForm from "./Pages/DonationForm.tsx";
import DonationConfirm from "./Pages/DonationConfirm.tsx";
import AdminMonitoring from "./Pages/AdminMonitoring.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "HomePage",
    element: <HomePage />,
  },
  {
    path: "Contact",
    element: <Contact />,
  },
  {
    path: "MyAccount",
    element: <MyAccount />,
  },
  {
    path: "Servicii",
    element: <Servicii />,
  },

  {
    path: "Login",
    element: <LoginPage />,
  },

  {
    path: "Register",
    element: <Register />,
  },

  {
    path: "RegisterConfirm",
    element: <RegisterConfirm />,
  },
  {
    path: "VisitForm",
    element: <VisitForm />,
  },
  {
    path: "Adopt",
    element: (
      <AnimalProvider>
        <Animals />
      </AnimalProvider>
    ),
  },

  {
    path: "Donation",
    element: <DonatieForm />,
  },

  {
    path: "Success",
    element: <DonationConfirm />,
  },

  {
    path: "Admin",
    element: (
      <AdminRoute>
        <AdminPage />
      </AdminRoute>
    ),
    children: [
      { path: "", element: <AnimalsTable /> },
      { path: "adopted", element: <AdoptedAnimalsTable /> },
      { path: "add", element: <AddAnimalForm /> },
      { path: "visits", element: <VisitsTable /> },
      { path: "monitoring", element: <AdminMonitoring /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
