import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "native-base";
import AddPatientScreen from "../screens/AddPatientScreen";
import PatientScreen from "../screens/PatientScreen";

const PatientStack = createNativeStackNavigator();

const PatientNavigator = () => {
  return (
    <PatientStack.Navigator initialRouteName="Home">
      <PatientStack.Screen name="Home" component={PatientScreen} />
      <PatientStack.Screen name="AddPatient" component={AddPatientScreen} />
    </PatientStack.Navigator>
  );
};

export default PatientNavigator;
