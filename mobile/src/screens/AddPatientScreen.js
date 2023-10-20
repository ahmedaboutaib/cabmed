import React, {useState} from "react";
import { ScrollView, Text, KeyboardAvoidingView, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Box, Input, Select, Button, VStack } from "native-base";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import useStore from "../store";

const AddPatientScreen = () => {
  const { signout, user, token, cabinet } = useStore();
  const options = [
    { label: "nom", name: "nom", type: "text" },
    { label: "prénom", name: "prenom", type: "text" },
    { label: "Réference du dossier médical", name: "reference", type: "text" },
    { label: "Date de naissance", name: "dateNaissance", type: "date" },
    {
      label: "sexe",
      name: "sexe",
      type: "select",
      options: ["homme", "femme"],
    },
    {
      label: "Groupe Sanguin",
      name: "groupeSanguin",
      type: "select",
      options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    { label: "Email", name: "email", type: "text" },
    { label: "Adresse", name: "adresse", type: "text" },
    { label: "Numéro de téléphone", name: "numeroTelephone", type: "text" },
    { label: "Profession", name: "profession", type: "text" },
    { label: "Situation familiale", name: "situationFamiliale", type: "text" },
  ];
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    setValue("dateNaissance", date);
    hideDatePicker();
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, justifyContent: "center", padding: 10}}
    >
      <ScrollView h="500%" >
        <VStack space={4} alignItems="center" pb={250}>
          {options.map((option) => {

{/*----------------------  text type input ------------------------------*/}

            if (option.type === "text") { 
              return (
                <Box key={option.name}>
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        mx="3"
                        placeholder={option.label}
                        w="100%"
                      />
                    )}
                    name={option.name}
                  />
                  {errors[option.name] && <Text>This field is required.</Text>}
                </Box>
              );


            } else if (option.type === "select") {

{/*----------------------  select input type ------------------------------*/}

              return (
                <Box key={option.name}>
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        mx="3"
                        placeholder={option.label}
                        style={{width: "100%"}}
                        onChange={(value) => field.onChange(value)}
                        value={field.value}
                      >
                        {option.options.map((item, index) => (
                          <Select.Item key={index} label={item} value={item} />
                        ))}
                      </Select>
                    )}
                    name={option.name}
                  />
                  {errors[option.name] && <Text>This field is required.</Text>}
                </Box>
              );
            } else if (option.type === "date") {

{/*----------------------  Date input type ------------------------------*/}

              return (
                <Box key={option.name}>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Box>
<Pressable onPress={showDatePicker}>
      {({ pressed }) => (
        <Box
          style={{
            backgroundColor: pressed ? 'lightgray' : 'white',
            padding: 10,
            borderRadius: 5,
          }}
        >
                        <Input w="100%" {...field} placeholder={option.label} {...register(option.name, { required: true })} />
        </Box>
      )}
    </Pressable>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      </Box>
                  )}
                  name={option.name}
                  defaultValue={null}
                />
                {errors[option.name] && <Text>This field is required.</Text>}
              </Box>
              );
            }
            return null; // Add a default case or remove this line if not necessary
          })}
          <Button onPress={handleSubmit(onSubmit)}>Submit</Button>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddPatientScreen;
