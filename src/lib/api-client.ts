// Frontend API client for making requests to backend

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        credentials: 'include', // Important for cookies
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }

  // Auth endpoints
  async signup(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }) {
    return this.request('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: { email: string; password: string }) {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async logout() {
    return this.request('/api/auth/logout', {
      method: 'POST',
    });
  }

  async getCurrentUser() {
    return this.request('/api/auth/me');
  }

  // Product endpoints
  async getProducts(params?: {
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    size?: string;
    featured?: boolean;
    sort?: string;
    page?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const queryString = queryParams.toString();
    const endpoint = `/api/products${queryString ? `?${queryString}` : ''}`;

    return this.request(endpoint);
  }

  async getProduct(id: string) {
    return this.request(`/api/products/${id}`);
  }

  // Order endpoints
  async createOrder(data: {
    items: Array<{
      productId: string;
      name: string;
      price: number;
      quantity: number;
      size?: string;
      color?: string;
      image: string;
    }>;
    address: {
      firstName: string;
      lastName: string;
      address: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
      phone: string;
    };
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    paymentMethod?: string;
    notes?: string;
  }) {
    return this.request('/api/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getOrders() {
    return this.request('/api/orders');
  }

  async getOrder(id: string) {
    return this.request(`/api/orders/${id}`);
  }

  // User endpoints (to be added)
  async updateProfile(data: {
    firstName?: string;
    lastName?: string;
    phone?: string;
  }) {
    return this.request('/api/user/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async getAddresses() {
    return this.request('/api/user/addresses');
  }

  async createAddress(data: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
    isDefault?: boolean;
  }) {
    return this.request('/api/user/addresses', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateAddress(id: string, data: Partial<{
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
    isDefault: boolean;
  }>) {
    return this.request(`/api/user/addresses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteAddress(id: string) {
    return this.request(`/api/user/addresses/${id}`, {
      method: 'DELETE',
    });
  }

  // Review endpoints (for Phase 10)
  async createReview(productId: string, data: {
    rating: number;
    title?: string;
    comment: string;
  }) {
    return this.request(`/api/products/${productId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getReviews(productId: string) {
    return this.request(`/api/products/${productId}/reviews`);
  }

  // Wishlist endpoints (for Phase 11)
  async getWishlist() {
    return this.request('/api/wishlist');
  }

  async addToWishlist(productId: string) {
    return this.request('/api/wishlist', {
      method: 'POST',
      body: JSON.stringify({ productId }),
    });
  }

  async removeFromWishlist(productId: string) {
    return this.request(`/api/wishlist/${productId}`, {
      method: 'DELETE',
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();