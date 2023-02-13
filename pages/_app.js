import '../styles/globals.css'
import { ProductsContextProvider } from "../components/ProductsContext";


function MyApp({ Component, pageProps }) {
  return (
<div>
      <ProductsContextProvider>
        <Component {...pageProps} />
      </ProductsContextProvider>

    </div>
  );
}

export default MyApp
