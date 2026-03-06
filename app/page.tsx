import Image from "next/image";
import Link from "next/link";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  img: string;
};

async function getProducts(): Promise<Product[]> {
  const res = await fetch("http://localhost:3000/api/product", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function Home() {
  const products: Product[] = await getProducts();

  return (
    <div className="min-h-screen bg-gray-400 p-10">
      <h1 className="text-3xl font-bold text-center mb-10 ">
        All Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {products.map((item: any) => (
    
    <Link key={item._id} href={`/product/${item._id}`}>

      <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition cursor-pointer">

        <Image
          src={item.img}
          alt={item.name}
          width={300}
          height={200}
          className="rounded-lg object-cover h-[200px] w-full"
        />

        <h2 className="text-lg font-semibold mt-3 text-black">
          {item.name}
        </h2>

        <p className="text-black mt-1">
          {item.description}
        </p>

        <div className="flex items-center gap-2 mt-2">

          <span className="text-xl font-bold text-green-600">
            ₹{item.discountPrice}
          </span>

          <span className="line-through text-gray-400">
            ₹{item.price}
          </span>

        </div>

        <button className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
          Add to Cart
        </button>

      </div>

    </Link>

  ))}
</div>
    </div>
  );
}

// 1234