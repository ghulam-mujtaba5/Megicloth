import { redirect } from 'next/navigation';

export default function AdminPage() {
  redirect('/admin/dashboard');
  // This component will not render anything as the redirect happens on the server.
  return null;
}
