import React, { useState } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [budget, setBudget] = useState('$25k - $50k');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  if (!isOpen) return null;

  const servicesList = [
    'Brand Identity',
    'Website Design & Dev',
    'UI/UX Design',
    'Video Production',
    'Digital Marketing',
    'Full Ecosystem Rebrand',
  ];

  const budgetList = ['< $15k', '$15k - $30k', '$30k - $50k', '$50k - $100k', '$100k+'];

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3BD8D9', '#8A46BB', '#FFFFFF'],
    });
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-[#050505]/90 backdrop-blur-2xl flex justify-center items-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#0B0B0B] border border-white/15 rounded-3xl p-6 sm:p-10 my-auto shadow-2xl shadow-black">
        {/* Close Button */}
        <button
          onClick={onClose}
          data-cursor="pointer"
          className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-[#3BD8D9] text-white hover:text-black transition-all duration-300 border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="mb-8">
              <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#3BD8D9] block mb-2 font-medium">
                Get In Touch
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight">
                Start a Project
              </h2>
              <p className="text-white/60 text-sm font-light mt-1">
                Tell us about your brand goals. Our team will review your brief and get back to you within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service Selection Pills */}
              <div>
                <label className="text-xs font-mono text-white/50 block mb-3 uppercase tracking-wider">
                  Services Needed
                </label>
                <div className="flex flex-wrap gap-2">
                  {servicesList.map((service) => {
                    const isSelected = selectedServices.includes(service);
                    return (
                      <button
                        type="button"
                        key={service}
                        onClick={() => toggleService(service)}
                        className={`px-4 py-2 rounded-full text-xs font-mono transition-all border ${
                          isSelected
                            ? 'bg-[#3BD8D9] text-black border-[#3BD8D9] font-bold shadow-[0_0_12px_#3BD8D9]'
                            : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30'
                        }`}
                      >
                        {service}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Budget Range Selector */}
              <div>
                <label className="text-xs font-mono text-white/50 block mb-3 uppercase tracking-wider">
                  Estimated Budget
                </label>
                <div className="flex flex-wrap gap-2">
                  {budgetList.map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setBudget(b)}
                      className={`px-4 py-2 rounded-full text-xs font-mono transition-all border ${
                        budget === b
                          ? 'bg-[#8A46BB] text-white border-[#8A46BB] font-bold shadow-[0_0_12px_#8A46BB]'
                          : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inputs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-white/50 block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#3BD8D9] outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-white/50 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@company.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#3BD8D9] outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-white/50 block mb-1">Company / Brand Name</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Acme Inc."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#3BD8D9] outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-white/50 block mb-1">Project Brief</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your brand challenge, timeline, or goals..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#3BD8D9] outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#3BD8D9] hover:bg-[#32c2c3] text-black font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(59,216,217,0.3)] transition-colors"
              >
                <Send className="w-4 h-4 fill-black" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-12 space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#3BD8D9]/20 border border-[#3BD8D9] flex items-center justify-center text-[#3BD8D9] mx-auto shadow-[0_0_30px_#3BD8D9]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-display text-3xl font-bold text-white uppercase">
              Message Sent
            </h3>

            <p className="text-white/70 font-sans text-sm max-w-md mx-auto leading-relaxed">
              Thank you, <span className="text-[#3BD8D9] font-bold">{formData.name}</span>. Your inquiry has been received. Our team will contact you within 24 hours.
            </p>

            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-widest transition-colors"
            >
              Return to Site
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
