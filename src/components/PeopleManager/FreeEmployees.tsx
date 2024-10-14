import React, { useState } from "react";
import { Dropdown, IDropdownOption, PrimaryButton } from "@fluentui/react";
import { IEmployee } from "../../models";
import { useDispatch } from "react-redux";
import { addEmployee } from "../../redux/employeesSlice";
import "./FreeEmployees.css";

interface IFreeEmployeesProps {
  employees: IEmployee[];
  token: string;
}

const FreeEmployees: React.FC<IFreeEmployeesProps> = ({ employees, token }) => {
  const dispatch = useDispatch();

  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>("");

  const handleAddEmployee = () => {
    if (selectedEmployeeId) {
      dispatch(addEmployee(selectedEmployeeId) as any);
    } else {
      alert("Please select an employee.");
    }
  };

  const dropdownOptions: IDropdownOption[] = employees.map((employee) => ({
    key: employee.id!,
    text: `${employee.email} - ${employee.position}`,
  }));

  return (
    <div className="free-employees-container">
      <h2>Assign Employee</h2>
      <div className="free-employees-form">
        <div className="form-group">
          <label>Select Employee</label>
          <Dropdown
            options={dropdownOptions}
            selectedKey={selectedEmployeeId}
            onChange={(_, option) =>
              setSelectedEmployeeId(option?.key as string)
            }
          />
        </div>
        <PrimaryButton
          text="Assign Employee"
          onClick={handleAddEmployee}
          className="assign-employee-button"
        />
      </div>
    </div>
  );
};

export default FreeEmployees;
