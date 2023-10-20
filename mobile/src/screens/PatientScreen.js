import React, { useEffect } from "react";
import { View, Text } from "react-native";
import useStore from "../store";
import {
  Box,
  Heading,
  FlatList,
  HStack,
  Avatar,
  VStack,
  Spacer,
  Input,
  Icon,
} from "native-base";
import { Feather } from "@expo/vector-icons";
const PatientScreen = () => {
  const { fetchPatients, cabinet, patients } = useStore();
  useEffect(() => {
    fetchPatients();
  }, []);
  return (
    <Box>
      {/* search bar */}
      <VStack style={{ backgroundColor: "#fff", padding: 10 }}>
        <Input
          placeholder="Chercher un patient"
          width="100%"
          borderRadius="4"
          py="3"
          px="1"
          fontSize="14"
          style={{ backgroundColor: "#fff" }}
          InputLeftElement={
            <Icon
              m="2"
              ml="3"
              size="6"
              style={{ color: "#046791" }}
              as={<Feather name="search" />}
            />
          }
        />

        {/* patients list */}
      </VStack>
      <FlatList
        data={patients}
        renderItem={({ item }) => (
          <Box
            borderBottomWidth="1"
            style={{ borderColor: "#D5D3D5" }}
            pl={["2", "4"]}
            pr={["2", "5"]}
            py="2"
          >
            <HStack space={[3, 3]} justifyContent="space-between">
              <Avatar
                size="48px"
                source={{
                  uri: "https://unsplash.com/fr/photos/mEZ3PoFGs_k",
                }}
              />
              <VStack>
                <Text color="coolGray.800" bold>
                  {item.nom} {item.prenom}
                </Text>
                <Text style={{ color: "#046791", fontSize: 15 }}>
                  {item.tel}
                </Text>
              </VStack>
              <Spacer />
              <Text fontSize="xs" color="coolGray.800" alignSelf="flex-start">
                {item.dateNaissance}
              </Text>
            </HStack>
          </Box>
        )}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
};

export default PatientScreen;
