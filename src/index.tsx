import { FC, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";

import App from "components/App/App";

const queryClient = new QueryClient();

const Root: FC = () => (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);

createRoot(document.getElementById("root") as Element).render(<Root />);
