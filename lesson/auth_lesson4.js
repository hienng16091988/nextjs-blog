"use server"

import { RegisterFormSchema } from "@/lib/rules";
import { email } from "zod";

export async function register(state, formData) {

    const validateFields = RegisterFormSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword")
    });

    console.log(validateFields);

    if (!validateFields.success) {

        return {
            errors: validateFields.error.flatten().fieldErrors,
            email: formData.get("email")
        }
        
    }
}