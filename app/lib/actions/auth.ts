'use server';

import { createClient } from '@/app/lib/supabase/server';
import { redirect } from 'next/navigation';
import { registerFormSchema } from '@/app/lib/schemas';

export async function registerWithEmailPassword(_prevState: any, formData: FormData) {
    const validatedFields = registerFormSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { email, password, firstName, lastName, phone } = validatedFields.data;
    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                first_name: firstName,
                last_name: lastName,
                phone: phone,
                role: 'customer',
            },
        },
    });

    if (error) {
        return {
            errors: { _form: [error.message] },
        };
    }

    if (data.user) {
        redirect('/auth/login?message=Registration successful. Please check your email to verify your account.');
    }

    return {};
}
