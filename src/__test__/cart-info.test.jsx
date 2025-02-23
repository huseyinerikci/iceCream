import { render, screen } from "@testing-library/react";
import { useDispatch } from "react-redux";
import userEvent from "@testing-library/user-event";
import CartInfo from "../components/modal/CartInfo";

//!usedispatch mock edilir
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

describe("Cart-info Component", () => {
  //!dispatch mock edilir
  const dispatchMock = jest.fn();

  //!!her test öncesi usedispatch dispatch döndürecek
  beforeEach(() => {
    useDispatch.mockReturnValue(dispatchMock);
  });

  //her test sonrası mockları temizle
  afterEach(() => {
    jest.clearAllMocks();
  });

  //! Test 1
  test("ara toplam, kargo, toplam değerleri doğru şekilde renderlenir", () => {
    const cart = [
      { id: 1, name: "Vanilya", price: 24, amount: 2 },
      { id: 2, name: "Çikolata", price: 24, amount: 2 },
    ];

    const close = jest.fn();

    render(<CartInfo cart={cart} close={close} />);

    expect(screen.getByTestId("subtotal")).toHaveTextContent("96₺");
    expect(screen.getByTestId("shipping")).toHaveTextContent("40₺");
    expect(screen.getByTestId("total")).toHaveTextContent("136₺");
  });

  //! Test 2
  test("sipariş ver butonu çalışması", async () => {
    const user = userEvent.setup();
    const cart = [
      { id: 1, name: "Vanilya", price: 24, amount: 2 },
      { id: 2, name: "Çikolata", price: 24, amount: 2 },
    ];

    const close = jest.fn();

    render(<CartInfo cart={cart} close={close} />);

    const button = screen.getByRole("button");
    await user.click(button);

    //aksiyon dispatch edilmesi
    expect(dispatchMock).toHaveBeenCalled();

    //close fonk. çağrılması
    expect(close).toHaveBeenCalled();
  });

  //! Test 3
  test("sepet boş ise  sipariş butonu inaktiftir", () => {
    const cart = [];

    const close = jest.fn();

    render(<CartInfo cart={cart} close={close} />);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  //! Test 4
  test("toplam 100₺ üzerinde kargo ücretsiz durumu", () => {
    const cart = [
      { id: 1, name: "Vanilya", price: 60, amount: 2 },
      { id: 2, name: "Çikolata", price: 80, amount: 2 },
    ];

    const close = jest.fn();

    render(<CartInfo cart={cart} close={close} />);

    expect(screen.getByTestId("shipping")).toHaveTextContent("Ücretsiz");
  });
});
