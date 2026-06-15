import { NextRequest } from 'next/server';
import { removeAuthCookie } from '@/lib/auth';
import { successResponse, handleApiError } from '@/lib/api-response';

export async function POST(request: NextRequest) {
  try {
    // Remove auth cookie
    await removeAuthCookie();

    return successResponse(null, 'Logged out successfully');
  } catch (error) {
    return handleApiError(error);
  }
}