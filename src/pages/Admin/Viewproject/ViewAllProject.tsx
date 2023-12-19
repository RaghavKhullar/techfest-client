import { Flex } from "@mantine/core";
import { ProjectCard } from "../../../components";
import { useEffect, useState } from "react";
import { fetchAllProjects } from "../../../helpers/apiCalls";
import { showNotification } from "../../../helpers/helpers";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [projects, setProjects] = useState<AllProjectResponse[]>([]);
  const navigate = useNavigate();
  const fetchProjects = async () => {
    try {
      const response = await fetchAllProjects();
      if (response.status === 200) {
        setProjects(response.data.data);
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
    fetchProjects();
  }, []);
  return (
    <>
      <Flex wrap="wrap" justify="space-around">
        {projects.map((project: AllProjectResponse, i) => {
          return <ProjectCard key={i} project={project} />;
        })}
      </Flex>
    </>
  );
};

export default Home;
