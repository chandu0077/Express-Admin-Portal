import { contactForm } from "@/utilis/forms/contactForm";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IoLogOut } from "react-icons/io5";
import {
  FormErrorMessage,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useEffect } from "react";
interface Props {
  getContacts: Function;
  Editing: boolean;
  contactData: any;
  setEditing: Function;
}

type IContactForm = yup.InferType<typeof contactForm>;

const defaultValues: IContactForm = {
  name: "",
  phone: "",
};
const ContactCreate: React.FC<Props> = ({
  getContacts,
  Editing,
  contactData,
  setEditing,
}) => {
  const router = useRouter();
  const values = Editing ? contactData[0] : defaultValues;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<IContactForm>({
    resolver: yupResolver(contactForm),
    mode: "onChange",
    reValidateMode: "onChange",
    // defaultValues: "defaultValues",
    values: values,
  });

  const contactcreate = (data: IContactForm) => {
    const accessToken = localStorage.getItem("token");
    console.log("data", data);
    axios
      .post("http://localhost:5000/api/contact/", data, {
        headers: {
          //   "Content-Type": "application/json",
          "auth-token": accessToken,
        },
      })
      .then(function (response: any) {
        reset(defaultValues);
        getContacts();
        onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editContact = (data: IContactForm) => {
    const accessToken = localStorage.getItem("token");
    axios
      .put(`http://localhost:5000/api/contact/${data_id}`, data, {
        headers: {
          "Content-Type": "application/json",
          "auth-Token": accessToken,
        },
      })
      .then(() => {
        reset(defaultValues);
        getContacts();
        onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = (data: IContactForm) => {
    Editing ? editContact(data) : contactcreate(data);
  };
  const createContactandEdit = () => {
    onOpen();
  };

  useEffect(() => {
    if (Editing) {
      createContactandEdit();
    }
  }, [Editing]);

  const onModalCloseHandler = () => {
    setEditing(false);
    onClose();
  };

  return (
    <>
      <Button textAlign={"center"} type="submit" onClick={createContactandEdit}>
        Create A Contact
      </Button>

      <Modal onClose={onModalCloseHandler} size={"lg"} isOpen={isOpen}>
        <ModalOverlay
          bg="none"
          backdropFilter="auto"
          backdropInvert="80%"
          backdropBlur="2px"
        />
        <ModalContent
          p="8"
          mx="auto"
          mt="10%"
          backgroundColor={"white"}
          borderRadius={"20px"}
          width="50%"
        >
          <Box display={"flex"} justifyContent={"space-between"} w="100%">
            <Text
              width="300px"
              display={"block"}
              fontSize={"22px"}
              fontWeight={700}
            >
              {Editing ? "Edit" : "Create"} A Contact
            </Text>
            <ModalCloseButton />
          </Box>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  border="1px solid lightblack"
                  borderRadius="12px"
                  p="4"
                  placeholder="Name"
                  {...register("name")}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Phone</FormLabel>
                <Input
                  border="1px solid lightblack"
                  borderRadius="12px"
                  p="4"
                  type="number"
                  placeholder="phone number:"
                  {...register("phone")}
                />
                <FormErrorMessage>{`${errors?.phone?.message}`}</FormErrorMessage>
              </FormControl>
              <Button
                mt="3"
                background="black"
                color="white"
                px="12"
                py="6"
                borderRadius="12px"
                type="submit"
                isDisabled={!isValid}
                _disabled={{ background: "lightgrey" }}
                _hover={{
                  bg: "white.500",
                  _disabled: {
                    backgroundColor: "red",
                    cursor: "not-allowed",
                  },
                }}
              >
                {Editing ? "Update" : "Add"}
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ContactCreate;
