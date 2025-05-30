export default function About() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">About Me</h2>
        <p className="text-lg text-gray-600 mb-6">
         I&apos;m a web developer with expertise in Next.js, React, and Tailwind CSS. I love creating
          fast, responsive, and user-friendly applications. My goal is to build seamless digital
          experiences that solve real-world problems.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Skills</h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>Next.js & React</li>
              <li>Tailwind CSS & CSS</li>
              <li>JavaScript & TypeScript</li>
              <li>Node.js & APIs</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Experience</h3>
            <p className="text-gray-600">
              3+ years building web applications, from startups to open-source projects.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Education</h3>
            <p className="text-gray-600">
             BTech in Electronics and Communication Engineering from the DAV Institute of Engineering and Technology , Jalandhar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}