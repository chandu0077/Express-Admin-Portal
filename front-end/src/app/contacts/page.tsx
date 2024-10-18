"use client";
import { Flex, Text, Box } from "@chakra-ui/react";
import Sidebar from "@/components/Sidebar";
import ContactCreate from "@/components/ContactCreate";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
export default function HomePage() {
  const [contactsData, setContactsData] = useState<any>();
  const [Editing, setEditing] = useState<boolean>(false);
  const [contactData, setContactData] = useState<any>();

  const getContacts = async () => {
    const accessToken = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:5000/api/contact", {
        headers: {
          "auth-Token": accessToken,
        },
      });
      console.log("response", response);
      setContactsData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getContacts();
  }, []);

  const editContact = (contactId: string) => {
    const contact = contactsData.filter(
      (contact: any) => contact._id === contactId,
    );
    setContactData(contact);
    setEditing(true);
  };

  const deleteContact = async (contactId: string) => {
    const accessToken = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/contact/${contactId}`,
        {
          headers: {
            "auth-Token": accessToken,
          },
        },
      );
      getContacts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Flex w="full" className="frost-effect" p="8" justifyContent={"center"}>
        <Text color="black" fontSize={"32px"} fontWeight={"bold"}>
          Admin Panel
        </Text>
      </Flex>
      <Flex maxW="90%" mx="auto" gap="4" mt="4">
        <Sidebar />
        <Box w="100%" h="90vh" className="frost-effect" p="6">
          <ContactCreate
            Editing={Editing}
            getContacts={getContacts}
            contactData={contactData}
            setEditing={setEditing}
          />
          {!contactsData ||
            (contactsData.length == 0 && (
              <Text
                fontSize={"2xl"}
                textAlign={"center"}
                fontWeight={500}
                color="white"
              >
                No Contacts Added
              </Text>
            ))}
          {contactsData && contactsData.length > 0 && (
            <TableContainer mt="4">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th fontSize={"lg"} fontWeight={"semibold"} color="black">
                      Name
                    </Th>
                    <Th fontSize={"lg"} fontWeight={"semibold"} color="black">
                      Phone
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {contactsData &&
                    contactsData.map((contact: any, key: any) => (
                      <Tr key={key}>
                        <Td
                          fontSize={"sm"}
                          fontWeight={"semibold"}
                          color="black"
                        >
                          {contact.name}
                        </Td>
                        <Td
                          fontSize={"sm"}
                          fontWeight={"semibold"}
                          color="black"
                        >
                          {contact.phone}
                        </Td>
                        <Td>
                          <Menu>
                            <MenuButton
                              p="0"
                              _hover={{
                                backgroundColor: "transparent",
                                border: "1px solid black",
                              }}
                              bgColor="transparent"
                              as={Button}
                            >
                              <Icon
                                as={BsThreeDotsVertical}
                                color="black"
                                zIndex={50}
                                boxSize="6"
                              />
                            </MenuButton>
                            <MenuList>
                              <MenuItem
                                onClick={() => editContact(contact._id)}
                              >
                                Edit
                              </MenuItem>
                              <MenuItem
                                onClick={() => deleteContact(contact._id)}
                              >
                                Delete
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Flex>
    </>
  );
}
