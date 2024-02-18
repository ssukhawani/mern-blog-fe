import { apiEndpoints } from "../constants/apiEndpoints";
import Repository from "./repository";

// Auth service
class AuthService extends Repository {
  constructor() {
    // This endpoint has no meaning in this service as we have overridden this in post method
    super(apiEndpoints.AUTH);
  }

  // Override the onError method for customized error handling
  async onError(error) {
    // Custom error handling logic specific to Auth
    // Perform additional actions or return custom error responses
    // Returning a fallback response
    throw error;
  }
}

const authService = new AuthService();

export default authService;
