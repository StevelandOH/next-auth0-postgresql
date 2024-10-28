import { NextResponse } from "next/server";
import { query } from "../../../lib/db";

export async function GET() {
  try {
    const { rows } = await query("SELECT * FROM users");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { auth0_id, name, email, picture } = await req.json();

    const result = await query(
      `
          INSERT INTO users (auth0_id, name, email, picture) 
          VALUES ($1, $2, $3, $4) 
          ON CONFLICT (auth0_id) DO UPDATE SET 
            name = EXCLUDED.name,
            email = EXCLUDED.email,
            picture = EXCLUDED.picture
          RETURNING *;
        `,
      [auth0_id, name, email, picture]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("Error creating or updating user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
