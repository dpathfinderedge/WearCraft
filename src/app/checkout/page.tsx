// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useCartStore, useAuthStore, useOrderStore } from '@/store';
// import { CheckoutForm, OrderSummary } from '@/components/checkout';
// import { Button, LoadingOverlay } from '@/components/ui';
// import { AddressInput } from '@/lib/validations';
// import { useToast } from '@/components/ui';
// import { ShieldCheck } from 'lucide-react';

// export default function CheckoutPage() {
//   const router = useRouter();
//   const { showToast } = useToast();
//   const { items, getCartSummary, clearCart } = useCartStore();
//   const { user, isAuthenticated } = useAuthStore();
//   const { createOrder } = useOrderStore();
  
//   const [shippingAddress, setShippingAddress] = useState<AddressInput | null>(null);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const [initialItemCount, setInitialItemCount] = useState(0);

//   const summary = getCartSummary();

//   // Wait for component to mount
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // Check auth and cart ONCE on mount, save initial item count
//   useEffect(() => {
//     if (!mounted) return;

//     // Save initial item count
//     setInitialItemCount(items.length);

//     // Check auth
//     if (!isAuthenticated) {
//       showToast('Please login to continue', 'error');
//       router.push('/auth/login?redirect=/checkout');
//       return;
//     }

//     // Check if cart was empty on arrival
//     if (items.length === 0) {
//       router.push('/cart');
//     }
//   }, [mounted]); // Only run when mounted changes

//   const handleFormSubmit = (data: AddressInput) => {
//     setShippingAddress(data);
//     showToast('✓ Address saved successfully!', 'success');
//   };

//   const handlePlaceOrder = () => {
//     if (!shippingAddress) {
//       showToast('Please save your shipping address first', 'error');
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//       return;
//     }

//     if (!user) {
//       showToast('Please login to continue', 'error');
//       router.push('/auth/login?redirect=/checkout');
//       return;
//     }

//     setIsProcessing(true);

//     // Simulate payment processing (Demo Mode)
//     setTimeout(() => {
//       try {
//         const order = createOrder(
//           user.id,
//           items,
//           {
//             email: user.email,
//             shippingAddress: { ...shippingAddress, id: Date.now().toString() },
//             paymentMethod: 'paystack',
//           },
//           summary
//         );

//         clearCart();
//         showToast('Order placed successfully!', 'success');
        
//         // Navigate to confirmation page
//         router.push(`/order-confirmation?orderId=${order.id}`);
//       } catch (error) {
//         console.error('Order creation error:', error);
//         showToast('Failed to create order. Please try again.', 'error');
//         setIsProcessing(false);
//       }
//     }, 1500);
//   };

//   // Don't render until mounted
//   if (!mounted) {
//     return null;
//   }

//   // If no items initially (checked once on mount), don't render
//   if (initialItemCount === 0 && !isProcessing) {
//     return null;
//   }

//   return (
//     <>
//       {isProcessing && <LoadingOverlay message="Processing your order..." />}

//       <div className="min-h-screen bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           {/* Header */}
//           <div className="mb-8">
//             <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-2">
//               Checkout
//             </h1>
//             <p className="text-gray-600">Complete your purchase</p>
//           </div>

//           {/* Demo Mode Notice */}
//           <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-sm">
//             <p className="text-sm text-blue-800">
//               <strong>Demo Mode:</strong> This is a demonstration checkout. Click "Place Order" to complete your test purchase.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Checkout Form */}
//             <div className="lg:col-span-2">
//               <div className="bg-white border border-gray-200 rounded-sm p-6">
//                 <CheckoutForm
//                   onSubmit={handleFormSubmit}
//                   defaultValues={{
//                     firstName: '',
//                     lastName: '',
//                     street: '',
//                     city: '',
//                     state: '',
//                     postalCode: '',
//                     country: 'Nigeria',
//                     phone: '',
//                   }}
//                 />

//                 {/* Payment Method */}
//                 <div className="mt-8 pt-8 border-t border-gray-200">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                     Payment Method
//                   </h3>
//                   <div className="border border-gray-300 rounded-sm p-4 flex items-center gap-3">
//                     <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
//                       <ShieldCheck size={24} className="text-gray-600" />
//                     </div>
//                     <div>
//                       <p className="font-medium text-gray-900">Demo Payment</p>
//                       <p className="text-sm text-gray-600">
//                         Testing mode - no real payment required
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Order Summary */}
//             <div className="lg:col-span-1">
//               <div className="sticky top-20 space-y-4">
//                 <OrderSummary
//                   items={items}
//                   subtotal={summary.subtotal}
//                   shipping={summary.shipping}
//                   tax={summary.tax}
//                   total={summary.total}
//                 />

//                 {shippingAddress && (
//                   <div className="p-3 bg-green-50 border border-green-200 rounded-sm">
//                     <div className="flex items-center gap-2">
//                       <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                       </svg>
//                       <span className="text-sm font-medium text-green-800">Address saved</span>
//                     </div>
//                   </div>
//                 )}

//                 <Button
//                   variant="primary"
//                   size="lg"
//                   className="w-full"
//                   onClick={handlePlaceOrder}
//                   disabled={isProcessing}
//                   isLoading={isProcessing}
//                 >
//                   {isProcessing ? 'Processing...' : 'Place Order'}
//                 </Button>

//                 <p className="text-xs text-center text-gray-500">
//                   By completing your purchase, you agree to our Terms of Service and Privacy Policy
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


// ----------------

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore, useAuthStore, useOrderStore } from '@/store';
import { CheckoutForm, OrderSummary } from '@/components/checkout';
import { Button, LoadingOverlay } from '@/components/ui';
import { AddressInput } from '@/lib/validations';
import { useToast } from '@/components/ui';
import { ShieldCheck } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const { items, getCartSummary, clearCart } = useCartStore();
  const { user, isAuthenticated } = useAuthStore();
  const { createOrder } = useOrderStore();
  
  const [shippingAddress, setShippingAddress] = useState<AddressInput | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mounted, setMounted] = useState(false);

  const summary = getCartSummary();

  // Wait for component to mount before doing any checks
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check authentication and cart only after mounted
  useEffect(() => {
    if (!mounted) return;

    if (!isAuthenticated) {
      showToast('Please login to continue', 'error');
      router.push('/auth/login?redirect=/checkout');
      return;
    }

    if (items.length === 0) {
      router.push('/cart');
    }
  }, [mounted]); // Only run when mounted changes

  const handleFormSubmit = (data: AddressInput) => {
    setShippingAddress(data);
    showToast('✓ Address saved successfully!', 'success');
  };

  const handlePlaceOrder = () => {
    if (!shippingAddress) {
      showToast('Please save your shipping address first', 'error');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (!user) {
      showToast('Please login to continue', 'error');
      router.push('/auth/login?redirect=/checkout');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing (Demo Mode)
    setTimeout(() => {
      try {
        const order = createOrder(
          user.id,
          items,
          {
            email: user.email,
            shippingAddress: { ...shippingAddress, id: Date.now().toString() },
            paymentMethod: 'paystack',
          },
          summary
        );

        clearCart();
        showToast('Order placed successfully!', 'success');
        router.push(`/order-confirmation?orderId=${order.id}`);
      } catch (error) {
        console.error('Order creation error:', error);
        showToast('Failed to create order. Please try again.', 'error');
        setIsProcessing(false);
      }
    }, 1500);
  };

  // Don't render anything until mounted to prevent hydration issues
  if (!mounted) {
    return null;
  }

  // Show loading while checking auth (only after mount)
  if (mounted && (!isAuthenticated || items.length === 0)) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {isProcessing && <LoadingOverlay message="Processing your order..." />}

      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-2">
              Checkout
            </h1>
            <p className="text-gray-600">Complete your purchase</p>
          </div>

          {/* Demo Mode Notice */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-sm">
            <p className="text-sm text-blue-800">
              <strong>Demo Mode:</strong> This is a demonstration checkout. Click "Place Order" to complete your test purchase.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-sm p-6">
                <CheckoutForm
                  onSubmit={handleFormSubmit}
                  defaultValues={{
                    firstName: '',
                    lastName: '',
                    street: '',
                    city: '',
                    state: '',
                    postalCode: '',
                    country: 'Nigeria',
                    phone: '',
                  }}
                />

                {/* Payment Method */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Payment Method
                  </h3>
                  <div className="border border-gray-300 rounded-sm p-4 flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                      <ShieldCheck size={24} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Demo Payment</p>
                      <p className="text-sm text-gray-600">
                        Testing mode - no real payment required
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-4">
                <OrderSummary
                  items={items}
                  subtotal={summary.subtotal}
                  shipping={summary.shipping}
                  tax={summary.tax}
                  total={summary.total}
                />

                {shippingAddress && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-sm">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm font-medium text-green-800">Address saved</span>
                    </div>
                  </div>
                )}

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  isLoading={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </Button>

                <p className="text-xs text-center text-gray-500">
                  By completing your purchase, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// -----------------------------------------------------------

// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import { useCartStore, useAuthStore, useOrderStore } from '@/store';
// import { CheckoutForm, OrderSummary } from '@/components/checkout';
// import { Button, LoadingOverlay } from '@/components/ui';
// import { AddressInput } from '@/lib/validations';
// import { useToast } from '@/components/ui';
// import { ShieldCheck } from 'lucide-react';
// import Script from 'next/script';
// import { generateOrderNumber } from '@/lib/utils';

// // Declare PaystackPop on window
// declare global {
//   interface Window {
//     PaystackPop: any;
//   }
// }

// export default function CheckoutPage() {
//   const router = useRouter();
//   const { showToast } = useToast();
//   const { items, getCartSummary, clearCart } = useCartStore();
//   const { user, isAuthenticated } = useAuthStore();
//   const { createOrder } = useOrderStore();
  
//   const [shippingAddress, setShippingAddress] = useState<AddressInput | null>(null);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [paystackLoaded, setPaystackLoaded] = useState(false);
//   const formRef = useRef<HTMLFormElement>(null);

//   const summary = getCartSummary();

//   // Redirect if cart is empty
//   useEffect(() => {
//     if (items.length === 0) {
//       router.push('/cart');
//     }
//   }, [items.length, router]);

//   // Redirect if not authenticated
//   useEffect(() => {
//     if (!isAuthenticated) {
//       showToast('Please login to continue', 'error');
//       router.push('/auth/login?redirect=/checkout');
//     }
//   }, [isAuthenticated, router, showToast]);

//   const handleFormSubmit = (data: AddressInput) => {
//     setShippingAddress(data);
//     console.log('address saved', shippingAddress);
//     showToast('Address saved! Click Pay to continue.', 'success');
//   };

//   const handlePayment = () => {
//     if (!shippingAddress) {
//       showToast('Please fill in your shipping address', 'error');
//       console.log('no shipping address');
//       const submitButton = formRef.current?.querySelector('button[type="submit"]') as HTMLButtonElement;
//       submitButton?.click();
//       return;
//     }

//     if (!user) {
//       showToast('Please login to continue', 'error');
//       return;
//     }

//     if (!paystackLoaded || !window.PaystackPop) {
//       showToast('Payment system is loading, please wait...', 'warning');
//       return;
//     }

//     setIsProcessing(true);

//     const reference = generateOrderNumber();
//     const amountInKobo = Math.round(summary.total * 100); // Convert to kobo/cents

//     try {
//       const handler = window.PaystackPop.setup({
//         key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'pk_test_default',
//         email: user.email,
//         amount: amountInKobo,
//         currency: 'NGN', // Nigerian Naira - change to USD if needed
//         ref: reference,
//         onClose: function() {
//           setIsProcessing(false);
//           showToast('Payment cancelled', 'error');
//         },
//         callback: function(response: any) {
//           // Payment successful
//           const order = createOrder(
//             user.id,
//             items,
//             {
//               email: user.email,
//               shippingAddress: { ...shippingAddress, id: Date.now().toString() },
//               paymentMethod: 'paystack',
//             },
//             summary
//           );

//           // Clear cart
//           clearCart();

//           // Show success message
//           showToast('Payment successful!', 'success');

//           // Redirect to order confirmation
//           setIsProcessing(false);
//           router.push(`/order-confirmation?orderId=${order.id}`);
//         },
//       });

//       handler.openIframe();
//     } catch (error) {
//       console.error('PayStack Error:', error);
//       setIsProcessing(false);
//       showToast('Payment initialization failed. Please try again.', 'error');
//     }
//   };

//   // Mock payment for testing (when PayStack is not configured)
//   const handleMockPayment = () => {
//     if (!shippingAddress) {
//       showToast('Please fill in your shipping address', 'error');
//       return;
//     }

//     if (!user) {
//       showToast('Please login to continue', 'error');
//       return;
//     }

//     setIsProcessing(true);

//     // Simulate payment processing
//     setTimeout(() => {
//       const order = createOrder(
//         user.id,
//         items,
//         {
//           email: user.email,
//           shippingAddress: { ...shippingAddress, id: Date.now().toString() },
//           paymentMethod: 'paystack',
//         },
//         summary
//       );

//       clearCart();
//       showToast('Order placed successfully! (Demo Mode)', 'success');
//       setIsProcessing(false);
//       router.push(`/order-confirmation?orderId=${order.id}`);
//     }, 2000);
//   };

//   if (items.length === 0) {
//     return null;
//   }

//   const hasValidPaystackKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY && 
//     process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY !== 'pk_test_default';

//   return (
//     <>
//       {/* Load PayStack Script */}
//       <Script
//         src="https://js.paystack.co/v1/inline.js"
//         onLoad={() => {
//           setPaystackLoaded(true);
//           console.log('PayStack loaded successfully');
//         }}
//         onError={() => {
//           console.error('Failed to load PayStack');
//           showToast('Payment system unavailable. Using demo mode.', 'warning');
//         }}
//       />

//       {isProcessing && <LoadingOverlay message="Processing payment..." />}

//       <div className="min-h-screen bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           {/* Header */}
//           <div className="mb-8">
//             <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-2">
//               Checkout
//             </h1>
//             <p className="text-gray-600">Complete your purchase</p>
//           </div>

//           {/* Demo Mode Notice */}
//           {!hasValidPaystackKey && (
//             <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-sm">
//               <p className="text-sm text-yellow-800">
//                 <strong>Demo Mode:</strong> PayStack is not configured. Using mock payment for testing.
//                 Add your PayStack public key to <code className="bg-yellow-100 px-1">.env.local</code> to enable real payments.
//               </p>
//             </div>
//           )}

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Checkout Form */}
//             <div className="lg:col-span-2">
//               <div className="bg-white border border-gray-200 rounded-sm p-6">
//                 <div ref={formRef}>
//                   <CheckoutForm
//                     onSubmit={handleFormSubmit}
//                     defaultValues={{
//                       firstName: '',
//                       lastName: '',
//                       street: '',
//                       city: '',
//                       state: '',
//                       postalCode: '',
//                       country: 'Nigeria',
//                       phone: '',
//                     }}
//                   />
//                 </div>

//                 {/* Payment Method */}
//                 <div className="mt-8 pt-8 border-t border-gray-200">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                     Payment Method
//                   </h3>
//                   <div className="border border-gray-300 rounded-sm p-4 flex items-center gap-3">
//                     <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
//                       <ShieldCheck size={24} className="text-gray-600" />
//                     </div>
//                     <div>
//                       <p className="font-medium text-gray-900">
//                         {hasValidPaystackKey ? 'PayStack' : 'Demo Payment'}
//                       </p>
//                       <p className="text-sm text-gray-600">
//                         {hasValidPaystackKey 
//                           ? 'Secure payment via PayStack'
//                           : 'Testing mode - no real payment required'}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Order Summary */}
//             <div className="lg:col-span-1">
//               <div className="sticky top-20 space-y-4">
//                 <OrderSummary
//                   items={items}
//                   subtotal={summary.subtotal}
//                   shipping={summary.shipping}
//                   tax={summary.tax}
//                   total={summary.total}
//                 />

//                 <Button
//                   variant="primary"
//                   size="lg"
//                   className="w-full"
//                   onClick={hasValidPaystackKey && paystackLoaded ? handlePayment : handleMockPayment}
//                   disabled={isProcessing}
//                   isLoading={isProcessing}
//                 >
//                   {isProcessing 
//                     ? 'Processing...' 
//                     : hasValidPaystackKey 
//                       ? `Pay ${summary.total.toFixed(2)}`
//                       : `Place Order (Demo)`
//                   }
//                 </Button>

//                 <p className="text-xs text-center text-gray-500">
//                   By completing your purchase, you agree to our Terms of Service and
//                   Privacy Policy
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }