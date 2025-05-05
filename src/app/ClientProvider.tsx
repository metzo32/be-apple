"use client";

// import QueryProvider from "@/components/QueryProvider";

import MUIThemeProvider from "@/components/MUIThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function ClientProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MUIThemeProvider>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </MUIThemeProvider>
    </QueryClientProvider>
  );
}
