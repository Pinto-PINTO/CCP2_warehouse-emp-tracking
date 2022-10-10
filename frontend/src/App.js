import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ShipmentsForm from "./pages/ShipmentsForm";
import ShipmentsTable from "./pages/ShipmentsTable";
import { useAuthContext } from "./hooks/useAuthContext";

//Imports of Pages and Components

import Home from "./pages/Home";
import Login from "./pages/Login";
import EmployeeTracking from "./pages/EmployeeTracking";
import EmployeeForm from "./pages/EmployeeForm";
import Dashboard from "./pages/Dashboard";
import InventoryFormPage from "./pages/InventoryFormPage";
import InventoryTablePage from "./pages/InventoryTablePage";
import InventoryCard from './pages/InventoryCard'
import SupplierTable from "./pages/SupplierTable";
import SupplierForm from "./pages/SupplierForm";
import VehicleTable from "./pages/VehicleTable";
import VehicleForm from './pages/VehicleForm';
import VehicleCards from './pages/VehicleCards';
import VehicleEmpTable from './pages/VehicleEmpTable';
import QualityAssurance from "./pages/QualityAssurance";
import QAcards from "./pages/QAcards";
import QAForm from "./pages/QAForm";
import DistributionCards from "./pages/DistributionCards";
import DistributionForm from "./pages/DistributionForm";
import DistributionEmpTable from "./pages/DistributionEmpTable";

//importing sub pages
import TruckCard from './pages/sub_pages/TruckCard'
import ForkliftCard from './pages/sub_pages/ForkliftCard'
import PersonalCard from './pages/sub_pages/PersonalCard'
import UtilitiesCard from './pages/sub_pages/UtilitiesCard'
import VehicleDataInfo from './pages/sub_pages/VehicleDistInfo'

//------------------------------------------------------------------
//import Navbar from "./components/Navbar";

function App() {
  // User obj
  const { user } = useAuthContext();

  return (
    <Router>
      <Routes>
        <Route path="/" element={!user ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/employee" element={<EmployeeTracking />} />
        <Route path="/employee/form" element={<EmployeeForm />} />
        <Route path="/inventory" element={<InventoryTablePage />} />
        <Route path="/inventory/form" element={<InventoryFormPage />} />
        <Route path="/inventory/card" element={<InventoryCard />} />

        <Route path='/VehicleTable' element={<VehicleTable />} />
        <Route path='/VehicleForm' element={<VehicleForm />} />
        <Route path='/VehicleCards' element={<VehicleCards />} />
        <Route path='/VehicleEmpTable' element={<VehicleEmpTable />} />
        <Route path='/TruckCard' element={<TruckCard />} />
        <Route path='/ForkliftCard' element={<ForkliftCard />} />
        <Route path='/PersonalCard' element={<PersonalCard />} />
        <Route path='/UtilitiesCard' element={<UtilitiesCard />} />
        <Route path='/VehicleDataInfo' element={<VehicleDataInfo />} />

        <Route path="/supplierTable" element={<SupplierTable />} />
        <Route path="/SupplierForm" element={<SupplierForm />} />
        <Route path="/ShipmentsForm" element={<ShipmentsForm />} />
        <Route path="/ShipmentsTable" element={<ShipmentsTable />} />
        <Route path="/DistributionCards" element={<DistributionCards />} />
        <Route path="/DistributionForm" element={<DistributionForm />} />
        <Route
          path="/DistributionEmpTable"
          element={<DistributionEmpTable />}
        />
        <Route path="/QualityAssurance" element={<QAcards />} />
        <Route path="/QualityAssurance/Details" element={<QAForm />} />
        <Route
          path="/QualityAssurance/Assignment"
          element={<QualityAssurance />}
        />
      </Routes>
    </Router>
  );
}

export default App;
