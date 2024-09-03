// // import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
// // import React from "react";
// // import ReactDOM from "react-dom";
// // import App from "./App";

// // const client = new ApolloClient({
// //   uri: "http://localhost:4000",
// //   cache: new InMemoryCache(),
// // });

// // ReactDOM.render(
// //   <ApolloProvider client={client}>
// //     <App />
// //   </ApolloProvider>,
// //   document.getElementById("root")
// // );

// import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
// import React from "react";
// import ReactDOM from "react-dom";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App";

// const client = new ApolloClient({
//   uri: "http://localhost:4000",
//   cache: new InMemoryCache(),
// });

// ReactDOM.render(
//   <ApolloProvider client={client}>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </ApolloProvider>,
//   document.getElementById("root")
// );

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const client = new ApolloClient({
  uri: "https://tapme-arpit-backend.netlify.app/",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
