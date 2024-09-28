'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/login?error=invalid_creadentials')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}



export async function SingOut(){
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
  if(error) {
    return;
  }
  return redirect("/")
}

