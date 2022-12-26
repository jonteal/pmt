import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";

import "./App.css";
import ClientView from "./pages/ClientView/ClientView";
import ProjectView from "./pages/ProjectView/ProjectView";
import NotFound from "./pages/NotFound/NotFound";
import AddClient from "./pages/AddClient/AddClient";
import AddProject from "./pages/AddProject/AddProject";
import EditProject from "./pages/EditProject/EditProject";
import EditClient from "./pages/EditClient/EditClient";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:5001/graphql",
  cache,
});

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
      <Router>
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addClient" element={<AddClient />} />
            <Route path="/addProject" element={<AddProject />} />
            <Route path="/clients/:id" element={<ClientView />} />
            <Route path="/projects/:id" element={<ProjectView />} />
            <Route path="/projects/:id/edit" element={<EditProject />} />
            <Route path="/clients/:id/edit" element={<EditClient />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
