import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import WarehouseList from './components/WarehouseList/WarehouseList'
import AddWarehousePage from './pages/AddWarehousePage/AddWarehousePage';
import Nav from './components/Nav/Nav';
import WarehouseDetails from './components/WarehouseDetails/WarehouseDetails.js';
import EditWarehouse from './components/EditWarehouse/EditWarehouse';
import InventoryList from './components/InventoryList/InventoryList';
import ItemDetails from './components/ItemDetails/ItemDetails';
import Footer from './components/Footer/Footer';
import './styles/App.scss';

const App = () => {

  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        {<Route path="/warehouses/:id/edit" render={<h1>"Edit Specific Warehouse" Page WIP</h1>} />}
        <Route path="/warehouses/add" component={AddWarehousePage} />
        <Route path="/warehouses/:id/edit" component={EditWarehouse } />
        <Route path="/warehouses/:id" component={WarehouseDetails} />
        <Route path="/warehouses" exact render={(routerProps) => <WarehouseList {...routerProps} />} />
        {/* <Route path="/inventory/:id/edit" render={<h1>"Edit Specific Inventory" Page WIP</h1>} /> */}
        <Route path="/inventory/:id" component={ItemDetails} />
        {/* <Route path="/inventory/add" exact render={<h1>"Add New Inventory" Page WIP</h1>} /> */}
        <Route path="/inventory" exact component={InventoryList} />
        <Redirect from="/" to="/warehouses" />
      </Switch>
      <Footer />
    </BrowserRouter >
  );
}

export default App;
