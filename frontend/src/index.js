import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ItemsContextProvider } from "./context/ItemContext";
import { SupplierContextProvider } from "./context/SupplierContext";
import { ShipmentsContextProvider } from "./context/ShipmentContext";
import { EmployeesContextProvider } from "./context/EmployeeContext";
import { QualityAssuranceProvider } from "./context/QualityAssuranceContext";
import { AuthContextProvider } from "./context/AuthContext";
import { VehicleContextProvidor } from "./context/VehicleContext";
import { DistributionsContextProvider } from "./context/DistributionContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ItemsContextProvider>
        <SupplierContextProvider>
          <ShipmentsContextProvider>
            <EmployeesContextProvider>
              <QualityAssuranceProvider>
                <VehicleContextProvidor>
                  <DistributionsContextProvider>
                    <App />
                  </DistributionsContextProvider>
                </VehicleContextProvidor>
              </QualityAssuranceProvider>
            </EmployeesContextProvider>
          </ShipmentsContextProvider>
        </SupplierContextProvider>
      </ItemsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
