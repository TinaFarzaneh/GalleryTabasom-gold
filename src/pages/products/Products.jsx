import { Link } from "react-router-dom";
export const Products = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center mt-16">
        <div>محصولات</div>
        <Link to="product">محصول</Link>
      </div>
    </>
  );
};
export default Products;
