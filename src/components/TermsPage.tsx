import { useEffect, useState } from 'react';
import { ShieldAlert, Printer, Search, Download, ArrowRight, BookOpen, Clock, FileText } from 'lucide-react';

interface TermSection {
  id: string;
  title: string;
  content: string[];
}

const SECTIONS: TermSection[] = [
  {
    id: 'intro',
    title: 'Electronic Record Notice',
    content: [
      'This document constitutes an electronic record pursuant to the Information Technology Act, 2000 and its applicable rules, including all amendments concerning electronic records incorporated in relevant statutes. It is published in compliance with Rule 3(1) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, which mandate the publication of rules, regulations, privacy policy, and Terms of Use for users accessing or utilizing the Bachelor Food website and mobile application.',
      'The following Terms of Use ("Terms") set forth the conditions governing your access and utilization of the Bachelor Food website (the "Website") and the Bachelor Food mobile application (the "App"). Collectively, these services are referred to as the "Platform."',
      'We urge you to review these Terms thoroughly prior to engaging with any services on the Platform. Should you disagree with any portion of these Terms, you are expressly advised to refrain from accessing or using the Platform, and to uninstall the App from your device.',
      'Your act of accessing, installing, downloading, registering for, or otherwise utilizing the Platform signifies your understanding and acceptance of these Terms, as well as all associated policies published on the Platform—including, but not limited to, the Privacy Policy, Cancellation & Refund Policy, and any additional policies as amended periodically. Continued use of the Platform establishes a binding legal agreement between you and Bachelor Food.',
      'The Platform is owned and managed by Infixhi Tech Innovations Private Limited, a private limited company duly incorporated under the Companies Act, 2013, with its registered office located at Karaikudi, Tamil Nadu.'
    ]
  },
  {
    id: 'definitions',
    title: 'Section 1: Definitions',
    content: [
      '“Agreement” includes these terms, our privacy policy, any order documents, and payment guidelines provided to you;',
      '“Privacy policy” means the documentation found on our platform that details the collection and storage of your personal information;',
      '“You,” “Your,” “Yours,” “User,” or “Customer” shall mean any natural or legal person who accesses, registers, subscribes to, purchases from, or otherwise uses the Platform;',
      '“We”, “Us”, “Our”, “Bachelor Food” signify Infixhi Tech Innovations Private Limited and its Platform;',
      '“Goods” means all products, including prepared meals and subscription tiffin packages, listed for sale on our website or mobile app;',
      '“Service” or “Services” relates to any offering we provide that you request from Bachelor Food;',
      '“Food delivery” covers perishable items and all forms of delivery services;',
      '“Website” and “App” point to our online site or mobile application where goods and services can be accessed;',
      '“Month” is defined as a 30-day interval, independent of the calendar month’s length.'
    ]
  },
  {
    id: 'privacy',
    title: 'Section 2: Privacy & Data Policy',
    content: [
      'By using our platform, we might gather information like your IP address, contact info, email, preferences, interests, and online activity data.',
      'We collect your information to better grasp your requirements, improve offerings, send you promotions, perform market research, and tailor your experience on our platform.',
      'We commit to securing your data and preventing unauthorized access or leaks by employing advanced technology and security measures.',
      'Through our Cookie Policy, we analyse site traffic and adjust the platform to your browsing habits. Cookies are strictly used to improve your experience.'
    ]
  },
  {
    id: 'ordering',
    title: 'Section 3: Ordering Guidelines',
    content: [
      'All arrangements for goods and services via this site or app are between you and Bachelor Food. You are required to give full and correct details when placing orders.',
      'You assert the payment instrument belongs to you, and enough balance is available to complete your order.',
      'Items and services bought from our website or app are meant solely for your individual use and not for resale purposes.',
      'You might be asked to supply an email and password during ordering. Safeguarding your account credentials is your responsibility.',
      'We implement reasonable security precautions for your order and payment data, but we cannot be held responsible for unauthorized third-party access beyond our control.',
      'Every order depends on product availability, delivery capabilities, and Bachelor Food’s approval.',
      'Should a product be out of stock or delivery not possible to your address, we might reach out via phone, text, or email.'
    ]
  },
  {
    id: 'pricing',
    title: 'Section 4: Pricing & Payment',
    content: [
      'The prices shown on our site or app are correct when published. We reserve the option to update menus, pricing, or delivery fees at any point.',
      'At checkout, you will see the full price, inclusive of any taxes due.',
      'You must pay in full for your online order by using approved payment options like debit/credit cards, bank transfer, UPI, or other supported channels.',
      'When opting for online payment, you must complete the transaction before we deliver your order.'
    ]
  },
  {
    id: 'delivery',
    title: 'Section 5: Delivery Service',
    content: [
      'Delivery times are given as estimates and may shift due to factors like traffic, weather, or other conditions beyond our control.',
      'Orders will be delivered to the address you provide at checkout, either by our team or by external delivery partners.',
      'If delivery is refused or you are unable to pickup at your end, the responsibility and risk for the order transfer to you.',
      'It’s your duty to ensure proper access and arrangements are in place so delivery can proceed smoothly.',
      'While we strive for punctual delivery, we are not liable for any expenses or losses that result from late deliveries.',
      'If your address is not serviceable, we may cancel your order or suggest an alternative delivery point.'
    ]
  },
  {
    id: 'refunds',
    title: 'Section 6: Cancellation & Refund Policy',
    content: [
      'Weekly and monthly subscribers can cancel their order at any time and are encouraged to do so via phone or the Bachelor Food mobile app.',
      'Daily plans refunds: A full refund will be issued for cancellations made at least four hours prior to the first meal delivery. If the cancellation is done after this period, 80% of the subscription fee will be credited to the subscriber’s bank account or credited to the original payment method.',
      'Weekly schedules refunds: If you cancel at least four hours before the first meal delivery, you will receive a full refund. If the cancellation is made after this period, an 80% refund of the subscription fee will be given. For cancellations after some meals have been delivered, but at least 4 hours before the next scheduled meal, you will receive an 80% refund of the value of the remaining meals.',
      'Monthly subscriptions refunds: If you cancel at least four hours before the first meal delivery, you will receive a full refund. If the cancellation is made after this period, an 80% refund of the subscription fee will be given. For monthly plans, cancellation after some meals have been delivered but at least four hours before the next scheduled meal will result in 80% of the value of remaining meals being refunded.',
      'Order cancellation by Bachelor Food: Bachelor Food reserves the right to cancel the order in the event of unavailability of product due to reasons beyond the control of the company. Subscribers will be informed and any payments made will be refunded.',
      'Refund Processing: If the above cancellation requirements are met, the refund or re-credit will be processed to the debit or credit card within 14 days.'
    ]
  },
  {
    id: 'information',
    title: 'Section 7: Information Usage',
    content: [
      'You must supply correct and complete details whenever information is requested for delivery.',
      'You permit Bachelor Food to collect, store, and use your personal data for delivery, marketing, customer service, and these details are saved and verified while making credit or payment with the order.',
      'Your personal data may be disclosed to third parties as required by law or to facilitate delivery services.'
    ]
  },
  {
    id: 'health',
    title: 'Section 8: Health & Allergy Disclaimer',
    content: [
      'Health & Dietary Intermediary role: Bachelor Food serves only as an intermediary, linking users to independent food providers. Bachelor Food is not responsible for any allergic responses, sensitivities, or health issues that may result from consuming the meals.',
      'Allergen Advice: Meals may include typical allergens like nuts, dairy, gluten, eggs, soy, or similar components. We are unable to assure that any meal is entirely free from allergens. Individuals with allergies or intolerances should exercise appropriate caution and responsibility when eating these meals.',
      'Medical Consultation: Meal plans are created for standard dietary needs and are not meant for diagnosing, treating, or curing health conditions. Anyone with medical conditions or special dietary restrictions should seek advice from a qualified dietitian or healthcare provider before subscribing. Eating the meals is solely at your own risk.'
    ]
  },
  {
    id: 'complaints',
    title: 'Section 9: Customer Support & Complaints',
    content: [
      'Bachelor Food treats all complaints with importance and strives to resolve customer issues within five business days.',
      'You can submit complaints to: info.bachelorfood@gmail.com',
      'Alternatively, you may reach Customer Support at: +91 8000007100'
    ]
  },
  {
    id: 'schedule',
    title: 'Section 10: Subscription Delivery Schedule',
    content: [
      'All subscription plans at Bachelor Food treat Sunday as a standard day with no deliveries.',
      'Weekly subscriptions provide deliveries six days each week, with Sundays excluded.',
      'Monthly plans consist of 24 delivery days, arranged as six deliveries per week over four weeks, not counting Sundays.',
      'There is no delivery, compensation, refund, extension, replacement, or carry forward for Sundays or any other announced non-delivery dates.'
    ]
  },
  {
    id: 'liability',
    title: 'Section 11: Limitation of Liability',
    content: [
      'Bachelor Food try hard to provide information on its website and app that is both correct and free of mistakes.',
      'We cannot promise that the platform will always function seamlessly or be free from interruptions, errors, viruses, or malfunctions.',
      'By using our service, you accept that Bachelor Food bears no responsibility for content from third parties, external sites or apps, or for any food or drinks purchased via our platform.',
      'Our responsibility is capped at the amount you paid for the specific order or service in question.',
      'Bachelor Food will not be held liable for indirect losses, consequential damages, lost income or profits, data loss, or any property damage resulting from use of the platform or its services.',
      'This restriction does not extend to cases of personal injury or death that are a direct result of our established negligence.',
      'Bachelor Food cannot be held accountable for any delays or failures due to circumstances outside our reasonable control, such as natural disasters, warfare, riots, government orders, or third-party actions.',
      'We may deny service, suspend user accounts, or block access if there is evidence of fraud, voucher misuse, abuse of discount codes, or other suspicious conduct.',
      'Should widespread concerns about food quality arise, Bachelor Food will examine user feedback and implement corrective measures as needed.'
    ]
  },
  {
    id: 'general',
    title: 'Section 12: General Provisions',
    content: [
      'Prices are listed in INR and include all relevant taxes unless specified otherwise.',
      'Bachelor Food can delegate or assign portions of its services without giving advance notice.',
      'We may modify or revise these Terms and Conditions at any time without prior warning.',
      'Payment is required via authorized payment options when you place your order.',
      'Orders may be cancelled if payment is not finalized.',
      'Platform misuse by users is strictly prohibited, including: operating automated tools or bots to order; harvesting personal data or third person\'s data; engaging in scraping or hacking; abusing vouchers, promotional offers, or discount codes.',
      'Registered users may get promotional messages, emails, notifications, and updates about offers and services from Bachelor Food.',
      'The Terms and Conditions, along with the Privacy Policy, form the entire agreement between Bachelor Food and the user.',
      'If any section of these Terms and Conditions is deemed unenforceable or invalid, the rest will remain in effect.',
      'These Terms and Conditions are governed by and interpreted under the laws of India. Both parties agree to the jurisdiction of Indian courts.',
      'All communications, correspondence, and transactions will be carried out in English.'
    ]
  }
];

export default function TermsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('intro');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Terms & Conditions — Bachelor Food";

    // Set SEO metadata
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Terms and Conditions and Privacy Policy for using the Bachelor Food platform. Play Store compliant intermediary rules and subscription refund policies.');
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const filteredSections = SECTIONS.filter(section => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      section.title.toLowerCase().includes(q) ||
      section.content.some(paragraph => paragraph.toLowerCase().includes(q))
    );
  });

  return (
    <div className="bg-bf-cream min-h-screen pt-28 pb-20 print:bg-white print:pt-0">
      
      {/* HEADER banner */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-12 print:mb-6 text-left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-bf-border-light">
          <div>
            <div className="flex items-center gap-2 text-bf-orange font-bold text-xs uppercase tracking-wider mb-3">
              <BookOpen size={14} /> Legal Documentation
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-bf-ink mb-3">
              Terms & Conditions
            </h1>
            <p className="text-bf-muted text-sm sm:text-base">
              Last Updated: July 13, 2026 · Play Store & IT Act Intermediary Compliance
            </p>
          </div>
          
          <div className="flex gap-3 shrink-0 print:hidden">
            <button 
              onClick={handlePrint}
              className="btn btn-outline btn-sm inline-flex items-center gap-2 bg-white"
            >
              <Printer size={15} /> Print Document
            </button>
            <a 
              href="mailto:info.bachelorfood@gmail.com"
              className="btn btn-primary btn-sm inline-flex items-center gap-2"
            >
              Contact Support <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </div>

      {/* CORE CONTAINER */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[240px_1fr] gap-10 items-start">
        
        {/* SIDEBAR NAVIGATION (hidden on print) */}
        <aside className="sticky top-24 print:hidden hidden lg:block text-left bg-white border border-bf-border-light rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-bold text-bf-muted uppercase tracking-wider mb-4 px-2">Sections</p>
          <nav className="flex flex-col gap-1">
            {SECTIONS.map(s => (
              <button
                key={s.id}
                onClick={() => {
                  setActiveSection(s.id);
                  const el = document.getElementById(s.id);
                  if (el) {
                    const yOffset = -90;
                    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    (window as any).lenis?.scrollTo(y, { duration: 1 });
                  }
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeSection === s.id
                    ? 'bg-bf-orange-tint text-bf-orange font-bold'
                    : 'text-bf-muted hover:text-bf-ink hover:bg-bf-sand'
                }`}
              >
                {s.title.replace('Section ', '')}
              </button>
            ))}
          </nav>
        </aside>

        {/* MAIN TEXT */}
        <div className="text-left">
          
          {/* SEARCH BAR (hidden on print) */}
          <div className="relative mb-8 print:hidden">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-bf-subtle" size={18} />
            <input
              type="text"
              placeholder="Search sections or keywords..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-bf-border-light rounded-2xl pl-12 pr-4 py-3.5 text-sm text-bf-ink placeholder-bf-subtle shadow-sm focus:outline-none focus:border-bf-orange transition-colors"
            />
          </div>

          {/* COMPLIANCE ALERT CALLOUT */}
          <div className="bg-bf-green-tint border border-bf-green/15 rounded-2xl p-5 mb-8 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 text-bf-green shadow-sm">
              <FileText size={18} />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-bf-ink mb-1">Play Store Intermediary Compliant</h4>
              <p className="text-bf-muted text-xs leading-relaxed">
                This document constitutes a binding intermediary agreement under Rule 3(1) of the IT (Intermediary Guidelines) Rules, 2021. It defines refund frameworks (Section 6) and food health disclaimers (Section 8) required for app stores publication.
              </p>
            </div>
          </div>

          {/* DOCUMENT BODY */}
          <div className="bg-white border border-bf-border-light rounded-3xl p-6 sm:p-10 shadow-sm print:border-none print:shadow-none print:p-0">
            {filteredSections.length > 0 ? (
              <div className="flex flex-col gap-10">
                {filteredSections.map(section => (
                  <div 
                    key={section.id} 
                    id={section.id} 
                    className="scroll-mt-24 border-b border-bf-border-light pb-8 last:border-b-0 last:pb-0"
                  >
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-bf-ink mb-5">
                      {section.title}
                    </h2>
                    
                    <div className="flex flex-col gap-4">
                      {section.content.map((paragraph, index) => (
                        <p 
                          key={index} 
                          className="text-bf-muted text-sm sm:text-base leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: paragraph
                              .replace(
                                /(“[^”]+”|"[^"]+")/g,
                                '<span class="font-semibold text-bf-ink">$1</span>'
                              )
                              .replace(
                                /(Section \d+|Rule 3\(1\)|Information Technology Act, 2000)/g,
                                '<span class="font-semibold text-bf-ink">$1</span>'
                              )
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <ShieldAlert className="mx-auto text-bf-subtle mb-4" size={36} />
                <p className="font-serif text-lg font-bold text-bf-ink mb-1">No matches found</p>
                <p className="text-bf-muted text-sm">Try searching for other terms like "refund", "delivery", or "allergy".</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
