import { Mail, MapPin, Phone, Send } from 'lucide-react';
import React, { useState } from 'react'
import emailjs from 'emailjs-com'
import { toast } from 'react-toastify';

const Contact = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault();

     emailjs.send(
        import.meta.env.VITE_SERVICE_ID,   
        import.meta.env.VITE_TEMPLATE_ID,    
        formData,
        import.meta.env.VITE_USER_ID      
      )
      .then(
        () => {
          toast.success("Message sent successfully");
          setFormData({ name: "", email: "", subject: "", message: "" });
        },
        (error) => {
          toast.error("Failed to send message");
          console.error(error.text);
        }
      );

    console.log("Form Submitted: ", formData);
  };


  return (
    <section id='contact' className="pt-24 py-16 w-full px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 right-10 w-96 h-96 gradient-primary rounded-full mix-blend-multiply filter blur-3xl animate-glow"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 gradient-hero rounded-full mix-blend-multiply filter blur-3xl animate-glow delay-2000"></div>
      </div>

      <div className='max-w-6xl mx-auto relative z-10'>
        <div className='text-center mb-16'>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Get In Touch</h2>
          <p className="text-lg text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your next project and create something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="flex flex-col gap-6">
            <div className="rounded-lg bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm glass-card border-0 hover:scale-[1.03] transition-all duration-300">
              <div className="p-4 lg:p-6">
                <div className="flex items-center mb-4">
                  <div className="gradient-primary p-3 rounded-full mr-4">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-[rgb(var(--muted-foreground))]">mohamedhasmoon175@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm glass-card border-0 hover:scale-[1.03] transition-all duration-300">
              <div className="p-4 lg:p-6">
                <div className="flex items-center mb-4">
                  <div className="gradient-secondary p-3 rounded-full mr-4">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p className="text-[rgb(var(--muted-foreground))]">(+94) 76 9660195</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm glass-card border-0 hover:scale-[1.03] transition-all duration-300">
              <div className="p-4 lg:p-6">
                <div className="flex items-start mb-4">
                  <div className="gradient-primary p-3 rounded-full mr-4">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Location</h4>
                    <p className="text-[rgb(var(--muted-foreground))]">No 538, Lotus Road, <br />Sainthamaruthu 14.<br /> Sri Lanka.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-lg bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm glass-card border-0 transition-all duration-300">
              <div className='p-4 lg:p-8'>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Your Name
                      </label>
                      <input id="name" type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full rounded-md bg-[rgb(var(--background))] px-3 py-2 ring-offset-[rgb(var(--background))] placeholder:text-[rgb(var(--muted-foreground))] outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]  focus:ring-offset-1 md:text-sm glass-card border-0" placeholder="Kumar" required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full rounded-md bg-[rgb(var(--background))] px-3 py-2 ring-offset-[rgb(var(--background))] placeholder:text-[rgb(var(--muted-foreground))] outline-none focus:ring-2 focus:ring-[rgb(var(--ring))] focus:ring-offset-1 md:text-sm glass-card border-0" placeholder="kumar@gmail.com" required />
                    </div>
                  </div>

                  <div className='mb-6'>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <input id="subject" type="text" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="w-full rounded-md bg-[rgb(var(--background))] px-3 py-2 ring-offset-[rgb(var(--background))] placeholder:text-[rgb(var(--muted-foreground))] outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]  focus:ring-offset-1 md:text-sm glass-card border-0" placeholder="Project Inquiry" required />
                  </div>

                  <div className='mb-6'>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea id="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full rounded-md bg-[rgb(var(--background))] px-3 py-2 ring-offset-[rgb(var(--background))] placeholder:text-[rgb(var(--muted-foreground))] outline-none focus:ring-2 focus:ring-[rgb(var(--ring))] focus:ring-offset-1 md:text-sm glass-card border-0 min-h-[120px]" placeholder="Tell me about your project..." required />
                  </div>

                  <button type="submit" size="lg" className="flex items-center justify-center rounded-md text-md font-medium outline-none border-none w-full py-2 gradient-primary hover:scale-[1.03] transition-all duration-300 animate-glow text-white" >
                    <Send className="mr-3 h-4 w-4" />
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact