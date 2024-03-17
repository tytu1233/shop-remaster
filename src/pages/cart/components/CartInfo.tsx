import styled from "styled-components";

const CartInfo = ({ totalPrice }: { totalPrice: number }) => {
  return (
    <CartInfoBox>
      <h3>Cart summary</h3>
      <p>Total price: {totalPrice}</p>
      <button style={{ width: "50%", margin: "auto" }}>Order</button>
    </CartInfoBox>
  );
};

const CartInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

export default CartInfo;
