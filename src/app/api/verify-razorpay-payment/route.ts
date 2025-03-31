// app/api/verify-razorpay-payment/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
    try {
        // Parse the request body
        const body = await request.json();
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            body;

        // Validate required parameters
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return NextResponse.json(
                { error: "Missing payment verification parameters" },
                { status: 400 }
            );
        }

        // Create a signature using your secret key to verify the payment
        const text = `${razorpay_order_id}|${razorpay_payment_id}`;
        const generated_signature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
            .update(text)
            .digest("hex");

        // Verify the signature
        if (generated_signature === razorpay_signature) {
            // Payment is verified successfully
            return NextResponse.json({
                success: true,
                message: "Payment has been verified",
            });
        } else {
            // Invalid signature
            return NextResponse.json(
                { error: "Invalid payment signature" },
                { status: 400 }
            );
        }
    } catch (error: any) {
        console.error("Error verifying Razorpay payment:", error);
        return NextResponse.json(
            { error: error.message || "Failed to verify payment" },
            { status: 500 }
        );
    }
}
