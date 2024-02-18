import { apiEndpoints } from "../constants/apiEndpoints";
import Repository from "./repository";

// Blog service
class BlogService extends Repository {
  constructor() {
    // This endpoint has no meaning in this service as we have overridden this in post method
    super(apiEndpoints.BLOGS);
  }

  // Override the onError method for customized error handling
  async onError(error) {
    // Custom error handling logic specific to Blog
    // Perform additional actions or return custom error responses
    // Returning a fallback response
    throw error;
  }
}

const blogService = new BlogService();

export default blogService;
