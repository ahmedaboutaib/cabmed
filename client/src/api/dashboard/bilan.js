import api from '../../utils/apitoken';

export  const createBilanWithCompositions = async (bilan) => {
  try {
    console.log('bilan :: ', bilan);
    const response = await api.post('/bilan/bilan-compositions', { bilan });

    console.log('response :: ', response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
