// components/NavBar.js
import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="navbar">
      <Link href="/">Home</Link>
      <Link href="/favorites">Favorites</Link>
      <Link href="/settings">Settings</Link>
    </nav>
  );
}
