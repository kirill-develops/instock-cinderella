import { Component } from "react";
import { getRequestErrorMessage } from "./requestUtils";

class ListPageBase extends Component {
   // subclasses implement these:
   // fetchData(id)         — returns a Promise
   // getDataArray(state)   — returns the array to sort
   // setDataArray(arr)     — returns partial state to set
   // getSortableValue(obj, key) — optional, defaults to obj[key]

   componentDidMount() {
      this.loadData();
   }

   componentDidUpdate(prevProps) {
      const { id: prevId } = prevProps.match.params;
      const { id: currentId } = this.props.match.params;
      if (prevId !== currentId) this.loadData();
   }

   loadData = () => {
      const { id } = this.props.match.params;
      this.setState({ isLoading: true, apiError: "" });

      this.fetchData(id)
         .then((data) => {
            this.setState({ ...this.setDataArray(data), isLoading: false });
         })
         .catch((err) => {
            this.setState({
               apiError: getRequestErrorMessage(
                  err,
                  "Error fetching data. Please try again.",
               ),
               isLoading: false,
            });
         });
   };

   handleDelete = (id, name) => {
      this.setState({ toDeleteId: id, toDeleteName: name });
   };

   resetDelete = () => {
      this.setState({ toDeleteId: "", toDeleteName: "" });
   };

   // subclass overrides this to call the right delete API
   performDelete = (id) => Promise.reject("performDelete not implemented");

   handleConfirm = (id) => {
      this.performDelete(id)
         .then(() => {
            this.resetDelete();
            this.loadData();
         })
         .catch((err) => {
            this.setState({
               apiError: getRequestErrorMessage(
                  err,
                  "Error deleting item. Please try again.",
               ),
            });
         });
   };

   getSortableValue = (obj, key) => obj[key] || "";

   handleSort = (header) => {
      if (!header.key) return;

      this.setState((prevState) => {
         const isSameKey = prevState.sortConfig.key === header.key;
         const isAscending = isSameKey
            ? !prevState.sortConfig.isAscending
            : true;

         const sorted = [...this.getDataArray(prevState)].sort((a, b) => {
            const aValue = String(
               this.getSortableValue(a, header.key),
            ).toLowerCase();
            const bValue = String(
               this.getSortableValue(b, header.key),
            ).toLowerCase();
            if (aValue < bValue) return isAscending ? -1 : 1;
            if (aValue > bValue) return isAscending ? 1 : -1;
            return 0;
         });

         return {
            ...this.setDataArray(sorted, prevState),
            sortConfig: { key: header.key, isAscending },
         };
      });
   };
}

export default ListPageBase;
