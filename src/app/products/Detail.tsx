export default function Detail({ product }: { product: any }) {
    return (
      <>
      <div className="border p-6 bg-gray-100 mt-6">
        <h2 className="text-xl font-bold">{product.title}</h2>
        <p>{product.description}</p>
      </div>
      </>
    );
  }
  