import SearchHeader from "./SearchHeader";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-18 md:py-64 flex flex-col gap-10">
      <h1>어떤 제품을 찾으시나요?</h1>
      <SearchHeader />
      {children}
    </div>
  );
}
