export default {
  async getFiles(context, payload) {
    const userID = payload.userID;
    const organizationID = payload.organizationID;
    const page = payload.page;
    const limit = payload.limit;

    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
      },
    };

    try {
      // Make a POST request to the API endpoint
      const response = await fetch(`/api/storage/files?userID=${userID}&organizationID=${organizationID}&page=${page}&limit=${limit}`, requestOptions);

      // Check if the response is successful
      if (!response.ok) {
        // Handle error response
        const errorObj = await response.json();
        throw new Error(errorObj.error);
      }

      const successData = await response.json();

      return successData;
    } catch (error) {
      throw new Error(error.message || "Failed to get files.");
    }
  },
  async storageFileUpload(context, payload) {
    const userID = payload.userID;
    const organizationID = payload.organizationID;
    const file = payload.file;

    const formData = new FormData();

    formData.append("userID", userID);
    formData.append("organizationID", organizationID);
    formData.append("upload", file, file.name);

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
      },
      body: formData,
    };

    try {
      // Make a POST request to the API endpoint
      const response = await fetch("/api/storage/upload", requestOptions);

      // Check if the response is successful
      if (!response.ok) {
        // Handle error response
        const errorObj = await response.json();
        throw new Error(errorObj.error);
      }

      const successData = await response.json();

      return successData;
    } catch (error) {
      throw new Error(error.message || "Failed to store file.");
    }
  },
  async searchFiles(context, payload) {
    const userID = payload.userID;
    const organizationID = payload.organizationID;
    const startsWith = payload.startsWith;

    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
      },
    };

    try {
      // Make a POST request to the API endpoint
      const response = await fetch(`/api/storage/search/files?userID=${userID}&organizationID=${organizationID}&startsWith=${startsWith}`, requestOptions);

      // Check if the response is successful
      if (!response.ok) {
        // Handle error response
        const errorObj = await response.json();
        throw new Error(errorObj.error);
      }

      const successData = await response.json();

      return successData;
    } catch (error) {
      throw new Error(error.message || "Failed to get files.");
    }
  },
  async deleteStorageFile(context, payload) {
    const organizationID = payload.organizationID;
    const file = payload.fileID;

    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${context.rootGetters.loggedUserToken}`,
      },
    };

    try {
      const response = await fetch(`/api/storage/file?organizationID=${organizationID}&fileID=${file}`, requestOptions);

      // Check if the response is successful
      if (!response.ok) {
        // Handle error response
        const errorObj = await response.json();
        throw new Error(errorObj.error);
      }

      const successData = await response.json();
      
      return successData;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
