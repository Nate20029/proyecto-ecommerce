import Layout from "../components/Layout";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../components/ProductsContext";

export default function CheckoutPage() {
    const { selectedProducts, setSelectedProducts } = useContext(ProductsContext);
    const [productsInfos, setProductsInfos] = useState([]);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const uniqIds = [...new Set(selectedProducts)];
        fetch('/api/products?ids=' + uniqIds.join(','))
            .then(response => response.json())
            .then(json => setProductsInfos(json));
    }, [selectedProducts]);

    function moreOfThisProduct(id) {
        setSelectedProducts(prev => [...prev, id]);
    }
    function lessOfThisProduct(id) {
        const pos = selectedProducts.indexOf(id);
        if (pos !== -1) {
            setSelectedProducts(prev => {
                return prev.filter((value, index) => index !== pos);
            });
        }
    }



    return (
        <Layout>
            {!productsInfos.length && (
                <div>no products in your wish list</div>
            )}
            {productsInfos.length && productsInfos.map(productInfo => {
                const amount = selectedProducts.filter(id => id === productInfo._id).length;
                if (amount === 0) return;
                return (
                    <div className="flex mb-5 items-center" key={productInfo._id}>
                        <div className="bg-gray-100 p-3 rounded-xl shrink-0" style={{ boxShadow: 'inset 1px 0px 10px 10px rgba(0,0,0,0.1)' }}>
                            <img className="w-24" src={productInfo.picture} alt="" />
                        </div>
                        <div className="pl-4 items-center">
                            <h3 className="font-bold text-lg">{productInfo.brand}</h3>
                            <p className="text-sm leading-4 text-gray-500">{productInfo.model}</p>
                            <p className="text-sm leading-4 text-gray-500">{productInfo.processor_name}</p>
                            <p className="text-sm leading-4 text-gray-500">{productInfo.ram_gb}</p>
                            <div className="flex mt-1">
                                <div className="grow font-bold">${productInfo.latest_price}</div>
                                <div>
                                    <button onClick={() => lessOfThisProduct(productInfo._id)} className="border border-emerald-500 px-2 rounded-lg text-emerald-500">-</button>
                                    <span className="px-2">
                                        {selectedProducts.filter(id => id === productInfo._id).length}
                                    </span>
                                    <button onClick={() => moreOfThisProduct(productInfo._id)} className="bg-emerald-500 px-2 rounded-lg text-white">+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
            <form action="/api/wishlist" method="POST">
                <div className="mt-8">
                    <input name="name" value={name} onChange={e => setName(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="Your name" />
                    <input name="email" value={email} onChange={e => setEmail(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="email" placeholder="Email address" />
                </div>

                <input type="hidden" name="products" value={selectedProducts.join(',')} />
            </form>
        </Layout>
    );
}
