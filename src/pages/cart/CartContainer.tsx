import { ConnectedProps, connect } from "react-redux";
import { RootState } from "../../store/types/store.type";
import {
  addProduct,
  selectTotalPrice,
  clearCart,
} from "../../store/slices/cart/cart.slice";
import CartPage from "./components/CartPage";

const CartContainer = (props: ConnectorProps) => {
  return (
    <>
      <CartPage />
      <p>{props.getTotalPrice}</p>
      <button onClick={() => props.clearCart()}>Clear</button>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  getTotalPrice: selectTotalPrice(state),
});

const mapDispatchToProps = {
  addProduct,
  clearCart,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ConnectorProps = ConnectedProps<typeof connector>;

export default connector(CartContainer);
