import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Hemant Kumar</h1>
        <ul className="flex space-x-6">
          <li><Link href="#home" className="text-gray-600 hover:text-blue-600">Home</Link></li>
          <li><Link href="#about" className="text-gray-600 hover:text-blue-600">About</Link></li>
          <li><Link href="#projects" className="text-gray-600 hover:text-blue-600">Projects</Link></li>
          <li><Link href="#contact" className="text-gray-600 hover:text-blue-600">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}