import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Navbar from "../Navbar";

const renderNavbar = () => {
  return render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );
};

describe("Navbar", () => {
  test("Logo is rendered", async () => {
    renderNavbar();

    const logo = await screen.findByText(/project task tool/i);

    expect(logo).toBeVisible();
  });
});
