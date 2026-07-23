import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import QRCode from 'qrcode';
import { ArrowLeft, CheckCircle, ShieldCheck, Clock, CreditCard, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Selected item from query params
  const serviceKey = searchParams.get('service') || 'Custom Service';
  const planName = searchParams.get('plan') || 'Default';
  const priceParam = searchParams.get('price');
  
  // Format price nicely
  const serviceTitle = serviceKey.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const defaultAmount = priceParam ? parseFloat(priceParam) : 9999;

  // Checkout states
  const [step, setStep] = useState(1); // 1 = Details form, 2 = UPI QR Payment
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState(defaultAmount);
  
  // Order details from backend
  const [order, setOrder] = useState<any>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const [transactionId, setTransactionId] = useState('');
  const [isSubmittingTxn, setIsSubmittingTxn] = useState(false);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [copied, setCopied] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Parse custom price edits if amount changes (security validation will happen on backend)
  useEffect(() => {
    if (priceParam) {
      setAmount(parseFloat(priceParam));
    }
  }, [priceParam]);

  // Timer countdown handler
  useEffect(() => {
    if (step === 2 && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            toast.error("Payment session expired!");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [step, timeLeft]);

  // Format time (MM:SS)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Step 1: Submit user info and create order on backend
  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim() || !email.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsCreatingOrder(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName,
          email,
          productName: `${serviceTitle} (${planName.toUpperCase()} Plan)`,
          amount,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create order');
      }

      setOrder(data);
      
      // Calculate remaining time if page reloads (for fresh order, it is 15 minutes)
      const expiresAt = new Date(data.expiresAt).getTime();
      const now = new Date().getTime();
      const diffSecs = Math.max(0, Math.floor((expiresAt - now) / 1000));
      setTimeLeft(diffSecs);

      // Generate dynamic UPI Payment link
      // Format: upi://pay?pa=rajababuwritten@ptaxis&pn=RajaBabuWritten&am={amount}&cu=INR&tn=Order-{orderId}
      const upiLink = `upi://pay?pa=rajababuwritten@ptaxis&pn=RajaBabuWritten&am=${data.amount}&cu=INR&tn=Order-${data.orderId}`;
      
      // Generate QR Code
      const qrDataUrl = await QRCode.toDataURL(upiLink, {
        width: 320,
        margin: 2,
        color: {
          dark: '#18181b', // Dark color matching theme
          light: '#ffffff', // Background
        },
      });

      setQrCodeUrl(qrDataUrl);
      setStep(2);
      toast.success('Order created successfully! Please scan and pay.');
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong');
    } finally {
      setIsCreatingOrder(false);
    }
  };

  // Step 2: Submit transaction ID (UTR) to backend
  const handleSubmitTransaction = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!transactionId.trim()) {
      toast.error('Please enter the UPI Transaction ID');
      return;
    }

    if (timeLeft <= 0) {
      toast.error('Payment window has expired. Please create a new order.');
      return;
    }

    setIsSubmittingTxn(true);

    try {
      const response = await fetch(`/api/orders/${order.orderId}/submit-txn`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          upiTxnId: transactionId.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit transaction ID');
      }

      toast.success('Transaction submitted! Redirecting to status page...');
      setTimeout(() => {
        navigate(`/payment-status/${order.orderId}`);
      }, 1500);
    } catch (error: any) {
      toast.error(error.message || 'Verification submission failed');
    } finally {
      setIsSubmittingTxn(false);
    }
  };

  // Copy UPI link to clipboard (useful for manual pasting/mobile)
  const copyUpiLink = () => {
    if (!order) return;
    const upiLink = `upi://pay?pa=rajababuwritten@ptaxis&pn=RajaBabuWritten&am=${order.amount}&cu=INR&tn=Order-${order.orderId}`;
    navigator.clipboard.writeText(upiLink);
    setCopied(true);
    toast.success('UPI Payment Link copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button 
              onClick={() => step === 2 ? setStep(1) : navigate(-1)}
              className="p-2 bg-white dark:bg-slate-800 rounded-full border border-gray-200 dark:border-slate-700 hover:bg-gray-100 transition-colors shadow-sm"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Secure Checkout
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                {step === 1 ? 'Enter your contact details to generate the invoice' : 'Scan the QR code using any UPI App to pay'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step Content */}
            <div className="md:col-span-2">
              {step === 1 ? (
                <Card className="border border-slate-200 shadow-xl bg-white rounded-2xl overflow-hidden">
                  <CardHeader className="border-b border-slate-100 p-6">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-indigo-600" />
                      Checkout Details
                    </CardTitle>
                    <CardDescription>
                      Provide your email and name. We will use this information to send you your receipt and start the service onboarding.
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleCreateOrder}>
                    <CardContent className="space-y-6 p-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          placeholder="e.g. John Doe"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          required
                          className="rounded-xl py-6"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="e.g. john@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="rounded-xl py-6"
                        />
                      </div>
                      <div className="rounded-xl bg-indigo-50 border border-indigo-100 p-4 flex gap-3 items-start">
                        <ShieldCheck className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
                        <div className="text-sm text-indigo-900 leading-relaxed">
                          Your purchase is secure. We use encrypted APIs and require manual transaction validation to prevent fraudulent or duplicate payments.
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t border-slate-100 p-6 flex justify-end bg-slate-50/50">
                      <Button
                        type="submit"
                        disabled={isCreatingOrder}
                        className="bg-[#18181b] hover:bg-black text-white px-8 py-6 rounded-xl font-semibold text-base transition-all transform hover:scale-[1.02]"
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                      >
                        {isCreatingOrder ? 'Generating QR Code...' : 'Proceed to Pay'}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              ) : (
                <Card className="border border-slate-200 shadow-xl bg-white rounded-2xl overflow-hidden">
                  <CardHeader className="border-b border-slate-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Clock className="h-5 w-5 text-amber-500 animate-pulse" />
                        Complete Payment
                      </CardTitle>
                      <CardDescription>
                        Scan the UPI QR code below and complete the transaction.
                      </CardDescription>
                    </div>
                    {/* Countdown Timer */}
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-base font-semibold ${
                      timeLeft < 180 
                        ? 'bg-rose-50 border-rose-200 text-rose-600 animate-pulse' 
                        : 'bg-amber-50 border-amber-200 text-amber-700'
                    }`}>
                      <Clock className="h-4 w-4" />
                      <span>Expires in: {formatTime(timeLeft)}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-8 flex flex-col items-center">
                    {/* QR Code Container */}
                    <div className="relative p-4 bg-white border border-slate-200 rounded-2xl shadow-inner flex flex-col items-center justify-center">
                      {timeLeft <= 0 ? (
                        <div className="absolute inset-0 bg-white/95 rounded-2xl flex flex-col items-center justify-center p-4 text-center z-10">
                          <span className="text-rose-500 text-4xl mb-2 font-bold">EXPIRED</span>
                          <p className="text-slate-500 text-sm max-w-xs">
                            The 15-minute payment window has expired. Please go back and create a new checkout session.
                          </p>
                        </div>
                      ) : null}

                      {qrCodeUrl ? (
                        <img 
                          src={qrCodeUrl} 
                          alt="UPI Payment QR Code" 
                          className={`w-64 h-64 md:w-72 md:h-72 object-contain transition-opacity duration-300 ${timeLeft <= 0 ? 'opacity-20 grayscale' : 'opacity-100'}`} 
                        />
                      ) : (
                        <div className="w-64 h-64 md:w-72 md:h-72 flex items-center justify-center bg-slate-100 rounded-xl animate-pulse text-slate-400">
                          Loading QR Code...
                        </div>
                      )}
                      
                      <div className="mt-2 text-center">
                        <span className="text-xs text-slate-400 tracking-wider font-semibold">UPI ID: rajababuwritten@ptaxis</span>
                      </div>
                    </div>

                    {/* Quick UPI Link for Mobile Users */}
                    <div className="w-full max-w-sm flex flex-col gap-3">
                      <a
                        href={timeLeft > 0 ? `upi://pay?pa=rajababuwritten@ptaxis&pn=RajaBabuWritten&am=${order.amount}&cu=INR&tn=Order-${order.orderId}` : '#'}
                        onClick={(e) => {
                          if (timeLeft <= 0) {
                            e.preventDefault();
                            toast.error("Session expired!");
                          }
                        }}
                        className={`w-full text-center py-4 rounded-xl font-bold flex items-center justify-center gap-2 border transition-all ${
                          timeLeft <= 0 
                            ? 'bg-slate-100 border-slate-200 text-slate-400 pointer-events-none' 
                            : 'bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:scale-[1.02]'
                        }`}
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                      >
                        <CreditCard className="h-5 w-5" />
                        Pay via UPI App (Mobile Only)
                      </a>
                      
                      <button
                        onClick={copyUpiLink}
                        type="button"
                        className="w-full py-3 border border-slate-300 dark:border-slate-700 rounded-xl hover:bg-slate-50 text-slate-700 dark:text-slate-300 text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                      >
                        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        {copied ? 'Copied Payment Link' : 'Copy Payment Link'}
                      </button>
                    </div>

                    <div className="w-full border-t border-slate-100 my-4" />

                    {/* UTR Input Form */}
                    <form onSubmit={handleSubmitTransaction} className="w-full max-w-md space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="utr" className="font-semibold text-slate-800">
                          Enter UPI Transaction ID (UTR)
                        </Label>
                        <Input
                          id="utr"
                          placeholder="e.g. 212345678901 (12 digits)"
                          value={transactionId}
                          onChange={(e) => setTransactionId(e.target.value)}
                          disabled={timeLeft <= 0 || isSubmittingTxn}
                          required
                          className="rounded-xl py-6 uppercase tracking-wider text-center text-lg font-mono font-semibold"
                        />
                        <p className="text-xs text-slate-500 text-center leading-relaxed">
                          After completing the payment in your UPI app, find the **12-digit UTR / Ref No / Transaction ID** and input it above to verify your transfer.
                        </p>
                      </div>
                      <Button
                        type="submit"
                        disabled={timeLeft <= 0 || isSubmittingTxn}
                        className="w-full bg-[#18181b] hover:bg-black text-white py-6 rounded-xl font-bold text-base transition-transform transform hover:scale-[1.02]"
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                      >
                        {isSubmittingTxn ? 'Submitting Details...' : 'Submit Transaction ID'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar Summary */}
            <div className="md:col-span-1">
              <Card className="border border-slate-200 bg-white rounded-2xl shadow-lg p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Order Summary
                  </h3>
                  <p className="text-sm text-slate-500">
                    Selected package details
                  </p>
                </div>
                
                <div className="border-t border-slate-100 pt-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-slate-800">{serviceTitle}</h4>
                      <p className="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full inline-block mt-1 font-semibold uppercase">
                        {planName} Plan
                      </p>
                    </div>
                  </div>
                  
                  {order && (
                    <div className="text-xs text-slate-500 space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="flex justify-between">
                        <span>Order ID:</span>
                        <span className="font-mono font-semibold text-slate-700">{order.orderId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Client:</span>
                        <span className="font-semibold text-slate-700">{order.customerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Email:</span>
                        <span className="text-slate-700 truncate max-w-[140px]">{order.email}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                  <span className="text-slate-600 font-medium">Total Amount</span>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Rs. {amount.toLocaleString('en-IN')}
                    </span>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Inclusive of all fees</p>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-2 text-xs text-slate-400">
                  <div className="flex gap-2 items-center">
                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Refund eligible if transaction fails</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>24/7 dedicated support desk</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Checkout;
