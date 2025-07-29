'use server';

import { createClient } from '@/app/lib/supabase/server';
import { redirect } from 'next/navigation';
import { registerFormSchema } from '@/app/lib/schemas';
import { processReferral } from './loyalty';

import type { z } from 'zod';

type RegisterFormValues = z.infer<typeof registerFormSchema>;

export async function registerWithEmailPassword(_prevState: any, values: RegisterFormValues) {
    const validatedFields = registerFormSchema.safeParse(values);

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
        // Process referral code if provided, but don't block registration flow
        if (validatedFields.data.referralCode) {
            await processReferral(data.user.id, validatedFields.data.referralCode);
        }
        redirect('/auth/login?message=Registration successful. Please check your email to verify your account.');
    }

    return {};
}
