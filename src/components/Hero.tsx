import Image from 'next/image';

export default function Hero() {
  return (
    <section id="home" className="bg-blue-600 text-white py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Text Column */}
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Hi, I&apos;m Hemant Kumar</h2>
            <p className="text-xl mb-6">A passionate Next.js developer building modern web applications.</p>
            <a
              href="#projects"
              className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
            >
              View My Work
            </a>
          </div>
          {/* Image Column */}
          <div className="md:w-1/2 flex justify-center">
            <Image
              src="/profile.png"
              alt="Hemant Kumar profile picture"
              width={300}
              height={220}
              className="rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}