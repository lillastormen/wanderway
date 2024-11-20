"use server";

import { Users } from '../controllers/userController';

export async function login(formData) {
  const { email, password } = formData;

  try {
    const { success, data, error } = await Users.loginUser(email, password);

    if (!success || error) {
      // Log the entire error object to inspect it
      console.error('Login failed:', error); 
      throw new Error(error?.message || 'Login failed. Please check your credentials.');
    }
    return data;

    // If login successful, revalidate the path and redirect to trip page
  } catch (err) {
    // Log the complete error object for better debugging
    console.error('Error during login process:', err); 
    throw new Error('Login failed. Please try again.');
  }
}
