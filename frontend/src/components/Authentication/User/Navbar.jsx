import React, { useState } from "react"; 
import {
  Box,
  Flex,
  Button,
  Stack,
  Input,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  useDisclosure,
  useToast,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Center,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../../redux/slices/authSlice";
import axiosInstance from "../../../utils/axiosInstance";
import Cookies from "js-cookie";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false); 

  // Formik form handling
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    onSubmit: async (values) => {
      setIsLoading(true); 
      try {
        const response = await axiosInstance.post(
          isLogin ? "/user/login" : "/user/register",
          values
        );

        if (response.status === 200 || response.status === 201) {
          dispatch(login());
          toast({
            title: isLogin ? "Login Successful" : "Registration Successful",
            description: response.data.message,
            status: "success",
            duration: 3000,
            isClosable: true,
          });

          setTimeout(() => {
            navigate(isLogin ? "/user-profile" : "/verify-email");
            onClose();
            formik.resetForm();
          }, 1500);
        }
      } catch (error) {
        console.error("Error during authentication:", error);
        toast({
          title: "Error",
          description: error.response?.data?.message || "An error occurred.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false); 
      }
    },
  });

  // Handle logout
  const handleLogout = () => {
    Cookies.remove("is_auth");
    Cookies.remove("refreshToken");
    Cookies.remove("accessToken");
    dispatch(logout());
    toast({
      title: "Logged out",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex
          className="container"
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box>Logo</Box>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              {!isLoggedIn && (
                <Button onClick={onOpen}>Login / Register</Button>
              )}

              {isLoggedIn && (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"sm"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar
                        size={"2xl"}
                        src={
                          "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                    </Center>
                    <br />
                    <Center>
                      <Text>Username</Text>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem>Your Servers</MenuItem>
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isLogin ? "Login" : "Register"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4} as="form" onSubmit={formik.handleSubmit}>
              {!isLogin && (
                <Input
                  name="name"
                  placeholder="Name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
              )}
              <Input
                name="email"
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <Input
                name="password"
                placeholder="Password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {!isLogin && (
                <Input
                  name="password_confirmation"
                  placeholder="Confirm Password"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password_confirmation}
                />
              )}
              <ModalFooter>
                <Button onClick={onClose}>Close</Button>
                <Button 
                  colorScheme="blue" 
                  type="submit" 
                  ml={3} 
                  isLoading={isLoading} // Add isLoading prop
                  loadingText={isLogin ? "Logging in..." : "Registering..."} // Set loading text
                >
                  {isLogin ? "Login" : "Register"}
                </Button>
              </ModalFooter>
            </Stack>
            <Text mt={4} textAlign="center">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Sign Up" : "Login"}
              </Button>
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Navbar;
