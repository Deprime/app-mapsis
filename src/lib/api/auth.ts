import $axios from '$lib/config/http';

const API_URL = import.meta.env.VITE_API_URL;
const PREFIX = "auth";

const authApi = {
  /**
   * Get csrf cookie
   */
  getCsrfCookie: (): Promise<any> => {
    const url = `${API_URL}/sanctum/csrf-cookie`;
    return $axios.get(url);
  },

  /**
   * Sign in
   */
  signinByPhone:  (prefix: string, phone: string, password: string): Promise<any> => {
    const url = `${PREFIX}/signin-by-phone`;
    return $axios.post(url, {prefix, phone, password})
  },


  /**
   * Sign in
   */
  signin: (email: string, password: string): Promise<any> => {
    const url = `${PREFIX}/signin`;
    return $axios.post(url, {email, password})
  },

  /**
   * Sign up via email
   */
  signupEmail: (email: string, password: string): Promise<any> => {
    const url = `${PREFIX}/signup-email`;
    return $axios.post(url, {email, password})
  },

  /**
   * Sign up via email
   */
  requestValidationCode: (prefix: string, phone: string, flag = 'validation'): Promise<any> => {
    const url = `${PREFIX}/send-validation-code`;
    const data = {
      prefix,
      phone: `${phone}`,
      flag
    };
    return $axios.post(url, {prefix, phone: `${phone}`, flag})
  },

  /**
   * Verify validation code
   */
  verifyValidationCode: (
    prefix: string,
    phone: string,
    code: string,
    flag = 'validation'
  ): Promise<any> => {
    const url = `${PREFIX}/verify-validation-code`;
    const data = {
      prefix,
      phone: `${phone}`,
      code,
      flag
    };
    return $axios.post(url, data)
  },

  /**
   * Change password
   */
  restorePassword: (
      prefix: string,
      phone: string,
      code: string,
      password: string,
      flag = 'validation'
  ): Promise<any> => {
    const url = `${PREFIX}/restore-password`;
    const data = {
      prefix,
      phone: `${phone}`,
      code,
      password,
      flag
    };
    return $axios.post(url, data)
  },

  /**
   * Sign up via phone
   */
  signupPhone: (prefix: string, phone: string, password: string): Promise<any> => {
    const url = `${PREFIX}/signup-phone`;
    return $axios.post(url, {prefix, phone, password})
  },
}

export default authApi;

