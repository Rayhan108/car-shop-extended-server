/* eslint-disable no-unused-vars */
declare module "shurjopay" {
    import { Logger } from "winston";
  
    interface Credentials {
      root_url: string;
      merchant_username: string;
      merchant_password: string;
      merchant_key_prefix: string;
      return_url: string;
  
      readonly token_url: string;
      readonly verification_url: string;
      readonly payment_status_url: string;
    }
  
    interface TokenDetails {
      token: string;
      token_type: string;
      token_create_time: string; // Format: YYYY-MM-DD hh:mm:ssa
      token_valid_duration: number; // Duration in seconds
    }
  
    interface PaymentRequest {
      prefix: string; // Provided by the shurjoPay team (Mandatory)
      token: string; // Alphanumeric token for communication with shurjoPay (Mandatory)
      return_url: string; // URL to redirect customer after payment processing (Mandatory)
      cancel_url: string; // URL to redirect customer after payment cancellation (Mandatory)
      store_id: string; // Store ID provided by generate token API response (Mandatory)
      amount: number; // Amount the customer is paying (Mandatory)
      order_id: string; // Dynamically generated order ID (Mandatory)
      currency: string; // Currency in which payment is being made (Mandatory)
      customer_name: string; // Name of the customer making payment (Mandatory)
      customer_address: string; // Address of the customer making payment (Mandatory)
      customer_email: string; // Email of the customer making payment (Mandatory)
      customer_phone: string; // Phone number of the customer making payment (Mandatory)
      customer_city: string; // City of the customer making payment (Mandatory)
      customer_post_code?: string; // Postal code of the customer making payment (Optional)
      client_ip?: string; // IP address of the customer making payment (Optional)
      discount_amount?: number; // Total amount of discount applied to payment (Optional)
      disc_percent?: number; // Total percentage of discount applied to payment (Optional)
      customer_state?: string; // State of the customer making payment (Optional)
      customer_country?: string; // Country of the customer making payment (Optional)
      shipping_address?: string; // Shipping address of the customer (Optional)
      shipping_city?: string; // Shipping city of the customer (Optional)
      shipping_country?: string; // Shipping country of the customer (Optional)
      received_person_name?: string; // Name of the person who received the shipment (Optional)
      shipping_phone_number?: string; // Phone number of the person who received the shipment (Optional)
      value1?: string; // Additional field for product/service name, ID, etc. (Optional)
      value2?: string; // Additional field for product/service name, ID, etc. (Optional)
      value3?: string; // Additional field for product/service name, ID, etc. (Optional)
      value4?: string; // Additional field for product/service name, ID, etc. (Optional)
    }
  
    export interface PaymentResponse {
      checkout_url: string; // URL for payment execution
      amount: number; // Amount to be paid by the customer
      currency: string; // Currency in which the payment will be made
      sp_order_id: string; // shurjoPay payment ID
      customer_order_id: string; // Merchant-generated order ID
      customer_name: string; // Name of the customer making the payment
      customer_address: string; // Address of the customer making the payment
      customer_city: string; // City of the customer making the payment
      customer_phone: string; // Phone number of the customer making the payment
      customer_email: string; // Email of the customer making the payment
      client_ip: string; // IP address of the customer making the payment
      intent: string; // Purpose of the payment (e.g., Sale, Service, etc.)
      transactionStatus: string; // State of the payment (e.g., Pending, Completed)
    }
  
    interface VerificationRequest {
      order_id: string; // shurjoPay payment ID sent during callback (Mandatory)
    }
  
    export interface VerificationResponse {
      id: number; // Unique identification
      order_id: string; // shurjoPay payment ID used for verification
      currency: string; // Currency in which the payment was made
      amount: number; // Amount paid by the customer
      payable_amount: number; // Total payable amount
      discount_amount: number; // Total discounted amount
      disc_percent: number; // Total discount percentage
      received_amount: number; // Amount received by shurjoPay
      usd_amt: number; // Amount in USD if converted from another currency
      usd_rate: number; // USD to BDT conversion rate at payment time
      transaction_status: string; // Payment status (e.g., Pending, Completed)
      method: string; // Payment method (e.g., bank cards, mobile wallets)
      sp_message: string; // Response message code description
      sp_code: number; // Response code for transaction status
      bank_status: string;
      name: string; // Customer's name who made the payment
      email: string; // Customer's email
      address: string; // Customer's address
      city: string; // Customer's city
      date_time: string; // Date and time of the transaction
      value1?: string; // Additional information (e.g., product name, service name)
      value2?: string; // Additional information
      value3?: string; // Additional information
      value4?: string; // Additional information
    }
  
    type Callback<T> = (response: T) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type ErrorHandler = (error: any) => void;
  
    class Shurjopay {
      data: { sp_token?: TokenDetails };
      credentials: Credentials;
      logger: Logger;
  
      constructor(): Shurjopay;
  
      config(
        root_url: string,
        merchant_username: string,
        merchant_password: string,
        merchant_key_prefix: string,
        return_url: string
      ): void;
  
      randomString(length: number): string;
  
      log(message: string, level: "info" | "warn" | "error"): void;
  
      authentication(callback: Callback<TokenDetails>): void;
  
      makePayment(
        checkout_params: PaymentRequest,
        checkout_callback?: Callback<PaymentResponse>,
        error_handler?: ErrorHandler
      ): void;
  
      verifyPayment(
        order_id: string,
        callback: Callback<VerificationResponse[]>,
        error_handler: ErrorHandler
      ): void;
  
      paymentStatus(
        order_id: string,
        callback: Callback<VerificationResponse>,
        error_handler: ErrorHandler
      ): void;
  
      token_valid(): boolean;
    }
  
    export default Shurjopay;
  }
  