// src/app/products/page.tsx (Server Component)
const getProducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
};

const ProductsPage = async () => {
    const products = await getProducts();

    return (
        <div className="grid grid-cols-3 gap-4 p-6">
            {products.map((product: any) => (
                <div key={product.id} className="p-4 border rounded-lg">
                    <h2 className="font-semibold">{product.title}</h2>
                    <img src={product.image} alt={product.title} className="w-24 h-24" />
                    <p>${product.price}</p>
                </div>
            ))}
        </div>
    );
}

export default ProductsPage;
