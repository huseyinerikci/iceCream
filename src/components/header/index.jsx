import { CgMenuRightAlt } from "react-icons/cg";
import { IoIosSearch } from "react-icons/io";

const Header = () => {
  return (
    <header className="flex justify-between fs-5">
      <div className="flex gap-[18px] items-center">
        <img
          src="/logo.svg"
          alt="logo"
          className="size-[45px] lg:size-[55px] 2xl:size-[78px]"
        />
        <h2 className="font-black max-sm:hidden tracking-widest fs-4">
          Drop <br /> Cream
        </h2>
      </div>
      <nav className="flex items-center gap-[10px] sm:gap-5 lg:gap-[30px] 2xl:gap-[50px]">
        <a href="/">Anasayfa</a>
        <a href="/">Hakkımızda</a>
        <a href="/">Yakınındakiler</a>
        <a href="/">
          <IoIosSearch className="text-[24px] 2xl:text-[40px]" />
        </a>
      </nav>
      <button>
        <CgMenuRightAlt className="text-[28px] md:text-[35px] 2xl:text-[40px]" />
      </button>
    </header>
  );
};

export default Header;
