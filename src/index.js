import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import './index.css';

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from "@apollo/client";
import {BrowserRouter} from "react-router-dom";

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache()
});
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </ApolloProvider>
);
