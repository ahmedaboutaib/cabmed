import { authenticate } from "../api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const authStore = (set) => ({
  isAuthenticated: false,
  isLoading:  false,
  token: '',
  error: "",
  loginUser: async (username, password) => {
    set({ isLoading: true });
    try {
      // Use your authenticate function here
      const response = await authenticate(username, password);
      if (response.token) {
        
        try {
          await AsyncStorage.setItem('jwt', response.token);
        }
        catch (error) {
          console.log(error)
        }
        set({ 
            isAuthenticated: true, 
            user: response.user, 
            cabinet: response.user.Cabinet ,
            token: response.token


        });

      } else {
        set({ error: response.message });
      }
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  signout: async () => {

    try {
        await AsyncStorage.removeItem('jwt');
      
    } catch (error) {
      console.log(error)
    }
    set({ 
        isAuthenticated: false, 
        user: {}, 
        cabinet: {},
        token:''
    });
  },
});
