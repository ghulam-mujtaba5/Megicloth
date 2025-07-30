"use server";

import { createClient } from '@/app/lib/supabase/server';

const registerFormSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    password: z.string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain an uppercase letter, a lowercase letter, and a number"),
    confirmPassword: z.string(),
    termsAccepted: z.literal(true, {
        errorMap: () => ({ message: "You must accept the terms and conditions" }),
    }),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters long.'),
});

export async function loginWithEmailPassword(_prevState: any, formData: FormData) {
  console.log("\n--- [Action] loginWithEmailPassword ---");
  const supabase = createClient();

  const validatedFields = loginSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    console.error("[Action] Validation failed:", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid form data. Please check your entries.',
    };
  }
  console.log("[Action] Validation successful for:", validatedFields.data.email);

  const { email, password } = validatedFields.data;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("[Action] Supabase sign-in error:", error.message);
    return {
      errors: { _form: [error.message] },
      message: error.message,
    };
  }

  console.log("[Action] Supabase sign-in successful. Returning success state.");
  revalidatePath('/', 'layout'); // Keep revalidation for server components
  return { success: true };
}

export async function loginWithGoogle() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    return redirect('/auth/login?message=Could not authenticate with Google');
  }

  if (data.url) {
    redirect(data.url);
  }

  return redirect('/auth/login?message=An unexpected error occurred.');
}

export async function loginWithFacebook() {
  return redirect('/auth/login?message=Facebook login is coming soon!');
}

export async function loginWithApple() {
  return redirect('/auth/login?message=Apple login is coming soon!');
}

export async function registerWithEmailPassword(_prevState: any, formData: FormData) {
  const supabase = createClient();

  // Manually convert termsAccepted because FormData sends it as 'on' or null
  const rawData = Object.fromEntries(formData.entries());
  const enrichedData = {
    ...rawData,
    termsAccepted: rawData.termsAccepted === 'on',
  };

  const validatedFields = registerFormSchema.safeParse(enrichedData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid form data. Please check your entries.',
    };
  }

  const { email, password, firstName, lastName, phone } = validatedFields.data;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        phone: phone,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    return {
      errors: { _form: [error.message] },
      message: error.message,
    };
  }

  return redirect('/auth/login?message=Please check your email to confirm your account.');
}
