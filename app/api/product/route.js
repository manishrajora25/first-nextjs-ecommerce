import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import cloudinary from "@/lib/cloudinary";

export async function GET() {

  await connectDB();

  const products = await Product.find();

  return Response.json(products);

}



export async function POST(req) {

  await connectDB();

  const formData = await req.formData();

  const name = formData.get("name");
  const description = formData.get("description");
  const price = formData.get("price");
  const discountPrice = formData.get("discountPrice");
  const file = formData.get("img");

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const upload = await new Promise((resolve, reject) => {

    cloudinary.uploader.upload_stream(
      { folder: "products" },
      (error, result) => {

        if (error) reject(error);
        else resolve(result);

      }
    ).end(buffer);

  });

  const product = await Product.create({
    name,
    description,
    price,
    discountPrice,
    img: upload.secure_url
  });

  return Response.json({
    message: "Product Added",
    product
  });
}