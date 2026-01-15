/**
 * Profile Update API Route
 * Saves user profile data
 */

import type { APIRoute } from 'astro';
import { updateUserProfile } from '../../../utils/agents/knowledge/userProfile';
import type { UserProfile } from '../../../utils/agents/knowledge/userProfile';

export const POST: APIRoute = async ({ request }) => {
  try {
    const profileData: Partial<UserProfile> = await request.json();
    
    // Update the profile
    updateUserProfile(profileData);
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Profile updated successfully',
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error: any) {
    console.error('Profile update error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Unknown error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};

export const GET: APIRoute = async () => {
  const { getUserProfile } = await import('../../../utils/agents/knowledge/userProfile');
  const profile = getUserProfile();
  
  return new Response(
    JSON.stringify({
      success: true,
      profile,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};
