import React from "react";
import { createContext, useReducer } from "react";

export const EmployeesContext = createContext();

export const employeesReducer = (state, action) => {
  switch (action.type) {
    case "SET_EMPLOYEES":
      return {
        employees: action.payload,
      };
    case "CREATE_EMPLOYEES":
      return {
        employees: [action.payload, ...state.employees],
      };
    case "DELETE_EMPLOYEES":
      return {
        employees: state.employees.filter((s) => s._id !== action.payload._id),
      };
    case "UPDATE_EMPLOYEES":
      state.employees = state.employees.filter(
        (s) => s._id !== action.payload._id
      );
      return {
        employees: [action.payload, ...state.employees],
      };
    case "GET_AVAILABLE_EMP":
      state.employees = action.payload;
      state.employees = state.employees.filter((s) => s.status == "Idle");
      return {
        employees: [...state.employees],
      };
    case "GET_AVAILABLE_DRIVERS":
      state.employees = action.payload;
      state.employees = state.employees.filter(
        (s) => s.status == "Idle" && s.role == "Driver"
      );
      return {
        employees: [...state.employees],
      };

    case "GET_ASSIGNED_DRIVER":
      state.employees = action.payload;
      state.employees = state.employees.filter(
        (s) =>
          s.status == "Occupied" &&
          s.role == "Driver" &&
          s.firstName == "Menuka"
      );
      return {
        employees: [...state.employees],
      };

    default:
      return state;
  }
};

export const EmployeesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(employeesReducer, {
    employees: null,
  });

  return (
    <EmployeesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </EmployeesContext.Provider>
  );
};
