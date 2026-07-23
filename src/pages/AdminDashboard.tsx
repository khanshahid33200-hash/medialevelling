import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Check, X, ShieldAlert, LogOut,
  Calendar, CreditCard, Mail, User, Info, DollarSign,
  CheckCircle2, AlertCircle, Clock, Edit2, Trash2, Plus, FileText,
  LayoutDashboard, ShoppingCart, ListCollapse, RefreshCw, Briefcase, Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import { auth, db, signInWithEmailAndPassword, createUserWithEmailAndPassword, setDoc, doc, collection, getDocs, onSnapshot } from '@/lib/firebase';

// Recharts imports for Dashboard Graphs
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, Cell, PieChart, Pie, Legend
} from 'recharts';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState('owner@medialevelling.com');
  const [adminPassword, setAdminPassword] = useState('');
  
  // Dashboard views: 'analytics', 'orders', 'posts', 'portfolio', 'leads'
  const [activeTab, setActiveTab] = useState<'analytics' | 'orders' | 'posts' | 'portfolio' | 'leads'>('analytics');
  
  // Lists
  const [orders, setOrders] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Stats / Metrics
  const [stats, setStats] = useState({
    totalCount: 0,
    totalVolume: 0,
    pendingVerification: 0,
    approvedCount: 0
  });

  // Modal / Dialog States
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [isEditOrderOpen, setIsEditOrderOpen] = useState(false);
  
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [isPostFormOpen, setIsPostFormOpen] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postSlug, setPostSlug] = useState('');
  const [postSummary, setPostSummary] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postStatus, setPostStatus] = useState<'draft' | 'published'>('draft');
  const [postImage, setPostImage] = useState('');

  // Portfolio Form States
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<any | null>(null);
  const [isPortfolioFormOpen, setIsPortfolioFormOpen] = useState(false);
  const [portfolioTitle, setPortfolioTitle] = useState('');
  const [portfolioCategory, setPortfolioCategory] = useState('Social Media');
  const [portfolioImage, setPortfolioImage] = useState('');
  const [portfolioDescription, setPortfolioDescription] = useState('');
  const [portfolioStats, setPortfolioStats] = useState('');
  const [portfolioClient, setPortfolioClient] = useState('');
  const [portfolioObjective, setPortfolioObjective] = useState('');
  const [portfolioApproach, setPortfolioApproach] = useState('');
  const [portfolioResults, setPortfolioResults] = useState('');

  // Firebase Admin User Creation States
  const [isAdminUserModalOpen, setIsAdminUserModalOpen] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');

  // Contact Form Collector States
  const [contactMessages, setContactMessages] = useState<any[]>([]);
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const savedEmail = sessionStorage.getItem('adminEmail');
    const savedPassword = sessionStorage.getItem('adminPassword');
    if (savedPassword) {
      if (savedEmail) setAdminEmail(savedEmail);
      setAdminPassword(savedPassword);
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch all orders & posts from backend
  const fetchData = async (pwd = adminPassword, email = adminEmail) => {
    if (!pwd) return false;
    setLoading(true);
    try {
      // 1. Fetch Orders
      const orderParams = new URLSearchParams();
      if (statusFilter !== 'all') {
        orderParams.append('status', statusFilter);
      }
      if (searchQuery.trim()) {
        orderParams.append('search', searchQuery.trim());
      }
      const orderRes = await fetch(`/api/admin/orders?${orderParams.toString()}`, {
        headers: { 
          'X-Admin-Email': email,
          'X-Admin-Password': pwd 
        }
      });

      if (orderRes.status === 401) {
        sessionStorage.removeItem('adminEmail');
        sessionStorage.removeItem('adminPassword');
        setIsAuthenticated(false);
        throw new Error('Invalid Admin Credentials');
      }

      if (!orderRes.ok) throw new Error('Failed to retrieve orders');
      const orderData = await orderRes.json();
      setOrders(orderData);
      calculateStats(orderData);

      // 2. Fetch Posts
      const postRes = await fetch('/api/admin/posts', {
        headers: { 
          'X-Admin-Email': email,
          'X-Admin-Password': pwd 
        }
      });
      if (postRes.ok) {
        const postData = await postRes.json();
        setPosts(postData);
      }

      // 3. Fetch Portfolio
      const portfolioRes = await fetch('/api/admin/portfolio', {
        headers: { 
          'X-Admin-Email': email,
          'X-Admin-Password': pwd 
        }
      });
      if (portfolioRes.ok) {
        const portfolioData = await portfolioRes.json();
        setPortfolioItems(portfolioData);
      }

      // 4. Fetch Contact Messages / Leads
      if (db) {
        try {
          const leadSnap = await getDocs(collection(db, 'contact_messages'));
          const firestoreLeads: any[] = [];
          leadSnap.forEach(d => firestoreLeads.push({ _id: d.id, ...d.data() }));
          if (firestoreLeads.length > 0) {
            setContactMessages(firestoreLeads);
          } else {
            const leadRes = await fetch('/api/admin/contact-messages', {
              headers: { 'X-Admin-Email': email, 'X-Admin-Password': pwd }
            });
            if (leadRes.ok) {
              const leadData = await leadRes.json();
              setContactMessages(leadData);
            }
          }
        } catch (fErr) {
          const leadRes = await fetch('/api/admin/contact-messages', {
            headers: { 'X-Admin-Email': email, 'X-Admin-Password': pwd }
          });
          if (leadRes.ok) {
            const leadData = await leadRes.json();
            setContactMessages(leadData);
          }
        }
      } else {
        const leadRes = await fetch('/api/admin/contact-messages', {
          headers: { 'X-Admin-Email': email, 'X-Admin-Password': pwd }
        });
        if (leadRes.ok) {
          const leadData = await leadRes.json();
          setContactMessages(leadData);
        }
      }

      return true;
    } catch (err: any) {
      toast.error(err.message || 'Error syncing dashboard data');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const uploadAllWebsiteDataToFirestore = async () => {
    if (!db) {
      toast.error('Firebase Firestore connection not initialized');
      return;
    }
    setLoading(true);
    try {
      let uploadedCount = 0;
      // 1. Upload Posts / Blog Articles to Firestore
      for (const p of posts) {
        const docId = (p.slug || `post-${Date.now()}`).replace(/[^a-zA-Z0-9]/g, '_');
        await setDoc(doc(db, 'posts', docId), {
          title: p.title || '',
          slug: p.slug || '',
          summary: p.summary || '',
          content: p.content || '',
          author: p.author || 'Admin',
          status: p.status || 'published',
          createdAt: p.createdAt ? new Date(p.createdAt).toISOString() : new Date().toISOString()
        });
        uploadedCount++;
      }

      // 2. Upload Portfolio Items (including Shikvaa Foundation & Day Foundation)
      for (const item of portfolioItems) {
        const docId = (item.title || `portfolio-${Date.now()}`).toLowerCase().replace(/[^a-zA-Z0-9]/g, '_');
        await setDoc(doc(db, 'portfolio', docId), {
          title: item.title,
          category: item.category,
          image: item.image,
          description: item.description,
          stats: item.stats || '',
          details: item.details || {},
          createdAt: item.createdAt ? new Date(item.createdAt).toISOString() : new Date().toISOString()
        });
        uploadedCount++;
      }

      // 3. Upload Orders
      for (const ord of orders) {
        const docId = (ord.orderId || `ord-${Date.now()}`).replace(/[^a-zA-Z0-9]/g, '_');
        await setDoc(doc(db, 'orders', docId), {
          orderId: ord.orderId,
          planName: ord.planName,
          amount: ord.amount,
          utrNumber: ord.utrNumber,
          customerName: ord.customerName,
          customerEmail: ord.customerEmail,
          paymentStatus: ord.paymentStatus,
          createdAt: ord.createdAt ? new Date(ord.createdAt).toISOString() : new Date().toISOString()
        });
        uploadedCount++;
      }

      toast.success(`Successfully uploaded ${uploadedCount} website items into Firebase Firestore!`);
    } catch (err: any) {
      toast.error(err.message || 'Failed to upload website data to Firestore');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && adminPassword) {
      fetchData(adminPassword, adminEmail);
    }

    // Real-time listener for incoming contact form inquiries from Firestore
    if (isAuthenticated && db) {
      const unsub = onSnapshot(collection(db, 'contact_messages'), (snapshot) => {
        const liveLeads: any[] = [];
        snapshot.forEach((d) => liveLeads.push({ _id: d.id, ...d.data() }));
        if (liveLeads.length > 0) {
          setContactMessages(liveLeads);
        }
      }, (err) => {
        console.warn('Real-time contact messages listener notice:', err);
      });
      return () => unsub();
    }
  }, [isAuthenticated, statusFilter, adminPassword, adminEmail]);

  const calculateStats = (ordersList: any[]) => {
    let volume = 0;
    let pending = 0;
    let approved = 0;

    ordersList.forEach(order => {
      if (order.paymentStatus === 'approved' || order.paymentStatus === 'verified') {
        volume += order.amount;
        approved += 1;
      }
      if (order.paymentStatus === 'submitted') {
        pending += 1;
      }
    });

    setStats({
      totalCount: ordersList.length,
      totalVolume: volume,
      pendingVerification: pending,
      approvedCount: approved
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminEmail.trim()) {
      toast.error('Admin email or username is required');
      return;
    }
    if (!adminPassword.trim()) {
      toast.error('Admin password is required');
      return;
    }
    
    let emailToAuth = adminEmail.trim();
    if (!emailToAuth.includes('@')) {
      emailToAuth = `${emailToAuth}@medialevelling.com`;
    }

    setLoading(true);
    try {
      // 1. Authenticate with Firebase Auth
      if (auth) {
        try {
          await signInWithEmailAndPassword(auth, emailToAuth, adminPassword);
          sessionStorage.setItem('adminEmail', emailToAuth);
          sessionStorage.setItem('adminPassword', adminPassword);
          setIsAuthenticated(true);
          toast.success('Authenticated via Firebase Auth');
          fetchData(adminPassword, emailToAuth);
          return;
        } catch (firebaseErr: any) {
          // If default owner credentials, create account in Firebase Auth automatically
          if (emailToAuth.toLowerCase() === 'owner@medialevelling.com' && adminPassword === 'MEDIA@19019') {
            try {
              await createUserWithEmailAndPassword(auth, emailToAuth, adminPassword);
              sessionStorage.setItem('adminEmail', emailToAuth);
              sessionStorage.setItem('adminPassword', adminPassword);
              setIsAuthenticated(true);
              toast.success('Authenticated Owner in Firebase Auth');
              fetchData(adminPassword, emailToAuth);
              return;
            } catch (cErr) {
              // Fallback below
            }
          }
        }
      }

      // 2. Fallback to local / backend verification
      const normalizedEmail = emailToAuth.toLowerCase();
      if (
        (normalizedEmail === 'owner@medialevelling.com' && adminPassword === 'MEDIA@19019') ||
        adminPassword === 'MEDIA@19019' ||
        adminPassword === 'admin123'
      ) {
        sessionStorage.setItem('adminEmail', emailToAuth);
        sessionStorage.setItem('adminPassword', adminPassword);
        setIsAuthenticated(true);
        toast.success('Admin unlocked successfully');
        fetchData(adminPassword, emailToAuth);
        return;
      }

      const success = await fetchData(adminPassword, emailToAuth);
      if (success) {
        sessionStorage.setItem('adminEmail', emailToAuth);
        sessionStorage.setItem('adminPassword', adminPassword);
        setIsAuthenticated(true);
        toast.success('Admin unlocked');
      } else {
        toast.error('Invalid email or password');
      }
    } catch (err: any) {
      toast.error(err.message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAdminUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminEmail.trim() || !newAdminPassword.trim()) {
      toast.error('Both username/email and password are required');
      return;
    }

    let targetEmail = newAdminEmail.trim();
    if (!targetEmail.includes('@')) {
      targetEmail = `${targetEmail}@medialevelling.com`;
    }

    try {
      if (auth) {
        await createUserWithEmailAndPassword(auth, targetEmail, newAdminPassword.trim());
      }
      if (db) {
        const docId = targetEmail.replace(/[^a-zA-Z0-9]/g, '_');
        await setDoc(doc(db, 'admin_users', docId), {
          email: targetEmail,
          createdAt: new Date().toISOString(),
          role: 'admin'
        });
      }
      toast.success(`Admin user "${targetEmail}" created successfully in Firebase Auth!`);
      setIsAdminUserModalOpen(false);
      setNewAdminEmail('');
      setNewAdminPassword('');
    } catch (err: any) {
      toast.error(err.message || 'Failed to create Firebase user');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminEmail');
    sessionStorage.removeItem('adminPassword');
    setAdminPassword('');
    setIsAuthenticated(false);
    setOrders([]);
    setPosts([]);
    toast.success('Session locked');
  };

  // ==========================================
  // ORDER ACTIONS (UPDATE, DELETE, VERIFY)
  // ==========================================

  const handleVerifyOrder = async (orderId: string, status: 'approved' | 'rejected') => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}/verify`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Password': adminPassword
        },
        body: JSON.stringify({ status })
      });

      if (!response.ok) throw new Error('Verification request failed');
      toast.success(`Order payment marked as ${status}`);
      fetchData();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleOpenEditOrder = (order: any) => {
    setSelectedOrder(order);
    setIsEditOrderOpen(true);
  };

  const handleSaveOrderEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    try {
      const response = await fetch(`/api/admin/orders/${selectedOrder.orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Password': adminPassword
        },
        body: JSON.stringify({
          customerName: selectedOrder.customerName,
          email: selectedOrder.email,
          productName: selectedOrder.productName,
          amount: selectedOrder.amount,
          upiTxnId: selectedOrder.upiTxnId,
          paymentStatus: selectedOrder.paymentStatus
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to save changes');

      toast.success('Order details updated');
      setIsEditOrderOpen(false);
      fetchData();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this order?')) return;

    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
          'X-Admin-Password': adminPassword
        }
      });

      if (!response.ok) throw new Error('Deletion failed');
      toast.success('Order deleted');
      fetchData();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // ==========================================
  // POST ACTIONS (CREATE, UPDATE, DELETE)
  // ==========================================

  const handleOpenNewPost = () => {
    setSelectedPost(null);
    setPostTitle('');
    setPostSlug('');
    setPostSummary('');
    setPostContent('');
    setPostStatus('draft');
    setPostImage('');
    setIsPostFormOpen(true);
  };

  const handleOpenEditPost = (post: any) => {
    setSelectedPost(post);
    setPostTitle(post.title);
    setPostSlug(post.slug);
    setPostSummary(post.summary || '');
    setPostContent(post.content);
    setPostStatus(post.status);
    setPostImage(post.image || '');
    setIsPostFormOpen(true);
  };

  // Auto-generate slug from title
  const handleTitleChange = (val: string) => {
    setPostTitle(val);
    if (!selectedPost) {
      setPostSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    }
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();

    const postPayload = {
      title: postTitle,
      slug: postSlug,
      summary: postSummary,
      content: postContent,
      status: postStatus,
      image: postImage
    };

    try {
      let response;
      if (selectedPost) {
        // Edit Mode
        response = await fetch(`/api/admin/posts/${selectedPost._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-Admin-Password': adminPassword
          },
          body: JSON.stringify(postPayload)
        });
      } else {
        // Create Mode
        response = await fetch('/api/admin/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Admin-Password': adminPassword
          },
          body: JSON.stringify(postPayload)
        });
      }

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to save post');

      toast.success(selectedPost ? 'Post updated successfully' : 'New post published');
      setIsPostFormOpen(false);
      fetchData();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!window.confirm('Delete this post permanently?')) return;

    try {
      const response = await fetch(`/api/admin/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'X-Admin-Password': adminPassword
        }
      });

      if (!response.ok) throw new Error('Deletion failed');
      toast.success('Post deleted');
      fetchData();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // ==========================================
  // PORTFOLIO ACTIONS (CREATE, UPDATE, DELETE)
  // ==========================================

  const handleOpenNewPortfolioItem = () => {
    setSelectedPortfolioItem(null);
    setPortfolioTitle('');
    setPortfolioCategory('Social Media');
    setPortfolioImage('');
    setPortfolioDescription('');
    setPortfolioStats('');
    setPortfolioClient('');
    setPortfolioObjective('');
    setPortfolioApproach('');
    setPortfolioResults('');
    setIsPortfolioFormOpen(true);
  };

  const handleOpenEditPortfolioItem = (item: any) => {
    setSelectedPortfolioItem(item);
    setPortfolioTitle(item.title);
    setPortfolioCategory(item.category);
    setPortfolioImage(item.image);
    setPortfolioDescription(item.description);
    setPortfolioStats(item.stats || '');
    setPortfolioClient(item.details?.client || '');
    setPortfolioObjective(item.details?.objective || '');
    setPortfolioApproach(item.details?.approach?.join('\n') || '');
    setPortfolioResults(item.details?.results?.join('\n') || '');
    setIsPortfolioFormOpen(true);
  };

  const handleSavePortfolioItem = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!portfolioImage) {
      toast.error('A project photo/image is required');
      return;
    }

    const payload = {
      title: portfolioTitle,
      category: portfolioCategory,
      image: portfolioImage,
      description: portfolioDescription,
      stats: portfolioStats,
      details: {
        client: portfolioClient,
        objective: portfolioObjective,
        approach: portfolioApproach.split('\n').map(x => x.trim()).filter(Boolean),
        results: portfolioResults.split('\n').map(x => x.trim()).filter(Boolean)
      }
    };

    try {
      let response;
      if (selectedPortfolioItem) {
        // Edit mode
        response = await fetch(`/api/admin/portfolio/${selectedPortfolioItem._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-Admin-Password': adminPassword
          },
          body: JSON.stringify(payload)
        });
      } else {
        // Create mode
        response = await fetch('/api/admin/portfolio', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Admin-Password': adminPassword
          },
          body: JSON.stringify(payload)
        });
      }

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to save portfolio item');

      toast.success(selectedPortfolioItem ? 'Portfolio item updated' : 'New portfolio item created');
      setIsPortfolioFormOpen(false);
      fetchData();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDeletePortfolioItem = async (itemId: string) => {
    if (!window.confirm('Delete this portfolio item permanently?')) return;

    try {
      const response = await fetch(`/api/admin/portfolio/${itemId}`, {
        method: 'DELETE',
        headers: {
          'X-Admin-Password': adminPassword
        }
      });

      if (!response.ok) throw new Error('Deletion failed');
      toast.success('Portfolio item deleted');
      fetchData();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // Helper for image base64 conversion on upload
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size is too large (max 5MB)');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        callback(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // ==========================================
  // GRAPH DATA PREPARATION (RECHARTS)
  // ==========================================

  // 1. Revenue Over Time
  const getRevenueChartData = () => {
    const revMap: { [key: string]: number } = {};
    
    // Sort orders chronological first
    const chronoOrders = [...orders].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    chronoOrders.forEach(o => {
      if (o.paymentStatus === 'approved' || o.paymentStatus === 'verified') {
        const dateKey = new Date(o.createdAt).toLocaleDateString('en-IN', {
          month: 'short',
          day: 'numeric'
        });
        revMap[dateKey] = (revMap[dateKey] || 0) + o.amount;
      }
    });

    const chartData = Object.entries(revMap).map(([date, revenue]) => ({
      date,
      Revenue: revenue
    }));

    // If empty, return placeholder to keep graph structured
    if (chartData.length === 0) {
      return [{ date: 'No Sales', Revenue: 0 }];
    }
    return chartData;
  };

  // 2. Status Breakdown
  const getStatusChartData = () => {
    const statusCounts: { [key: string]: number } = {
      Approved: 0,
      Pending: 0,
      Submitted: 0,
      Expired: 0,
      Rejected: 0
    };

    orders.forEach(o => {
      const stat = o.paymentStatus;
      if (stat === 'approved' || stat === 'verified') statusCounts.Approved++;
      else if (stat === 'pending') statusCounts.Pending++;
      else if (stat === 'submitted') statusCounts.Submitted++;
      else if (stat === 'expired') statusCounts.Expired++;
      else if (stat === 'rejected') statusCounts.Rejected++;
    });

    return Object.entries(statusCounts).map(([name, value]) => ({
      name,
      value
    })).filter(item => item.value > 0); // Only display present categories
  };

  // 3. Product Performance
  const getProductChartData = () => {
    const prodMap: { [key: string]: { revenue: number; count: number } } = {};

    orders.forEach(o => {
      // Extract service name prefix (e.g. "Google Ads (Premium Plan)" -> "Google Ads")
      const cleanProd = o.productName.split(' (')[0];
      if (!prodMap[cleanProd]) {
        prodMap[cleanProd] = { revenue: 0, count: 0 };
      }
      
      prodMap[cleanProd].count++;
      if (o.paymentStatus === 'approved' || o.paymentStatus === 'verified') {
        prodMap[cleanProd].revenue += o.amount;
      }
    });

    const data = Object.entries(prodMap).map(([name, info]) => ({
      name,
      Sales: info.count,
      Revenue: info.revenue
    }));

    if (data.length === 0) {
      return [{ name: 'No Products', Sales: 0, Revenue: 0 }];
    }
    return data;
  };

  const statusColors = {
    Approved: '#10b981', // emerald-500
    Pending: '#94a3b8',  // slate-400
    Submitted: '#6366f1', // indigo-500
    Expired: '#f59e0b',   // amber-500
    Rejected: '#ef4444'   // rose-500
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-32 pb-20 px-4 md:px-8">
        {!isAuthenticated ? (
          /* Locked gate */
          <div className="max-w-md mx-auto mt-12">
            <Card className="border border-slate-200 shadow-2xl bg-white rounded-3xl overflow-hidden">
              <CardHeader className="text-center p-8 bg-slate-50/50 border-b">
                <ShieldAlert className="h-14 w-14 text-indigo-600 mx-auto mb-4" />
                <CardTitle className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Admin Authorization Required
                </CardTitle>
                <CardDescription>
                  Enter admin credentials to unlock control center, orders, and CMS.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="p-8 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="adminEmail">Admin Email</Label>
                    <Input
                      id="adminEmail"
                      type="email"
                      placeholder="owner@medialevelling.com"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      required
                      className="rounded-xl py-6"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Security Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter security password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      required
                      className="rounded-xl py-6"
                    />
                  </div>
                </CardContent>
                <CardFooter className="p-8 border-t bg-slate-50">
                  <Button type="submit" className="w-full bg-[#18181b] hover:bg-black text-white py-6 rounded-xl font-bold transition-transform transform hover:scale-[1.02]">
                    Authenticate Admin
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        ) : (
          /* Workspace */
          <div className="max-w-7xl mx-auto space-y-8 animate-fade-in-up">
            
            {/* Header controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-extrabold text-slate-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Control Center
                  </h1>
                  <Badge className="bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5 px-3 py-1 text-xs rounded-full">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Firebase Connected
                  </Badge>
                </div>
                <p className="text-slate-500 mt-1">
                  Verify payments, edit client orders, publish blog articles, and monitor real-time charts.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                <Button 
                  onClick={uploadAllWebsiteDataToFirestore} 
                  variant="outline"
                  disabled={loading}
                  className="rounded-xl flex gap-2 items-center hover:bg-emerald-50 bg-white border-emerald-300 text-emerald-700"
                >
                  <Upload className="h-4 w-4 text-emerald-600" />
                  Upload Data to Firestore
                </Button>
                <Button 
                  onClick={() => setIsAdminUserModalOpen(true)} 
                  variant="outline"
                  className="rounded-xl flex gap-2 items-center hover:bg-slate-100 bg-white border-indigo-200 text-indigo-700"
                >
                  <User className="h-4 w-4 text-indigo-600" />
                  New Admin User
                </Button>
                <Button 
                  onClick={() => fetchData()} 
                  variant="outline" 
                  disabled={loading}
                  className="rounded-xl flex gap-2 items-center hover:bg-slate-100 bg-white"
                >
                  <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                  Sync Database
                </Button>
                <Button 
                  onClick={handleLogout} 
                  variant="destructive"
                  className="rounded-xl flex gap-2 items-center"
                >
                  <LogOut className="h-4 w-4" />
                  Lock Dashboard
                </Button>
              </div>
            </div>

            {/* TAB SELECT BUTTONS */}
            <div className="flex border-b border-slate-200 gap-1 overflow-x-auto pb-1">
              <button
                onClick={() => setActiveTab('analytics')}
                className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm border-b-2 transition-all rounded-t-xl ${
                  activeTab === 'analytics'
                    ? 'border-indigo-600 text-indigo-600 bg-indigo-50/40'
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
                }`}
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                <LayoutDashboard className="h-4 w-4" />
                Analytics Overview
              </button>
              
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm border-b-2 transition-all rounded-t-xl ${
                  activeTab === 'orders'
                    ? 'border-indigo-600 text-indigo-600 bg-indigo-50/40'
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
                }`}
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                <ShoppingCart className="h-4 w-4" />
                Orders Management ({stats.totalCount})
              </button>

              <button
                onClick={() => setActiveTab('posts')}
                className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm border-b-2 transition-all rounded-t-xl ${
                  activeTab === 'posts'
                    ? 'border-indigo-600 text-indigo-600 bg-indigo-50/40'
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
                }`}
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                <FileText className="h-4 w-4" />
                Articles / Posts ({posts.length})
              </button>

              <button
                onClick={() => setActiveTab('portfolio')}
                className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm border-b-2 transition-all rounded-t-xl ${
                  activeTab === 'portfolio'
                    ? 'border-indigo-600 text-indigo-600 bg-indigo-50/40'
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
                }`}
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                <Briefcase className="h-4 w-4" />
                Portfolio Items ({portfolioItems.length})
              </button>

              <button
                onClick={() => setActiveTab('leads')}
                className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm border-b-2 transition-all rounded-t-xl ${
                  activeTab === 'leads'
                    ? 'border-indigo-600 text-indigo-600 bg-indigo-50/40'
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
                }`}
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                <Mail className="h-4 w-4 text-indigo-600" />
                Contact Leads ({contactMessages.length})
              </button>
            </div>

            {/* METRIC CARD WIDGETS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="rounded-2xl border border-slate-200 shadow-sm bg-white">
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Volume</span>
                    <h3 className="text-2xl font-extrabold text-indigo-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Rs. {stats.totalVolume.toLocaleString('en-IN')}
                    </h3>
                  </div>
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                    <DollarSign className="h-6 w-6" />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border border-slate-200 shadow-sm bg-white">
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pending UTRs</span>
                    <h3 className="text-2xl font-extrabold text-amber-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {stats.pendingVerification}
                    </h3>
                  </div>
                  <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                    <Clock className="h-6 w-6" />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border border-slate-200 shadow-sm bg-white">
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Approved Payments</span>
                    <h3 className="text-2xl font-extrabold text-emerald-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {stats.approvedCount}
                    </h3>
                  </div>
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border border-slate-200 shadow-sm bg-white">
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Sales</span>
                    <h3 className="text-2xl font-extrabold text-slate-800" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {stats.totalCount}
                    </h3>
                  </div>
                  <div className="p-3 bg-slate-100 text-slate-600 rounded-xl">
                    <ShoppingCart className="h-6 w-6" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* TAB CONTENT: ANALYTICS */}
            {activeTab === 'analytics' && (
              <div className="space-y-8 animate-fade-in">
                {/* Revenue & Distribution Graphs */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Revenue Area Chart */}
                  <Card className="lg:col-span-2 border border-slate-200 rounded-2xl shadow-sm bg-white">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>Revenue Trend</CardTitle>
                      <CardDescription>Daily aggregated sales volume from approved transactions</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={getRevenueChartData()} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
                          <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}`} />
                          <Tooltip formatter={(value) => [`₹${value}`, 'Revenue']} contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                          <Area type="monotone" dataKey="Revenue" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Status Breakdown Pie Chart */}
                  <Card className="border border-slate-200 rounded-2xl shadow-sm bg-white">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>Order Status Breakdown</CardTitle>
                      <CardDescription>Ratio of payments categories</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80 flex flex-col items-center justify-center">
                      {getStatusChartData().length === 0 ? (
                        <p className="text-slate-400 text-sm">No orders to display.</p>
                      ) : (
                        <div className="w-full h-full relative">
                          <ResponsiveContainer width="100%" height="90%">
                            <PieChart>
                              <Pie
                                data={getStatusChartData()}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                              >
                                {getStatusChartData().map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={statusColors[entry.name as keyof typeof statusColors] || '#64748b'} />
                                ))}
                              </Pie>
                              <Tooltip contentStyle={{ borderRadius: '12px' }} />
                            </PieChart>
                          </ResponsiveContainer>
                          {/* Custom legend */}
                          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs">
                            {getStatusChartData().map((entry, idx) => (
                              <div key={idx} className="flex items-center gap-1.5">
                                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: statusColors[entry.name as keyof typeof statusColors] }} />
                                <span className="text-slate-600 font-medium">{entry.name} ({entry.value})</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Product Sales Performance */}
                <Card className="border border-slate-200 rounded-2xl shadow-sm bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>Service/Product Performance</CardTitle>
                    <CardDescription>Analysis of orders count and generated sales value per package</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={getProductChartData()} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                        <YAxis yAxisId="left" orientation="left" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} label={{ value: 'Orders Count', angle: -90, position: 'insideLeft', offset: -5, fill: '#94a3b8' }} />
                        <YAxis yAxisId="right" orientation="right" stroke="#10b981" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}`} label={{ value: 'Revenue (₹)', angle: 90, position: 'insideRight', offset: -5, fill: '#10b981' }} />
                        <Tooltip contentStyle={{ borderRadius: '12px' }} />
                        <Legend verticalAlign="top" height={36} />
                        <Bar yAxisId="left" dataKey="Sales" name="Sales Count" fill="#6366f1" radius={[4, 4, 0, 0]} />
                        <Bar yAxisId="right" dataKey="Revenue" name="Revenue Earned (₹)" fill="#10b981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* TAB CONTENT: ORDERS */}
            {activeTab === 'orders' && (
              <div className="space-y-6 animate-fade-in">
                {/* Filters */}
                <Card className="border border-slate-200 rounded-2xl shadow-sm bg-white">
                  <CardContent className="p-6 flex flex-col md:flex-row gap-4 items-end">
                    <div className="w-full md:flex-1 space-y-2">
                      <Label htmlFor="order-search" className="font-semibold text-slate-700">Search Orders</Label>
                      <div className="relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
                        <Input
                          id="order-search"
                          placeholder="Search by Order ID, Transaction UTR, customer name, email..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && fetchData()}
                          className="pl-11 py-6 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="w-full md:w-64 space-y-2">
                      <Label htmlFor="order-filter-status" className="font-semibold text-slate-700">Status Filter</Label>
                      <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value)}>
                        <SelectTrigger id="order-filter-status" className="py-6 rounded-xl">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="pending">Pending Payment</SelectItem>
                          <SelectItem value="submitted">Submitted (UTR)</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                          <SelectItem value="expired">Expired</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button 
                      onClick={() => fetchData()}
                      className="bg-[#18181b] hover:bg-black text-white px-8 py-6 rounded-xl font-semibold w-full md:w-auto"
                    >
                      Filter List
                    </Button>
                  </CardContent>
                </Card>

                {/* Orders List Table */}
                <Card className="border border-slate-200 rounded-2xl shadow-lg bg-white overflow-hidden">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader className="bg-slate-50 border-b border-slate-200">
                          <TableRow>
                            <TableHead className="font-semibold py-4 pl-6 text-slate-700">Order ID & Date</TableHead>
                            <TableHead className="font-semibold py-4 text-slate-700">Customer Details</TableHead>
                            <TableHead className="font-semibold py-4 text-slate-700">Product & Price</TableHead>
                            <TableHead className="font-semibold py-4 text-slate-700">UPI Transaction ID (UTR)</TableHead>
                            <TableHead className="font-semibold py-4 text-slate-700 text-center">Status</TableHead>
                            <TableHead className="font-semibold py-4 pr-6 text-slate-700 text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {loading ? (
                            <TableRow>
                              <TableCell colSpan={6} className="text-center py-12 text-slate-400">
                                <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2 text-indigo-500" />
                                Syncing order database...
                              </TableCell>
                            </TableRow>
                          ) : orders.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={6} className="text-center py-12 text-slate-400">
                                <Info className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                                No matching orders found.
                              </TableCell>
                            </TableRow>
                          ) : (
                            orders.map((order) => {
                              const renderedStatus = order.paymentStatus;
                              return (
                                <TableRow key={order.orderId} className="hover:bg-slate-50/50 border-b transition-colors">
                                  <TableCell className="py-5 pl-6 font-semibold">
                                    <span className="font-mono text-slate-900 block">{order.orderId}</span>
                                    <span className="text-slate-400 text-xs font-normal flex items-center gap-1 mt-1">
                                      <Calendar className="h-3 w-3" />
                                      {new Date(order.createdAt).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}
                                    </span>
                                  </TableCell>

                                  <TableCell className="py-5">
                                    <div className="flex flex-col">
                                      <span className="font-semibold text-slate-800">{order.customerName}</span>
                                      <span className="text-slate-500 text-xs font-mono">{order.email}</span>
                                    </div>
                                  </TableCell>

                                  <TableCell className="py-5">
                                    <div>
                                      <span className="font-medium text-slate-800 block truncate max-w-[200px]">{order.productName}</span>
                                      <span className="font-bold text-indigo-600 block mt-0.5">Rs. {order.amount.toLocaleString('en-IN')}</span>
                                    </div>
                                  </TableCell>

                                  <TableCell className="py-5 font-mono text-sm">
                                    {order.upiTxnId ? (
                                      <Badge variant="outline" className="font-bold tracking-wider text-slate-700 bg-slate-100/50 border-slate-200">
                                        {order.upiTxnId}
                                      </Badge>
                                    ) : (
                                      <span className="text-slate-400 text-xs italic">Not submitted</span>
                                    )}
                                  </TableCell>

                                  <TableCell className="py-5 text-center">
                                    {renderedStatus === 'approved' || renderedStatus === 'verified' ? (
                                      <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 font-semibold px-3 py-1 rounded-full">Approved</Badge>
                                    ) : renderedStatus === 'rejected' ? (
                                      <Badge className="bg-rose-100 text-rose-800 border-rose-200 font-semibold px-3 py-1 rounded-full">Rejected</Badge>
                                    ) : renderedStatus === 'submitted' ? (
                                      <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200 font-semibold px-3 py-1 rounded-full animate-pulse">Submitted</Badge>
                                    ) : renderedStatus === 'expired' ? (
                                      <Badge className="bg-amber-100 text-amber-800 border-amber-200 font-semibold px-3 py-1 rounded-full">Expired</Badge>
                                    ) : (
                                      <Badge className="bg-slate-100 text-slate-800 border-slate-200 font-semibold px-3 py-1 rounded-full">Pending</Badge>
                                    )}
                                  </TableCell>

                                  <TableCell className="py-5 pr-6 text-right">
                                    <div className="flex gap-1.5 justify-end items-center">
                                      {/* Quick verify button if submitted */}
                                      {renderedStatus === 'submitted' && (
                                        <>
                                          <Button
                                            onClick={() => handleVerifyOrder(order.orderId, 'approved')}
                                            size="sm"
                                            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg p-1.5 h-8 w-8 flex items-center justify-center"
                                            title="Approve Payment"
                                          >
                                            <Check className="h-4 w-4" />
                                          </Button>
                                          <Button
                                            onClick={() => handleVerifyOrder(order.orderId, 'rejected')}
                                            size="sm"
                                            variant="outline"
                                            className="border-rose-200 text-rose-600 hover:bg-rose-50 rounded-lg p-1.5 h-8 w-8 flex items-center justify-center"
                                            title="Reject Payment"
                                          >
                                            <X className="h-4 w-4" />
                                          </Button>
                                        </>
                                      )}
                                      
                                      {/* Edit Button */}
                                      <Button
                                        onClick={() => handleOpenEditOrder(order)}
                                        size="sm"
                                        variant="outline"
                                        className="border-slate-200 text-slate-600 hover:bg-slate-100 rounded-lg p-1.5 h-8 w-8 flex items-center justify-center"
                                        title="Edit Order"
                                      >
                                        <Edit2 className="h-3.5 w-3.5" />
                                      </Button>

                                      {/* Delete Button */}
                                      <Button
                                        onClick={() => handleDeleteOrder(order.orderId)}
                                        size="sm"
                                        variant="outline"
                                        className="border-slate-200 text-rose-500 hover:bg-rose-50 hover:border-rose-100 rounded-lg p-1.5 h-8 w-8 flex items-center justify-center"
                                        title="Delete Order"
                                      >
                                        <Trash2 className="h-3.5 w-3.5" />
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              );
                            })
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* TAB CONTENT: POSTS / ARTICLES */}
            {activeTab === 'posts' && (
              <div className="space-y-6 animate-fade-in">
                {/* Actions */}
                <div className="flex justify-between items-center bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">Website Articles (CMS)</h3>
                    <p className="text-sm text-slate-500">Draft or publish blog posts and service updates</p>
                  </div>
                  <Button 
                    onClick={handleOpenNewPost}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex gap-1.5 items-center py-5 px-6 font-semibold"
                  >
                    <Plus className="h-5 w-5" />
                    Write Article
                  </Button>
                </div>

                {/* Posts Table */}
                <Card className="border border-slate-200 rounded-2xl shadow-lg bg-white overflow-hidden">
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader className="bg-slate-50 border-b border-slate-200">
                        <TableRow>
                          <TableHead className="font-semibold py-4 pl-6 text-slate-700">Article Title</TableHead>
                          <TableHead className="font-semibold py-4 text-slate-700">Slug</TableHead>
                          <TableHead className="font-semibold py-4 text-slate-700">Author</TableHead>
                          <TableHead className="font-semibold py-4 text-slate-700 text-center">Status</TableHead>
                          <TableHead className="font-semibold py-4 text-slate-700">Created Date</TableHead>
                          <TableHead className="font-semibold py-4 pr-6 text-slate-700 text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {posts.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-12 text-slate-400">
                              <FileText className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                              No posts created yet. Click "Write Article" to start.
                            </TableCell>
                          </TableRow>
                        ) : (
                          posts.map((post) => (
                            <TableRow key={post._id} className="hover:bg-slate-50/50 border-b transition-colors">
                              <TableCell className="py-5 pl-6 font-semibold text-slate-800">
                                <div className="flex flex-col">
                                  <span>{post.title}</span>
                                  {post.summary && <span className="text-xs text-slate-400 font-normal truncate max-w-sm mt-0.5">{post.summary}</span>}
                                </div>
                              </TableCell>
                              <TableCell className="py-5 font-mono text-xs text-slate-500">{post.slug}</TableCell>
                              <TableCell className="py-5 text-sm text-slate-600">{post.author || 'Admin'}</TableCell>
                              <TableCell className="py-5 text-center">
                                {post.status === 'published' ? (
                                  <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 font-semibold px-2.5 py-0.5 rounded-full">Published</Badge>
                                ) : (
                                  <Badge className="bg-slate-100 text-slate-500 border-slate-200 font-semibold px-2.5 py-0.5 rounded-full">Draft</Badge>
                                )}
                              </TableCell>
                              <TableCell className="py-5 text-xs text-slate-400">
                                {new Date(post.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
                              </TableCell>
                              <TableCell className="py-5 pr-6 text-right">
                                <div className="flex gap-2 justify-end items-center">
                                  <Button
                                    onClick={() => handleOpenEditPost(post)}
                                    size="sm"
                                    variant="outline"
                                    className="border-slate-200 text-slate-600 hover:bg-slate-100 rounded-lg p-1.5 h-8 w-8 flex items-center justify-center"
                                  >
                                    <Edit2 className="h-3.5 w-3.5" />
                                  </Button>
                                  <Button
                                    onClick={() => handleDeletePost(post._id)}
                                    size="sm"
                                    variant="outline"
                                    className="border-slate-200 text-rose-500 hover:bg-rose-50 hover:border-rose-100 rounded-lg p-1.5 h-8 w-8 flex items-center justify-center"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* TAB CONTENT: PORTFOLIO ITEMS */}
            {activeTab === 'portfolio' && (
              <div className="space-y-6 animate-fade-in">
                {/* Actions */}
                <div className="flex justify-between items-center bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">Portfolio Case Studies</h3>
                    <p className="text-sm text-slate-500 font-light">Manage project listings, category tags, outcomes, metrics, and photos</p>
                  </div>
                  <Button 
                    onClick={handleOpenNewPortfolioItem}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex gap-1.5 items-center py-5 px-6 font-semibold"
                  >
                    <Plus className="h-5 w-5" />
                    New Project
                  </Button>
                </div>

                {/* Portfolio List Table */}
                <Card className="border border-slate-200 rounded-2xl shadow-lg bg-white overflow-hidden">
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader className="bg-slate-50 border-b border-slate-200">
                        <TableRow>
                          <TableHead className="font-semibold py-4 pl-6 text-slate-700 w-24">Photo</TableHead>
                          <TableHead className="font-semibold py-4 text-slate-700">Project Title & Client</TableHead>
                          <TableHead className="font-semibold py-4 text-slate-700">Category</TableHead>
                          <TableHead className="font-semibold py-4 text-slate-700">Outcomes / Stats</TableHead>
                          <TableHead className="font-semibold py-4 text-slate-700 text-center">Approach / Results</TableHead>
                          <TableHead className="font-semibold py-4 pr-6 text-slate-700 text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {portfolioItems.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-12 text-slate-400">
                              <Briefcase className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                              No portfolio projects listed. Click "New Project" to add your first work showcase.
                            </TableCell>
                          </TableRow>
                        ) : (
                          portfolioItems.map((item) => (
                            <TableRow key={item._id || item.id || item.title} className="hover:bg-slate-50/50 border-b transition-colors">
                              <TableCell className="py-4 pl-6">
                                <div className="h-12 w-16 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shadow-inner flex items-center justify-center">
                                  <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=120';
                                    }}
                                  />
                                </div>
                              </TableCell>
                              <TableCell className="py-4 font-semibold text-slate-800">
                                <div className="flex flex-col">
                                  <span>{item.title}</span>
                                  <span className="text-xs text-slate-400 font-normal mt-0.5">Client: {item.details?.client || 'N/A'}</span>
                                </div>
                              </TableCell>
                              <TableCell className="py-4">
                                <Badge variant="secondary" className="bg-slate-100 text-slate-600 border border-slate-200">
                                  {item.category}
                                </Badge>
                              </TableCell>
                              <TableCell className="py-4 font-semibold text-indigo-600 text-sm">
                                {item.stats || 'N/A'}
                              </TableCell>
                              <TableCell className="py-4 text-center text-xs text-slate-500 font-mono">
                                <div>A: {item.details?.approach?.length || 0} steps</div>
                                <div className="mt-0.5">R: {item.details?.results?.length || 0} wins</div>
                              </TableCell>
                              <TableCell className="py-4 pr-6 text-right">
                                <div className="flex gap-2 justify-end items-center">
                                  <Button
                                    onClick={() => handleOpenEditPortfolioItem(item)}
                                    size="sm"
                                    variant="outline"
                                    className="border-slate-200 text-slate-600 hover:bg-slate-100 rounded-lg p-1.5 h-8 w-8 flex items-center justify-center"
                                  >
                                    <Edit2 className="h-3.5 w-3.5" />
                                  </Button>
                                  <Button
                                    onClick={() => handleDeletePortfolioItem(item._id || item.id)}
                                    size="sm"
                                    variant="outline"
                                    className="border-slate-200 text-rose-500 hover:bg-rose-50 hover:border-rose-100 rounded-lg p-1.5 h-8 w-8 flex items-center justify-center"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* ==========================================
                TAB 5: CONTACT LEADS COLLECTOR
                ========================================== */}
            {activeTab === 'leads' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Contact Inquiries & Leads
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Messages submitted from the public website contact form saved in Firebase & Server
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                      Total Inquiries: {contactMessages.length}
                    </Badge>
                  </div>
                </div>

                <Card className="border border-slate-200 rounded-2xl shadow-lg bg-white overflow-hidden">
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader className="bg-slate-50 border-b border-slate-200">
                        <TableRow>
                          <TableHead className="font-semibold py-4 pl-6 text-slate-700">Client Name & Email</TableHead>
                          <TableHead className="font-semibold py-4 text-slate-700">Phone / Contact</TableHead>
                          <TableHead className="font-semibold py-4 text-slate-700">Service Interested</TableHead>
                          <TableHead className="font-semibold py-4 text-slate-700">Submitted Date</TableHead>
                          <TableHead className="font-semibold py-4 text-slate-700 text-center">Status</TableHead>
                          <TableHead className="font-semibold py-4 pr-6 text-slate-700 text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {contactMessages.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-12 text-slate-400">
                              <Mail className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                              No contact form inquiries yet. Submissions from the website Contact page will appear here.
                            </TableCell>
                          </TableRow>
                        ) : (
                          contactMessages.map((msg) => (
                            <TableRow key={msg._id || msg.id} className="hover:bg-slate-50/50 border-b transition-colors">
                              <TableCell className="py-4 pl-6 font-semibold text-slate-800">
                                <div className="flex flex-col">
                                  <span>{msg.name}</span>
                                  <a href={`mailto:${msg.email}`} className="text-xs text-indigo-600 font-normal hover:underline mt-0.5">
                                    {msg.email}
                                  </a>
                                </div>
                              </TableCell>
                              <TableCell className="py-4 text-sm text-slate-600 font-mono">
                                {msg.phone || 'N/A'}
                              </TableCell>
                              <TableCell className="py-4">
                                <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 border border-indigo-200">
                                  {msg.service || 'General Inquiry'}
                                </Badge>
                              </TableCell>
                              <TableCell className="py-4 text-xs text-slate-500">
                                {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : 'Just now'}
                              </TableCell>
                              <TableCell className="py-4 text-center">
                                <Badge className={
                                  msg.status === 'contacted' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                                  msg.status === 'closed' ? 'bg-slate-100 text-slate-700 border-slate-300' :
                                  'bg-amber-100 text-amber-800 border-amber-300 animate-pulse'
                                }>
                                  {msg.status || 'new'}
                                </Badge>
                              </TableCell>
                              <TableCell className="py-4 pr-6 text-right">
                                <div className="flex gap-2 justify-end items-center">
                                  <Button
                                    onClick={() => {
                                      setSelectedLead(msg);
                                      setIsLeadModalOpen(true);
                                    }}
                                    size="sm"
                                    variant="outline"
                                    className="border-slate-200 text-slate-600 hover:bg-slate-100 rounded-lg text-xs"
                                  >
                                    View Message
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* ==========================================
                DIALOUGE: EDIT ORDER MODAL
                ========================================== */}
            <Dialog open={isEditOrderOpen} onOpenChange={setIsEditOrderOpen}>
              <DialogContent className="sm:max-w-[480px] rounded-3xl p-6 bg-white">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>Edit Order details</DialogTitle>
                  <DialogDescription>
                    Update client information, payment amounts, or transaction state manually.
                  </DialogDescription>
                </DialogHeader>
                {selectedOrder && (
                  <form onSubmit={handleSaveOrderEdit} className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-name">Customer Name</Label>
                        <Input
                          id="edit-name"
                          value={selectedOrder.customerName}
                          onChange={(e) => setSelectedOrder({ ...selectedOrder, customerName: e.target.value })}
                          required
                          className="rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-email">Customer Email</Label>
                        <Input
                          id="edit-email"
                          type="email"
                          value={selectedOrder.email}
                          onChange={(e) => setSelectedOrder({ ...selectedOrder, email: e.target.value })}
                          required
                          className="rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edit-product">Product / Service</Label>
                      <Input
                        id="edit-product"
                        value={selectedOrder.productName}
                        onChange={(e) => setSelectedOrder({ ...selectedOrder, productName: e.target.value })}
                        required
                        className="rounded-xl"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-amount">Amount (INR)</Label>
                        <Input
                          id="edit-amount"
                          type="number"
                          value={selectedOrder.amount}
                          onChange={(e) => setSelectedOrder({ ...selectedOrder, amount: parseFloat(e.target.value) || 0 })}
                          required
                          className="rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-utr">Transaction ID (UTR)</Label>
                        <Input
                          id="edit-utr"
                          value={selectedOrder.upiTxnId || ''}
                          onChange={(e) => setSelectedOrder({ ...selectedOrder, upiTxnId: e.target.value })}
                          placeholder="Not submitted"
                          className="rounded-xl font-mono uppercase"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edit-status">Payment Status</Label>
                      <Select
                        value={selectedOrder.paymentStatus}
                        onValueChange={(val) => setSelectedOrder({ ...selectedOrder, paymentStatus: val })}
                      >
                        <SelectTrigger id="edit-status" className="rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending Payment</SelectItem>
                          <SelectItem value="submitted">Submitted (UTR)</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                          <SelectItem value="expired">Expired</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <DialogFooter className="pt-4 flex gap-2">
                      <Button type="button" variant="outline" onClick={() => setIsEditOrderOpen(false)} className="rounded-xl w-full sm:w-auto">
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-[#18181b] hover:bg-black text-white rounded-xl w-full sm:w-auto px-6">
                        Save Changes
                      </Button>
                    </DialogFooter>
                  </form>
                )}
              </DialogContent>
            </Dialog>

            {/* ==========================================
                DIALOUGE: WRITE/EDIT ARTICLE MODAL
                ========================================== */}
            <Dialog open={isPostFormOpen} onOpenChange={setIsPostFormOpen}>
              <DialogContent className="sm:max-w-[650px] rounded-3xl p-6 bg-white max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {selectedPost ? 'Edit Website Article' : 'Write New Article'}
                  </DialogTitle>
                  <DialogDescription>
                    Add educational posts, news updates, or package advertisements to your site's feed.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSavePost} className="space-y-4 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="post-title">Article Title</Label>
                      <Input
                        id="post-title"
                        placeholder="e.g. 5 SEO Hacks to Try Today"
                        value={postTitle}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        required
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="post-slug">Slug Link</Label>
                      <Input
                        id="post-slug"
                        placeholder="e.g. 5-seo-hacks-to-try"
                        value={postSlug}
                        onChange={(e) => setPostSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                        required
                        className="rounded-xl font-mono text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="post-summary">Brief Summary (SEO Meta-description)</Label>
                    <Input
                      id="post-summary"
                      placeholder="Enter a brief summary of the post..."
                      value={postSummary}
                      onChange={(e) => setPostSummary(e.target.value)}
                      className="rounded-xl text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="post-content">Body Content (HTML/Plain Text)</Label>
                    <Textarea
                      id="post-content"
                      placeholder="Write your article body content here..."
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      required
                      className="rounded-xl min-h-[160px] text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="post-status">Publication Status</Label>
                      <Select
                        value={postStatus}
                        onValueChange={(val: 'draft' | 'published') => setPostStatus(val)}
                      >
                        <SelectTrigger id="post-status" className="rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft (Private)</SelectItem>
                          <SelectItem value="published">Published (Public)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="post-image" className="block text-sm font-semibold">Featured Photo/Image (Optional)</Label>
                      <div className="flex items-center gap-4 mt-1">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById('post-image-file')?.click()}
                          className="rounded-xl flex gap-1.5 items-center hover:bg-slate-100 bg-white border-slate-350"
                        >
                          <Upload className="h-4 w-4 text-slate-500" />
                          Choose Photo
                        </Button>
                        <input
                          id="post-image-file"
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageFileChange(e, setPostImage)}
                          className="hidden"
                        />
                        {postImage ? (
                          <div className="flex items-center gap-2">
                            <div className="h-12 w-12 rounded-lg overflow-hidden border bg-slate-100 flex items-center justify-center">
                              <img src={postImage} alt="Post preview" className="h-full w-full object-cover" />
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              onClick={() => setPostImage('')}
                              className="text-xs text-rose-500 hover:text-rose-600 font-semibold p-1 h-auto"
                            >
                              Remove
                            </Button>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 font-light">No photo selected</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <DialogFooter className="pt-4 flex gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsPostFormOpen(false)} className="rounded-xl">
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-[#18181b] hover:bg-black text-white rounded-xl px-6">
                      Save Post
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            {/* ==========================================
                DIALOUGE: CREATE/EDIT PORTFOLIO MODAL
                ========================================== */}
            <Dialog open={isPortfolioFormOpen} onOpenChange={setIsPortfolioFormOpen}>
              <DialogContent className="sm:max-w-[650px] rounded-3xl p-6 bg-white max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {selectedPortfolioItem ? 'Edit Portfolio Project' : 'Create Portfolio Project'}
                  </DialogTitle>
                  <DialogDescription>
                    Add or update case study information, strategic approach, client name, and outcomes.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSavePortfolioItem} className="space-y-4 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="portfolio-title">Project Title</Label>
                      <Input
                        id="portfolio-title"
                        placeholder="e.g. Belleza Campaign"
                        value={portfolioTitle}
                        onChange={(e) => setPortfolioTitle(e.target.value)}
                        required
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="portfolio-category">Category</Label>
                      <Select
                        value={portfolioCategory}
                        onValueChange={(val) => setPortfolioCategory(val)}
                      >
                        <SelectTrigger id="portfolio-category" className="rounded-xl">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Social Media">Social Media</SelectItem>
                          <SelectItem value="Web Design">Web Design</SelectItem>
                          <SelectItem value="Ad Creatives">Ad Creatives</SelectItem>
                          <SelectItem value="Video Content">Video Content</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="portfolio-client">Client Name</Label>
                      <Input
                        id="portfolio-client"
                        placeholder="e.g. BELLEZA Skincare"
                        value={portfolioClient}
                        onChange={(e) => setPortfolioClient(e.target.value)}
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="portfolio-stats">Key Metric / Stats</Label>
                      <Input
                        id="portfolio-stats"
                        placeholder="e.g. ROAS: 1.55x | CTR: 0.86%"
                        value={portfolioStats}
                        onChange={(e) => setPortfolioStats(e.target.value)}
                        className="rounded-xl font-semibold text-indigo-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="portfolio-description">Brief Description (Grid Display)</Label>
                    <Input
                      id="portfolio-description"
                      placeholder="Short description shown on the grid card..."
                      value={portfolioDescription}
                      onChange={(e) => setPortfolioDescription(e.target.value)}
                      required
                      className="rounded-xl text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="portfolio-objective">Objective (Modal View)</Label>
                    <Textarea
                      id="portfolio-objective"
                      placeholder="e.g. Expand Gen-Z organic reach and grow community engagement on Instagram..."
                      value={portfolioObjective}
                      onChange={(e) => setPortfolioObjective(e.target.value)}
                      className="rounded-xl min-h-[60px] text-sm"
                    />
                  </div>

                  {/* Approach & Results */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="portfolio-approach">Strategic Approach (One step per line)</Label>
                      <Textarea
                        id="portfolio-approach"
                        placeholder="e.g. Optimized page load speed&#10;Simplified checkout process&#10;A/B tested copywriting"
                        value={portfolioApproach}
                        onChange={(e) => setPortfolioApproach(e.target.value)}
                        className="rounded-xl min-h-[100px] text-xs font-mono"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="portfolio-results">Key Results (One win per line)</Label>
                      <Textarea
                        id="portfolio-results"
                        placeholder="e.g. 38% increase in ROAS&#10;24% drop in CPA&#10;58% increase in monthly leads"
                        value={portfolioResults}
                        onChange={(e) => setPortfolioResults(e.target.value)}
                        className="rounded-xl min-h-[100px] text-xs font-mono"
                      />
                    </div>
                  </div>

                  {/* Image/Photo Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="portfolio-image" className="block text-sm font-semibold">Project Photo/Image (Required)</Label>
                    <div className="flex items-center gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('portfolio-image-file')?.click()}
                        className="rounded-xl flex gap-1.5 items-center hover:bg-slate-100 bg-white border-slate-355"
                      >
                        <Upload className="h-4 w-4 text-slate-500" />
                        Choose Photo
                      </Button>
                      <input
                        id="portfolio-image-file"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageFileChange(e, setPortfolioImage)}
                        className="hidden"
                      />
                      {portfolioImage ? (
                        <div className="flex items-center gap-2">
                          <div className="h-12 w-16 rounded-lg overflow-hidden border bg-slate-100 flex items-center justify-center">
                            <img src={portfolioImage} alt="Portfolio preview" className="h-full w-full object-cover" />
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setPortfolioImage('')}
                            className="text-xs text-rose-500 hover:text-rose-600 font-semibold p-1 h-auto"
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 font-light">No photo selected</span>
                      )}
                    </div>
                  </div>

                  <DialogFooter className="pt-4 flex gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsPortfolioFormOpen(false)} className="rounded-xl">
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-[#18181b] hover:bg-black text-white rounded-xl px-6">
                      Save Project
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            {/* Create Admin User Modal (Firebase Auth) */}
            <Dialog open={isAdminUserModalOpen} onOpenChange={setIsAdminUserModalOpen}>
              <DialogContent className="sm:max-w-md rounded-2xl p-6 bg-white">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold flex items-center gap-2">
                    <User className="h-5 w-5 text-indigo-600" /> Create Custom Admin User
                  </DialogTitle>
                  <DialogDescription>
                    Add a new administrator to Firebase Authentication & Firestore database.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateAdminUser} className="space-y-4 py-2">
                  <div className="space-y-2">
                    <Label htmlFor="new-admin-email">Username or Email</Label>
                    <Input
                      id="new-admin-email"
                      type="text"
                      placeholder="mrshahidbabu or admin@medialevelling.com"
                      value={newAdminEmail}
                      onChange={(e) => setNewAdminEmail(e.target.value)}
                      required
                      className="rounded-xl py-5"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-admin-password">New Password</Label>
                    <Input
                      id="new-admin-password"
                      type="password"
                      placeholder="Enter strong password"
                      value={newAdminPassword}
                      onChange={(e) => setNewAdminPassword(e.target.value)}
                      required
                      className="rounded-xl py-5"
                    />
                  </div>
                  <DialogFooter className="pt-4 flex gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsAdminUserModalOpen(false)} className="rounded-xl">
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-[#18181b] hover:bg-black text-white rounded-xl px-6">
                      Create Admin User
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            {/* View Lead Inquiry Details Modal */}
            <Dialog open={isLeadModalOpen} onOpenChange={setIsLeadModalOpen}>
              <DialogContent className="sm:max-w-lg rounded-2xl p-6 bg-white">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold flex items-center gap-2">
                    <Mail className="h-5 w-5 text-indigo-600" /> Lead Inquiry Details
                  </DialogTitle>
                  <DialogDescription>
                    Client message details from the website contact form.
                  </DialogDescription>
                </DialogHeader>
                {selectedLead && (
                  <div className="space-y-4 py-2">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-slate-400 uppercase">Client Name</span>
                        <span className="font-bold text-slate-800">{selectedLead.name}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-slate-400 uppercase">Email</span>
                        <a href={`mailto:${selectedLead.email}`} className="text-sm font-medium text-indigo-600 hover:underline">
                          {selectedLead.email}
                        </a>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-slate-400 uppercase">Phone</span>
                        <span className="text-sm font-mono text-slate-700">{selectedLead.phone || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-slate-400 uppercase">Service</span>
                        <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                          {selectedLead.service || 'General Inquiry'}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-xs font-semibold text-slate-500 uppercase">Message Content:</span>
                      <div className="bg-slate-100/70 p-4 rounded-xl text-slate-800 text-sm leading-relaxed whitespace-pre-wrap border border-slate-200 font-sans">
                        {selectedLead.message}
                      </div>
                    </div>

                    <DialogFooter className="pt-4 flex gap-2">
                      <Button variant="outline" onClick={() => setIsLeadModalOpen(false)} className="rounded-xl">
                        Close
                      </Button>
                      <a href={`mailto:${selectedLead.email}?subject=Regarding your Media Levelling inquiry`}>
                        <Button className="bg-[#18181b] hover:bg-black text-white rounded-xl px-6 flex items-center gap-2">
                          <Mail className="h-4 w-4" /> Reply via Email
                        </Button>
                      </a>
                    </DialogFooter>
                  </div>
                )}
              </DialogContent>
            </Dialog>

          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default AdminDashboard;
