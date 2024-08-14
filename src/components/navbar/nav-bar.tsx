import Link from "next/link";

export default function NavBar() {
  return (
    <nav>
      <ul className="flex px-10 py-2">
        <li className="mr-6">
          <Link className="text-blue-500 hover:text-blue-800" href="/">
            Home
          </Link>
        </li>
        <li className="mr-6">
          <Link className="text-blue-500 hover:text-blue-800" href="/lasts">
            Últimas simulações
          </Link>
        </li>
      </ul>
    </nav>
  );
}
