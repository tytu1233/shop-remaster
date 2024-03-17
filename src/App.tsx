import { ConnectedProps, connect } from "react-redux";
import { RootState } from "./store/types/store.type";
import {
  selectAccessToken,
  setToken,
  signOut,
} from "./store/slices/user/user.slice";

import {
  addProduct,
  selectTotalPrice,
  removeProduct,
  clearCart,
} from "./store/slices/cart/cart.slice";
import {
  useSignInMutation,
  useTestQuery,
} from "./store/api/authentication/authApiSlice";
import { Product } from "./store/slices/cart/type/cart.type";
import { toast } from "react-toastify";

type PropsType = object & ConnectorProps;

const App = (props: PropsType) => {
  const [signIn, { isError, isLoading: elo, isSuccess }] = useSignInMutation();

  const { data: elo1, isLoading } = useTestQuery("test");

  const a = async () => {
    const user = {
      email: "tytu@gmail.com",
      password: "Komputer12.",
    };

    const authenticationData = await signIn(user).unwrap();
    console.log(authenticationData);
    props.setToken(authenticationData);

    props.clearCart();
  };

  const b = () => {
    const idx = Math.floor(Math.random() * 11);
    console.log(idx);
    const product: Product = {
      id: idx,
      amount: 2,
      size: "M",
      price: 20.32,
    };

    props.addProduct(product);
    toast.success("Added to cart!");
  };

  return (
    <>
      <div>
        <p>Success: {isSuccess}</p>
        <p>Error: {isError}</p>
        <p>isLoading: {elo}</p>
        <p>name: {props.getToken}</p>
        <p>Total price: {props.getTotalPrice}</p>
        <button onClick={a}>Call authentication</button>
        <button onClick={b}>Call new</button>
      </div>
    </>
  );
};
const mapStateToProps = (state: RootState) => ({
  getToken: selectAccessToken(state),
  getTotalPrice: selectTotalPrice(state),
});

const mapDispatchToProps = {
  setToken,
  addProduct,
  signOut,
  removeProduct,
  clearCart,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ConnectorProps = ConnectedProps<typeof connector>;

export default connector(App);
