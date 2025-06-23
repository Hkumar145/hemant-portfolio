export default function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Lets Connect !</h2>
        <div className="max-w-lg mx-auto">
          <form
            action="https://formspree.io/f/xzzgalwy"
            method="POST"
            className="space-y-4"
          >
            <div>
              <label htmlFor="name" className="block text-gray-600">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-600">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-600">Message</label>
              <textarea
                id="message"
                name="message"
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                rows={5}
                placeholder="Your Message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Send Message
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}