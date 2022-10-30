import $axios from '$lib/config/http';

const PREFIX = "app/posts";

const photoApi = {
  /**
   * List
   * FIXME: add contract
   */
  list: (post_id: number): Promise<any> => {
    const url = `${PREFIX}/${post_id}/photos`;
    return $axios.get(url)
  },

  /**
   * Create company
   * FIXME: add contract
   */
  create: (post_id: number, data: any): Promise<any> => {
    const url = `${PREFIX}/${post_id}/photos`;
    return $axios.post(url, data, {headers: { "Content-Type": "multipart/form-data" }})
  },

  /**
   * Create company
   * FIXME: add contract
   */
  remove: (post_id: number, photo_id: number): Promise<any> => {
    const url = `${PREFIX}/${post_id}/photos/${photo_id}`;
    return $axios.delete(url)
  },

  /**
   * Set as poster
   */
  setPoster: (post_id: number, photo_id: number): Promise<any> => {
    const url = `${PREFIX}/${post_id}/photos/${photo_id}`;
    return $axios.put(url)
  },
}

export default photoApi;

