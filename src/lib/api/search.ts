import $axios from '$lib/config/http';

const PREFIX = "search";

const searchApi = {
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
}

export default searchApi;
