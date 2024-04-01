import { Provider } from "react-redux";
import '@/styles/globals.css'
import store, { wrapper } from "../redux/store"
import { AnimatePresence } from 'framer-motion'
function App({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;