// "use client";

// import { useEffect, useState } from "react";
// import { fetchProduct } from "@/components/fetch/fetchProduct";
// import SearchCard from "@/components/Search/SearchCard";
// import LoadingScreen from "@/components/LoadingScreen";
// import type { GetProductResponse } from "@/types/product";

// export default function SearchPage({
//   params,
// }: {
//   params: { keyword: string };
// }) {
//   const category = params.keyword;
//   const [isLoading, setIsLoading] = useState(true);
//   const [products, setProducts] = useState<GetProductResponse[]>([]);

//   useEffect(() => {
//     const getData = async () => {
//       if (category) {
//         setIsLoading(true); 
//         const productRes = await fetchProduct({ category });
//         if (productRes) {
//           setProducts(productRes);
//         }
//         setIsLoading(false); 
//       }
//     };

//     getData();
//   }, [category]);

//   return (
//     <div>
//       {isLoading ? (
//         <LoadingScreen />
//       ) : (
//         <div className="grid place-items-center gap-15 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
//           {products.map((product) => (
//             <SearchCard key={product.id} product={product} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }