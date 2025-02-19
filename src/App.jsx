import Header from "./components/header/index";
import Home from "./pages/home/index";
const App = () => {
  return (
    <div
      className="min-h-screen bg-red-900 text-white py-[30px] 
    2xl:py-[50px] px-[5%]"
    >
      <Header />

      <Home />
    </div>
  );
};

export default App;
