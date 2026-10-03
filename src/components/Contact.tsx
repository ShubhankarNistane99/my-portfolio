import React, { useState } from 'react';
import { Mail, Phone, Send, CheckCircle2, Copy, Check, AlertCircle, Linkedin, Github, ArrowUpRight } from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

interface ContactProps {
  data: PortfolioData;
}

export const Contact: React.FC<ContactProps> = ({ data }) => {
  const { contact, social, personal, visibility } = data;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);

  if (visibility.contact === false) {
    return null;
  }

  const handleCopyEmail = () => {
    if (personal.email) {
      navigator.clipboard.writeText(personal.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Honeypot bot trap: silently absorb automated submissions without executing API calls
    if (honeypot && honeypot.trim() !== '') {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        setSuccessMessage('Thank you for reaching out!');
      }, 400);
      return;
    }

    // 2. Client-side rate limiting: 8 seconds cooldown between submissions
    const now = Date.now();
    if (now - lastSubmitTime < 8000) {
      setErrorMessage('Please wait a few moments before sending another note.');
      return;
    }

    // 3. Client-side field validations & length constraints
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedSubject = formData.subject.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName) {
      setErrorMessage('Please enter your name.');
      return;
    }
    if (trimmedName.length > 100) {
      setErrorMessage('Name is too long (maximum 100 characters).');
      return;
    }

    if (!trimmedEmail) {
      setErrorMessage('Please enter your email address.');
      return;
    }
    if (trimmedEmail.length > 120) {
      setErrorMessage('Email address is too long (maximum 120 characters).');
      return;
    }

    // Standard RFC-compliant email format check
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (trimmedSubject.length > 150) {
      setErrorMessage('Subject is too long (maximum 150 characters).');
      return;
    }

    if (!trimmedMessage) {
      setErrorMessage('Please enter your message.');
      return;
    }
    if (trimmedMessage.length < 5) {
      setErrorMessage('Message is too short. Please provide at least 5 characters.');
      return;
    }
    if (trimmedMessage.length > 3000) {
      setErrorMessage('Message exceeds maximum limit of 3,000 characters.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    const recipientEmail = personal.email || 'shubhankar.nistane.work@gmail.com';
    const formSubmitEndpoint = `https://formsubmit.co/ajax/${encodeURIComponent(recipientEmail)}`;

    try {
      const res = await fetch(formSubmitEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          subject: trimmedSubject || `Portfolio Inquiry from ${trimmedName}`,
          _subject: trimmedSubject || `Portfolio Inquiry from ${trimmedName}`,
          message: trimmedMessage,
          _honey: honeypot,
          _template: 'table',
          _captcha: 'true',
        }),
      });

      const result = await res.json().catch(() => null);

      if (res.ok && (!result || result.success !== 'false')) {
        setSubmitted(true);
        setLastSubmitTime(Date.now());
        const isActivation = result?.message && result.message.toLowerCase().includes('activate');
        setSuccessMessage(
          isActivation
            ? 'First-time activation note sent! Please check your inbox (shubhankar.nistane.work@gmail.com) and click "Activate Form" once to enable instant delivery.'
            : 'Thank you for reaching out! Your message was sent directly to shubhankar.nistane.work@gmail.com. I will respond to your inquiry promptly.'
        );
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const errorText =
          result?.message ||
          'Unable to deliver message automatically right now. Please reach out directly to shubhankar.nistane.work@gmail.com.';
        setErrorMessage(errorText);
      }
    } catch {
      setErrorMessage('Network connection error. Please try again or reach out directly to shubhankar.nistane.work@gmail.com.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const showForm = visibility.contactForm !== false;

  return (
    <section id="contact" className="py-12 md:py-16 border-b border-stone-200/60 dark:border-stone-800/60 bg-stone-100/30 dark:bg-stone-900/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-8">
          <p className="text-xs font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5">
            {contact.subheading || 'Direct Inquiries'}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            {contact.heading || "Get in Touch"}
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-sm mt-1.5">
            {contact.message}
          </p>
        </div>

        <div className={`grid grid-cols-1 ${showForm ? 'lg:grid-cols-12' : 'lg:grid-cols-8'} gap-8 items-start`}>
          
          {/* Direct Coordinates: Clear visual hierarchy: 1. Email, 2. LinkedIn, 3. GitHub */}
          <div className={`${showForm ? 'lg:col-span-5' : 'lg:col-span-8'} space-y-3.5`}>
            
            {/* 1. Primary Email Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-stone-900 dark:text-stone-100 font-semibold text-sm">
                  <div className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>1. Direct Email</span>
                </div>

                <button
                  onClick={handleCopyEmail}
                  type="button"
                  aria-label="Copy email address"
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <a
                href={`mailto:${personal.email}`}
                className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 hover:underline block truncate"
              >
                {personal.email}
              </a>
            </div>

            {/* 2. LinkedIn Card */}
            {social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs hover:border-stone-300 dark:hover:border-stone-700 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 group-hover:bg-stone-200 dark:group-hover:bg-stone-700 transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 block">2. Professional Network</span>
                    <span className="text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:underline">LinkedIn Profile</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-stone-700 dark:group-hover:text-stone-200 transition-colors" />
              </a>
            )}

            {/* 3. GitHub Card */}
            {social.github && (
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs hover:border-stone-300 dark:hover:border-stone-700 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 group-hover:bg-stone-200 dark:group-hover:bg-stone-700 transition-colors">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 block">3. Code & Repositories</span>
                    <span className="text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:underline">GitHub Profile</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-stone-700 dark:group-hover:text-stone-200 transition-colors" />
              </a>
            )}

            {/* Phone (if available) */}
            {contact.phone && (
              <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs text-xs sm:text-sm">
                <div className="flex items-center gap-3 text-stone-600 dark:text-stone-400">
                  <Phone className="w-4 h-4 text-stone-400 shrink-0" />
                  <a href={`tel:${contact.phone}`} className="hover:underline text-stone-800 dark:text-stone-200">
                    {contact.phone}
                  </a>
                </div>
              </div>
            )}

          </div>

          {/* Optional Contact Form */}
          {showForm && (
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
                
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-100 dark:border-stone-800">
                  <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                    Send a Message (Optional)
                  </h3>
                  <span className="text-[11px] font-mono text-stone-400">
                    Direct outreach
                  </span>
                </div>

                {submitted ? (
                  <div className="py-7 px-3 text-center space-y-4 animate-fade-in" role="status" aria-live="polite">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-xs">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100">
                        Message Sent Directly
                      </h4>
                      <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-md mx-auto leading-relaxed">
                        {successMessage ||
                          'Thank you for reaching out! Your message was sent directly to shubhankar.nistane.work@gmail.com.'}
                      </p>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setSuccessMessage('');
                          setErrorMessage('');
                        }}
                        className="px-4 py-2 rounded-xl text-xs font-semibold border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-850 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors shadow-xs"
                      >
                        Send Another Note
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
                    {/* Invisible honeypot trap field for automated spam bots */}
                    <div
                      aria-hidden="true"
                      style={{
                        opacity: 0,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: 0,
                        width: 0,
                        zIndex: -1,
                        overflow: 'hidden',
                        pointerEvents: 'none',
                      }}
                    >
                      <label htmlFor="_honey">Please leave this field empty</label>
                      <input
                        type="text"
                        id="_honey"
                        name="_honey"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    {errorMessage && (
                      <div
                        role="alert"
                        aria-live="assertive"
                        className="p-2.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs flex items-center gap-2"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label htmlFor="name" className="block text-[11px] font-mono uppercase text-stone-600 dark:text-stone-400 mb-1">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          maxLength={100}
                          required
                          className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800/50 text-stone-900 dark:text-stone-100 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 dark:focus:ring-stone-600"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-[11px] font-mono uppercase text-stone-600 dark:text-stone-400 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          maxLength={120}
                          required
                          className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800/50 text-stone-900 dark:text-stone-100 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 dark:focus:ring-stone-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-[11px] font-mono uppercase text-stone-600 dark:text-stone-400 mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        maxLength={150}
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800/50 text-stone-900 dark:text-stone-100 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 dark:focus:ring-stone-600"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-[11px] font-mono uppercase text-stone-600 dark:text-stone-400 mb-1">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        maxLength={3000}
                        required
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800/50 text-stone-900 dark:text-stone-100 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 dark:focus:ring-stone-600 resize-y"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] font-mono text-stone-400">
                        * Required
                      </span>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 font-semibold text-xs sm:text-sm hover:bg-stone-800 dark:hover:bg-white transition-colors disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed shadow-xs"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            <span>Sending directly...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Send Message</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}

              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
