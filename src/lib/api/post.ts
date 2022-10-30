import $axios from '$lib/config/http';

const PREFIX = "app/posts";

const postApi = {
  /**
   * List
   * FIXME: add contract
   */
  list: (): Promise<any> => {
    const url = `${PREFIX}`;
    return $axios.get(url)
  },

  /**
   * Get post
   * FIXME: add contract
   */
  get: (post_id: number): Promise<any> => {
    const url = `${PREFIX}/${post_id}`;
    return $axios.get(url)
  },

  /**
   * Create post
   * FIXME: add contract
   */
  create: (data: any): Promise<any> => {
    const url = `${PREFIX}`;
    return $axios.post(url, data)
  },

  /**
   * Update post
   * FIXME: add contract
   */
  update: (post_id: number, data: any): Promise<any> => {
    const url = `${PREFIX}/${post_id}`;
    return $axios.put(url, data)
  },

  /**
   * Remove post
   * FIXME: add contract
   */
  remove: (post_id: number): Promise<any> => {
    const url = `${PREFIX}/${post_id}`;
    return $axios.delete(url)
  },

  /**
   * Set status
   */
  setStatus: (post_id: number, data: any): Promise<any> => {
    const url = `${PREFIX}/${post_id}/status`;
    return $axios.put(url, data)
  },
}

export default postApi;
