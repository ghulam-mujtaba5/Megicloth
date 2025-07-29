"use server";

import { createClient } from "@/app/lib/supabase/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters long."),
});

export async function submitContactForm(_prevState: any, formData: FormData) {
  const supabase = createClient();

  const validatedFields = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Error: Please check the form fields.",
    };
  }

  const { error } = await supabase
    .from("contact_messages")
    .insert([validatedFields.data]);

  if (error) {
    console.error("Supabase error:", error);
    return {
      message: `Error: ${error.message}`,
    };
  }

  return {
    message: "Success! Your message has been sent.",
  };
}
