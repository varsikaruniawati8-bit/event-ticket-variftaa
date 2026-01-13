import axios from "axios";
import type {AxiosInstance, AxiosError, AxiosResponse} from "axios";
  /**
   * Membuat instance axios bertipe AxiosInstance
   * Dengan typing ini, IntelliSense & type checking akan aktif
   */
  const api: AxiosInstance = axios.create({
    /**
     * baseURL
     * URL dasar untuk semua request API
     */
    baseURL: "https://694a978426e870772065fc10.mockapi.io/api",
  
    /**
     * timeout
     * Batas maksimal waktu request (ms)
     */
    timeout: 10000,
  
    /**
     * headers default
     * Menandakan request dan response menggunakan JSON
     */
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  /**
   * RESPONSE INTERCEPTOR
   * Digunakan untuk memproses response & error secara global
   */
  api.interceptors.response.use(
    /**
     * Response sukses (status 2xx)
     * AxiosResponse<T> → response bertipe generic
     */
    (response: AxiosResponse) => {
      /**
       * Mengembalikan data saja
       * Sehingga pemanggil tidak perlu menulis response.data
       */
      return response.data;
    },
  
    /**
     * Response gagal (error)
     */
    (error: AxiosError) => {
      /**
       * Menampilkan error untuk debugging
       */
      console.error("API Error:", error);
  
      /**
       * Tetap lempar error agar bisa ditangkap try/catch
       */
      return Promise.reject(error);
    }
  );
  
  /**
   * Export axios instance
   */
  export default api;
  