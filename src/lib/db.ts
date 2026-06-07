import fs from "fs";
import path from "path";

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  answers: {
    turnover?: string;
    currentUsage?: string;
    listSize?: string;
    challenge?: string;
  };
  status: "qualified" | "disqualified";
  createdAt: string;
};

const DB_FILE = path.join(process.cwd(), "db_leads.json");

// Helper to read leads from the local JSON file
export function readLeads(): Lead[] {
  try {
    if (!fs.existsSync(DB_FILE)) {
      return [];
    }
    const data = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(data) as Lead[];
  } catch (error) {
    console.error("Error reading database file:", error);
    return [];
  }
}

// Helper to save leads to the local JSON file
export function writeLeads(leads: Lead[]): boolean {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(leads, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error writing to database file:", error);
    return false;
  }
}

// Add a new lead to the database
export function addLead(leadData: Omit<Lead, "id" | "createdAt">): Lead {
  const leads = readLeads();
  const newLead: Lead = {
    ...leadData,
    id: Math.random().toString(36).substring(2, 9),
    createdAt: new Date().toISOString(),
  };
  leads.unshift(newLead); // Add new lead to the top
  writeLeads(leads);
  return newLead;
}
