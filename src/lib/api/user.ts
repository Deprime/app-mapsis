import $axios from '$lib/config/http';

const PREFIX = "app/profile";

const userApi = {
  /**
   * Get profile
   */
  getProfile: (): Promise<any> => {
    const url = `${PREFIX}`;
    return $axios.get(url)
  },

  /**
   * Update profile
   */
  updateProfile: (data): Promise<any> => {
    const url = `${PREFIX}`;
    return $axios.put(url, data)
  },

  /**
   * Get contacts
   */
  getContacts: (): Promise<any> => {
    const url = `${PREFIX}/contacts`;
    return $axios.get(url)
  },

  /**
   * Update contacts
   */
  updateContacts: (data): Promise<any> => {
    const url = `${PREFIX}/contacts`;
    return $axios.put(url, data)
  },

  /**
   * Change password
   */
  changePassword: (password: string, password_confirmation: string): Promise<any> => {
    const url = `${PREFIX}/change-password`;
    return $axios.put(url, {password, password_confirmation})
  },
}

export default userApi;

