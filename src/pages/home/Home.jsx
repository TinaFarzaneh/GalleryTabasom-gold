import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div className="flex justify-center items-center mt-16">سایت</div>
      <div className="flex justify-center items-center mt-16">
        <Link to="products">کتگوری</Link>
      </div>
    </>
  );
};
export default Home;
