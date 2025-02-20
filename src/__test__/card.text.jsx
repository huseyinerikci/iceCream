import { render, screen } from "@testing-library/react";
import { useDispatch } from "react-redux";
import Card from "../components/list/Card";
import { mockData } from "../utils/constants";
import userEvent from "@testing-library/user-event";
import { addToCart } from "../redux/cartSlice";

//!usedispatch mock edilir
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));
describe("card componenti", () => {
  //!dispatch mock edilir
  const dispatchMock = jest.fn();

  //!!her test öncesi usedispatch dispatch döndürecek
  beforeEach(() => {
    useDispatch.mockReturnValue(dispatchMock);
  });

  //her test sonrası mockları temizle
  beforeAll(() => {
    jest.clearAllMocks();
  });

  //! Test 1
  it("item propuna göre detaylar ekrana basılır", () => {
    render(<Card item={mockData[0]} />);

    screen.getByRole("heading", { name: "Bal Badem" });

    screen.getByText("25₺/top");

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/ice-1.png");
  });

  //! Test 2
  it("tipin seçili olma durumuna göre buton görünürlüğü", async () => {
    const user = userEvent.setup();
    //sepet ekle buton al
    const basketBtn = screen.getByRole("button", { name: /sepete/i });

    //sepet ekle buton görünmez mi?
    expect(basketBtn).toHaveClass("invisible");

    //  külahta buton al
    const cornetBtn = screen.getByRole("button", { name: /külahta/i });

    //külahta buton tıkla
    await user.click(cornetBtn);

    //sepet ekle buton görünür mü?
    expect(basketBtn).not.toHaveClass("invisible");

    //külahta buton tıkla
    await userEvent.click(cornetBtn);

    //sepet ekle buton görünmez mi?
    expect(basketBtn).toHaveClass("invisible");
  });

  //! Test 3
  it("Sepete ekle butona tıklanınca aksiyon dispatch edilir", async () => {
    const user = userEvent.setup();

    render(<Card item={mockData[0]} />);

    //  külahta buton al
    const cornetBtn = screen.getByRole("button", { name: /külahta/i });

    //külahta buton tıkla
    await user.click(cornetBtn);

    //sepet ekle buton al
    const basketBtn = screen.getByRole("button", { name: /sepete/i });

    //sepete ekle buton tıkla
    await user.click(basketBtn);

    //dispatch çalıştımı
    expect(dispatchMock).toHaveBeenCalledWith(addToCart({ item: mockData[0] }));
  });
});
