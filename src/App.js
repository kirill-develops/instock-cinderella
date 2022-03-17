import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Warehouses from './pages/Warehouses/Warehouses'
import './App.scss';
import Nav from "./components/Nav/Nav.js"

const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route path="/warehouses" render={(routerProps) => <Warehouses {...routerProps} />} />
        <Route path="/warehouses/:id" render={<h1>"Specific Warehouse" Page WIP</h1>} />
        <Route path="/warehouses/:id/edit" render={<h1>"Edit Specific Warehouse" Page WIP</h1>} />
        <Route path="/warehouses/add" render={<h1>"Add New Warehouse" Page WIP</h1>} />
        <Route path="/inventory" render={<h1>"All Inventories" Page WIP</h1>} />
        <Route path="/inventory/:id" render={<h1>"Specific Inventory" Page WIP</h1>} />
        <Route path="/inventory/:id/edit" render={<h1>"Edit Specific Inventory" Page WIP</h1>} />
        <Route path="/inventory/add" render={<h1>"Add New Inventory" Page WIP</h1>} /> */}
        <Redirect from="/" to="/warehouses" />
      </Switch>
      {/* <Footer /> */}
    </BrowserRouter >
  );
}

export default App;
