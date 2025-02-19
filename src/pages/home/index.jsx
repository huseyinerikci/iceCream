import React from "react";
import Hero from "../../components/hero/index";
import CartButton from "../../components/buttons/CartButton";
import TrendButton from "../../components/buttons/TrendButton";
import List from "../../components/list";

const Home = () => {
  return (
    <div className="relative">
      <Hero />
      <CartButton />
      <TrendButton />
      <List />
    </div>
  );
};

export default Home;
