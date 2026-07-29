import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, UserPlus, Search, Edit2, Trash2, Shield, 
  Mail, CheckCircle, AlertTriangle, X, Plus, Filter, ArrowLeft 
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Account {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Operations Manager' | 'Compliance Officer' | 'Chef' | 'Customer';
  status: 'Active' | 'Pending' | 'Suspended';
  created: string;
}

const INITIAL_ACCOUNTS: Account[] = [
  {
    id: 'BF-1001',
    name: 'Bachelor Food Support Desk',
    email: 'Support@bachelorfood.in',
    role: 'Super Admin',
    status: 'Active',
    created: '2026-01-10'
  },
  {
    id: 'BF-1002',
    name: 'Renu (Operations)',
    email: 'renu@bachelorfood.in',
    role: 'Operations Manager',
    status: 'Active',
    created: '2026-02-15'
  },
  {
    id: 'BF-1003',
    name: 'Grievance & Complaints Department',
    email: 'Complaint@bachelorfood.in',
    role: 'Compliance Officer',
    status: 'Active',
    created: '2026-02-20'
  },
  {
    id: 'BF-1004',
    name: 'Chef Fatima Begum',
    email: 'fatima@bachelorfood.in',
    role: 'Chef',
    status: 'Active',
    created: '2026-03-01'
  },
  {
    id: 'BF-1005',
    name: 'Chef Selvan Kumar',
    email: 'selvan@bachelorfood.in',
    role: 'Chef',
    status: 'Pending',
    created: '2026-07-28'
  },
  {
    id: 'BF-1006',
    name: 'Amit Patel',
    email: 'amit.patel@gmail.com',
    role: 'Customer',
    status: 'Active',
    created: '2026-06-12'
  },
  {
    id: 'BF-1007',
    name: 'Rajesh Kumar',
    email: 'rajesh.k@outlook.com',
    role: 'Customer',
    status: 'Suspended',
    created: '2026-04-05'
  }
];

export default function AdminAccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>(INITIAL_ACCOUNTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  // Form State
  const [currentAccount, setCurrentAccount] = useState<Partial<Account>>({});
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Account Management — Bachelor Food Admin";
  }, []);

  // Filter accounts
  const filteredAccounts = accounts.filter(acc => {
    const matchesSearch = 
      acc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'All' || acc.role === roleFilter;
    const matchesStatus = statusFilter === 'All' || acc.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!currentAccount.name?.trim()) errors.name = 'Name is required';
    if (!currentAccount.email?.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(currentAccount.email)) {
      errors.email = 'Invalid email address';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newAccount: Account = {
      id: `BF-${Math.floor(1000 + Math.random() * 9000)}`,
      name: currentAccount.name || '',
      email: currentAccount.email || '',
      role: (currentAccount.role as any) || 'Customer',
      status: (currentAccount.status as any) || 'Active',
      created: new Date().toISOString().split('T')[0]
    };

    setAccounts([newAccount, ...accounts]);
    setIsAddOpen(false);
    setCurrentAccount({});
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setAccounts(accounts.map(acc => 
      acc.id === currentAccount.id ? (currentAccount as Account) : acc
    ));
    setIsEditOpen(false);
    setCurrentAccount({});
  };

  const handleDeleteConfirm = () => {
    setAccounts(accounts.filter(acc => acc.id !== currentAccount.id));
    setIsDeleteConfirmOpen(false);
    setCurrentAccount({});
  };

  // Stats calculation
  const totalUsers = accounts.length;
  const activeUsers = accounts.filter(a => a.status === 'Active').length;
  const pendingUsers = accounts.filter(a => a.status === 'Pending').length;
  const suspendedUsers = accounts.filter(a => a.status === 'Suspended').length;

  return (
    <div className="bg-bf-cream min-h-screen pt-28 pb-20 text-left">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Header Back Button */}
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-2 text-bf-muted hover:text-bf-orange transition-colors text-sm font-semibold">
            <ArrowLeft size={16} /> Back to Landing Page
          </Link>
        </div>

        {/* Dashboard Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <div className="t-overline mb-2">Internal Administration</div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-bf-ink font-bold leading-tight">
              Account Management
            </h1>
            <p className="text-bf-muted text-sm mt-2">
              Add, search, edit status, and manage administrative, support, chef, and customer credentials.
            </p>
          </div>
          <button 
            onClick={() => { setCurrentAccount({ role: 'Customer', status: 'Active' }); setFormErrors({}); setIsAddOpen(true); }}
            className="btn btn-primary self-start md:self-center flex items-center gap-2 shadow-lg"
          >
            <UserPlus size={18} /> Add New Account
          </button>
        </div>

        {/* Stats Panels */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Accounts', count: totalUsers, color: 'border-bf-border', text: 'text-bf-ink' },
            { label: 'Active Status', count: activeUsers, color: 'border-bf-green/30 bg-bf-green-tint/30', text: 'text-bf-green' },
            { label: 'Pending Audits', count: pendingUsers, color: 'border-bf-gold/30 bg-bf-gold-tint/50', text: 'text-bf-gold' },
            { label: 'Suspended Accounts', count: suspendedUsers, color: 'border-red-200 bg-red-50/50', text: 'text-red-500' }
          ].map((stat, i) => (
            <div key={i} className={`p-6 rounded-3xl border bg-white ${stat.color} flex flex-col justify-between shadow-sm`}>
              <span className="text-[11px] font-bold uppercase tracking-wider text-bf-muted">{stat.label}</span>
              <span className={`text-3xl font-serif font-extrabold mt-3 ${stat.text}`}>{stat.count}</span>
            </div>
          ))}
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-3xl border border-bf-border-light p-6 mb-8 shadow-sm flex flex-col lg:flex-row gap-4 justify-between items-center">
          
          {/* Search box */}
          <div className="relative w-full lg:max-w-md">
            <span className="absolute inset-y-0 left-4 flex items-center text-bf-subtle">
              <Search size={18} />
            </span>
            <input 
              type="text" 
              placeholder="Search by ID, Name or Email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-bf-cream/50 border border-bf-border-light rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-bf-orange transition-colors text-bf-ink placeholder:text-bf-subtle"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap gap-3 w-full lg:w-auto">
            <div className="flex items-center gap-2 bg-bf-cream/50 border border-bf-border-light rounded-2xl px-3 py-1.5 text-xs text-bf-muted font-bold">
              <Filter size={14} />
              <span>Filters</span>
            </div>
            
            {/* Role Filter */}
            <select 
              value={roleFilter} 
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-white border border-bf-border-light rounded-2xl px-4 py-2.5 text-xs font-semibold text-bf-muted focus:outline-none focus:border-bf-orange"
            >
              <option value="All">All Roles</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Operations Manager">Operations Manager</option>
              <option value="Compliance Officer">Compliance Officer</option>
              <option value="Chef">Chef</option>
              <option value="Customer">Customer</option>
            </select>

            {/* Status Filter */}
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white border border-bf-border-light rounded-2xl px-4 py-2.5 text-xs font-semibold text-bf-muted focus:outline-none focus:border-bf-orange"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>

        {/* Accounts Table Container */}
        <div className="bg-white rounded-3xl border border-bf-border-light shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-bf-cream/50 border-b border-bf-border-light">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-bf-muted">ID</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-bf-muted">Name</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-bf-muted">Email</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-bf-muted">Role</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-bf-muted">Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-bf-muted">Created Date</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-bf-muted text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-bf-border-light">
                {filteredAccounts.length > 0 ? (
                  filteredAccounts.map((acc) => (
                    <tr key={acc.id} className="hover:bg-bf-cream/20 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-bf-ink">{acc.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-bf-ink">{acc.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-bf-muted flex items-center gap-1.5">
                        <Mail size={14} className="text-bf-subtle" />
                        {acc.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-bf-orange-tint text-bf-orange border border-bf-orange/15">
                          <Shield size={12} />
                          {acc.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {acc.status === 'Active' && (
                          <span className="badge badge-green">
                            <CheckCircle size={10} /> Active
                          </span>
                        )}
                        {acc.status === 'Pending' && (
                          <span className="badge badge-gold">
                            <AlertTriangle size={10} /> Pending
                          </span>
                        )}
                        {acc.status === 'Suspended' && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-100">
                            <AlertTriangle size={10} /> Suspended
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-bf-muted">{acc.created}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => { setCurrentAccount(acc); setFormErrors({}); setIsEditOpen(true); }}
                            className="p-2 rounded-xl text-bf-muted hover:text-bf-orange hover:bg-bf-orange-tint/50 transition-colors"
                            title="Edit Account"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            onClick={() => { setCurrentAccount(acc); setIsDeleteConfirmOpen(true); }}
                            className="p-2 rounded-xl text-bf-muted hover:text-red-500 hover:bg-red-50 transition-colors"
                            title="Delete Account"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-bf-muted font-medium">
                      No accounts found matching the search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Corporate Support Contacts Banner */}
        <div className="mt-12 bg-white rounded-3xl border border-bf-border-light p-8 shadow-sm text-left">
          <h3 className="font-serif text-xl font-bold text-bf-ink mb-4">Official Channels</h3>
          <p className="text-bf-muted text-sm mb-6 leading-relaxed max-w-2xl">
            For operational enquiries or system failures, please reach out to the respective administrative inboxes managed above.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { title: "General Support", email: "Support@bachelorfood.in", desc: "Main ticket resolution and user assistance." },
              { title: "Escalations & Admin", email: "renu@bachelorfood.in", desc: "Manager operations and direct escalations." },
              { title: "Grievances", email: "Complaint@bachelorfood.in", desc: "Regulatory complaints and kitchen audits." }
            ].map((contact, i) => (
              <div key={i} className="p-4 rounded-2xl bg-bf-cream/50 border border-bf-border-light text-left">
                <span className="text-xs font-bold text-bf-orange uppercase tracking-wider block mb-1">{contact.title}</span>
                <a href={`mailto:${contact.email}`} className="text-sm font-semibold text-bf-ink hover:text-bf-orange transition-colors block mb-2">{contact.email}</a>
                <p className="text-xs text-bf-muted leading-normal">{contact.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── MODALS ── */}
      <AnimatePresence>
        
        {/* ADD ACCOUNT MODAL */}
        {isAddOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-lg p-6 sm:p-8 relative z-10 shadow-2xl border border-bf-border-light text-left"
            >
              <button 
                onClick={() => setIsAddOpen(false)}
                className="absolute top-6 right-6 text-bf-muted hover:text-bf-ink"
              >
                <X size={20} />
              </button>

              <h2 className="font-serif text-2xl font-bold text-bf-ink mb-6 flex items-center gap-2">
                <UserPlus className="text-bf-orange" /> Add Account
              </h2>

              <form onSubmit={handleAddSubmit} className="space-y-5">
                
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-bf-muted mb-2">Full Name</label>
                  <input 
                    type="text"
                    value={currentAccount.name || ''}
                    onChange={(e) => setCurrentAccount({ ...currentAccount, name: e.target.value })}
                    className="w-full bg-bf-cream/50 border border-bf-border-light rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-bf-orange text-bf-ink"
                    placeholder="Enter full name"
                  />
                  {formErrors.name && <p className="text-red-500 text-xs mt-1 font-semibold">{formErrors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-bf-muted mb-2">Email Address</label>
                  <input 
                    type="text"
                    value={currentAccount.email || ''}
                    onChange={(e) => setCurrentAccount({ ...currentAccount, email: e.target.value })}
                    className="w-full bg-bf-cream/50 border border-bf-border-light rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-bf-orange text-bf-ink"
                    placeholder="Enter email address"
                  />
                  {formErrors.email && <p className="text-red-500 text-xs mt-1 font-semibold">{formErrors.email}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  
                  {/* Role */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-bf-muted mb-2">Role</label>
                    <select
                      value={currentAccount.role || 'Customer'}
                      onChange={(e) => setCurrentAccount({ ...currentAccount, role: e.target.value as any })}
                      className="w-full bg-white border border-bf-border-light rounded-xl py-3 px-3 text-sm focus:outline-none focus:border-bf-orange text-bf-ink"
                    >
                      <option value="Customer">Customer</option>
                      <option value="Chef">Chef</option>
                      <option value="Compliance Officer">Compliance Officer</option>
                      <option value="Operations Manager">Operations Manager</option>
                      <option value="Super Admin">Super Admin</option>
                    </select>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-bf-muted mb-2">Status</label>
                    <select
                      value={currentAccount.status || 'Active'}
                      onChange={(e) => setCurrentAccount({ ...currentAccount, status: e.target.value as any })}
                      className="w-full bg-white border border-bf-border-light rounded-xl py-3 px-3 text-sm focus:outline-none focus:border-bf-orange text-bf-ink"
                    >
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Suspended">Suspended</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-bf-border-light mt-6">
                  <button 
                    type="submit" 
                    className="flex-1 btn btn-primary justify-center py-3.5"
                  >
                    Add Account
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsAddOpen(false)}
                    className="flex-1 btn btn-outline justify-center py-3.5"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* EDIT ACCOUNT MODAL */}
        {isEditOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-lg p-6 sm:p-8 relative z-10 shadow-2xl border border-bf-border-light text-left"
            >
              <button 
                onClick={() => setIsEditOpen(false)}
                className="absolute top-6 right-6 text-bf-muted hover:text-bf-ink"
              >
                <X size={20} />
              </button>

              <h2 className="font-serif text-2xl font-bold text-bf-ink mb-6 flex items-center gap-2">
                <Edit2 className="text-bf-orange" size={22} /> Edit Account ({currentAccount.id})
              </h2>

              <form onSubmit={handleEditSubmit} className="space-y-5">
                
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-bf-muted mb-2">Full Name</label>
                  <input 
                    type="text"
                    value={currentAccount.name || ''}
                    onChange={(e) => setCurrentAccount({ ...currentAccount, name: e.target.value })}
                    className="w-full bg-bf-cream/50 border border-bf-border-light rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-bf-orange text-bf-ink"
                  />
                  {formErrors.name && <p className="text-red-500 text-xs mt-1 font-semibold">{formErrors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-bf-muted mb-2">Email Address</label>
                  <input 
                    type="text"
                    value={currentAccount.email || ''}
                    onChange={(e) => setCurrentAccount({ ...currentAccount, email: e.target.value })}
                    className="w-full bg-bf-cream/50 border border-bf-border-light rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-bf-orange text-bf-ink"
                  />
                  {formErrors.email && <p className="text-red-500 text-xs mt-1 font-semibold">{formErrors.email}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  
                  {/* Role */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-bf-muted mb-2">Role</label>
                    <select
                      value={currentAccount.role || 'Customer'}
                      onChange={(e) => setCurrentAccount({ ...currentAccount, role: e.target.value as any })}
                      className="w-full bg-white border border-bf-border-light rounded-xl py-3 px-3 text-sm focus:outline-none focus:border-bf-orange text-bf-ink"
                    >
                      <option value="Customer">Customer</option>
                      <option value="Chef">Chef</option>
                      <option value="Compliance Officer">Compliance Officer</option>
                      <option value="Operations Manager">Operations Manager</option>
                      <option value="Super Admin">Super Admin</option>
                    </select>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-bf-muted mb-2">Status</label>
                    <select
                      value={currentAccount.status || 'Active'}
                      onChange={(e) => setCurrentAccount({ ...currentAccount, status: e.target.value as any })}
                      className="w-full bg-white border border-bf-border-light rounded-xl py-3 px-3 text-sm focus:outline-none focus:border-bf-orange text-bf-ink"
                    >
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Suspended">Suspended</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-bf-border-light mt-6">
                  <button 
                    type="submit" 
                    className="flex-1 btn btn-primary justify-center py-3.5"
                  >
                    Save Changes
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsEditOpen(false)}
                    className="flex-1 btn btn-outline justify-center py-3.5"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* DELETE CONFIRMATION MODAL */}
        {isDeleteConfirmOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDeleteConfirmOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-md p-6 sm:p-8 relative z-10 shadow-2xl border border-bf-border-light text-center"
            >
              <div className="w-14 h-14 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-4 border border-red-100">
                <Trash2 size={24} />
              </div>

              <h2 className="font-serif text-2xl font-bold text-bf-ink mb-2">Delete Account</h2>
              <p className="text-bf-muted text-sm mb-6 leading-relaxed">
                Are you sure you want to delete the account for <strong className="text-bf-ink">{currentAccount.name}</strong> ({currentAccount.email})? This action cannot be undone.
              </p>

              <div className="flex gap-3">
                <button 
                  onClick={handleDeleteConfirm}
                  className="flex-1 btn bg-red-500 hover:bg-red-600 text-white justify-center py-3.5 font-bold shadow-lg shadow-red-500/10"
                >
                  Delete Account
                </button>
                <button 
                  onClick={() => setIsDeleteConfirmOpen(false)}
                  className="flex-1 btn btn-outline justify-center py-3.5"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}

      </AnimatePresence>

    </div>
  );
}
