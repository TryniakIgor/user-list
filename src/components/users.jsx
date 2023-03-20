import React, { useEffect, useState } from "react";
import Modal from "./Modal/Modal";

export function Users() {
  const [content, setContent] = useState(<UsersList showForm={showForm} />);

  function showList() {
    setContent(<UsersList showForm={showForm} />);
  }

  function showForm() {
    setContent(<UsersForm showList={showList} />);
  }

  return <div className="Users">{content}</div>;
}

function UsersList(props) {
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  function fetchUsers() {
    fetch("http://localhost:3003/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unexpected server erroe");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.log("error:", error));
  }

  useEffect(() => fetchUsers(), []);
  return (
    <>
      <h2>List of users</h2>
      <button onClick={toggleModal} type="button">
        Add user
      </button>
      <button onClick={() => fetchUsers()} type="button">
        Refresh
      </button>

      <table className="tab">
        <thead>
          <tr>
            <th>id</th>
            <th>firstName</th>
            <th>lastName</th>
            <th>email</th>
            <th>subscription</th>
            <th>phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.subscription}</td>
                <td>{user.phone}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {isOpen && <Modal onCloseModal={toggleModal} />}
    </>
  );
}

function UsersForm(props) {
  return (
    <>
      <h2>Addk user</h2>
      <button onClick={() => props.showList()} type="button">
        Cancel
      </button>
      <div></div>
    </>
  );
}
