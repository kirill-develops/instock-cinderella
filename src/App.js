import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Nav from "./components/Nav/Nav";
import AddWarehousePage from "./components/AddWarehousePage/AddWarehousePage";
import EditWarehouse from "./components/EditWarehouse/EditWarehouse";
import WarehousePage from "./Pages/WarehousePage.js";
import Warehouses from "./Pages/Warehouses.js";
import EditInventoryItem from "./components/EditInventoryItem/EditInventoryItem.js";
import ItemDetails from "./components/ItemDetails/ItemDetails";
import Inventory from "./Pages/Inventory.js";
import Footer from "./components/Footer/Footer";
import AddInventoryItem from "./components/AddInventoryItem/AddInventoryItem";
import "./styles/App.scss";

const App = () => {
   return (
      <BrowserRouter>
         <Nav />
         <Switch>
            <Route
               path="/warehouses/add"
               component={AddWarehousePage}
            />
            <Route
               path="/warehouses/:id/edit"
               component={EditWarehouse}
            />
            <Route
               path="/warehouses/:id"
               exact
               component={WarehousePage}
            />
            <Route
               path="/warehouses"
               exact
               component={Warehouses}
            />
            <Route
               path="/inventory/add"
               component={AddInventoryItem}
            />
            <Route
               path="/inventory/:id/edit"
               component={EditInventoryItem}
            />
            <Route
               path="/inventory/:id"
               component={ItemDetails}
            />
            <Route
               path="/inventory"
               exact
               component={Inventory}
            />
            <Redirect
               from="/"
               to="/warehouses"
            />
         </Switch>
         <Footer />
      </BrowserRouter>
   );
};

export default App;
