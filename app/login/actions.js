'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/app/utils/supabase/server'

export async function login(formData) {
  const supabase = createClient()


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

