import { useState } from "react";
import Modal from "./Modal";

const UsersView = () => {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);

  const handleAddUserClick = () => {
    setShowAddUserModal(true);
  };

  const handleDeleteUserClick = () => {
    setShowDeleteUserModal(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nombre = event.target.username.value;
    const apellido = event.target.lastname.value;
    const correo = event.target.correo.value;
    const password = event.target.password.value;

    if (!nombre || !apellido || !correo || !password) {
        alert('Todos los campos son obligatorios');
        return;
      }
    
      if (!correo.includes('@')) {
        alert('Por favor, introduce un correo válido');
        return;
      }

    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ nombre, apellido, correo, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
      alert('Usuario agregado exitosamente')
  };

  const handleDeleteUser = (event) => {
    event.preventDefault();
    const correo = event.target.email.value;

    const token = localStorage.getItem("token");
    // Send the data to the server
    fetch(`http://localhost:3000/users/${correo}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
      alert('Usuario eliminado exitosamente')
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-white opacity-40 z-0"></div>
      
      {/* Cards */}
      <div className="flex space-x-16">
        <div className="w-72">
          <div
            className="bg-white border-gray-200 rounded-lg p-6 cursor-pointer hover:bg-gray-200 shadow-lg transition-all duration-200 transform hover:scale-105"
            onClick={handleAddUserClick}
          >
            <h2 className="text-lg font-semibold mb-2">Agregar Usuario</h2>
            <p className="text-gray-600">
              Haz clic aquí para agregar un usuario.
            </p>
          </div>
        </div>
        <div className="w-72">
          <div
            className="bg-white border-gray-200 rounded-lg p-6 cursor-pointer hover:bg-gray-200 shadow-lg transition-all duration-200 transform hover:scale-105"
            onClick={handleDeleteUserClick}
          >
            <h2 className="text-lg font-semibold mb-2">Eliminar Usuario</h2>
            <p className="text-gray-600">
              Haz clic aquí para eliminar un usuario.
            </p>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAddUserModal && (
        <Modal onClose={() => setShowAddUserModal(false)}>
          <h2 className="text-lg font-semibold mb-4">Agregar Usuario</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-gray-700 font-semibold mb-1"
              >
                Nombre
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="border rounded px-3 py-2 w-full"
                placeholder="Ingrese el nombre"
              />
            </div>
            <div>
              <label
                htmlFor="lastname"
                className="block text-gray-700 font-semibold mb-1"
              >
                Apellido
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                className="border rounded px-3 py-2 w-full"
                placeholder="Ingrese el apellido"
              />
            </div>
            <div>
              <label
                htmlFor="correo"
                className="block text-gray-700 font-semibold mb-1"
              >
                Correo
              </label>
              <input
                type="text"
                id="correo"
                name="correo"
                className="border rounded px-3 py-2 w-full"
                placeholder="Ingrese el correo"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold mb-1"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="border rounded px-3 py-2 w-full"
                placeholder="Ingrese la contraseña"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
            >
              Agregar
            </button>
          </form>
        </Modal>
      )}

      {showDeleteUserModal && (
        <Modal onClose={() => setShowDeleteUserModal(false)}>
          <h2 className="text-lg font-semibold mb-4">Eliminar Usuario</h2>
          <form onSubmit={handleDeleteUser} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-1"
              >
                Correo
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="border rounded px-3 py-2 w-full"
                placeholder="Ingrese el correo del usuario a eliminar"
              />
            </div>
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
            >
              Eliminar
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default UsersView;
