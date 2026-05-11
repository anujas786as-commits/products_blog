import React from 'react';
import { Mail, MessageSquare, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black mb-6">Get in Touch</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Have a question about a product or want to collaborate? We'd love to hear from you.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Info */}
        <div className="space-y-8 lg:col-span-1">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold">Email Us</h3>
              <p className="text-muted-foreground text-sm">hello@bestpicks.com</p>
              <p className="text-muted-foreground text-sm">support@bestpicks.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold">Chat with Us</h3>
              <p className="text-muted-foreground text-sm">Our team is available Mon-Fri, 9am-6pm IST.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold">Office</h3>
              <p className="text-muted-foreground text-sm">123 Tech Hub, Sector 62</p>
              <p className="text-muted-foreground text-sm">Noida, UP, India</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <form className="p-8 bg-card border rounded-3xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold">Full Name</label>
                <input type="text" className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary outline-none" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Email Address</label>
                <input type="email" className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary outline-none" placeholder="john@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold">Subject</label>
              <input type="text" className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary outline-none" placeholder="Product Query" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold">Message</label>
              <textarea rows={5} className="w-full p-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary outline-none resize-none" placeholder="How can we help you?"></textarea>
            </div>
            <Button size="lg" className="w-full font-bold h-12 rounded-xl">Send Message</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
