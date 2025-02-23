import React from "react";

const Error = () => {
  return (
    <div
      data-testid="error"
      className=" w-[500px] mx-auto  bg-red-300 text-center py-5 rounded mt-20 font-semibold text-2xl "
    >
      Veriler yüklenirken bir hata oluştu
    </div>
  );
};

export default Error;
