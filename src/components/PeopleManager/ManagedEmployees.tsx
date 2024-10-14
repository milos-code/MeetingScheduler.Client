import React from "react";
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
  Avatar,
  Button,
  useArrowNavigationGroup,
} from "@fluentui/react-components";
import { DeleteRegular } from "@fluentui/react-icons";
import { IEmployee } from "../../models";
import { useDispatch } from "react-redux";
import { removeEmployee } from "../../redux/employeesSlice";
import "./ManagedEmployees.css";

interface IManagedEmployees {
  managedEmployees: IEmployee[];
  token: string;
}

const columns = [
  { columnKey: "name", label: "Name" },
  { columnKey: "email", label: "Email" },
  { columnKey: "position", label: "Position" },
  { columnKey: "action", label: "Action" },
];

const ManagedEmployees: React.FC<IManagedEmployees> = ({
  managedEmployees,
}) => {
  const dispatch = useDispatch();
  const keyboardNavAttr = useArrowNavigationGroup({ axis: "grid" });

  const handleRemoveEmployee = (employeeId: string) => {
    dispatch(removeEmployee(employeeId) as any);
  };

  return (
    <div className="managed-employees-container">
      <h2>Managed Employees</h2>
      <Table
        {...keyboardNavAttr}
        role="grid"
        aria-label="Managed Employees"
        className="managed-employees-table"
      >
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHeaderCell key={column.columnKey}>
                {column.label}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {managedEmployees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell tabIndex={0} role="gridcell">
                <TableCellLayout
                  media={
                    <Avatar
                      aria-label={`${employee.firstName} ${employee.lastName}`}
                      name={`${employee.firstName} ${employee.lastName}`}
                      size={32}
                    />
                  }
                >
                  {`${employee.firstName} ${employee.lastName}`}
                </TableCellLayout>
              </TableCell>
              <TableCell tabIndex={0} role="gridcell">
                {employee.email}
              </TableCell>
              <TableCell tabIndex={0} role="gridcell">
                {employee.position}
              </TableCell>
              <TableCell role="gridcell">
                <TableCellLayout>
                  <Button
                    icon={<DeleteRegular />}
                    onClick={() => handleRemoveEmployee(employee.id!)}
                  >
                    Remove
                  </Button>
                </TableCellLayout>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManagedEmployees;
