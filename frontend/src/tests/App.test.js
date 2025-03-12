import { render, screen } from "@testing-library/react";
import App from "../App";
import { StateProvider } from "../context/StateProvider";

test("renders navbar and home page", () => {
    render(
        <StateProvider>
            <App />
        </StateProvider>
    );

    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/users/i)).toBeInTheDocument();
});
