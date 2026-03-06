export async function POST(req) {

    const data = await req.json();
  
    return Response.json({
      message: "Order placed",
      data
    });
  
  }