import React, { useEffect } from "react";
import { Button, View, Text } from "react-native";
import useStore from "../store";
import { ScrollView, VStack, Box, Flex } from "native-base";

const SalleDattenteScreen = () => {
  const { fetchSalleDattentes, salleDattentes } = useStore();
  useEffect(() => {
    fetchSalleDattentes();
    console.log("salleDattente", salleDattentes);
  }, []);

  return (
    <View>
      <Text> this is the salledattente page ! </Text>
      <ScrollView>
        <VStack space={2} p={2}>
          {salleDattentes.map((salleDattente) => (
            <Box
              bg="primary.500"
              borderRadius="md"
              p={4}
              shadow={2}
              key={salleDattente.id}
            >
              <Flex direction="row" justifyContent="space-between">
                <Box>
                  <Text color="white" fontSize="xl">
                    {salleDattente.Patient.nom +
                      " " +
                      salleDattente.Patient.prenom}
                  </Text>
                  <Text color="white" fontSize="xl">
                    {salleDattente.motif}
                  </Text>
                </Box>
                <Box>
                  <Text
                    style={{
                      textAlign: "right",
                      color: "white",
                      fontSize: 20,
                    }}
                  >
                    {salleDattente.Patient.nom +
                      " " +
                      salleDattente.Patient.prenom}
                  </Text>
                  <Text
                    style={{
                      textAlign: "right",
                      color: "white",
                      fontSize: 20,
                    }}
                  >
                    {salleDattente.motif}
                  </Text>
                </Box>
              </Flex>
            </Box>
          ))}
          {/* Add more Box components for additional cards */}
        </VStack>
      </ScrollView>
    </View>
  );
};

export default SalleDattenteScreen;
