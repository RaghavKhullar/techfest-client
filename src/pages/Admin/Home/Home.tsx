import { Flex } from "@mantine/core";
import { SubTaskCard } from "../../../components";

const Home = () => {
  const arr = [...new Array(10).fill(0)];
  return (
    <>
      {/* <Flex wrap="wrap" justify="space-around">
        {arr.map((val, i) => {
          return <SubTaskCard key={i} />;
        })}
      </Flex> */}
    </>
  );
};

export default Home;
