import CartClientPage from './CartClientPage';
import { getCart } from '@/app/lib/actions/cart';

export default async function CartPage() {
  const cart = await getCart();
  return <CartClientPage initialCart={cart} />;
}
