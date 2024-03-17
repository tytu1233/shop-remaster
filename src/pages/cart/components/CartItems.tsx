import styled from "styled-components";

const CartItems = () => {
  return (
    <CartItemBox>
      <CartItem>
        <CartItemImageBox>
          <CartItemImage src="https://img01.ztat.net/article/spp-media-p1/f3769e6bf0ef3f7490fd947d9156bc1f/6119df7ea79446de97d83b3a440f397c.jpg?imwidth=1800&filter=packshot" />
        </CartItemImageBox>
        <div>
          <p>Nazwa</p>
          <p>Cena: 21zł</p>
        </div>
        <div>
          <button>-</button>
          <span>Ilość</span>
          <button>+</button>
        </div>
      </CartItem>
    </CartItemBox>
  );
};

const CartItemBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const CartItem = styled.div`
  width: 100%;
  padding: 1%;
  display: flex;
  align-items: center;
  height: 100%;
`;

const CartItemImage = styled.img`
  aspect-ratio: 160/98;
  width: 100%;
  height: 100%;
`;

const CartItemImageBox = styled.div`
  width: 15%;
  height: 100%;

  @media only screen and (max-width: 768px) {
    width: 20%;
    height: 100%;
  }
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    width: 20%;
  }
`;

export default CartItems;
