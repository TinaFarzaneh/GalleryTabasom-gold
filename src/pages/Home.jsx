import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div>سایت</div>
      <div>
        <Link to="products">کتگوری</Link>
      </div>
    </>
  );
};
export default Home;
