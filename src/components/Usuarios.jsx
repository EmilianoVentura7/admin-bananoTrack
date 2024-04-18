import { useState } from 'react';
import Modal from './Modal';

const UsersView = () => {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);

  const handleAddUserClick = () => {
    setShowAddUserModal(true);
  };

  const handleDeleteUserClick = () => {
    setShowDeleteUserModal(true);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex space-x-4">
        <div className="w-64">
          <div className="bg-white border rounded p-4 cursor-pointer hover:bg-gray-200" onClick={handleAddUserClick}>
            <h2 className="text-lg font-semibold mb-2">Agregar Usuario</h2>
            <p className="text-gray-600">Haz clic aquí para agregar un usuario.</p>
          </div>
        </div>
        <div className="w-64">
          <div className="bg-white border rounded p-4 cursor-pointer hover:bg-gray-200" onClick={handleDeleteUserClick}>
            <h2 className="text-lg font-semibold mb-2">Eliminar Usuario</h2>
            <p className="text-gray-600">Haz clic aquí para eliminar un usuario.</p>
          </div>
        </div>
      </div>

      {showAddUserModal && (
        <Modal onClose={() => setShowAddUserModal(false)}>
          <h2 className="text-lg font-semibold mb-4">Agregar Usuario</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Usuario</label>
              <input type="text" id="username" name="username" className="border rounded px-3 py-2 w-full" placeholder="Ingrese el nombre de usuario" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Contraseña</label>
              <input type="password" id="password" name="password" className="border rounded px-3 py-2 w-full" placeholder="Ingrese la contraseña" />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Agregar</button>
          </form>
        </Modal>
      )}

      {showDeleteUserModal && (
        <Modal onClose={() => setShowDeleteUserModal(false)}>
          <h2 className="text-lg font-semibold mb-4">Eliminar Usuario</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Correo</label>
              <input type="email" id="email" name="email" className="border rounded px-3 py-2 w-full" placeholder="Ingrese el correo del usuario a eliminar" />
            </div>
            <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Eliminar</button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default UsersView;
