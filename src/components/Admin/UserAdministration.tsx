import React, { useState } from "react";
import "./UserAdministration.css";
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
} from "@fluentui/react-components";
import { AppDispatch, RootState } from "../../redux/store";
import AdminCreateUser from "./AdminCreateUser";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../redux/userSlice";

const columns = [
  { columnKey: "avatar" },
  { columnKey: "firstName", label: "firstName" },
  { columnKey: "lastName", label: "lastName" },
  { columnKey: "email", label: "Email" },
  { columnKey: "position", label: "Position" },
  { columnKey: "action", label: "Action" },
];

const UserAdministration: React.FC = () => {
  const { users } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const [showPopup, setShowPopup] = useState(false);
  const closePopup = () => setShowPopup(false);

  const handleDeleteUser = (userId: string) => {
    dispatch(deleteUser(userId));
  };

  // Add this check
  const userList = Array.isArray(users) ? users : [];

  return (
    <div className="user-administration">
      <div className="user-header">
        <h1>User Administration</h1>
        <button
          onClick={() => setShowPopup(true)}
          className="create-meeting-button"
        >
          Create New User
        </button>
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <AdminCreateUser closePopup={closePopup} />
            </div>
          </div>
        )}
      </div>
      <div className="users-container">
        <h2>Users</h2>
        <Table
          role="grid"
          aria-label="Managed Employees"
          className="users-table"
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
            {userList.map((user) => (
              <TableRow key={user.id}>
                <TableCell tabIndex={0} role="gridcell">
                  <TableCellLayout
                    media={
                      <Avatar
                        aria-label={`${user.firstName} ${user.lastName}`}
                        size={32}
                      />
                    }
                  ></TableCellLayout>
                </TableCell>
                <TableCell tabIndex={0} role="gridcell">
                  {user.firstName}
                </TableCell>
                <TableCell tabIndex={0} role="gridcell">
                  {user.lastName}
                </TableCell>
                <TableCell tabIndex={0} role="gridcell">
                  {user.email}
                </TableCell>
                <TableCell tabIndex={0} role="gridcell">
                  {user.position}
                </TableCell>
                <TableCell role="gridcell">
                  <TableCellLayout>
                    <Button onClick={() => handleDeleteUser(user.id!)}>Remove</Button>
                  </TableCellLayout>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserAdministration;
