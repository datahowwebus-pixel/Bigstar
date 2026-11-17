import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { DIVISIONS, DivisionId } from '../data/catalog';
import { AthleticHeading } from './AthleticMotion';

interface ContactPrefill {
  divisionId?: DivisionId;
  productName?: string;
  options?: string[];
}

interface ContactSectionProps {
  prefill: ContactPrefill | null;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ prefill }) => {
  const [company, setCompany] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [divisionId, setDivisionId] = useState<DivisionId>('sportswear');
  const [programType, setProgramType] = useState<'OEM Manufacturing' | 'Private Label' | 'Custom Spec'>('OEM Manufacturing');
  const [quantity, setQuantity] = useState('250 – 1,000 units');
  const [brief, setBrief] = useState('');
  const [error, setError] = useState('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  useEffect(() => {
    if (!prefill) return;
    if (prefill.divisionId) setDivisionId(prefill.divisionId);
    if (prefill.productName) {
      const opts = prefill.options?.length ? ` (${prefill.options.join(', ')})` : '';
      setBrief(`Requesting quotation for ${prefill.productName}${opts}.`);
    }
  }, [prefill]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!company.trim() || !contactName.trim()) {
      setError('Please enter your name and company organization.');
      return;
    }
    if (!emailPattern.test(email.trim())) {
      setError('Please enter a valid corporate email address.');
      return;
    }
    setError('');
    const refCode = `BS-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedRef(refCode);
  };

  return (
    <section id="contact" className="bg-white py-20 md:py-28">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left: Export & OEM Positioning */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-10">
          <div>
            <AthleticHeading
              eyebrow="Global Exports & RFQ Desk"
              title="Initiate A Manufacturing Brief"
              className="mb-5"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm md:text-base text-[#0A1628]/70 leading-relaxed max-w-md"
            >
              Submit technical packs, private-label specifications, or sample requests across any of our five production divisions.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-[#0A1628]/10 pt-8 space-y-5 text-sm"
          >
            <div className="grid grid-cols-3 gap-4">
              <span className="text-[#0A1628]/55">Programs</span>
              <span className="col-span-2 text-[#0A1628] font-medium">
                Private Label · OEM · Custom Cut & Sew
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <span className="text-[#0A1628]/55">Sampling</span>
              <span className="col-span-2 font-mono-tabular text-[#0A1628]">
                7–14 Business Days Worldwide
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <span className="text-[#0A1628]/55">Export Desk</span>
              <span className="col-span-2 text-[#0A1628]">
                exports@bigstarindustries.com
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <span className="text-[#0A1628]/55">Compliance</span>
              <span className="col-span-2 font-mono-tabular text-[#0A1628]">
                ISO 9001 · CE EN 17092 · EN ISO 20471
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right: Validated RFQ & Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 bg-[#F7F8FA] border border-[#0A1628]/10 p-6 md:p-10"
        >
          {submittedRef ? (
            <div className="py-10 space-y-5">
              <CheckCircle2 className="w-10 h-10 text-[#C6A253]" strokeWidth={1.5} />
              <h3 className="font-display text-2xl font-medium text-[#0A1628]">
                Quotation inquiry logged.
              </h3>
              <p className="text-sm text-[#0A1628]/70 max-w-lg leading-relaxed">
                Thank you, <span className="font-medium text-[#0A1628]">{contactName}</span>. Your{' '}
                {programType} brief for{' '}
                <span className="font-medium text-[#0A1628]">{company}</span> has been queued under reference{' '}
                <span className="font-mono-tabular font-medium text-[#8C6D2E]">{submittedRef}</span>.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmittedRef(null);
                  setBrief('');
                }}
                className="px-5 py-2.5 bg-[#0A1628] text-white text-xs font-medium rounded-sm hover:bg-[#132642] transition-colors"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="rfq-name" className="block text-xs font-medium text-[#0A1628]/70 mb-1.5">
                    Contact Name
                  </label>
                  <input
                    id="rfq-name"
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Full name"
                    className="w-full bg-white border border-[#0A1628]/20 px-3.5 py-2.5 text-sm text-[#0A1628] rounded-sm focus:outline-none focus:border-[#C6A253]"
                  />
                </div>
                <div>
                  <label htmlFor="rfq-company" className="block text-xs font-medium text-[#0A1628]/70 mb-1.5">
                    Company / Brand
                  </label>
                  <input
                    id="rfq-company"
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Organization name"
                    className="w-full bg-white border border-[#0A1628]/20 px-3.5 py-2.5 text-sm text-[#0A1628] rounded-sm focus:outline-none focus:border-[#C6A253]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="rfq-email" className="block text-xs font-medium text-[#0A1628]/70 mb-1.5">
                    Work Email
                  </label>
                  <input
                    id="rfq-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="procurement@company.com"
                    className="w-full bg-white border border-[#0A1628]/20 px-3.5 py-2.5 text-sm text-[#0A1628] rounded-sm focus:outline-none focus:border-[#C6A253]"
                  />
                </div>
                <div>
                  <label htmlFor="rfq-division" className="block text-xs font-medium text-[#0A1628]/70 mb-1.5">
                    Primary Division
                  </label>
                  <select
                    id="rfq-division"
                    value={divisionId}
                    onChange={(e) => setDivisionId(e.target.value as DivisionId)}
                    className="w-full bg-white border border-[#0A1628]/20 px-3.5 py-2.5 text-sm text-[#0A1628] rounded-sm focus:outline-none focus:border-[#C6A253]"
                  >
                    {DIVISIONS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.number}. {d.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-[#0A1628]/70 mb-1.5">
                    Manufacturing Model
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['OEM Manufacturing', 'Private Label', 'Custom Spec'] as const).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setProgramType(mode)}
                        className={`px-2 py-2 text-xs font-medium rounded-sm border transition-colors whitespace-nowrap truncate ${
                          programType === mode
                            ? 'bg-[#0A1628] text-white border-[#0A1628]'
                            : 'bg-white text-[#0A1628]/75 border-[#0A1628]/20 hover:border-[#0A1628]/45'
                        }`}
                      >
                        {mode === 'OEM Manufacturing' ? 'OEM' : mode}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="rfq-qty" className="block text-xs font-medium text-[#0A1628]/70 mb-1.5">
                    Estimated Order Volume
                  </label>
                  <select
                    id="rfq-qty"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full bg-white border border-[#0A1628]/20 px-3.5 py-2.5 text-sm font-mono-tabular text-[#0A1628] rounded-sm focus:outline-none focus:border-[#C6A253]"
                  >
                    <option>50 – 250 units (Pilot)</option>
                    <option>250 – 1,000 units</option>
                    <option>1,000 – 5,000 units</option>
                    <option>5,000+ units (Container)</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="rfq-brief" className="block text-xs font-medium text-[#0A1628]/70 mb-1.5">
                  Specification & Customization Notes
                </label>
                <textarea
                  id="rfq-brief"
                  rows={3}
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  placeholder="Specify target fabrics, GSM, sizing scale, or branding finishes..."
                  className="w-full bg-white border border-[#0A1628]/20 px-3.5 py-2.5 text-sm text-[#0A1628] rounded-sm focus:outline-none focus:border-[#C6A253]"
                />
              </div>

              {error && (
                <p className="text-xs font-medium text-red-700" role="alert">
                  {error}
                </p>
              )}

              <div className="pt-2 flex items-center justify-between gap-4">
                <span className="text-xs text-[#0A1628]/55">
                  Direct manufacturer response within 24 hours.
                </span>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A1628] text-white text-sm font-medium rounded-sm hover:bg-[#132642] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A253]"
                >
                  <span>Submit RFQ Inquiry</span>
                  <ArrowUpRight className="w-4 h-4 text-[#C6A253]" />
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};
