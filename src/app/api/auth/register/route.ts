import { NextResponse } from "next/server";
import prisma  from "@/lib/prisma";
import bcrypt from "bcryptjs"

export async function POST(request: Request) {

    const {name, password, confirmPassword} = await request.json()

    if (!name || !password || !confirmPassword) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    if (password !== confirmPassword) {
        return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
    }   

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: { name: name },
    });

    if (existingUser) {
        return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const newUser = await prisma.user.create({
        data: {
            name: name,     
            password: hashedPassword,
            courses: "ca"
        },
    });

    console.log("New user created:", newUser);

    const data = {
        id: newUser.id,
        name: newUser.name
    }

    return NextResponse.json({"user" : data});
}