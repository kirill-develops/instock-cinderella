import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.scss';

const App = () => {
  return (
    <BrowserRouter>
      {/* <Nav /> */}
      <Switch>
        <Route path="/" exact render={<h1>HomePage WIP</h1>} />
        <Route path="/warehouses" render={<h1>"All Warehouses" Page WIP</h1>} />
        <Route path="/warehouses/:id" render={<h1>"Specific Warehouse" Page WIP</h1>} />
        <Route path="/warehouses/:id/edit" render={<h1>"Edit Specific Warehouse" Page WIP</h1>} />
        <Route path="/warehouses/add" render={<h1>"Add New Warehouse" Page WIP</h1>} />
        <Route path="/inventory" render={<h1>"All Inventories" Page WIP</h1>} />
        <Route path="/inventory/:id" render={<h1>"Specific Inventory" Page WIP</h1>} />
        <Route path="/inventory/:id/edit" render={<h1>"Edit Specific Inventory" Page WIP</h1>} />
        <Route path="/inventory/add" render={<h1>"Add New Inventory" Page WIP</h1>} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
