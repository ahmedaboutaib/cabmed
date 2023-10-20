import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import { userStore } from './user';
import { patientStore } from './patient';
import { authStore } from './auth';
import { cabinetStore } from './cabinet';
import { rendezVousStore } from './rendezVous';
import { salleDatttenteStore } from './salleDattente';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useStore = create(persist((...a) => ({
  ...userStore(...a),
  ...patientStore(...a),
  ...salleDatttenteStore(...a),
  ...authStore(...a),
  ...cabinetStore(...a),
  ...rendezVousStore(...a),

}),
{
  name:'cabmed_storage',
  version:'1.0.0',
  storage: createJSONStorage(() => AsyncStorage),
}

));

export default useStore;
