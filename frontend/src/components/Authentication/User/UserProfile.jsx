import React from "react";
import {
  Avatar,
  Box,
  Flex,
  Icon,
  Text,
  Link as RouterLink,
  Image,
  Button,
  Heading,
  Stack,
  VStack,
  Drawer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  DrawerContent,
  IconButton,
  useDisclosure,
  DrawerOverlay,
  useColorModeValue,
} from "@chakra-ui/react";
import { AiOutlineTeam, AiOutlineHome } from "react-icons/ai";
import { BsFolder2, BsCalendarCheck } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { RiFlashlightFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handling logout
  const handleLogout = () => {
    Cookies.remove("is_auth");
    Cookies.remove("refreshToken");
    Cookies.remove("accessToken");
    dispatch(logout());
    navigate("/");
  };

  return (
    <Box
      as="section"
      bg={useColorModeValue("gray.50", "gray.800")}
      minH="100vh"
    >
      <SidebarContent display={{ base: "none", md: "unset" }} handleLogout={handleLogout} />
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" handleLogout={handleLogout} />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Flex
          as="header"
          align="center"
          w="full"
          px="4"
          d={{ base: "flex", md: "none" }}
          borderBottomWidth="1px"
          borderColor={useColorModeValue("gray.200", "gray.700")}
          bg={useColorModeValue("white", "gray.800")}
          justifyContent={{ base: "space-between", md: "flex-end" }}
          boxShadow="lg"
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{ base: "inline-flex", md: "none" }}
            onClick={onOpen}
            icon={<FiMenu />}
            size="md"
          />
          <Flex align="center">
            <Icon as={RiFlashlightFill} h={8} w={8} color="blue.400" />
          </Flex>
        </Flex>

        <Box
          as="main"
          p={8}
          minH="30rem"
          bg={useColorModeValue("white", "gray.800")}
          borderRadius="md"
          boxShadow="md"
        >
          <Stack
            direction={{ base: "column", sm: "row" }}
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack spacing={6} flex="1">
              <Box>
                <Heading color="blue.400" fontSize="4xl">
                  Welcome to Your Profile
                </Heading>
                <Text fontSize="lg" color="gray.600">
                  Manage your inventory, vendors, and sales efficiently.
                </Text>
              </Box>
              <Stack direction={{ base: "column", md: "row" }} spacing={4}>
                <Button
                  rounded="full"
                  bg="blue.400"
                  color="white"
                  _hover={{ bg: "blue.500" }}
                  size="lg"
                  px={6}
                >
                  Stocks
                </Button>
                <Button
                  rounded="full"
                  size="lg"
                  variant="outline"
                  colorScheme="blue"
                >
                  Vendors
                </Button>
              </Stack>
            </Stack>

            <Image
              alt="Profile Image"
              objectFit="cover"
              boxSize={{ base: "100%", sm: "300px" }}
              borderRadius="md"
              src="https://plus.unsplash.com/premium_photo-1685136482569-a59b03025108?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

const SidebarContent = ({ handleLogout, ...props }) => (
  <Box
    as="nav"
    pos="fixed"
    top="0"
    left="0"
    zIndex="sticky"
    h="full"
    overflowX="hidden"
    overflowY="auto"
    bg={useColorModeValue("white", "gray.800")}
    borderColor={useColorModeValue("inherit", "gray.700")}
    borderRightWidth="1px"
    w="60"
    {...props}
  >
    <VStack
      h="full"
      w="full"
      alignItems="flex-start"
      justifyContent="space-between"
    >
      <Box w="full">
        <Flex px="4" py="5" align="center">
          <Icon as={RiFlashlightFill} h={8} w={8} />
          <Text
            fontSize="2xl"
            ml="2"
            color={useColorModeValue("brand.500", "white")}
            fontWeight="semibold"
          >
            POS
          </Text>
        </Flex>
        <Flex
          direction="column"
          as="nav"
          fontSize="md"
          color="gray.600"
          aria-label="Main Navigation"
        >
          <NavItem icon={AiOutlineHome}>Dashboard</NavItem>
          <NavItem icon={AiOutlineTeam}>Team</NavItem>
          <NavItem icon={BsFolder2}>Projects</NavItem>
          <NavItem icon={BsCalendarCheck}>Calendar</NavItem>
        </Flex>
      </Box>

      <Flex px="4" py="5" mt={10} justifyContent="center" alignItems="center">
        <Menu>
          <MenuButton
            as={Button}
            size={"sm"}
            rounded={"full"}
            variant={"link"}
            cursor={"pointer"}
            _hover={{ textDecoration: "none" }}
          >
            <Avatar
              size={"sm"}
              name="Ahmad"
              src="https://avatars2.githubusercontent.com/u/37842853?v=4"
            />
          </MenuButton>
          <MenuList fontSize={17} zIndex={5555}>
            <MenuItem as={RouterLink} to="#">
              My Profile
            </MenuItem>
            <MenuItem as={RouterLink} to="#">
              Change Password
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem> {/* This will now work */}
          </MenuList>
        </Menu>
      </Flex>
    </VStack>
  </Box>
);

const NavItem = (props) => {
  const color = useColorModeValue("gray.600", "gray.300");
  const { icon, children } = props;

  return (
    <Flex
      align="center"
      px="4"
      py="3"
      cursor="pointer"
      role="group"
      fontWeight="semibold"
      transition=".15s ease"
      color={useColorModeValue("inherit", "gray.400")}
      _hover={{
        bg: useColorModeValue("gray.100", "gray.900"),
        color: useColorModeValue("gray.900", "gray.200"),
      }}
    >
      {icon && (
        <Icon
          mx="2"
          boxSize="4"
          _groupHover={{
            color: color,
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  );
};
