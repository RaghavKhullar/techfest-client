import { Flex, Center, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { fetchAllUsers } from "../../../helpers/apiCalls";
import { showNotification } from "../../../helpers/helpers";
import { useNavigate } from "react-router-dom";
import { UserCard } from "../../../components";

const ViewUser = () => {
  const [users, setUsers] = useState<UserResponseAdmin[]>([]);
  const navigate = useNavigate();
  const fetchUsers = async () => {
    try {
      const response = await fetchAllUsers();
      if (response.status === 200) {
        setUsers(response.data.data);
      } else {
        showNotification("Error", response.data.message, "error");
        navigate("/admin/viewProject");
        return;
      }
    } catch {
      showNotification("Error", "Internal server error", "error");
      navigate("/login");
      return;
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      <Flex wrap="wrap" justify="space-around">
        {users.length > 0 ? (
          users.map((project: UserResponseAdmin, i) => {
            return <UserCard key={i} user={project} fetchUsers={fetchUsers} />;
          })
        ) : (
          <Center>
            <Text className="text-2xl">Fetching all users...</Text>
          </Center>
        )}
      </Flex>
    </>
  );
};

export default ViewUser;
