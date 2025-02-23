import { useSelector } from "react-redux";
import CartInfo from "../components/modal/CartInfo";
import CartItem from "../components/modal/CartItem";
import { render, screen } from "@testing-library/react";
import Modal from "../components/modal";
import { userEvent } from "@testing-library/user-event";

//useselector mock
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

//cartitem ve cartinfo mock, modal içinde olduğu için
jest.mock("../components/modal/CartItem", () => () => <h1>CartItem</h1>);
jest.mock("../components/modal/CartInfo", () => () => <h1>CartInfo</h1>);

describe("modal componenti", () => {
  //close fonk mock
  const closeMock = jest.fn();

  it("isopen propuna görre modal ekrana basılır", () => {
    //useselector çağrılması
    useSelector.mockReturnValue({ cart: [] });

    //render isopen:false
    const { rerender } = render(<Modal isOpen={false} close={closeMock} />);

    //modal ekranda yok
    expect(screen.queryByTestId("modal")).toBeNull();

    //render isopen:true
    rerender(<Modal isOpen={true} close={closeMock} />);

    //modal ekranda var
    screen.queryByTestId("modal");
  });
  it("x butonu tıklama close fonk. çalışır", async () => {
    //useselector çağrılması
    useSelector.mockReturnValue({ cart: [] });

    const user = userEvent.setup();

    //render isopen:true
    render(<Modal isOpen={true} close={closeMock} />);

    //x  buton al
    const closeBtn = screen.getByTestId("close");

    //buton tıkla
    await user.click(closeBtn);

    //closemock fonk. çalıştı
    expect(closeMock).toHaveBeenCalled();
  });
  it("sepet doluluk  durumuna göre uyarı gelmesi", () => {
    //useselector çağrılması boş return
    useSelector.mockReturnValue({ cart: [] });

    //render isopen:true
    const { rerender } = render(<Modal isOpen={true} close={closeMock} />);

    //uyarı mesajı ekranda var
    screen.getByText(/henüz/i);

    //useselector çağrılması dolu return
    useSelector.mockReturnValue({ cart: [12, 12, 12] });

    //render isopen:true
    rerender(<Modal isOpen={true} close={closeMock} />);

    //uyarı mesajı ekranda yok
    expect(screen.queryByText(/henüz/i)).toBeNull();
  });
  it("sepet dolu ise kart basılır", () => {
    //useselector çağrılması dolu return
    useSelector.mockReturnValue({ cart: [12, 12, 12] });

    //render isopen:true
    render(<Modal isOpen={true} close={closeMock} />);

    //ekrandaki cartitemleri al
    const items = screen.getAllByRole("heading", { name: "CartItem" });

    //item içerisinin kontrolu
    expect(items.length).toBe(3);
  });
});
