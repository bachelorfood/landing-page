import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings, Trash2, Edit2, ShieldAlert, Check, 
  X, AlertCircle, RefreshCw, ArrowLeft, Mail, User 
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface SettingsUser {
  id: string;
  name: string;
  username: string;
  email: string;
  avatarSeed: string;
  role: string;
}

const POOL_OF_USERS: SettingsUser[] = [
  { id: '1', name: 'Rohan Sharma', username: 'rohan_sharma', email: 'rohan.sharma@bachelorfood.in', avatarSeed: 'rohan', role: 'Premium Chef' },
  { id: '2', name: 'Anjali Nair', username: 'anjali_nair', email: 'anjali.nair@bachelorfood.in', avatarSeed: 'anjali', role: 'Operations Lead' },
  { id: '3', name: 'Kabir Dev', username: 'kabir_dev', email: 'kabir.d@bachelorfood.in', avatarSeed: 'kabir', role: 'Support Agent' },
  { id: '4', name: 'Meera Iyer', username: 'meera_iyer', email: 'meera.iyer@gmail.com', avatarSeed: 'meera', role: 'Registered Chef' },
  { id: '5', name: 'Siddharth Roy', username: 'sid_roy', email: 'siddharth@gmail.com', avatarSeed: 'sid', role: 'Moderator' },
  { id: '6', name: 'Vikram Singh', username: 'vikram_s', email: 'vikram.singh@bachelorfood.in', avatarSeed: 'vikram', role: 'Chef Auditor' },
  { id: '7', name: 'Priya Patel', username: 'priya_p', email: 'priya.patel@gmail.com', avatarSeed: 'priya', role: 'Regional Manager' },
  { id: '8', name: 'Divya Das', username: 'divya_das', email: 'divya.d@bachelorfood.in', avatarSeed: 'divya', role: 'Quality Analyst' },
  { id: '9', name: 'Aditya Rao', username: 'aditya_rao', email: 'aditya.rao@gmail.com', avatarSeed: 'aditya', role: 'System Admin' },
  { id: '10', name: 'Sneha Reddy', username: 'sneha_r', email: 'sneha.reddy@bachelorfood.in', avatarSeed: 'sneha', role: 'Customer Care' }
];

export default function SettingsPage() {
  const [users, setUsers] = useState<SettingsUser[]>([]);
  const [editingUser, setEditingUser] = useState<SettingsUser | null>(null);
  const [deletingUser, setDeletingUser] = useState<SettingsUser | null>(null);

  // Edit form state
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editErrors, setEditErrors] = useState<{ [key: string]: string }>({});

  // Delete form state
  const [deleteConfirmUsername, setDeleteConfirmUsername] = useState('');
  const [deleteCustomReason, setDeleteCustomReason] = useState('');
  const [deleteError, setDeleteError] = useState('');

  // Select exactly 1 random user on load or refresh click
  const pickRandomUser = () => {
    const shuffled = [...POOL_OF_USERS].sort(() => 0.5 - Math.random());
    setUsers(shuffled.slice(0, 1));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Settings & Account — Bachelor Food";
    pickRandomUser();
  }, []);

  const handleEditOpen = (user: SettingsUser) => {
    setEditingUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditErrors({});
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};
    if (!editName.trim()) errors.name = 'Name is required';
    if (!editEmail.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(editEmail)) {
      errors.email = 'Invalid email address';
    }

    if (Object.keys(errors).length > 0) {
      setEditErrors(errors);
      return;
    }

    setUsers(users.map(u => 
      u.id === editingUser?.id ? { ...u, name: editName, email: editEmail } : u
    ));
    setEditingUser(null);
  };

  const handleDeleteOpen = (user: SettingsUser) => {
    setDeletingUser(user);
    setDeleteConfirmUsername('');
    setDeleteCustomReason('');
    setDeleteError('');
  };

  const handleDeleteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (deleteConfirmUsername !== deletingUser?.username) {
      setDeleteError(`Username does not match. Please enter exactly "${deletingUser?.username}"`);
      return;
    }

    // Remove user from display
    setUsers([]);
    setDeletingUser(null);
  };

  return (
    <div className="bg-bf-cream min-h-screen pt-28 pb-20 text-left">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-2 text-bf-muted hover:text-bf-orange transition-colors text-sm font-semibold">
            <ArrowLeft size={16} /> Back to Landing Page
          </Link>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 border-b border-bf-border-light pb-8">
          <div>
            <div className="t-overline mb-2">Workspace Config</div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-bf-ink font-bold leading-tight">
              Account Settings
            </h1>
            <p className="text-bf-muted text-sm mt-2">
              Showing a randomized user account. Refresh the page or click "Shuffle User" to load a new random user.
            </p>
          </div>
          
          <button 
            onClick={pickRandomUser}
            className="btn btn-outline self-start sm:self-center flex items-center gap-2"
          >
            <RefreshCw size={16} /> Shuffle User
          </button>
        </div>

        {/* User Card Container */}
        <div className="flex justify-center mb-12">
          {users.length > 0 ? (
            users.map((user) => (
              <div key={user.id} className="card p-8 w-full max-w-md flex flex-col justify-between hover:shadow-xl transition-all duration-300">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <img 
                      src={`https://picsum.photos/seed/${user.avatarSeed}/100/100`} 
                      alt={user.name} 
                      className="w-16 h-16 rounded-2xl object-cover border border-bf-border-light shadow-sm"
                    />
                    <div>
                      <h3 className="font-serif text-xl font-bold text-bf-ink">{user.name}</h3>
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-bf-orange bg-bf-orange-tint px-3 py-1 rounded-full border border-bf-orange/15">
                        {user.role}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 border-t border-bf-border-light pt-5 mb-8">
                    <div className="flex items-center gap-2.5 text-sm text-bf-muted">
                      <User size={15} className="text-bf-subtle flex-shrink-0" />
                      <span>Username: <strong className="text-bf-ink">{user.username}</strong></span>
                    </div>
                    <div className="flex items-center gap-2.5 text-sm text-bf-muted">
                      <Mail size={15} className="text-bf-subtle flex-shrink-0" />
                      <span className="truncate">{user.email}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => handleEditOpen(user)}
                    className="flex-1 btn btn-outline justify-center py-3"
                  >
                    <Edit2 size={14} /> Edit Profile
                  </button>
                  <button 
                    onClick={() => handleDeleteOpen(user)}
                    className="flex-1 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 rounded-full text-xs font-bold py-3 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Trash2 size={14} /> Delete Profile
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-bf-muted font-medium mb-4">User account deleted successfully.</p>
              <button onClick={pickRandomUser} className="btn btn-primary">
                Load New Random User
              </button>
            </div>
          )}
        </div>

        {/* ── MODALS ── */}
        <AnimatePresence>
          
          {/* EDIT MODAL */}
          {editingUser && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setEditingUser(null)}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              />
              
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="bg-white rounded-3xl w-full max-w-md p-6 sm:p-8 relative z-10 shadow-2xl border border-bf-border-light text-left"
              >
                <button 
                  onClick={() => setEditingUser(null)}
                  className="absolute top-6 right-6 text-bf-muted hover:text-bf-ink"
                >
                  <X size={20} />
                </button>

                <h2 className="font-serif text-2xl font-bold text-bf-ink mb-6 flex items-center gap-2">
                  <Edit2 className="text-bf-orange" size={20} /> Edit Settings User
                </h2>

                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-bf-muted mb-2">Display Name</label>
                    <input 
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full bg-bf-cream/50 border border-bf-border-light rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-bf-orange text-bf-ink"
                    />
                    {editErrors.name && <p className="text-red-500 text-xs mt-1 font-semibold">{editErrors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-bf-muted mb-2">Email Address</label>
                    <input 
                      type="text"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="w-full bg-bf-cream/50 border border-bf-border-light rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-bf-orange text-bf-ink"
                    />
                    {editErrors.email && <p className="text-red-500 text-xs mt-1 font-semibold">{editErrors.email}</p>}
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-bf-border-light mt-6">
                    <button 
                      type="submit"
                      className="flex-1 btn btn-primary justify-center py-3"
                    >
                      Save Changes
                    </button>
                    <button 
                      type="button"
                      onClick={() => setEditingUser(null)}
                      className="flex-1 btn btn-outline justify-center py-3"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}

          {/* DELETE MODAL */}
          {deletingUser && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setDeletingUser(null)}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              />
              
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="bg-white rounded-3xl w-full max-w-md p-6 sm:p-8 relative z-10 shadow-2xl border border-bf-border-light text-left"
              >
                <button 
                  onClick={() => setDeletingUser(null)}
                  className="absolute top-6 right-6 text-bf-muted hover:text-bf-ink"
                >
                  <X size={20} />
                </button>

                <h2 className="font-serif text-2xl font-bold text-red-600 mb-2 flex items-center gap-2">
                  <ShieldAlert size={24} /> Confirm Account Deletion
                </h2>
                <p className="text-bf-muted text-xs mb-6">
                  You are deleting the randomized user profile for <strong className="text-bf-ink">{deletingUser.name}</strong>.
                </p>

                <form onSubmit={handleDeleteSubmit} className="space-y-5">
                  {/* Enter Username */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-bf-muted mb-2">
                      Enter Username to Confirm (<strong>{deletingUser.username}</strong>)
                    </label>
                    <input 
                      type="text"
                      placeholder={`Type ${deletingUser.username}`}
                      value={deleteConfirmUsername}
                      onChange={(e) => setDeleteConfirmUsername(e.target.value)}
                      className="w-full bg-bf-cream/50 border border-bf-border-light rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-red-500 text-bf-ink"
                      required
                    />
                    {deleteError && (
                      <p className="text-red-500 text-xs mt-1 font-semibold flex items-center gap-1">
                        <AlertCircle size={12} /> {deleteError}
                      </p>
                    )}
                  </div>

                  {/* Reason Text Input */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-bf-muted mb-2">Reason for Deletion</label>
                    <input
                      type="text"
                      value={deleteCustomReason}
                      onChange={(e) => setDeleteCustomReason(e.target.value)}
                      className="w-full bg-bf-cream/50 border border-bf-border-light rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-bf-orange text-bf-ink"
                      placeholder="Why is this account being deleted?"
                      required
                    />
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-bf-border-light mt-6">
                    <button 
                      type="submit"
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-full font-bold text-xs py-3.5 flex items-center justify-center gap-1.5 transition-colors shadow-lg shadow-red-500/10 cursor-pointer"
                    >
                      Confirm Delete
                    </button>
                    <button 
                      type="button"
                      onClick={() => setDeletingUser(null)}
                      className="flex-1 btn btn-outline justify-center py-3.5"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}

        </AnimatePresence>

      </div>
    </div>
  );
}
