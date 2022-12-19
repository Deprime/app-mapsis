import { dictionaryStore } from '$lib/stores';
import { dictionaryApi } from '$lib/api';

const dictionaryService = {
  /**
   * Get phone prefix list
   */
  getPhonePrefixList: async (): Promise<any> => {
    try {
      dictionaryStore.setLoading(true);
      const request = await dictionaryApi.getPhonePrefixList();
      const prefixes = request.data;
      dictionaryStore.setPrefixes(prefixes)
    }
    catch (error) {
      throw new Error(error)
    }
    finally {
      dictionaryStore.setLoading(false);
    }
  },

  /**
   * Get phone prefix list
   */
  getCategoryList: async (): Promise<any> => {
    dictionaryStore.setLoading(true);

    try {
      const request = await dictionaryApi.getCategoryList();
      const categories = request.data;
      dictionaryStore.setCategories(categories)
    }
    catch (error) {
      throw new Error(error)
    }
    finally {
      dictionaryStore.setLoading(false);
    }
  },
}

export default dictionaryService;
