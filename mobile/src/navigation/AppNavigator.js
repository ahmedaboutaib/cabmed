import {
  DrawerContentScrollView,
  DrawerContent,
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import PatientScreen from "../screens/PatientScreen";
import { Divider, Text, Center, Button, IconButton } from "native-base";
import useStore from "../store";
import RendezVousScreen from "../screens/RendezVousScreen";
import SalleDattenteScreen from "../screens/SalleDattenteScreen";
import * as Font from "expo-font";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

function AppDrawerContent(props) {
  const { signout } = useStore();
  return (
    <DrawerContentScrollView {...props}>
      <Center>
        <Text
          style={{
            fontFamily: "Lobster_400Regular",
            color: "#046791",
            fontSize: 30,
            paddingTop: 20,
          }}
        >
          CabMed
        </Text>
      </Center>
      <DrawerItemList {...props} />
      <Divider />
      <DrawerItem label="Help" onPress={() => console.log("help")} />
      <DrawerItem
        label="Sign out"
        labelStyle={{ color: "red" }}
        style={{ backgroundColor: "#f2f2f2" }}
        onPress={() => signout()}
      />
    </DrawerContentScrollView>
  );
}
const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <AppDrawerContent {...props} />}
    >
      <Drawer.Screen name="Dashboard" component={HomeScreen} />
      <Drawer.Screen
        name="Patient"
        component={PatientScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <IconButton
              icon={<Ionicons name="ios-add-circle-outline" size={24} color="black" />}
              onPress={() => {
                navigation.navigate('PatientNavigator',{screen:'AddPatient'});
              }}
            />
          ),
        })}
      >
      </Drawer.Screen>
      <Drawer.Screen name="Rendez Vous" component={RendezVousScreen} />
      <Drawer.Screen name="Salle d'attent" component={SalleDattenteScreen} />
      <Drawer.Screen name="Dépense" component={PatientScreen} />
      <Drawer.Screen name="Paiement" component={PatientScreen} />
      <Drawer.Screen name="Parametres" component={PatientScreen} />
    </Drawer.Navigator>
  );
};

export default AppNavigator;
