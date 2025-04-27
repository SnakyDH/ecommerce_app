import { ProductsGrid } from "./components/products/ProductsGrid";
import "./App.css";
import { Cart } from "./components/cart/CartList";

export default function App() {
  return (
    <>
      <header className="flex bg-slate-900 text-white font-bold p-5 justify-between items-center sticky top-0 z-10">
        <div className="flex flex-row gap-2 items-center justify-between w-full">
          <picture>
            <img src="/ecommerce.png" alt="logo" className="w-10 h-10" />
          </picture>
          <h1>Ecommerce App</h1>
          <Cart />
        </div>
      </header>
      <main>
        <ProductsGrid />
      </main>
    </>
  );
}
