import { NextResponse } from "next/server";
import { addLead, readLeads } from "@/lib/db";

// POST handler: Saves new lead submissions
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, website, answers, status } = body;

    // Server-side validation
    if (!name || !email || !phone || !website) {
      return NextResponse.json(
        { error: "Trūksta privalomų laukų (vardas, el. paštas, telefonas, svetainė)." },
        { status: 400 }
      );
    }

    const newLead = addLead({
      name,
      email,
      phone,
      website,
      answers: answers || {},
      status: status || "qualified",
    });

    return NextResponse.json({ success: true, lead: newLead });
  } catch (error) {
    console.error("API error in POST /api/leads:", error);
    return NextResponse.json(
      { error: "Nepavyko išsaugoti užklausos. Serverio klaida." },
      { status: 500 }
    );
  }
}

// GET handler: Returns all leads (protected by simple token or custom authorization header)
export async function GET(request: Request) {
  try {
    // Simple environment password/header verification (Basic Auth-like or token check)
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    // Standard dev fallback password
    const adminToken = process.env.ADMIN_TOKEN || "returna_secret_key_2026";

    if (token !== adminToken) {
      return NextResponse.json({ error: "Nėra prieigos (Unauthorized)" }, { status: 401 });
    }

    const leads = readLeads();
    return NextResponse.json({ leads });
  } catch (error) {
    console.error("API error in GET /api/leads:", error);
    return NextResponse.json(
      { error: "Nepavyko nuskaityti užklausų. Serverio klaida." },
      { status: 500 }
    );
  }
}
