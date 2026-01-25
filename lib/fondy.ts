import crypto from 'crypto';

// Fondy API configuration
const FONDY_MERCHANT_ID = process.env.FONDY_MERCHANT_ID || '';
const FONDY_SECRET_KEY = process.env.FONDY_SECRET_KEY || '';
const FONDY_API_URL = 'https://pay.fondy.eu/api/checkout/url/';
const FONDY_API_STATUS_URL = 'https://pay.fondy.eu/api/status/order_id';

interface FondyPaymentRequest {
  order_id: string;
  order_desc: string;
  amount: number; // in cents (kopecks)
  currency: string;
  response_url?: string;
  server_callback_url?: string;
  sender_email?: string;
  lang?: string;
  product_id?: string;
  lifetime?: number;
  merchant_data?: string;
}

interface FondyResponse {
  response: {
    response_status: string;
    checkout_url?: string;
    payment_id?: string;
    order_status?: string;
    error_message?: string;
    error_code?: number;
  };
}

interface FondyCallbackData {
  order_id: string;
  order_status: string;
  signature: string;
  merchant_id: string;
  amount: string;
  currency: string;
  sender_email?: string;
  payment_id?: string;
  actual_amount?: string;
  response_status?: string;
  card_type?: string;
  masked_card?: string;
  [key: string]: string | undefined;
}

// Generate signature for Fondy API
function generateSignature(data: Record<string, string | number | undefined>): string {
  // Filter out empty values and signature itself
  const filteredData: Record<string, string> = {};
  Object.keys(data).forEach(key => {
    const value = data[key];
    if (value !== undefined && value !== '' && key !== 'signature' && key !== 'response_signature_string') {
      filteredData[key] = String(value);
    }
  });

  // Sort keys alphabetically
  const sortedKeys = Object.keys(filteredData).sort();
  
  // Create signature string: secret_key|value1|value2|...
  const signatureString = FONDY_SECRET_KEY + '|' + sortedKeys.map(key => filteredData[key]).join('|');
  
  // Generate SHA1 hash
  return crypto.createHash('sha1').update(signatureString).digest('hex');
}

// Verify callback signature from Fondy
export function verifyFondySignature(data: FondyCallbackData): boolean {
  const receivedSignature = data.signature;
  const calculatedSignature = generateSignature(data);
  return receivedSignature === calculatedSignature;
}

// Create payment checkout URL
export async function createFondyPayment(params: {
  orderId: string;
  orderDescription: string;
  amount: number; // in main currency units (EUR, UAH, etc.)
  currency?: string;
  email?: string;
  language?: string;
  callbackUrl?: string;
  successUrl?: string;
  productId?: string;
  merchantData?: string;
}): Promise<{ success: boolean; checkoutUrl?: string; paymentId?: string; error?: string }> {
  try {
    console.log('Fondy credentials check:', {
      hasMerchantId: !!FONDY_MERCHANT_ID,
      merchantId: FONDY_MERCHANT_ID,
      hasSecretKey: !!FONDY_SECRET_KEY,
    });
    
    if (!FONDY_MERCHANT_ID || !FONDY_SECRET_KEY) {
      return { success: false, error: 'Fondy credentials not configured' };
    }

    // Convert amount to cents (Fondy requires amount in smallest currency units)
    const amountInCents = Math.round(params.amount * 100);

    console.log('Amount conversion:', {
      original: params.amount,
      inCents: amountInCents,
    });

    const requestData: FondyPaymentRequest = {
      order_id: params.orderId,
      order_desc: params.orderDescription,
      amount: amountInCents,
      currency: params.currency || 'EUR',
      response_url: params.successUrl,
      server_callback_url: params.callbackUrl,
      sender_email: params.email,
      lang: params.language || 'en',
      product_id: params.productId,
      merchant_data: params.merchantData,
      lifetime: 86400, // 24 hours
    };

    // Add merchant_id and signature
    const fullData: Record<string, string | number | undefined> = {
      merchant_id: FONDY_MERCHANT_ID,
      ...requestData,
    };

    const signature = generateSignature(fullData);

    const requestBody = {
      request: {
        ...fullData,
        signature,
      },
    };

    console.log('Fondy API request:', {
      url: FONDY_API_URL,
      body: requestBody,
    });

    const response = await fetch(FONDY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const result: FondyResponse = await response.json();
    
    console.log('Fondy API response:', {
      status: response.status,
      result,
    });

    if (result.response.response_status === 'success' && result.response.checkout_url) {
      return {
        success: true,
        checkoutUrl: result.response.checkout_url,
        paymentId: result.response.payment_id,
      };
    } else {
      console.error('Fondy payment failed:', result.response);
      return {
        success: false,
        error: result.response.error_message || 'Failed to create payment',
      };
    }
  } catch (error) {
    console.error('Fondy payment creation error:', error);
    return { success: false, error: 'Payment system error' };
  }
}

// Get payment status
export async function getFondyPaymentStatus(orderId: string): Promise<{
  success: boolean;
  status?: string;
  paymentId?: string;
  error?: string;
}> {
  try {
    if (!FONDY_MERCHANT_ID || !FONDY_SECRET_KEY) {
      return { success: false, error: 'Fondy credentials not configured' };
    }

    const requestData = {
      merchant_id: FONDY_MERCHANT_ID,
      order_id: orderId,
    };

    const signature = generateSignature(requestData);

    const requestBody = {
      request: {
        ...requestData,
        signature,
      },
    };

    const response = await fetch(FONDY_API_STATUS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const result: FondyResponse = await response.json();

    if (result.response.response_status === 'success') {
      return {
        success: true,
        status: result.response.order_status,
        paymentId: result.response.payment_id,
      };
    } else {
      return {
        success: false,
        error: result.response.error_message || 'Failed to get payment status',
      };
    }
  } catch (error) {
    console.error('Fondy status check error:', error);
    return { success: false, error: 'Payment system error' };
  }
}

// Parse Fondy callback order status
export function parseFondyStatus(status: string): 'pending' | 'completed' | 'failed' | 'refunded' {
  switch (status) {
    case 'approved':
      return 'completed';
    case 'declined':
    case 'expired':
      return 'failed';
    case 'reversed':
      return 'refunded';
    case 'processing':
    case 'created':
    default:
      return 'pending';
  }
}
