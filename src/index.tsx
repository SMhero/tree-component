import { FC, StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "components/App/App";

const Root: FC = () => (
  <StrictMode>
    <App />
  </StrictMode>
);

createRoot(document.getElementById("root") as Element).render(<Root />);
