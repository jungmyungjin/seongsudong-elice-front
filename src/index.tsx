import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { store } from './store/configureStore';

import './styles/index.module.scss';
import App from './App';

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

export let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
);
