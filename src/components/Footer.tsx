export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-6 text-center">
        <p>&copy; {new Date().getFullYear()} Hemant Kumar. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="https://github.com/Hkumar145" className="hover:text-blue-400">GitHub</a>
          <a href="https://www.linkedin.com/in/hemant-e" className="hover:text-blue-400">LinkedIn</a>
          <a href="mailto:hkumar1698.hk@gmail.com" className="hover:text-blue-400">Email</a>
        </div>
      </div>
    </footer>
  );
}