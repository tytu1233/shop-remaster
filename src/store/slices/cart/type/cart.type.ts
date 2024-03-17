export type Cart = {
  products: Product[];
  totalPrice: number;
};

type sizeType = "S" | "M" | "L" | "XL" | "XXL" | null;

export type Product = {
  id: number;
  size: sizeType;
  price: number;
  amount: number;
};
