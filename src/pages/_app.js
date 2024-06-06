import { Provider } from "react-redux";
import '@/styles/globals.css';
import { wrapper } from "../redux/store";
import { SessionProvider } from "next-auth/react"
function App({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps, session } = props;
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}

export default App;