import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Nav from "./components/Nav/Nav";
import AddWarehousePage from "./components/AddWarehousePage/AddWarehousePage";
import EditWarehousePage from "./components/EditWarehouse/EditWarehouse";
import WarehousePage from "./Pages/WarehousePage";
import WarehousesPage from "./Pages/WarehousesPage";
import AddInventoryItemPage from "./components/AddInventoryItem/AddInventoryItem";
import EditInventoryItemPage from "./components/EditInventoryItem/EditInventoryItem";
import InventoryItemPage from "./Pages/InventoryItemPage";
import InventoryPage from "./Pages/InventoryPage";
import Footer from "./components/Footer/Footer";
import "./styles/App.scss";
import PageLayout from "./components/PageLayout/PageLayout";

const App = () => {
   return (
      <BrowserRouter>
         <Nav />
         <PageLayout>
            <Switch>
               <Route
                  path="/warehouses/add"
                  component={AddWarehousePage}
               />
               <Route
                  path="/warehouses/:id/edit"
                  component={EditWarehousePage}
               />
               <Route
                  path="/warehouses/:id"
                  exact
                  component={WarehousePage}
               />
               <Route
                  path="/warehouses"
                  exact
                  component={WarehousesPage}
               />
               <Route
                  path="/inventory/add"
                  component={AddInventoryItemPage}
               />
               <Route
                  path="/inventory/:id/edit"
                  component={EditInventoryItemPage}
               />
               <Route
                  path="/inventory/:id"
                  component={InventoryItemPage}
               />
               <Route
                  path="/inventory"
                  exact
                  component={InventoryPage}
               />
               <Redirect
                  from="/"
                  to="/warehouses"
               />
            </Switch>
         </PageLayout>
         <Footer />
      </BrowserRouter>
   );
};

export default App;
