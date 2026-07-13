import { ChefHat, Instagram, Twitter, Facebook, Youtube, ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

/* Bachelor Food SVG logo for footer */
function BFLogoSmall() {
  return (
    <svg width="36" height="36" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="13" fill="#F4601A"/>
      <path d="M15 13H36C42.627 13 48 18.373 48 25C48 28.314 46.657 31.314 44.485 33.5C46.657 35.686 48 38.686 48 42C48 48.627 42.627 54 36 54H15V13Z" fill="white"/>
      <rect x="22" y="20" width="16" height="12" rx="6" fill="#F4601A"/>
      <rect x="22" y="34" width="17" height="13" rx="6.5" fill="#F4601A"/>
      <ellipse cx="33" cy="40.5" rx="7.5" ry="2" fill="white"/>
      <path d="M25.5 40.5 C25.5 35.5 29 32 33 32 C37 32 40.5 35.5 40.5 40.5" fill="white"/>
      <circle cx="33" cy="31.5" r="1.5" fill="#F4601A"/>
    </svg>
  );
}

const LINKS = {
  Company:  [['About Us','#'],['Our Mission','#'],['Press & Media','#'],['Careers','#'],['Blog','#']],
  Services: [['Order Food','#menu'],['Our Chefs','/chefs'],['Party Orders','#'],['Corporate Meals','#'],['Gift Cards','#']],
  'Join Us':[['Become a Chef','#'],['Delivery Partner','#'],['Franchise','#'],['Affiliate Program','#']],
  Support:  [['Help Center','#'],['Track Order','#'],['Refund Policy','/terms#refunds'],['Privacy Policy','/terms#privacy'],['Terms & Conditions','/terms']],
};
const SOCIALS = [
  { Icon: Instagram, label:'Instagram', href:'#' },
  { Icon: Twitter,   label:'Twitter',   href:'#' },
  { Icon: Facebook,  label:'Facebook',  href:'#' },
  { Icon: Youtube,   label:'YouTube',   href:'#' },
];
const CITIES = ['Bangalore','Chennai','Hyderabad','Mumbai','Delhi','Coimbatore','Kochi','Pune','Trichy','Madurai'];

export default function Footer() {
  return (
    <footer className="bg-bf-ink text-white">
      {/* Newsletter */}
      <div className="border-b border-white/8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-serif text-xl font-bold mb-1">Get Bachelor Food in your inbox</h4>
            <p className="text-white/45 text-sm">Weekly recipes, chef stories & exclusive offers.</p>
          </div>
          <form onSubmit={e=>e.preventDefault()} className="flex gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-72">
              <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input type="email" placeholder="you@example.com"
                className="w-full bg-white/8 border border-white/12 rounded-full pl-11 pr-5 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-bf-orange/60 transition-colors" />
            </div>
            <button type="submit" className="btn btn-primary btn-lg shrink-0">
              Subscribe <ArrowRight size={13} />
            </button>
          </form>
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 w-fit">
              <BFLogoSmall />
              <div>
                <span className="block font-serif text-lg font-bold leading-none">Bachelor Food</span>
                <span className="block text-[10px] font-semibold text-white/35 tracking-[0.15em] uppercase mt-1">Home Kitchen</span>
              </div>
            </Link>
            <p className="text-white/38 text-sm leading-relaxed mb-6 max-w-[220px]">
              India's most loved home-cooked food platform. Real chefs, real flavours, delivered with care.
            </p>
            <div className="flex gap-2.5">
              {SOCIALS.map(({ Icon, label, href }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/6 border border-white/8 flex items-center justify-center text-white/38 hover:bg-bf-orange/20 hover:text-bf-orange hover:border-bf-orange/30 transition-all">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([cat, links]) => (
            <div key={cat}>
              <h5 className="text-white text-sm font-semibold mb-5">{cat}</h5>
              <ul className="space-y-3">
                {links.map(([label, href]) => (
                  <li key={label}>
                    {href.startsWith('/') ? (
                      <Link to={href} className="text-white/35 hover:text-white/65 text-sm transition-colors">{label}</Link>
                    ) : (
                      <a href={href} className="text-white/35 hover:text-white/65 text-sm transition-colors">{label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Cities */}
        <div className="mt-14 pt-8 border-t border-white/8">
          <p className="text-white/22 text-[11px] font-bold uppercase tracking-widest mb-4">Available In</p>
          <div className="flex flex-wrap gap-2">
            {CITIES.map(c => (
              <span key={c} className="text-white/32 text-xs px-3 py-1.5 rounded-full border border-white/8 hover:border-bf-orange/40 hover:text-white/55 cursor-pointer transition-all">{c}</span>
            ))}
            <span className="text-bf-orange text-xs px-3 py-1.5 rounded-full border border-bf-orange/25 cursor-pointer hover:bg-bf-orange/10 transition-all">+ 14 more cities</span>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/22 text-xs">
          <p>© {new Date().getFullYear()} Bachelor Food Home Kitchen Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/terms#privacy" className="hover:text-white/50 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white/50 transition-colors">Terms</Link>
            <Link to="/terms#privacy" className="hover:text-white/50 transition-colors">Cookies</Link>
          </div>
          <p>Made with care in India</p>
        </div>
      </div>
    </footer>
  );
}
