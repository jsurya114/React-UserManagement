export const STATUS_CODES = {
  // ✅ Success
  OK: 200,                    // Request succeeded
  CREATED: 201,               // Resource created successfully
  ACCEPTED: 202,              // Request accepted but still processing
  NO_CONTENT: 204,            // Success but no data to return

  // ⚠️ Client Errors
  BAD_REQUEST: 400,           // Invalid request data
  UNAUTHORIZED: 401,          // Missing or invalid authentication
  FORBIDDEN: 403,             // Authenticated but no permission
  NOT_FOUND: 404,             // Resource not found
  CONFLICT: 409,              // Data conflict (e.g. duplicate)
  UNPROCESSABLE_ENTITY: 422,  // Validation failed
  TOO_MANY_REQUESTS: 429,     // Rate limit exceeded

  // ❌ Server Errors
  INTERNAL_SERVER_ERROR: 500, // Generic server error
  NOT_IMPLEMENTED: 501,       // Functionality not implemented
  BAD_GATEWAY: 502,           // Invalid response from upstream server
  SERVICE_UNAVAILABLE: 503,   // Server down or overloaded
  GATEWAY_TIMEOUT: 504        // Upstream server timeout
};
