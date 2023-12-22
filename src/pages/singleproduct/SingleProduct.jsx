import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/http";
import { PRODUCTS_URL } from "../../config";
import { useParams } from "react-router-dom";
import { Button, CounterOfProduct, ImageSlider } from "../../components";
import { useState } from "react";
import { IoMdArrowDropleft } from "react-icons/io";

const SingleProduct = () => {
  const [counterProduct, setcounterProduct] = useState(1);

  const { id } = useParams();
  const productId = id.slice(3);

  const { isPending, error, data } = useQuery({
    queryKey: ["productById", productId],
    queryFn: () =>
      api.get(`${PRODUCTS_URL}/${productId}`).then((res) => res.data),
    keepPreviousData: true,
    staleTime: 60000,
  });

  if (isPending) return "loading...";

  if (error) return error.message;
  const { product } = data.data;
  // ///////////////////////////////////

  const handleIncremeant = () => {
    if (counterProduct < product.quantity) {
      setcounterProduct((prevCounter) => prevCounter + 1);
    }
  };

  const handleDecrement = () => {
    if (counterProduct > 1) {
      setcounterProduct((prevCounter) => prevCounter - 1);
    }
  };
  return (
    <div className="container mx-auto p-11 pt-20 pr-28 flex flex-col gap-y-12 mt-24">
      <div className="flex items-center gap-x-24 pr-12">
        <ImageSlider images={product?.images} />
        <div className="flex flex-col items-start gap-3">
          <div>{product.name}</div>
          <div className="flex items-center gap-2">
            <div>{product.category.name}</div>
            <IoMdArrowDropleft className="text-2xl" />
            <div className="pr-3">{product.subcategory.name}</div>
          </div>
          <div>
            {counterProduct !== 0
              ? (product.price * counterProduct).toLocaleString()
              : product.price.toLocaleString()}{" "}
            تومان
          </div>
          <div className="flex items-center mt-10">
            <CounterOfProduct
              counterProduct={counterProduct}
              onIncrement={handleIncremeant}
              onDecrement={handleDecrement}
            />
            {product.quantity !== 0 && (
              <Button
                maincolor="bg-green-500"
                title="افزودن به سبد خرید"
                type="submit"
                className="text-lg"
              />
            )}
          </div>
        </div>
      </div>

      <div
        dangerouslySetInnerHTML={{ __html: product.description }}
        className="font-bold text-xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
      ></div>
      {/* {parse(product.description)} */}
      {/* <div>{product.description}</div> */}
    </div>
  );
};

export default SingleProduct;
// import parse from 'html-react-parser';
// npm i html-react-parser
