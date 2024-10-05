import { AgentsTable } from "../../components/agents/agents"
import { ContractsTable } from "../../components/contracts/contracts"
import { CounterpartiestTable } from "../../components/counterparties/counterparties"
import { ProductTable } from "../../components/products/products"
import { Routes, Route } from "react-router-dom"
import { ProductsPopup } from "../../components/products/productsPopup"
import { AgentsPopup } from "../../components/agents/agentsPopup"
import { CounterpartiesPopup } from "../../components/counterparties/counterpartiesPopup"

export const Main = () => {
  
  return (
    <div className="main">
      <Routes>
        <Route path='/products' element={<ProductTable />} />
        <Route path='/contracts' element={<ContractsTable />} />
        <Route path='/agents' element={<AgentsTable />} />
        <Route path='/counterparties' element={<CounterpartiestTable />} />
        <Route path='/products-popup' element={<ProductsPopup /> } />
        <Route path='/agents-popup' element={<AgentsPopup /> } />
        <Route path='/counterparties-popup' element={<CounterpartiesPopup /> } />
      </Routes>
    </div>
  )
}