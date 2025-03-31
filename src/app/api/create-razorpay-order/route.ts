// app/api/create-razorpay-order/route.ts
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(request: Request) {
    try {
        // Parse the request body
        const body = await request.json();
        const { amount, currency = "INR", receipt, notes } = body;

        // Validate the required parameters
        if (!amount) {
            return NextResponse.json(
                { error: "Amount is required" },
                { status: 400 }
            );
        }

        // Initialize Razorpay instance
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID || "",
            key_secret: process.env.RAZORPAY_KEY_SECRET || "",
        });

        // Create an order
        const order = await razorpay.orders.create({
            amount, // amount in paise
            currency,
            receipt,
            notes,
        });

        // Return the order details
        return NextResponse.json({ order });
    } catch (error: any) {
        console.error("Error creating Razorpay order:", error);
        return NextResponse.json(
            { error: error.message || "Failed to create order" },
            { status: 500 }
        );
    }
}
