import React from "react";

const CartInfo = ({ cart }) => {
  const kargoPrice = 50;
  return (
    <div className="flex flex-col gap-3 my-4 text-gray-600">
      <div className="flex justify-between items-center">
        <p>Ara Toplam</p>
        <span>0₺</span>
      </div>
      <div className="flex justify-between items-center">
        <p>Kargo</p>
        <span>{kargoPrice}₺</span>
      </div>
      <div className="flex justify-between items-center">
        <p>Toplam</p>
        <span className="font-semibold text-xl">{0 + kargoPrice}₺</span>
      </div>
      <button className="bg-red-900/90 rounded-md py-2 text-white ">
        Sipariş Ver
      </button>
    </div>
  );
};

export default CartInfo;
