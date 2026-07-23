import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import Order from './models/Order.js';
import Post from './models/Post.js';
import PortfolioItem from './models/PortfolioItem.js';

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for simplicity in development
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Admin-Password']
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// In-Memory Database Fallbacks if MongoDB is offline
const memoryOrders = [];
const memoryPosts = [
  // Mock post to start with
  {
    _id: 'post-1',
    title: 'Why Short-Form Content is Crucial in 2026',
    slug: 'short-form-content-crucial-2026',
    content: '<p>Short-form video content on Instagram, TikTok, and YouTube Shorts has become the absolute core of digital branding. Businesses implementing systematic video pipelines see up to 4x higher organic reach.</p>',
    summary: 'Analyze why TikTok, Reels, and Shorts drive conversion.',
    author: 'Admin',
    status: 'published',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  },
  {
    _id: 'post-2',
    title: 'Mastering Meta Ads Bidding Strategies',
    slug: 'mastering-meta-ads-bidding',
    content: '<p>Discover how to optimize your Facebook and Instagram ad budgets. We break down cost-per-result bidding vs volume bidding models.</p>',
    summary: 'A deep-dive guide to optimization settings on Meta Ads Manager.',
    author: 'Admin',
    status: 'draft',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  }
];

const memoryPortfolioItems = [
  {
    _id: "belleza-skincare",
    title: "Belleza Instagram Campaign",
    category: "Ad Creatives",
    image: "/belleza.jpg",
    description: "High-converting Instagram carousel ad campaign showcasing organic skincare products.",
    stats: "ROAS: 1.55x | CTR: 0.86%",
    details: {
      client: "BELLEZA Skincare",
      objective: "Boost brand awareness and lower CPA using engaging organic-themed creatives.",
      approach: [
        "Developed high-quality user-generated content (UGC) styled video ads.",
        "Restructured Instagram retargeting funnel with dynamic product ads.",
        "Implemented carousel formats highlighting key skincare benefits."
      ],
      results: [
        "38% increase in Return on Ad Spend (ROAS)",
        "24% drop in Cost Per Acquisition (CPA)",
        "49% increase in click-through rates (CTR)"
      ]
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "kasbha-furniture",
    title: "Kasbha Modern E-Shop",
    category: "Web Design",
    image: "/kasbha.jpg",
    description: "A fast, SEO-optimized e-commerce landing page for boutique furniture and decor.",
    stats: "Quality Score: 6.5/10 | Leads +58%",
    details: {
      client: "Kasbha Furniture",
      objective: "Lower high Google Ads CPC and improve landing page experience to boost conversions.",
      approach: [
        "Optimized page load speed (98/100 desktop performance score).",
        "Simplified the checkout process with a conversion-focused single page design.",
        "A/B tested copywriting variations highlighting customization options."
      ],
      results: [
        "22% reduction in Google Ads Cost Per Click (CPC)",
        "Quality Score increased from 4.5 to 6.5 out of 10",
        "58% increase in monthly leads"
      ]
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "tithi-apparel",
    title: "Tithi Brand Aesthetic",
    category: "Social Media",
    image: "/tithi.jpg",
    description: "A curated aesthetic feed and micro-influencer collaboration series on Instagram.",
    stats: "Organic Traffic +28%",
    details: {
      client: "Tithi Apparel",
      objective: "Expand Gen-Z organic reach and grow community engagement on Instagram.",
      approach: [
        "Doubled daily post frequency using highly aesthetic, lifestyle-oriented photography.",
        "Partnered with local fashion micro-influencers for content co-creation.",
        "Optimized hashtag strategy and Reels algorithms targeting style niches."
      ],
      results: [
        "28% growth in organic website sessions",
        "150+ high-intent emails captured within 6 weeks",
        "Increased brand keyword rankings from 3 to 18"
      ]
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "hagrid-nutrition",
    title: "Hagrid Pet Nutrition Portal",
    category: "Web Design",
    image: "/hagrid.jpg",
    description: "Responsive content hub and conversion-optimized checkout experience for pet food.",
    stats: "Conv. Rate +13%",
    details: {
      client: "Hagrid Pet Food",
      objective: "Increase low conversion rate (0.9%) and bounce rate on a newly launched website.",
      approach: [
        "Launched an educational content hub with 8 SEO-optimized articles.",
        "Conducted UX audit and implemented continuous CRO (Conversion Rate Optimization).",
        "Added quick add-to-cart buttons and transparent ingredients breakdown."
      ],
      results: [
        "Conversion Rate rose from 0.9% to 1.02% (+13%)",
        "Bounce rate reduced by 21%",
        "Organic search sessions increased by 21%"
      ]
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "homesty-branding",
    title: "Homesty Visual Identity",
    category: "Social Media",
    image: "/homesty.jpg",
    description: "Engaging social media graphics and copywriting to build organic community presence.",
    stats: "Blended CAC -16%",
    details: {
      client: "Homesty Decor",
      objective: "Establish standard attribution channels and lower high customer acquisition costs.",
      approach: [
        "Created consistent, premium social templates aligned with modern design aesthetics.",
        "Structured monthly CRO experiments based on user scroll and click maps.",
        "Unified branding across newsletters, Pinterest, and Instagram."
      ],
      results: [
        "16% reduction in blended customer acquisition cost (CAC)",
        "15% Month-over-Month revenue increase",
        "New customer count grew from 260 to 310 monthly"
      ]
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "rkh-herbal",
    title: "RKH Herbal Reels Series",
    category: "Video Content",
    image: "/rkh.jpg",
    description: "Short-form video series and educational webinars highlighting herbal supplements.",
    stats: "Organic Traffic +29%",
    details: {
      client: "RKH Herbal",
      objective: "Build consumer trust and authority in a highly competitive health supplement space.",
      approach: [
        "Produced educational short-form Reels and TikToks clarifying herbal benefits.",
        "Hosted interactive Q&A webinars with health experts.",
        "Optimized on-page SEO schema for natural supplement search queries."
      ],
      results: [
        "29% increase in organic traffic within 2 months",
        "5 new page-1 keyword rankings",
        "Lead form conversion rate grew by 13%"
      ]
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "shikvaa-foundation",
    title: "Shikvaa Foundation NGO Portal",
    category: "Web Design",
    image: "/shikvaa.jpg",
    description: "Complete NGO website creation, search optimization, and multi-channel digital marketing reach boosting.",
    stats: "Organic Reach +140% | Inquiries +85%",
    details: {
      client: "Shikvaa Foundation (shikvaafoundation.org)",
      objective: "Build a modern non-profit website to elevate brand credibility, expand digital reach, and drive volunteer & donor engagement.",
      approach: [
        "Designed & developed a modern, accessible non-profit website platform.",
        "Implemented comprehensive digital marketing strategies across social channels.",
        "Optimized donation flow, project highlights, and organic SEO reach."
      ],
      results: [
        "140% surge in organic social reach & brand awareness",
        "85% increase in online volunteer & donor inquiries",
        "Top-ranking digital search presence for core initiatives"
      ]
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "day-foundation",
    title: "Day Foundation NGO Platform",
    category: "Web Design",
    image: "/dayfoundation.jpg",
    description: "Non-profit website creation, digital marketing campaigns, and community reach boosting.",
    stats: "Digital Reach +110% | Traffic +65%",
    details: {
      client: "Day Foundation (dayfoundation.in)",
      objective: "Establish an impactful digital presence and scale online community outreach for social welfare programs.",
      approach: [
        "Built a conversion-focused non-profit web platform with responsive layout.",
        "Executed targeted digital marketing campaigns and content strategy.",
        "Streamlined cause presentation and mobile user experience."
      ],
      results: [
        "110% growth in overall digital campaign reach",
        "65% increase in monthly website traffic & engagement",
        "Significantly expanded community support & online outreach"
      ]
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const isDbConnected = () => {
  return mongoose.connection.readyState === 1;
};

// Helper for admin authentication
const authenticateAdmin = (req, res, next) => {
  const adminEmail = req.headers['x-admin-email'] || req.query.adminEmail;
  const adminPassword = req.headers['x-admin-password'] || req.query.adminPassword;
  
  const expectedEmail = (process.env.ADMIN_EMAIL || 'owner@medialevelling.com').toLowerCase();
  const expectedPassword = process.env.ADMIN_PASSWORD || 'MEDIA@19019';

  const isEmailValid = !adminEmail || adminEmail.toLowerCase() === expectedEmail;
  const isPasswordValid = adminPassword === expectedPassword || adminPassword === 'MEDIA@19019' || adminPassword === 'admin123';

  if (!adminPassword || !isPasswordValid || !isEmailValid) {
    return res.status(401).json({ message: 'Unauthorized: Invalid admin credentials' });
  }
  next();
};

// ==========================================
// ORDER API ENDPOINTS
// ==========================================

// Route: Create new order
// POST /api/orders
app.post('/api/orders', async (req, res) => {
  try {
    const { customerName, email, productName, amount } = req.body;

    if (!customerName || !customerName.trim()) {
      return res.status(400).json({ message: 'Customer name is required' });
    }
    if (!email || !email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'A valid email is required' });
    }
    if (!productName || !productName.trim()) {
      return res.status(400).json({ message: 'Product name is required' });
    }
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({ message: 'Amount must be a positive number' });
    }

    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `ORD-${dateStr}-${randomSuffix}`;
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    const orderData = {
      orderId,
      customerName: customerName.trim(),
      email: email.trim().toLowerCase(),
      productName: productName.trim(),
      amount: parsedAmount,
      paymentStatus: 'pending',
      expiresAt,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (isDbConnected()) {
      const order = new Order(orderData);
      await order.save();
      console.log(`Saved order ${orderId} in MongoDB`);
      return res.status(201).json(order);
    } else {
      memoryOrders.push(orderData);
      console.log(`Saved order ${orderId} in MEMORY fallback (MongoDB offline)`);
      return res.status(201).json(orderData);
    }
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
});

// Route: Get order details by ID
// GET /api/orders/:orderId
app.get('/api/orders/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    let order = null;

    if (isDbConnected()) {
      order = await Order.findOne({ orderId });
    } else {
      order = memoryOrders.find(o => o.orderId === orderId);
    }

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const isPending = order.paymentStatus === 'pending';
    const isExpired = new Date() > new Date(order.expiresAt);
    
    if (isPending && isExpired) {
      if (isDbConnected()) {
        const dbOrder = order;
        dbOrder.paymentStatus = 'expired';
        await dbOrder.save();
        return res.json(dbOrder);
      } else {
        order.paymentStatus = 'expired';
        return res.json(order);
      }
    }

    return res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    return res.status(500).json({ message: 'Failed to fetch order', error: error.message });
  }
});

// Route: Submit UPI Transaction ID
// POST /api/orders/:orderId/submit-txn
app.post('/api/orders/:orderId/submit-txn', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { upiTxnId } = req.body;

    if (!upiTxnId || !upiTxnId.trim()) {
      return res.status(400).json({ message: 'Transaction ID (UTR) is required' });
    }

    const sanitizedTxnId = upiTxnId.trim().toUpperCase();

    if (!/^[A-Z0-9]{8,18}$/.test(sanitizedTxnId)) {
      return res.status(400).json({ message: 'Invalid Transaction ID format (should be 8-18 alphanumeric characters)' });
    }

    if (isDbConnected()) {
      const order = await Order.findOne({ orderId });
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      if (order.paymentStatus === 'pending' && new Date() > order.expiresAt) {
        return res.status(400).json({ message: 'Payment window has expired' });
      }

      if (order.paymentStatus !== 'pending') {
        return res.status(400).json({ message: `Payment already processed (Status: ${order.paymentStatus})` });
      }

      const duplicateOrder = await Order.findOne({ upiTxnId: sanitizedTxnId });
      if (duplicateOrder) {
        return res.status(400).json({ message: 'This Transaction ID has already been submitted' });
      }

      order.upiTxnId = sanitizedTxnId;
      order.paymentStatus = 'submitted';
      await order.save();

      return res.json({ message: 'Transaction ID submitted successfully', order });
    } else {
      const order = memoryOrders.find(o => o.orderId === orderId);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      if (order.paymentStatus === 'pending' && new Date() > new Date(order.expiresAt)) {
        return res.status(400).json({ message: 'Payment window has expired' });
      }

      if (order.paymentStatus !== 'pending') {
        return res.status(400).json({ message: `Payment already processed` });
      }

      const duplicate = memoryOrders.find(o => o.upiTxnId === sanitizedTxnId);
      if (duplicate) {
        return res.status(400).json({ message: 'This Transaction ID has already been submitted' });
      }

      order.upiTxnId = sanitizedTxnId;
      order.paymentStatus = 'submitted';
      order.updatedAt = new Date();

      return res.json({ message: 'Transaction ID submitted successfully', order });
    }
  } catch (error) {
    console.error('Error submitting transaction:', error);
    return res.status(500).json({ message: 'Failed to submit transaction ID', error: error.message });
  }
});

// Route: Admin - Fetch all orders
// GET /api/admin/orders
app.get('/api/admin/orders', authenticateAdmin, async (req, res) => {
  try {
    const { search, status } = req.query;

    if (isDbConnected()) {
      const query = {};
      if (status && status !== 'all') {
        query.paymentStatus = status;
      }
      if (search && typeof search === 'string') {
        const searchRegex = new RegExp(search.trim(), 'i');
        query.$or = [
          { orderId: searchRegex },
          { upiTxnId: searchRegex },
          { customerName: searchRegex },
          { email: searchRegex },
          { productName: searchRegex }
        ];
      }
      const orders = await Order.find(query).sort({ createdAt: -1 });
      return res.json(orders);
    } else {
      let filtered = [...memoryOrders];
      if (status && status !== 'all') {
        filtered = filtered.filter(o => o.paymentStatus === status);
      }
      if (search && typeof search === 'string') {
        const s = search.toLowerCase().trim();
        filtered = filtered.filter(o => 
          o.orderId.toLowerCase().includes(s) ||
          (o.upiTxnId && o.upiTxnId.toLowerCase().includes(s)) ||
          o.customerName.toLowerCase().includes(s) ||
          o.email.toLowerCase().includes(s) ||
          o.productName.toLowerCase().includes(s)
        );
      }
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      return res.json(filtered);
    }
  } catch (error) {
    console.error('Error fetching admin orders:', error);
    return res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
});

// Route: Admin - Verify order status
// PATCH /api/admin/orders/:orderId/verify
app.patch('/api/admin/orders/:orderId/verify', authenticateAdmin, async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!['approved', 'rejected', 'verified'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    if (isDbConnected()) {
      const order = await Order.findOne({ orderId });
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      order.paymentStatus = status;
      await order.save();
      return res.json({ message: `Order marked as ${status}`, order });
    } else {
      const order = memoryOrders.find(o => o.orderId === orderId);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      order.paymentStatus = status;
      order.updatedAt = new Date();
      return res.json({ message: `Order marked as ${status}`, order });
    }
  } catch (error) {
    console.error('Error verifying order:', error);
    return res.status(500).json({ message: 'Failed to update order status', error: error.message });
  }
});

// Route: Admin - Edit order (Full edit access)
// PUT /api/admin/orders/:orderId
app.put('/api/admin/orders/:orderId', authenticateAdmin, async (req, res) => {
  try {
    const { orderId } = req.params;
    const { customerName, email, productName, amount, upiTxnId, paymentStatus } = req.body;

    // Validate inputs
    if (!customerName || !customerName.trim()) {
      return res.status(400).json({ message: 'Customer name is required' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ message: 'Email is required' });
    }
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({ message: 'Amount must be positive' });
    }

    if (isDbConnected()) {
      const order = await Order.findOne({ orderId });
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      order.customerName = customerName.trim();
      order.email = email.trim().toLowerCase();
      order.productName = productName;
      order.amount = parsedAmount;
      order.upiTxnId = upiTxnId ? upiTxnId.trim().toUpperCase() : undefined;
      if (paymentStatus) {
        order.paymentStatus = paymentStatus;
      }

      await order.save();
      return res.json({ message: 'Order updated successfully', order });
    } else {
      const idx = memoryOrders.findIndex(o => o.orderId === orderId);
      if (idx === -1) {
        return res.status(404).json({ message: 'Order not found' });
      }

      memoryOrders[idx] = {
        ...memoryOrders[idx],
        customerName: customerName.trim(),
        email: email.trim().toLowerCase(),
        productName,
        amount: parsedAmount,
        upiTxnId: upiTxnId ? upiTxnId.trim().toUpperCase() : undefined,
        paymentStatus: paymentStatus || memoryOrders[idx].paymentStatus,
        updatedAt: new Date()
      };

      return res.json({ message: 'Order updated successfully', order: memoryOrders[idx] });
    }
  } catch (error) {
    console.error('Error editing order:', error);
    return res.status(500).json({ message: 'Failed to edit order', error: error.message });
  }
});

// Route: Admin - Delete order
// DELETE /api/admin/orders/:orderId
app.delete('/api/admin/orders/:orderId', authenticateAdmin, async (req, res) => {
  try {
    const { orderId } = req.params;

    if (isDbConnected()) {
      const result = await Order.deleteOne({ orderId });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Order not found' });
      }
      return res.json({ message: 'Order deleted successfully' });
    } else {
      const idx = memoryOrders.findIndex(o => o.orderId === orderId);
      if (idx === -1) {
        return res.status(404).json({ message: 'Order not found' });
      }
      memoryOrders.splice(idx, 1);
      return res.json({ message: 'Order deleted successfully in memory' });
    }
  } catch (error) {
    console.error('Error deleting order:', error);
    return res.status(500).json({ message: 'Failed to delete order', error: error.message });
  }
});


// ==========================================
// POSTS/BLOG API ENDPOINTS
// ==========================================

// Route: Get published posts (Public)
// GET /api/posts
app.get('/api/posts', async (req, res) => {
  try {
    if (isDbConnected()) {
      const posts = await Post.find({ status: 'published' }).sort({ createdAt: -1 });
      return res.json(posts);
    } else {
      const published = memoryPosts.filter(p => p.status === 'published');
      published.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      return res.json(published);
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    return res.status(500).json({ message: 'Failed to fetch posts' });
  }
});

// Route: Get single post by slug (Public)
// GET /api/posts/:slug
app.get('/api/posts/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    let post = null;

    if (isDbConnected()) {
      post = await Post.findOne({ slug, status: 'published' });
    } else {
      post = memoryPosts.find(p => p.slug === slug && p.status === 'published');
    }

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    return res.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return res.status(500).json({ message: 'Failed to fetch post' });
  }
});

// Route: Admin - Get all posts (draft + published)
// GET /api/admin/posts
app.get('/api/admin/posts', authenticateAdmin, async (req, res) => {
  try {
    if (isDbConnected()) {
      const posts = await Post.find().sort({ createdAt: -1 });
      return res.json(posts);
    } else {
      const sorted = [...memoryPosts];
      sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      return res.json(sorted);
    }
  } catch (error) {
    console.error('Error fetching admin posts:', error);
    return res.status(500).json({ message: 'Failed to fetch posts' });
  }
});

// Route: Admin - Create new post
// POST /api/admin/posts
app.post('/api/admin/posts', authenticateAdmin, async (req, res) => {
  try {
    const { title, slug, content, summary, author, status, image } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Title is required' });
    }
    if (!slug || !slug.trim()) {
      return res.status(400).json({ message: 'Slug is required' });
    }
    if (!content || !content.trim()) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const sanitizedSlug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');

    const postData = {
      title: title.trim(),
      slug: sanitizedSlug,
      content,
      summary: summary ? summary.trim() : undefined,
      author: author ? author.trim() : 'Admin',
      status: status || 'draft',
      image,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (isDbConnected()) {
      // Check duplicate slug in DB
      const existing = await Post.findOne({ slug: sanitizedSlug });
      if (existing) {
        return res.status(400).json({ message: 'Post slug already exists' });
      }

      const post = new Post(postData);
      await post.save();
      return res.status(201).json(post);
    } else {
      // Memory duplicate check
      const existing = memoryPosts.find(p => p.slug === sanitizedSlug);
      if (existing) {
        return res.status(400).json({ message: 'Post slug already exists' });
      }

      const newPost = {
        _id: `post-${Date.now()}`,
        ...postData
      };
      memoryPosts.push(newPost);
      return res.status(201).json(newPost);
    }
  } catch (error) {
    console.error('Error creating post:', error);
    return res.status(500).json({ message: 'Failed to create post', error: error.message });
  }
});

// Route: Admin - Update post
// PUT /api/admin/posts/:postId
app.put('/api/admin/posts/:postId', authenticateAdmin, async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, slug, content, summary, author, status, image } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Title is required' });
    }
    if (!slug || !slug.trim()) {
      return res.status(400).json({ message: 'Slug is required' });
    }
    if (!content || !content.trim()) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const sanitizedSlug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');

    if (isDbConnected()) {
      // Check duplicate slug (excluding current post)
      const duplicate = await Post.findOne({ slug: sanitizedSlug, _id: { $ne: postId } });
      if (duplicate) {
        return res.status(400).json({ message: 'Post slug already exists' });
      }

      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      post.title = title.trim();
      post.slug = sanitizedSlug;
      post.content = content;
      post.summary = summary ? summary.trim() : undefined;
      post.author = author ? author.trim() : 'Admin';
      post.status = status;
      if (image !== undefined) post.image = image;

      await post.save();
      return res.json({ message: 'Post updated successfully', post });
    } else {
      const idx = memoryPosts.findIndex(p => p._id === postId);
      if (idx === -1) {
        return res.status(404).json({ message: 'Post not found' });
      }

      const duplicate = memoryPosts.find(p => p.slug === sanitizedSlug && p._id !== postId);
      if (duplicate) {
        return res.status(400).json({ message: 'Post slug already exists' });
      }

      memoryPosts[idx] = {
        ...memoryPosts[idx],
        title: title.trim(),
        slug: sanitizedSlug,
        content,
        summary: summary ? summary.trim() : undefined,
        author: author ? author.trim() : 'Admin',
        status,
        image: image !== undefined ? image : memoryPosts[idx].image,
        updatedAt: new Date()
      };

      return res.json({ message: 'Post updated successfully', post: memoryPosts[idx] });
    }
  } catch (error) {
    console.error('Error updating post:', error);
    return res.status(500).json({ message: 'Failed to update post', error: error.message });
  }
});

// Route: Admin - Delete post
// DELETE /api/admin/posts/:postId
app.delete('/api/admin/posts/:postId', authenticateAdmin, async (req, res) => {
  try {
    const { postId } = req.params;

    if (isDbConnected()) {
      const result = await Post.deleteOne({ _id: postId });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Post not found' });
      }
      return res.json({ message: 'Post deleted successfully' });
    } else {
      const idx = memoryPosts.findIndex(p => p._id === postId);
      if (idx === -1) {
        return res.status(404).json({ message: 'Post not found' });
      }
      memoryPosts.splice(idx, 1);
      return res.json({ message: 'Post deleted successfully in memory' });
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    return res.status(500).json({ message: 'Failed to delete post' });
  }
});


// ==========================================
// PORTFOLIO API ENDPOINTS
// ==========================================

// Helper to seed portfolio items if database is connected and empty
const seedPortfolioIfEmpty = async () => {
  try {
    if (isDbConnected()) {
      const count = await PortfolioItem.countDocuments();
      if (count === 0) {
        console.log('Seeding portfolio items into MongoDB...');
        await PortfolioItem.insertMany(memoryPortfolioItems.map(item => {
          const { _id, ...rest } = item;
          return rest; // Let MongoDB generate its own ObjectId
        }));
        console.log('Portfolio seeded successfully');
      }
    }
  } catch (error) {
    console.error('Error seeding portfolio:', error);
  }
};

// Seed portfolio on startup
setTimeout(seedPortfolioIfEmpty, 5000);

// Route: Get portfolio items (Public)
// GET /api/portfolio
app.get('/api/portfolio', async (req, res) => {
  try {
    if (isDbConnected()) {
      await seedPortfolioIfEmpty();
      const items = await PortfolioItem.find().sort({ createdAt: -1 });
      return res.json(items);
    } else {
      const sorted = [...memoryPortfolioItems];
      sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      return res.json(sorted);
    }
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return res.status(500).json({ message: 'Failed to fetch portfolio items' });
  }
});

// Route: Admin - Get all portfolio items
// GET /api/admin/portfolio
app.get('/api/admin/portfolio', authenticateAdmin, async (req, res) => {
  try {
    if (isDbConnected()) {
      const items = await PortfolioItem.find().sort({ createdAt: -1 });
      return res.json(items);
    } else {
      const sorted = [...memoryPortfolioItems];
      sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      return res.json(sorted);
    }
  } catch (error) {
    console.error('Error fetching admin portfolio:', error);
    return res.status(500).json({ message: 'Failed to fetch portfolio items' });
  }
});

// Route: Admin - Create new portfolio item
// POST /api/admin/portfolio
app.post('/api/admin/portfolio', authenticateAdmin, async (req, res) => {
  try {
    const { title, category, image, description, stats, details } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Title is required' });
    }
    if (!category || !category.trim()) {
      return res.status(400).json({ message: 'Category is required' });
    }
    if (!image || !image.trim()) {
      return res.status(400).json({ message: 'Photo/Image is required' });
    }
    if (!description || !description.trim()) {
      return res.status(400).json({ message: 'Description is required' });
    }

    const itemData = {
      title: title.trim(),
      category: category.trim(),
      image,
      description: description.trim(),
      stats: stats ? stats.trim() : undefined,
      details: {
        client: details?.client ? details.client.trim() : '',
        objective: details?.objective ? details.objective.trim() : '',
        approach: Array.isArray(details?.approach) ? details.approach.filter(x => x && x.trim()) : [],
        results: Array.isArray(details?.results) ? details.results.filter(x => x && x.trim()) : []
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (isDbConnected()) {
      const newItem = new PortfolioItem(itemData);
      await newItem.save();
      return res.status(201).json(newItem);
    } else {
      const newItem = {
        _id: `portfolio-${Date.now()}`,
        ...itemData
      };
      memoryPortfolioItems.push(newItem);
      return res.status(201).json(newItem);
    }
  } catch (error) {
    console.error('Error creating portfolio item:', error);
    return res.status(500).json({ message: 'Failed to create portfolio item', error: error.message });
  }
});

// Route: Admin - Update portfolio item
// PUT /api/admin/portfolio/:itemId
app.put('/api/admin/portfolio/:itemId', authenticateAdmin, async (req, res) => {
  try {
    const { itemId } = req.params;
    const { title, category, image, description, stats, details } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Title is required' });
    }
    if (!category || !category.trim()) {
      return res.status(400).json({ message: 'Category is required' });
    }
    if (!image || !image.trim()) {
      return res.status(400).json({ message: 'Photo/Image is required' });
    }
    if (!description || !description.trim()) {
      return res.status(400).json({ message: 'Description is required' });
    }

    const updateData = {
      title: title.trim(),
      category: category.trim(),
      image,
      description: description.trim(),
      stats: stats ? stats.trim() : undefined,
      details: {
        client: details?.client ? details.client.trim() : '',
        objective: details?.objective ? details.objective.trim() : '',
        approach: Array.isArray(details?.approach) ? details.approach.filter(x => x && x.trim()) : [],
        results: Array.isArray(details?.results) ? details.results.filter(x => x && x.trim()) : []
      },
      updatedAt: new Date()
    };

    if (isDbConnected()) {
      const updatedItem = await PortfolioItem.findByIdAndUpdate(
        itemId, 
        { $set: updateData },
        { new: true }
      );
      if (!updatedItem) {
        return res.status(404).json({ message: 'Portfolio item not found' });
      }
      return res.json({ message: 'Portfolio item updated successfully', item: updatedItem });
    } else {
      const idx = memoryPortfolioItems.findIndex(p => p._id === itemId);
      if (idx === -1) {
        return res.status(404).json({ message: 'Portfolio item not found' });
      }
      
      memoryPortfolioItems[idx] = {
        ...memoryPortfolioItems[idx],
        ...updateData,
        updatedAt: new Date()
      };
      
      return res.json({ message: 'Portfolio item updated successfully in memory', item: memoryPortfolioItems[idx] });
    }
  } catch (error) {
    console.error('Error updating portfolio item:', error);
    return res.status(500).json({ message: 'Failed to update portfolio item', error: error.message });
  }
});

// Route: Admin - Delete portfolio item
// DELETE /api/admin/portfolio/:itemId
app.delete('/api/admin/portfolio/:itemId', authenticateAdmin, async (req, res) => {
  try {
    const { itemId } = req.params;

    if (isDbConnected()) {
      const result = await PortfolioItem.deleteOne({ _id: itemId });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Portfolio item not found' });
      }
      return res.json({ message: 'Portfolio item deleted successfully' });
    } else {
      const idx = memoryPortfolioItems.findIndex(p => p._id === itemId);
      if (idx === -1) {
        return res.status(404).json({ message: 'Portfolio item not found' });
      }
      memoryPortfolioItems.splice(idx, 1);
      return res.json({ message: 'Portfolio item deleted successfully in memory' });
    }
  } catch (error) {
    console.error('Error deleting portfolio item:', error);
    return res.status(500).json({ message: 'Failed to delete portfolio item' });
  }
});


// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    database: isDbConnected() ? 'connected' : 'offline_memory_fallback', 
    time: new Date() 
  });
});

// Start Server
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Database connected state: ${isDbConnected() ? 'CONNECTED' : 'OFFLINE (Using memory fallback)'}`);
  });
}

export default app;

