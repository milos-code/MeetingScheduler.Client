import React from "react";
import { Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell } from "@fluentui/react-components";
import './ManagedEmployees.css';

function ManagedEmployeesTable({ managedEmployees, onRemove }) {
    const columns = [
        { columnKey: "firstName", label: "First Name" },
        { columnKey: "lastName", label: "Last Name" },
        { columnKey: "action", label: "Action" }
    ];

    return (
        <Table
            size="extra-small"
            aria-label="Managed Employees Table"
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
                        <TableCell>{employee.firstName}</TableCell>
                        <TableCell>{employee.lastName}</TableCell>
                        <TableCell className="table-cell-center">
                            <button
                                onClick={() => onRemove(employee.id)}
                                className="remove-employee-button"
                            >
                                Remove
                            </button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default ManagedEmployeesTable;