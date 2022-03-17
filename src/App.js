import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import WarehouseList from './components/WarehouseList/WarehouseList'
import './App.scss';
import AddWarehousePage from './pages/AddWarehousePage/AddWarehousePage';
import Nav from "./components/Nav/Nav.js"
import WarehouseDetails from './components/WarehouseDetails/WarehouseDetails.js';

const App = () => {

  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route path="/warehouses/:id/edit" render={<h1>"Edit Specific Warehouse" Page WIP</h1>} />
        <Route path="/warehouses/:id" exact component={WarehouseDetails} />
        <Route path="/warehouses/add" component={AddWarehousePage} />
        <Route path="/warehouses" exact render={(routerProps) => <WarehouseList {...routerProps} />} />
        <Route path="/inventory/:id/edit" render={<h1>"Edit Specific Inventory" Page WIP</h1>} />
        <Route path="/inventory/:id" render={<h1>"Specific Inventory" Page WIP</h1>} />
        <Route path="/inventory/add" render={<h1>"Add New Inventory" Page WIP</h1>} />
        <Route path="/inventory" render={<h1>"All Inventories" Page WIP</h1>} />
        <Redirect from="/" to="/warehouses" />
      </Switch>
      {/* <Footer /> */}
    </BrowserRouter >
  );
}

export default App;
