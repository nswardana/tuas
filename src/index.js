import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import typeDefs from './typeDefs'
import registerServiceWorker from './registerServiceWorker'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI || '/graphql',
  cache: new InMemoryCache(),
  typeDefs,
})
/*
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_URI || '/graphql' }),
    onError(({ graphQLErrors, networkError }) => {
      if (networkError) {
        console.log(`[Network error Apollo ]: ${networkError}`)
      }
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        )
      }
    }),
  ]),
})
*/
const Main = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

ReactDOM.render(<Main />, document.getElementById('root'))
registerServiceWorker()
