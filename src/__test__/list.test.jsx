import { render, screen, waitFor } from "@testing-library/react";
import api from "../utils/api";
import List from "../components/list";
import { mockData } from "../utils/constants";
import Card from "../components/list/Card";

//!api mockla (api taklit et)
jest.mock("../utils/api");

//!card component mock
jest.mock("../components/list/Card");

describe("List component testleri", () => {
  //her test öncesi mockları temizle
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ?   Test 1
  it("api cevabına göre Loader  renderlanır", async () => {
    //! api isteği atılırsa olumlu cevap döndürsün fonk
    api.get.mockResolvedValueOnce({ data: [] });

    render(<List />);

    //ekranda loader var
    screen.getByTestId("list-loader");

    //! bir  süre sonra ekrandan loader gider
    await waitFor(() => expect(screen.queryByTestId("list-loader")).toBeNull());
  });

  // ?   Test 2
  it("api error gelince ekranda Error var", async () => {
    //! api isteği atılırsa error döndürsün fonk
    const errMsg = "Hata 404";
    api.get.mockRejectedValueOnce(new Error(errMsg));

    render(<List />);

    //! api cevap gelince error basılır
    await waitFor(() => screen.queryByTestId("error"));
  });

  // ?   Test 3
  it("api başarılı cevap gelince ekranda cardlar var", async () => {
    //! card'ların yerine basit div basıyyoruz list comp. etkilememesi için
    Card.mockImplementation(({ item }) => <div>{item.name}</div>);

    //! api isteği atılırsa veriler döndür fonk
    api.get.mockResolvedValueOnce({ data: mockData });

    render(<List />);

    //! api cevap gelince error basılır
    await waitFor(() =>
      mockData.forEach((item) => {
        screen.getByText(item.name);
      })
    );
  });
});
