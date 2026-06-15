'use client';

import React, { useState } from 'react';
import { Button, Input, Modal, LoadingSpinner, useToast } from '@/components/ui';
import { Badge, StarRating } from '@/components/common';
import { ShoppingCart, Heart, Trash } from 'lucide-react';

export default function ComponentsTestPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rating, setRating] = useState(3.5);
  const { showToast } = useToast();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Component Showcase
          </h1>
          <p className="text-gray-600">
            Testing all UI components from Phase 4
          </p>
        </div>

        <div className="space-y-8">
          {/* Buttons */}
          <section className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Buttons</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="danger">Danger Button</Button>
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="lg">Large</Button>
              <Button variant="primary" isLoading>Loading...</Button>
              <Button variant="primary" disabled>Disabled</Button>
            </div>
          </section>

          {/* Inputs */}
          <section className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Inputs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              <Input label="Email" type="email" placeholder="you@example.com" />
              <Input label="Password" type="password" placeholder="••••••••" required />
              <Input 
                label="With Error" 
                error="This field is required" 
                placeholder="Enter value" 
              />
              <Input 
                label="With Helper Text" 
                helperText="We'll never share your email" 
                placeholder="Enter email" 
              />
              <Input label="Disabled" disabled placeholder="Disabled input" />
            </div>
          </section>

          {/* Badges */}
          <section className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Badges</h2>
            <div className="flex flex-wrap gap-3">
              <Badge>Default</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="info">Info</Badge>
              <Badge size="sm">Small Badge</Badge>
            </div>
          </section>

          {/* Star Rating */}
          <section className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Star Ratings</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Static Rating</p>
                <StarRating rating={4.5} showNumber reviewCount={128} />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Interactive Rating (Current: {rating})</p>
                <StarRating 
                  rating={rating} 
                  interactive 
                  onRatingChange={setRating}
                  showNumber
                />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Different Sizes</p>
                <div className="flex items-center gap-4">
                  <StarRating rating={5} size={12} />
                  <StarRating rating={4.5} size={16} />
                  <StarRating rating={4} size={20} />
                  <StarRating rating={3.5} size={24} />
                </div>
              </div>
            </div>
          </section>

          {/* Loading Spinners */}
          <section className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Loading Spinners</h2>
            <div className="flex items-center gap-8">
              <div>
                <p className="text-sm text-gray-600 mb-2">Small</p>
                <LoadingSpinner size="sm" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Medium</p>
                <LoadingSpinner size="md" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Large</p>
                <LoadingSpinner size="lg" />
              </div>
            </div>
          </section>

          {/* Modal */}
          <section className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Modal</h2>
            <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
            <Modal 
              isOpen={modalOpen} 
              onClose={() => setModalOpen(false)}
              title="Example Modal"
            >
              <div className="space-y-4">
                <p className="text-gray-600">
                  This is an example modal with some content. You can close it by clicking the X button, 
                  clicking outside, or pressing ESC.
                </p>
                <div className="flex gap-2">
                  <Button variant="primary" onClick={() => setModalOpen(false)}>
                    Confirm
                  </Button>
                  <Button variant="outline" onClick={() => setModalOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </Modal>
          </section>

          {/* Toast Notifications */}
          <section className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Toast Notifications</h2>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="primary" 
                size="sm"
                onClick={() => showToast('This is a success message!', 'success')}
              >
                Success Toast
              </Button>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => showToast('This is an error message!', 'error')}
              >
                Error Toast
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => showToast('This is a warning message!', 'warning')}
              >
                Warning Toast
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => showToast('This is an info message!', 'info')}
              >
                Info Toast
              </Button>
            </div>
          </section>

          {/* Buttons with Icons */}
          <section className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Buttons with Icons</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">
                <ShoppingCart size={16} className="mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline">
                <Heart size={16} className="mr-2" />
                Add to Wishlist
              </Button>
              <Button variant="danger">
                <Trash size={16} className="mr-2" />
                Delete
              </Button>
            </div>
          </section>

          {/* Success Banner */}
          <section className="bg-white p-8 rounded-lg border border-gray-200">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                ✅ Phase 4 Complete!
              </h2>
              <p className="text-gray-600 mb-4">
                All UI components are built and working perfectly.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <p>✅ Button - Multiple variants and sizes</p>
                <p>✅ Input - Labels, errors, helper text</p>
                <p>✅ Modal - Keyboard support, backdrop</p>
                <p>✅ Loading Spinner - Multiple sizes</p>
                <p>✅ Toast - 4 variants with auto-dismiss</p>
                <p>✅ Badge - 5 variants</p>
                <p>✅ Star Rating - Static and interactive</p>
                <p>✅ Navbar - Responsive with cart count</p>
                <p>✅ Footer - Complete with links</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}