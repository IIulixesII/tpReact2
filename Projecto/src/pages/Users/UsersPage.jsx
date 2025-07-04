import { useState } from "react";
import { ROLE, useAuth } from "../../context/AuthContext";
import { UsersList } from "./components/UsersList";
import { useUsers } from "../../hooks/useUsers";

export function UsersPage() {
  const { isLogged, user } = useAuth();
  const { users, isLoading, setUsers } = useUsers();
  const [selectedUser, setSelectedUser] = useState(null);

  const [data, setData] = useState({
    username: "",
    role: ROLE.ADMIN,
    password: "",
    email: "",
  });

  const handleEdit = (id) => {
    const userExists = users.find((u) => u.id === id);

    if (!userExists) {
      alert("El usuario no existe");
      return;
    }

    setData({
      username: userExists.username,
      role: userExists.role,
      password: userExists.password,
      email: userExists.email,
    });
    setSelectedUser(userExists.id);
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json)
      .then((u) => setUsers(users.filter((userRef) => userRef !== id)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedUser) {
      fetch(`http://localhost:3000/users/${selectedUser}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((userRes) =>
          setUsers(users.map((u) => (u.id === selectedUser.id ? userRes : u)))
        )
        .catch((error) => console.log(error));
    } else {
      fetch("http://localhost:3000/users", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((u) => setUsers([...users, u]))
        .catch((error) => console.log(error));
    }
  };

  if (!isLogged) {
    return <h1> No podés acceder a este sitio </h1>;
  }

  return (
    <>
      <UsersList
        handleEdit={handleEdit}
        users={users}
        isLoading={isLoading}
        handleDelete={handleDelete}
      />

      {user.role === ROLE.ADMIN && (
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            name="username"
            type="text"
            placeholder="Username"
            value={data.username}
          />
          <input
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="Email"
            value={data.email}
          />
          <input
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="Password"
            value={data.password}
          />
          <select onChange={handleChange} value={data.role} name="role" id="">
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <button type="submit">Crear</button>
        </form>
      )}
    </>
  );
}
