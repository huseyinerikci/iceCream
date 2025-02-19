import { render, screen } from "@testing-library/react";
import Selector from "../components/list/Selector";
import userEvent from "@testing-library/user-event";

// !  fonksiyon taklidi
const mockFn = jest.fn();

describe("Selector componenti", () => {
  // ! Test 1
  test("Cornet seçilince buton arkaplan değişir", () => {
    render(<Selector selectedType="cornet" handleType={() => {}} />);

    //cornet butonu aktif class var
    const cornetBtn = screen.getByRole("button", { name: /külahta/i });
    expect(cornetBtn).toHaveClass("bg-white text-black");

    //cup butonu aktif class yok
    const cupBtn = screen.getByRole("button", { name: /bardakta/i });
    expect(cupBtn).not.toHaveClass("bg-white text-black");
  });

  // ! Test 2
  test("Cup seçilince buton arkaplan değişir", () => {
    render(<Selector selectedType="cup" handleType={() => {}} />);

    //cup butonu aktif class var
    const cupBtn = screen.getByRole("button", { name: /bardakta/i });
    expect(cupBtn).toHaveClass("bg-white text-black");

    //cornet butonu aktif class yok
    const cornetBtn = screen.getByRole("button", { name: /külahta/i });
    expect(cornetBtn).not.toHaveClass("bg-white text-black");
  });

  // ! Test 3
  test("butonlara tıklanınca fonksiyon çalışır", async () => {
    //user event kur
    const user = userEvent.setup();

    render(<Selector selectedType={null} handleType={mockFn} />);

    //butonları al
    const cornetBtn = screen.getByRole("button", { name: /külahta/i });
    const cupBtn = screen.getByRole("button", { name: /bardakta/i });

    await user.click(cornetBtn);

    //fonk cornet ile çalıştı mı
    expect(mockFn).toHaveBeenCalledWith("cornet");

    await user.click(cupBtn);

    //fonk cup ile çalıştı mı
    expect(mockFn).toHaveBeenCalledWith("cup");
  });
});
