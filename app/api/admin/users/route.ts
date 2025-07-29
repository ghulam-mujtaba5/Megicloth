import { NextRequest, NextResponse } from 'next/server';
import { getAllUsers, updateUserRole, deleteUser } from '@/app/lib/actions/users';

// GET: fetch all users
export async function GET() {
  try {
    const users = await getAllUsers();
    return NextResponse.json(users);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PATCH: update user role
export async function PATCH(req: NextRequest) {
  try {
    const { userId, newRole } = await req.json();
    if (!userId || !newRole) {
      return NextResponse.json({ error: 'Missing userId or newRole' }, { status: 400 });
    }
    const result = await updateUserRole(userId, newRole);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: delete user
export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await req.json();
    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }
    const result = await deleteUser(userId);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
