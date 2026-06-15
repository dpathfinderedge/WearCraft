// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { useOrderStore } from '@/store';
// import { Button } from '@/components/ui';
// import { CheckCircle, Package, Truck, Mail } from 'lucide-react';
// import { formatPrice, formatDate } from '@/lib/utils';

// export default function OrderConfirmationPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const { getOrderById } = useOrderStore();
//   const [order, setOrder] = useState<any>(null);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     if (!mounted) return;

//     const orderId = searchParams.get('orderId');
//     if (!orderId) {
//       router.push('/');
//       return;
//     }

//     const foundOrder = getOrderById(orderId);
//     if (!foundOrder) {
//       router.push('/');
//       return;
//     }

//     setOrder(foundOrder);
//   }, [mounted, searchParams, router, getOrderById]);

//   if (!mounted || !order) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading order details...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Success Icon */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
//             <CheckCircle size={32} className="text-green-600" />
//           </div>
//           <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-2">
//             Order Confirmed!
//           </h1>
//           <p className="text-lg text-gray-600">
//             Thank you for your purchase. Your order has been received.
//           </p>
//         </div>

//         {/* Order Details */}
//         <div className="bg-gray-50 rounded-sm p-6 mb-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div>
//               <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
//                 Order Number
//               </p>
//               <p className="text-base font-semibold text-gray-900">
//                 {order.orderNumber}
//               </p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
//                 Order Date
//               </p>
//               <p className="text-base font-semibold text-gray-900">
//                 {formatDate(order.createdAt)}
//               </p>
//             </div>
//             <div>
//               <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
//                 Total Amount
//               </p>
//               <p className="text-base font-semibold text-gray-900">
//                 {formatPrice(order.total)}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* What's Next */}
//         <div className="bg-white border border-gray-200 rounded-sm p-6 mb-8">
//           <h2 className="text-lg font-semibold text-gray-900 mb-6">
//             What happens next?
//           </h2>
//           <div className="space-y-4">
//             <div className="flex items-start gap-4">
//               <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
//                 <Mail size={20} className="text-blue-600" />
//               </div>
//               <div>
//                 <h3 className="font-medium text-gray-900 mb-1">
//                   Order Confirmation Email
//                 </h3>
//                 <p className="text-sm text-gray-600">
//                   You'll receive an email confirmation with your order details shortly.
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-start gap-4">
//               <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
//                 <Package size={20} className="text-blue-600" />
//               </div>
//               <div>
//                 <h3 className="font-medium text-gray-900 mb-1">
//                   Order Processing
//                 </h3>
//                 <p className="text-sm text-gray-600">
//                   We're preparing your items for shipment. This usually takes 1-2 business days.
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-start gap-4">
//               <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
//                 <Truck size={20} className="text-blue-600" />
//               </div>
//               <div>
//                 <h3 className="font-medium text-gray-900 mb-1">
//                   Shipping & Delivery
//                 </h3>
//                 <p className="text-sm text-gray-600">
//                   Once shipped, you'll receive tracking information via email. Delivery typically takes 3-5 business days.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Order Items */}
//         <div className="bg-white border border-gray-200 rounded-sm p-6 mb-8">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">
//             Order Items ({order.items.length})
//           </h2>
//           <div className="space-y-4">
//             {order.items.map((item: any, index: number) => (
//               <div key={index} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0 last:pb-0">
//                 <div className="w-20 h-24 bg-gray-100 flex-shrink-0 overflow-hidden">
//                   <img
//                     src={item.product.images[0]}
//                     alt={item.product.name}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="font-medium text-gray-900">{item.product.name}</h3>
//                   <p className="text-sm text-gray-500 mt-1">
//                     {item.selectedColor} / {item.selectedSize}
//                   </p>
//                   <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-medium text-gray-900">
//                     {formatPrice(item.product.price * item.quantity)}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Shipping Address */}
//         <div className="bg-white border border-gray-200 rounded-sm p-6 mb-8">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">
//             Shipping Address
//           </h2>
//           <div className="text-sm text-gray-600">
//             <p className="font-medium text-gray-900">
//               {order.shippingAddress.firstName} {order.shippingAddress.lastName}
//             </p>
//             <p>{order.shippingAddress.street}</p>
//             <p>
//               {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
//               {order.shippingAddress.postalCode}
//             </p>
//             <p>{order.shippingAddress.country}</p>
//             <p className="mt-2">{order.shippingAddress.phone}</p>
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="flex flex-col sm:flex-row gap-4">
//           <Link href="/orders" className="flex-1">
//             <Button variant="primary" size="lg" className="w-full">
//               View Order History
//             </Button>
//           </Link>
//           <Link href="/shop" className="flex-1">
//             <Button variant="outline" size="lg" className="w-full">
//               Continue Shopping
//             </Button>
//           </Link>
//         </div>

//         {/* Help Section */}
//         <div className="mt-8 text-center">
//           <p className="text-sm text-gray-600">
//             Need help with your order?{' '}
//             <a href="mailto:support@wearcraft.com" className="text-gray-900 underline underline-offset-2">
//               Contact Support
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


// ---------------

'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useOrderStore } from '@/store';
import { Button } from '@/components/ui';
import { CheckCircle, Package, Truck, Mail } from 'lucide-react';
import { formatPrice, formatDate } from '@/lib/utils';

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { getOrderById } = useOrderStore();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const orderId = searchParams.get('orderId');
    if (!orderId) {
      router.push('/');
      return;
    }

    const foundOrder = getOrderById(orderId);
    if (!foundOrder) {
      router.push('/');
      return;
    }

    setOrder(foundOrder);
  }, [searchParams, router, getOrderById]);

  if (!order) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for your purchase. Your order has been received.
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-gray-50 rounded-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                Order Number
              </p>
              <p className="text-base font-semibold text-gray-900">
                {order.orderNumber}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                Order Date
              </p>
              <p className="text-base font-semibold text-gray-900">
                {formatDate(order.createdAt)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                Total Amount
              </p>
              <p className="text-base font-semibold text-gray-900">
                {formatPrice(order.total)}
              </p>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-white border border-gray-200 rounded-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            What happens next?
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail size={20} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">
                  Order Confirmation Email
                </h3>
                <p className="text-sm text-gray-600">
                  You&apos;ll receive an email confirmation with your order details shortly.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Package size={20} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">
                  Order Processing
                </h3>
                <p className="text-sm text-gray-600">
                  We're preparing your items for shipment. This usually takes 1-2 business days.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Truck size={20} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">
                  Shipping & Delivery
                </h3>
                <p className="text-sm text-gray-600">
                  Once shipped, you&apos;ll receive tracking information via email. Delivery typically takes 3-5 business days.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white border border-gray-200 rounded-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Order Items ({order.items.length})
          </h2>
          <div className="space-y-4">
            {order.items.map((item: any, index: number) => (
              <div key={index} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                <div className="w-20 h-24 bg-gray-100 flex-shrink-0 overflow-hidden">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.selectedColor} / {item.selectedSize}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white border border-gray-200 rounded-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Shipping Address
          </h2>
          <div className="text-sm text-gray-600">
            <p className="font-medium text-gray-900">
              {order.shippingAddress.firstName} {order.shippingAddress.lastName}
            </p>
            <p>{order.shippingAddress.street}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
              {order.shippingAddress.postalCode}
            </p>
            <p>{order.shippingAddress.country}</p>
            <p className="mt-2">{order.shippingAddress.phone}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/orders" className="flex-1">
            <Button variant="primary" size="lg" className="w-full">
              View Order History
            </Button>
          </Link>
          <Link href="/shop" className="flex-1">
            <Button variant="outline" size="lg" className="w-full">
              Continue Shopping
            </Button>
          </Link>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Need help with your order?{' '}
            <a href="mailto:support@wearcraft.com" className="text-gray-900 underline underline-offset-2">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}