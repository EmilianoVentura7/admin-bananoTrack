// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigateTo = useNavigate();
  const [correo, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ correo, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data)
      localStorage.setItem('token', data.token);
      alert('Inicio de sesión exitoso');
      navigateTo("/usuarios");
    } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center overflow-hidden px-2">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-white opacity-40 z-0"></div>
      {/* Login */}
      <div className="relative flex w-96 flex-col space-y-5 rounded-lg border bg-white px-5 py-10 shadow-xl sm:mx-auto">
        <div className="-z-10 absolute top-4 left-1/2 h-full w-5/6 -translate-x-1/2 rounded-lg bg-blue-600 sm:-right-10 sm:top-auto sm:left-auto sm:w-full sm:translate-x-0"></div>
        <div className="mx-auto mb-2 space-y-3">
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <h1 className="text-center text-3xl font-bold text-gray-700">
            Bienvenido
          </h1>
          <p className="text-gray-500">Inicia sesión para ingresar</p>
        </div>

        <div>
          <div className="relative mt-2 w-full">
            <input
              type="text"
              id="correo"
              className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
              placeholder=" "
              value={correo}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              htmlFor="email"
              className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
            >
              {" "}
              Ingresa tu correo
            </label>
          </div>
        </div>

        <div>
          <div className="relative mt-2 w-full">
            <input
              type="password"
              id="password"
              className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label
              htmlFor="password"
              className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
            >
              {" "}
              Ingresa tu contraseña
            </label>
          </div>
        </div>
        <div className="flex w-full items-center">
          <button
            className="shrink-0 inline-block w-full rounded-lg bg-blue-600 py-3 font-bold text-white"
            onClick={handleLogin}
          >
            Ingresar
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
