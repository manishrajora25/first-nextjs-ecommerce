import Image from "next/image";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  img: string;
};

async function getProduct(id: string): Promise<Product> {
    const res = await fetch(
        `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"}/api/product/${id}`,
        { cache: "no-store" }
      );

  return res.json();
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const product = await getProduct(id);

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow grid md:grid-cols-2 gap-8">

        {product.img && (
          <Image
            src={product.img}
            alt={product.name}
            width={500}
            height={400}
            className="rounded-lg"
          />
        )}

        <div>

          <h1 className="text-3xl font-bold mb-4">
            {product.name}
          </h1>

          <p className="text-gray-600 mb-4">
            {product.description}
          </p>

          <div className="flex gap-4 mb-6">

            <span className="text-2xl font-bold text-green-600">
              ₹{product.discountPrice}
            </span>

            <span className="line-through text-gray-400">
              ₹{product.price}
            </span>

          </div>

          <button className="bg-black text-white px-6 py-3 rounded-lg">
            Add to Cart
          </button>

        </div>

      </div>

    </div>

  );
}