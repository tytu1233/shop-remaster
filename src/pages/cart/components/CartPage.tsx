import styled from "styled-components";
import CartItems from "./CartItems";
import CartInfo from "./CartInfo";
import { RootState } from "../../../store/types/store.type";
import { ConnectedProps, connect } from "react-redux";
import { selectTotalPrice } from "../../../store/slices/cart/cart.slice";

type PropsType = object & ConnectorProps;

const CartPage = (props: PropsType) => {
  return (
    <CartBox>
      <CartItems />
      <CartInfo totalPrice={props.getTotalPrice} />
    </CartBox>
  );
};

const CartBox = styled.div`
  display: flex;
  width: 100%;
  @media only screen and (max-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const mapStateToProps = (state: RootState) => ({
  getTotalPrice: selectTotalPrice(state),
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ConnectorProps = ConnectedProps<typeof connector>;

export default connector(CartPage);
