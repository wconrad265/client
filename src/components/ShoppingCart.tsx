import { Product } from "../Types/Product";

interface ShoppingCartProps {
  cartItems: Product[];
  onCheckout: () => void;
}
const ShoppingCart = ({ cartItems, onCheckout }: ShoppingCartProps) => {
  const handleTableRowCreation = ({ title, price, quantity, _id }: Product) => {
    return (
      <tr key={_id}>
        <th scope="col">{title}</th>
        <th scope="col">{quantity}</th>
        <th scope="col">{price}</th>
      </tr>
    );
  };

  const handleCartItemsCreation = () => {
    return cartItems.map(handleTableRowCreation);
  };

  const handleShoppingCartTotal = () => {
    return cartItems
      .reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <>
          <p>Your cart is empty</p>
          <p>Total: $0</p>
        </>
      ) : (
        <table className="cart-items">
          <thead>{handleCartItemsCreation()}</thead>
          <tbody></tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="total">
                Total: ${handleShoppingCartTotal()}
              </td>
            </tr>
          </tfoot>
        </table>
      )}

      <button
        className="checkout"
        disabled={cartItems.length === 0}
        onClick={onCheckout}
      >
        Checkout
      </button>
    </div>
  );
};

export default ShoppingCart;
