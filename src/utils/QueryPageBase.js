// src/utils/QueryPageBase.js
import { Component } from "react";
import { getRequestErrorMessage } from "./requestUtils";

class QueryPageBase extends Component {
   // subclass implements:
   // fetchData(id) — returns a Promise

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
            this.setState({ ...this.setData(data), isLoading: false });
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
}

export default QueryPageBase;
