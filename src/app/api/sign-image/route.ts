import { getCloudinary } from "@/shared/lib/cloudinary/setup";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { paramsToSign } = body;
    const cloudinary = getCloudinary();

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET!
    );

    return Response.json({ signature });
  } catch (error) {
    return Response.error();
  }
}
