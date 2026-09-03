import { useContext, useEffect, useRef } from "react";
import {
    BrowserRouter,
    Navigate,
    Outlet,
    Route,
    Routes,
    useNavigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DeletarApolice from "./components/apolices/deletarapolices/DeletarApolice";
import FormApolice from "./components/apolices/formapolice/FormApolice";
import ListarApolices from "./components/apolices/listapolices/ListarApolices";

import DeletarCliente from "./components/clientes/deletarcliente/DeletarCliente";
import FormCliente from "./components/clientes/formcliente/FormCliente";
import ListarClientes from "./components/clientes/listaclientes/ListarClientes";

import Footer from "./components/footer/footer";
import Navbar from "./components/navbar/Navbar";

import { AuthContext, AuthProvider } from "./contexts/AuthContext";

import Cadastro from "./pages/cadastro/Cadastro";
import Home from "./pages/home/Home";
import Introducao from "./pages/introducao/Introducao";
import Login from "./pages/login/Login";
import Sobre from "./pages/sobre/Sobre";

function RotaProtegida() {
    const { usuario } = useContext(AuthContext);

    return usuario.token ? <Outlet /> : <Navigate to="/" replace />;
}

function Sair() {
    const { handleLogout } = useContext(AuthContext);
    const navigate = useNavigate();
    const logoutExecutado = useRef(false);

    useEffect(() => {
        if (logoutExecutado.current) return;

        logoutExecutado.current = true;
        handleLogout();
        navigate("/", { replace: true });
    }, [handleLogout, navigate]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#EDF5FF]">
            <p className="text-lg font-semibold text-[#172B4D]">
                Saindo...
            </p>
        </div>
    );
}

function ConteudoApp() {
    const { usuario } = useContext(AuthContext);
    const estaAutenticado = Boolean(usuario.token);

    return (
        <div className="flex min-h-screen flex-col bg-[#EDF5FF]">
            {estaAutenticado && <Navbar />}

            <main className="flex flex-1 flex-col">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/cadastro" element={<Cadastro />} />

                    <Route element={<RotaProtegida />}>
                        <Route path="/home" element={<Home />} />
                        <Route path="/sair" element={<Sair />} />
                        <Route path="/introducao" element={<Introducao />} />
                        <Route path="/sobre" element={<Sobre />} />

                        <Route
                            path="/apolices"
                            element={<ListarApolices />}
                        />
                        <Route
                            path="/cadastrarapolice"
                            element={<FormApolice />}
                        />
                        <Route
                            path="/editarapolice/:id"
                            element={<FormApolice />}
                        />
                        <Route
                            path="/deletarapolice/:id"
                            element={<DeletarApolice />}
                        />

                        <Route
                            path="/clientes"
                            element={<ListarClientes />}
                        />
                        <Route
                            path="/cadastrarcliente"
                            element={<FormCliente />}
                        />
                        <Route
                            path="/clientes/cadastrar"
                            element={<FormCliente />}
                        />
                        <Route
                            path="/clientes/editar/:id"
                            element={<FormCliente />}
                        />
                        <Route
                            path="/clientes/deletar/:id"
                            element={<DeletarCliente />}
                        />
                    </Route>

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>

            {estaAutenticado && <Footer />}
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <ToastContainer />
                <ConteudoApp />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;