import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, Clock, ArrowRight, Phone, RefreshCw, ShoppingBag } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const PaymentStatus = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPolling, setIsPolling] = useState(true);

  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchOrderStatus = async (showToast = false) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Order not found');
        }
        throw new Error('Failed to retrieve order status');
      }

      const data = await response.json();
      setOrder(data);
      
      // Stop polling if order has been resolved (approved, rejected, expired)
      if (['approved', 'verified', 'rejected', 'expired'].includes(data.paymentStatus)) {
        setIsPolling(false);
        if (pollIntervalRef.current) {
          clearInterval(pollIntervalRef.current);
        }
      }

      if (showToast) {
        toast.success('Order status updated!');
      }
    } catch (err: any) {
      setError(err.message);
      setIsPolling(false);
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    } finally {
      setLoading(false);
    }
  };

  // Poll for status changes
  useEffect(() => {
    fetchOrderStatus();

    if (isPolling) {
      pollIntervalRef.current = setInterval(() => {
        fetchOrderStatus();
      }, 5000); // Poll every 5 seconds
    }

    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, [orderId, isPolling]);

  if (loading) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
          <div className="text-center space-y-4">
            <RefreshCw className="h-12 w-12 text-indigo-600 animate-spin mx-auto" />
            <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300">Retrieving payment status...</h2>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !order) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
          <Card className="max-w-md w-full border-rose-100 shadow-xl bg-white rounded-2xl">
            <CardHeader className="text-center p-6">
              <XCircle className="h-14 w-14 text-rose-500 mx-auto mb-4" />
              <CardTitle className="text-2xl text-slate-900">Error Locating Order</CardTitle>
              <CardDescription>{error || 'We could not find the specified order ID.'}</CardDescription>
            </CardHeader>
            <CardContent className="text-center pb-6">
              <p className="text-slate-500 text-sm">
                Please double-check the URL or contact support if you believe this is a mistake.
              </p>
            </CardContent>
            <CardFooter className="p-6 border-t bg-slate-50 flex justify-center gap-4">
              <Button onClick={() => navigate('/pricing')} className="bg-[#18181b] hover:bg-black text-white px-6 rounded-xl">
                Go to Pricing
              </Button>
              <Button onClick={() => navigate('/contact')} variant="outline" className="px-6 rounded-xl">
                Contact Support
              </Button>
            </CardFooter>
          </Card>
        </main>
        <Footer />
      </>
    );
  }

  // Get matching styles based on status
  const getStatusDetails = () => {
    switch (order.paymentStatus) {
      case 'approved':
      case 'verified':
        return {
          icon: <CheckCircle2 className="h-16 w-16 text-emerald-500" />,
          title: 'Payment Successful!',
          subtitle: 'Your transaction has been verified and approved.',
          bgClass: 'bg-emerald-50/50 border-emerald-100',
          textColor: 'text-emerald-800'
        };
      case 'rejected':
        return {
          icon: <XCircle className="h-16 w-16 text-rose-500" />,
          title: 'Verification Failed',
          subtitle: 'The submitted transaction UTR could not be verified.',
          bgClass: 'bg-rose-50/50 border-rose-100',
          textColor: 'text-rose-800'
        };
      case 'submitted':
        return {
          icon: <RefreshCw className="h-16 w-16 text-indigo-500 animate-spin" />,
          title: 'Pending Verification',
          subtitle: 'Your transaction is being verified manually against our records.',
          bgClass: 'bg-indigo-50/50 border-indigo-100',
          textColor: 'text-indigo-800'
        };
      case 'expired':
        return {
          icon: <Clock className="h-16 w-16 text-amber-500" />,
          title: 'Order Expired',
          subtitle: 'The 15-minute checkout window has elapsed.',
          bgClass: 'bg-amber-50/50 border-amber-100',
          textColor: 'text-amber-800'
        };
      default: // pending (but not expired yet)
        return {
          icon: <Clock className="h-16 w-16 text-slate-400 animate-pulse" />,
          title: 'Awaiting Payment',
          subtitle: 'Submit your UPI Transaction ID (UTR) to initiate verification.',
          bgClass: 'bg-slate-50 border-slate-100',
          textColor: 'text-slate-800'
        };
    }
  };

  const statusInfo = getStatusDetails();

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-32 pb-20 px-4 md:px-8 flex items-center justify-center">
        <Card className="max-w-2xl w-full border border-slate-200 shadow-2xl bg-white rounded-3xl overflow-hidden transition-all duration-300">
          
          {/* Header Visual */}
          <div className="p-8 flex flex-col items-center text-center border-b border-slate-100 bg-slate-50/30">
            <div className="mb-4">
              {statusInfo.icon}
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {statusInfo.title}
            </h1>
            <p className="text-slate-500 text-base max-w-md mx-auto">
              {statusInfo.subtitle}
            </p>
          </div>

          <CardContent className="p-8 space-y-6">
            
            {/* Status Information Box */}
            <div className={`p-5 rounded-2xl border text-sm ${statusInfo.bgClass} ${statusInfo.textColor} space-y-2`}>
              {order.paymentStatus === 'submitted' && (
                <p className="leading-relaxed">
                  We have received your transaction reference **{order.upiTxnId}**. Our billing administrator is matching it with our incoming bank statements. This page will auto-refresh. You don't need to close this window.
                </p>
              )}
              {order.paymentStatus === 'approved' && (
                <p className="leading-relaxed">
                  Excellent! Your onboarding package is now active. Our project manager will email you at **{order.email}** within 12–24 business hours to schedule your kickoff meeting.
                </p>
              )}
              {order.paymentStatus === 'rejected' && (
                <p className="leading-relaxed">
                  The Transaction ID **{order.upiTxnId}** did not match any of our records for this amount. Please verify the UTR from your bank app statement and retry, or contact our support team.
                </p>
              )}
              {order.paymentStatus === 'expired' && (
                <p className="leading-relaxed">
                  We did not receive a payment transaction submission within 15 minutes. No funds were processed for this order ID. Please go back to our plans and start a new checkout.
                </p>
              )}
              {order.paymentStatus === 'pending' && (
                <p className="leading-relaxed">
                  You haven't submitted your transaction reference yet. Please click the button below to return to checkout, pay the amount, and provide your UTR.
                </p>
              )}
            </div>

            {/* Order Specification List */}
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Order Specifications</h3>
              
              <div className="grid grid-cols-2 gap-4 text-sm bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <div>
                  <span className="text-slate-400 block text-xs font-semibold">Order ID</span>
                  <span className="font-mono font-bold text-slate-800">{order.orderId}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs font-semibold">Product/Service</span>
                  <span className="font-semibold text-slate-800 truncate block">{order.productName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs font-semibold">Total Cost</span>
                  <span className="font-extrabold text-indigo-600 text-lg">Rs. {order.amount.toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs font-semibold">Customer Details</span>
                  <span className="font-semibold text-slate-800 truncate block">{order.customerName}</span>
                </div>
                
                {order.upiTxnId && (
                  <div className="col-span-2 border-t border-slate-200/55 pt-3 mt-1">
                    <span className="text-slate-400 block text-xs font-semibold">Submitted Transaction ID (UTR)</span>
                    <span className="font-mono font-bold text-slate-800 text-base">{order.upiTxnId}</span>
                  </div>
                )}
              </div>
            </div>

          </CardContent>

          {/* Footer Navigation */}
          <CardFooter className="p-6 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-slate-400 text-xs flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              Secure transaction via UPI India
            </div>
            
            <div className="flex gap-3 w-full sm:w-auto justify-end">
              {isPolling && (
                <Button 
                  variant="outline" 
                  onClick={() => fetchOrderStatus(true)} 
                  className="rounded-xl flex gap-2 items-center hover:bg-slate-100 transition-colors"
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh Status
                </Button>
              )}

              {order.paymentStatus === 'pending' ? (
                <Button 
                  onClick={() => navigate(`/checkout?service=${order.productName.split(' ')[0].toLowerCase()}&price=${order.amount}`)}
                  className="bg-[#18181b] hover:bg-black text-white rounded-xl px-6 flex gap-2 items-center"
                >
                  Go to Checkout
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  onClick={() => navigate('/')}
                  className="bg-[#18181b] hover:bg-black text-white rounded-xl px-6 flex gap-2 items-center"
                >
                  Return Home
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </>
  );
};

export default PaymentStatus;
