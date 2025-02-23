import React from "react";
import { useDispatch } from "react-redux";
import { createOrder } from "../../redux/cartSlice";
import { toast } from "react-toastify";

const CartInfo = ({ cart, close }) => {
  const subTotal = cart.reduce(
    (total, item) => total + item.price * item.amount,
    0
  );
  const shipping = subTotal > 100 || subTotal === 0 ? 0 : 40;
  const total = subTotal + shipping;

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(createOrder());
    toast.success("Sipariş oluşturuldu.");
    close();
  };
  return (
    <div className="fs-5 py-5 text-lg">
      <p className="flex justify-between">
        <span className="text-gray-500 font-semibold">Ara Toplam</span>
        <span className="text-gray-500 font-semibold" data-testid="subtotal">
          {subTotal}₺
        </span>
      </p>
      <p className="flex justify-between py-2">
        <span className="text-gray-500 font-semibold">Kargo</span>
        <span className="text-gray-500 font-semibold" data-testid="shipping">
          {subTotal === 0
            ? `${0}₺`
            : subTotal >= 100
            ? "Ücretsiz"
            : `${shipping}₺`}
        </span>
      </p>
      <p className="flex justify-between">
        <span className="text-gray-500 font-semibold">Toplam</span>
        <span className="font-semibold text-2xl" data-testid="total">
          {total}₺
        </span>
      </p>
      <button
        disabled={subTotal === 0}
        onClick={handleClick}
        className="bg-red-800/90 mt-4 w-full p-2 rounded-md text-white hover:bg-red-900 transition disabled:bg-red-300"
      >
        Sipariş Ver
      </button>
    </div>
  );
};

export default CartInfo;
