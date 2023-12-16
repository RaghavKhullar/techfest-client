import { useState } from "react";
import { getGoogleUrl } from "../../utils/getGoogleUrl";
import style from "./style.module.css";
import { Button, Center, Flex, SimpleGrid, Switch } from "@mantine/core";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { Link } from "react-router-dom";
const MODE = {
  USER: 1,
  ADMIN: 2,
};

const Login = () => {
  const [mode, setMode] = useState<Number>(MODE.USER);
  const generateGoogleUrl = (m: Number) => {
    const url = getGoogleUrl(m === MODE.ADMIN);
    return url;
  };
  return (
    <>
      <div className={style.wrapper}></div>
      <div className={style.form}>
        <Center className="w-[100%]">
          <SimpleGrid className="w-[30%]" verticalSpacing={"30%"}>
            <Center>
              <h1 className="text-5xl tracking-wide">'Welcome back!'</h1>
            </Center>
            <Center className="w-[100%]">
              <Flex className="text-lg justify-center w-[100%]">
                <Center className="text-2xl mr-[4%]">
                  Login as a {mode === MODE.USER ? "User" : "Admin"}
                </Center>
                <Center>
                  <Switch
                    size="lg"
                    onLabel="Admin"
                    offLabel="User"
                    onClick={() =>
                      setMode(mode === MODE.USER ? MODE.ADMIN : MODE.USER)
                    }
                  />
                </Center>
              </Flex>
            </Center>
            <Center>
              <Button
                to={generateGoogleUrl(mode)}
                component={Link}
                leftSection={<IconBrandGoogleFilled size={14} />}
                variant="default"
              >
                Login with Google
              </Button>
            </Center>
          </SimpleGrid>
        </Center>
      </div>
    </>
  );
};

export default Login;
