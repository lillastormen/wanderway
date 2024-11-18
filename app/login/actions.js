'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { supabase } from '@/db/dbConnection'

export async function login(formData) {
 

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
     console.log(error);
  }  

  revalidatePath('/')
  redirect('/trip')
}

// export async function signup(formData) {
//   const supabase = await createClient()

//   const data = {
//     email: formData.get('email'),
//     password: formData.get('password'),
//   }

//   const { error } = await supabase.auth.signUp(data)

//   if (error) {
//     redirect('/error')
//   }

//   revalidatePath('/', 'layout')
//   redirect('/account')
