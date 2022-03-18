import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import WarehouseList from './components/WarehouseList/WarehouseList'
import Nav from './components/Nav/Nav';
import WarehouseDetails from './components/WarehouseDetails/WarehouseDetails.js';
import './App.scss';

const App = () => {

  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route path="/warehouses/:id/edit" render={<h1>"Edit Specific Warehouse" Page WIP</h1>} />
        <Route path="/warehouses/add" exact render={<h1>"Add New Warehouse" Page WIP</h1>} />
        <Route path="/warehouses/:id" component={WarehouseDetails} />
        <Route path="/warehouses" exact render={(routerProps) => <WarehouseList {...routerProps} />} />
        <Route path="/inventory/:id/edit" render={<h1>"Edit Specific Inventory" Page WIP</h1>} />
        <Route path="/inventory/:id" render={<h1>"Specific Inventory" Page WIP</h1>} />
        <Route path="/inventory/add" exact render={<h1>"Add New Inventory" Page WIP</h1>} />
        <Route path="/inventory" render={<h1>"All Inventories" Page WIP</h1>} />
        <Redirect from="/" to="/warehouses" />
      </Switch>
      {/* <Footer /> */}
    </BrowserRouter >
  );
}

export default App;
