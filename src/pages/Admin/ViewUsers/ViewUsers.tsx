import { Flex } from "@mantine/core";
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
        navigate("/admin/home");
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
        {users.length > 0 &&
          users.map((project: UserResponseAdmin, i) => {
            return <UserCard key={i} user={project} fetchUsers={fetchUsers} />;
          })}
      </Flex>
    </>
  );
};

export default ViewUser;
