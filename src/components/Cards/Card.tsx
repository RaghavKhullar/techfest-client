import {
  Button,
  Card,
  Flex,
  Text,
  Image,
  Modal,
  Center,
  Box,
  TextInput,
  SegmentedControl,
  NumberInput,
  Group,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { BACKEND_URL } from "../../../config";
import { DatePickerInput } from "@mantine/dates";
import { moral, position, role } from "../../utils/utils";
import { IconGenderFemale, IconGenderMale } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import {
  editUserByAdmin,
  generateReviewUser,
  getUserFullDetails,
} from "../../helpers/apiCalls";
import { showNotification } from "../../helpers/helpers";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const UserViewModal = ({
  user,
  isModalOpen,
  close,
  // fetchUsers,
}: {
  user: UserResponseAdmin;
  isModalOpen: boolean;
  close: () => void;
  // fetchUsers: () => Promise<void>;
}) => {
  const navigate = useNavigate();
  const [isEditModalOpen, { open: editOpen, close: editClose }] =
    useDisclosure(false);
  const [textReview, setTextReview] = useState<string>("");
  const [fetching, setFetching] = useState<boolean>(false);
  const getFormattedDate = (date: Date) => {
    const yyyy = date.getFullYear();
    let mm: any = date.getMonth() + 1; // Months start at 0!
    let dd: any = date.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    return dd + "/" + mm + "/" + yyyy;
  };
  const [isOpen, { open: openModal, close: closeModal }] = useDisclosure(false);
  const generateReview = async () => {
    try {
      setFetching(true);
      const response = await generateReviewUser(user.id);
      if (response.status === 200) {
        setFetching(false);
        setTextReview(response.data);
        return;
      } else {
        showNotification("Error", response.data.message, "error");
        return;
      }
    } catch {
      showNotification("Error", "Internal server error", "error");
      navigate("/login");
      return;
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      generateReview();
    }
  }, [isModalOpen]);
  return (
    <>
      {user.id.length > 0 && (
        <>
          {" "}
          <Modal
            opened={isModalOpen && user.id.length > 0}
            onClose={() => {
              close();
              if (isEditModalOpen) {
                editClose();
              }
              if (isOpen) {
                closeModal();
              }
            }}
            centered
            overlayProps={{
              backgroundOpacity: 0.55,
              blur: 3,
            }}
          >
            <Flex className="justify-center align-center">
              <Image
                className="max-w-[50%]"
                src={`${BACKEND_URL}/images/profiles/${
                  user.image.length > 0 ? user.image : "dummyProfile.png"
                }`}
              />
            </Flex>
            <Text ta="center" fw={500} size="lg" mt="md">
              {user.name}
            </Text>
            <Text size="md">Email: {user.email}</Text>
            <Text size="md">Role: {user.role}</Text>
            <Text size="md">Position: {user.position}</Text>
            <Text size="md">Gender: {user.gender}</Text>
            <Text size="md">Age: {user.age}</Text>
            <Text size="md">
              Marital Status: {user.isMarried ? "Married" : "Unmarried"}
            </Text>
            <Text size="md">Salary: {user.salary}k</Text>
            <Text size="md">Absence: {user.absences}</Text>
            <Text size="md">
              Joining Date: {getFormattedDate(new Date(user.joiningDate))}
            </Text>
            <Text size="md">Current Rating: {user.currentRating}</Text>
            <Text size="md">
              Moral: {user.moral.length > 0 ? user.moral : "Not specified"}
            </Text>
            <Text size="md">Stress score: {user.stressBurnoutScore}</Text>
            <Flex className="justify-evenly">
              {/* <Button onClick={editOpen}>Edit profile</Button> */}
              <Button onClick={openModal}>Generate Review</Button>
            </Flex>
          </Modal>
          <Modal
            opened={isOpen && isModalOpen && !fetching && textReview.length > 0}
            onClose={closeModal}
          >
            <Text className="size-lg">Review: {user.name}</Text>
            <Text>{textReview}</Text>
          </Modal>
        </>
      )}

      {/* <EditUserModel
          isEditModalOpen={isEditModalOpen}
          editClose={editClose}
          user={user}
        //   fetchUsers={fetchUsers}
        /> */}
    </>
  );
};

const UserCard = ({
  id,
  isModalOpen,
  close,
}: {
  id: string;
  isModalOpen: boolean;
  close: () => void;
  // fetchUsers: () => Promise<void>;
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserResponseAdmin>({
    id: "",
  } as UserResponseAdmin);
  const isMobile = useMediaQuery("max-width:600px");
  const getUser = async (id: string) => {
    user;
    try {
      const response = await getUserFullDetails(id);
      if (response.status === 200) {
        setUser(response.data.data);
        return;
      } else {
        showNotification("Error", response.data.message, "error");
        // navigate("/user/analytics");
        close();
        return;
      }
    } catch {
      showNotification("Error", "Internal server error", "error");
      navigate("/login");
      close();
      return;
    }
  };
  useEffect(() => {
    if (id.length > 0) getUser(id);
  }, [id]);
  // const [isModalOpen, { open, close }] = useDisclosure(false);
  return (
    <>
      {user.id.length > 0 && (
        <UserViewModal
          isModalOpen={isModalOpen}
          close={close}
          user={user}
          //   fetchUsers={fetchUsers}
        />
      )}
      {/* <UserViewModal
                isModalOpen={isModalOpen}
                close={close}
                user={user}
            //   fetchUsers={fetchUsers}
            /> */}
    </>
  );
};

export default UserCard;
