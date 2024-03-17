import { ConnectedProps, connect } from "react-redux";
import { RootState } from "../../store/types/store.type";
import { selectAccessToken } from "../../store/slices/user/user.slice";
import Slider from "react-slick";
import { useGetAllProductsQuery } from "../../store/api/products/productsApiSlice";
import { useEffect, useState } from "react";

type AllProduct = {
  productId: number;
  name: string;
  price: number;
};

const MainContainer = (props: ConnectorProps) => {
  const [page, setPage] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    data: products,
    isSuccess,
    isLoading,
    isFetching,
  } = useGetAllProductsQuery(page);
  const settings = {
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (scrolledToBottom && !isFetching) {
        console.log("Fetching more data...");
        setPage(page + 1);
      }
    };

    document.addEventListener("scroll", onScroll);

    return function () {
      document.removeEventListener("scroll", onScroll);
    };
  }, [page, isFetching]);

  if (isLoading) {
    return <p>ŁADUJE SIE NA BOGATOŚCI - ELO</p>;
  }

  const c = async () => {
    setPage(page + 1);
  };

  return (
    <div
      style={{
        margin: "auto 5%",
        padding: "5px",
      }}
    >
      <Slider {...settings}>
        <div>
          <img
            style={{
              width: "100%",
              height: "500px",
            }}
            src="https://img.pakamera.net/i1/1/379/obrazy-i-plakaty-12320957_6788571379.jpg"
          />
          <h3>1{props.getToken}</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
      <button onClick={() => c()}>elko</button>
      <p>Loading: {isLoading.toString()}</p>

      <p>Success: {isSuccess.toString()}</p>
      {isSuccess &&
        products.map((product: AllProduct) => {
          return (
            <div key={product.productId}>
              <p>
                {product.productId} {product.name} {product.price}
              </p>
            </div>
          );
        })}
      <div>
        <input type="text" placeholder="Name" />
        <button onClick={() => c()}>Add</button>
      </div>
    </div>
  );
};
const mapStateToProps = (state: RootState) => ({
  getToken: selectAccessToken(state),
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ConnectorProps = ConnectedProps<typeof connector>;

export default connector(MainContainer);
