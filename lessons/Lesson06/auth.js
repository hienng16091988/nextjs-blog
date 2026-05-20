"use server";

import bcrypt from 'bcrypt';
import { prisma } from "@/lib/db";
import { RegisterFormSchema } from "@/lib/rules";
import { email } from "zod";
import { redirect } from 'next/navigation';
import { createSession } from '@/lib/sessions';

export async function register(state, formData) {
  const validateFields = RegisterFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  console.log(validateFields);

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      email: formData.get("email"),
    };
  }

  const { email, password } = validateFields.data;

  // Kiem tra xem email co trong DB chua? Neu co roi thi khong them nua
  const existingUser = await prisma.user.findFirst({ where: { email } });
  if (existingUser) {
    return {
        errors: {
            email: "Email already exist in our database",
        }
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await prisma.user.create({
    data: {
      email,
      password:hashedPassword
    },
  });

  //console.log(result);

  await createSession(result.id.toString());

  redirect('/dashboard');

}
