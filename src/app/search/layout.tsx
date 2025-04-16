"use client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SearchHeader from './SearchHeader'

const queryClient = new QueryClient();

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchHeader/>
      {children}
    </QueryClientProvider>
  )
}
