import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

// GET Single Product
export async function GET(request, context) {

  await connectDB();

  try {

    const { id } = await context.params;

    const product = await Product.findById(id);

    if (!product) {
      return Response.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return Response.json(product);

  } catch (error) {

    return Response.json(
      { message: error.message },
      { status: 500 }
    );

  }

}


// DELETE Product
export async function DELETE(request, { params }) {

  await connectDB();

  try {

    const product = await Product.findByIdAndDelete(params.id);

    if (!product) {
      return Response.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return Response.json({
      message: "Product Deleted Successfully"
    });

  } catch (error) {

    return Response.json(
      { message: error.message },
      { status: 500 }
    );

  }

}


// UPDATE Product
export async function PUT(request, { params }) {

  await connectDB();

  try {

    const data = await request.json();

    const product = await Product.findByIdAndUpdate(
      params.id,
      data,
      { new: true }
    );

    if (!product) {
      return Response.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return Response.json(product);

  } catch (error) {

    return Response.json(
      { message: error.message },
      { status: 500 }
    );

  }

}