import { Link } from "react-router-dom";
import { GetCategories, ProductsFromCategory } from "../../services";
import earring from "../../assets/images/8.webp";
import bangle from "../../assets/images/6.webp";
import ring from "../../assets/images/7.webp";
import bracelet from "../../assets/images/9.webp";
import necklaces from "../../assets/images/11.webp";
import { PRODUCTS_URL } from "../../config";

const imagesArray = [
  {
    name: "گوشواره",
    img: { earring },
  },
  { name: "تک دست", img: { bangle } },
  { name: "انگشتر", img: { ring } },
  { name: "دستبند", img: { bracelet } },
  { name: "گردنبند و آویز", img: { necklaces } },
];

const Home = () => {
  const arrayOfCategory = [...GetCategories()] || [];

  const resultArray = arrayOfCategory.map((category) => {
    const matchingImage = imagesArray.find(
      (image) => image.name === category.name
    );
    return {
      key: category.id,
      name: category.name,
      id: category.id,
      icon: category.icon,
      image: matchingImage
        ? matchingImage.img[Object.keys(matchingImage.img)[0]]
        : null,
    };
  });
  return (
    <div className="container whitespace-nowrap mx-auto mt-28 flex flex-col items-start mr-10 justify-between">
      <div className="flex flex-col my-5 gap-20 mr-20 mb-14">
        {resultArray.map((category, index) => (
          <div key={category.id || index} className="items-center gap-16 mr-20">
            <Link to={`/${PRODUCTS_URL}?category=${category.id}`}>
              <div className="relative mb-10">
                <img
                  src={category.image}
                  alt="category-img"
                  className="w-[120px] h-[120px] rounded-t-2xl object-cover border-[3px] border-[#d8ac33]"
                />
                <div className="absolute w-[120px] px-5 py-1 bg-[#739072] rounded-t-2xl text-[#ffd255] font-bold items-center flex justify-center -bottom-2 border-2 border-[#d8ac33]">
                  {category.name}
                </div>
              </div>
            </Link>
            <div className="grid grid-cols-2 items-center gap-5 mr-44">
              <ProductsFromCategory selectedCategory={category.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
