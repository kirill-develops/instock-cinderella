import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Nav from "./components/Nav/Nav";
import WarehouseAdd from "./Pages/WarehouseAdd";
import WarehouseEdit from "./Pages/WarehouseEdit";
import WarehouseDetail from "./Pages/WarehouseDetail";
import WarehouseList from "./Pages/WarehouseList";
import InventoryAdd from "./Pages/InventoryAdd";
import InventoryEdit from "./Pages/InventoryEdit";
import InventoryDetail from "./Pages/InventoryDetail";
import InventoryList from "./Pages/InventoryList";
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
                  exact
                  path="/warehouses/add"
                  component={WarehouseAdd}
               />
               <Route
                  exact
                  path="/warehouses/:id/edit"
                  component={WarehouseEdit}
               />
               <Route
                  exact
                  path="/warehouses/:id"
                  component={WarehouseDetail}
               />
               <Route
                  exact
                  path="/warehouses"
                  component={WarehouseList}
               />
               <Route
                  exact
                  path="/inventory/add"
                  component={InventoryAdd}
               />
               <Route
                  exact
                  path="/inventory/:id/edit"
                  component={InventoryEdit}
               />
               <Route
                  exact
                  path="/inventory/:id"
                  component={InventoryDetail}
               />
               <Route
                  exact
                  path="/inventory"
                  component={InventoryList}
               />
               <Redirect
                  exact
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
