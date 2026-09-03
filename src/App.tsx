import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Footer from './components/footer/footer'
import Navbar from './components/navbar/Navbar'

import DeletarApolice from './components/apolices/deletarapolices/DeletarApolice'
import FormApolice from './components/apolices/formapolice/FormApolice'
import ListarApolices from './components/apolices/listapolices/ListarApolices'

import DeletarCliente from './components/clientes/deletarcliente/DeletarCliente'
import FormCliente from './components/clientes/formcliente/FormCliente'
import ListarClientes from './components/clientes/listaclientes/ListarClientes'

import Home from './pages/home/Home'
import Sobre from './pages/sobre/Sobre'
import Introducao from './pages/introducao/Introducao'

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-[#EDF5FF]">
        <Navbar />

        <main className="flex flex-1 flex-col">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/introducao" element={<Introducao />} />

            <Route path="/apolices" element={<ListarApolices />} />
            <Route path="/cadastrarapolice" element={<FormApolice />} />
            <Route path="/editarapolice/:id" element={<FormApolice />} />
            <Route
              path="/deletarapolice/:id"
              element={<DeletarApolice />}
            />

            <Route path="/clientes" element={<ListarClientes />} />
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

            <Route path="/sobre" element={<Sobre />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App