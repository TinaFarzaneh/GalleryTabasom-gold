import { Card } from "../../components/user/card/Card";
import { GetAllProducts } from "./GetAllProducts";

export const ProductsFromCategory = ({ selectedCategory = "" }) => {
  const [products] = GetAllProducts(1, 6, selectedCategory);

  return (
    <>
      {Array.isArray(products) &&
        products.map((product, index) => (
          <Card
            key={product.name || index}
            name={product.name}
            price={product.price.toLocaleString()}
            // rate={product.rate}
            image={product.images[0]}
          />
        ))}
    </>
  );
};
