import React, { useState } from 'react';
import { 
  Headphones, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  MessageSquare, 
  Search,
  Building 
} from 'lucide-react';

export const ContactSupportView: React.FC = () => {
  const [formType, setFormType] = useState<'guest' | 'lost' | 'leasing'>('guest');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Please fill out all required fields.');
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    }, 3000);
  };

  return (
    <div className="w-full space-y-8">
      {/* Banner */}
      <div className="relative rounded-3xl bg-[#0B192C] text-white p-8 md:p-12 overflow-hidden shadow-xl border border-slate-800">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wide uppercase">
            <Headphones className="w-3.5 h-3.5" />
            Guest Services & Concierge
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-cinzel">
            Contact & Guest Support
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Our multilingual concierge and tenant relations teams are available 7 days a week to assist with general inquiries, lost items, retail leasing proposals, and accessibility accommodations.
          </p>
        </div>
      </div>

      {/* 3 Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Phone className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 font-cinzel">Direct Hotlines</h3>
          <p className="text-xs text-slate-500">Concierge Desk: <strong>+1 (800) 555-MALL</strong></p>
          <p className="text-xs text-slate-500">24/7 Security Center: <strong>+1 (800) 555-0911</strong></p>
          <p className="text-xs text-slate-500">Retail Leasing: <strong>+1 (800) 555-0602</strong></p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 font-cinzel">Physical Address</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Smart Mall Boulevard, Grand Atrium Gateway, Metropolitan Commercial District, Suite 100
          </p>
          <p className="text-[11px] text-amber-700 font-semibold">Direct underground transit connection via Metro Line 2</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 font-cinzel">Operating Hours</h3>
          <p className="text-xs text-slate-600">Retail Boutiques: <strong>10:00 AM – 10:00 PM</strong></p>
          <p className="text-xs text-slate-600">Restaurants & Food Court: <strong>10:30 AM – 11:30 PM</strong></p>
          <p className="text-xs text-slate-600">Multiplex Cinema & Parking: <strong>Open 24/7</strong></p>
        </div>
      </div>

      {/* Inquiry Form */}
      <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-200 max-w-2xl mx-auto space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-4">
            {(['guest', 'lost', 'leasing'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFormType(t)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                  formType === t
                    ? 'bg-[#0B192C] text-amber-400 font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t === 'guest' ? 'Guest Inquiries' : t === 'lost' ? 'Lost & Found' : 'Retail Leasing'}
              </button>
            ))}
          </div>

          <h3 className="text-xl font-bold text-slate-900 font-cinzel">
            {formType === 'guest'
              ? 'Send a Guest Support Inquiry'
              : formType === 'lost'
              ? 'Report or Claim a Lost Item'
              : 'Submit a Retail Tenant Leasing Proposal'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Our guest team monitors inquiries continuously and responds within standard business hours.
          </p>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-2 animate-fade-in">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 font-cinzel">Inquiry Submitted</h4>
            <p className="text-xs text-slate-600">
              Thank you, {name}. A confirmation email has been dispatched to {email}. Ticket reference #INQ-{Math.floor(1000 + Math.random() * 9000)}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Elena Rostova"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="elena@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Subject</label>
                <input
                  type="text"
                  placeholder={formType === 'lost' ? 'Item description (e.g. black sunglasses)' : 'Subject summary'}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Detailed Message *</label>
              <textarea
                required
                rows={4}
                placeholder="Type your message, questions, or requirements here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#0B192C] text-amber-400 font-semibold text-xs hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Inquiry</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
