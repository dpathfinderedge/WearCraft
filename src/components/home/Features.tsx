import React from 'react';
import { Truck, ShieldCheck, Package, CreditCard } from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Truck size={24} strokeWidth={1.5} />,
    title: 'Free Shipping',
    description: 'On orders over $100',
  },
  {
    icon: <ShieldCheck size={24} strokeWidth={1.5} />,
    title: 'Secure Payment',
    description: '100% secure checkout',
  },
  {
    icon: <Package size={24} strokeWidth={1.5} />,
    title: 'Easy Returns',
    description: '30-day return policy',
  },
  {
    icon: <CreditCard size={24} strokeWidth={1.5} />,
    title: 'Flexible Payment',
    description: 'Multiple payment options',
  },
];

export const Features: React.FC = () => {
  return (
    <section className="py-16 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                <div className="text-gray-900">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-base font-medium text-gray-900 mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};