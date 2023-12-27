import {
  Box,
  Button,
  Center,
  CopyButton,
  Flex,
  Group,
  Image,
  Loader,
  Modal,
  ScrollArea,
  SegmentedControl,
  Select,
  Skeleton,
  Text,
  Textarea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  improveWritingUser,
  summariseText,
  writeEmail,
} from "../../helpers/apiCalls";
import { showNotification } from "../../helpers/helpers";

interface Props {
  delay: number;
}
const HelpDesk: FC<Props> = ({ delay }) => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState<string>("1");

  const [text, setText] = useState<any>("");
  const [emailPoints, setEmailPoints] = useState<string>("");
  const [improveWriting, setImproveWriting] = useState<string>("");
  const [chat, setChat] = useState<string>("");

  const [isFetchingEmail, setFetchingEmail] = useState<boolean>(false);
  const [isFetchingText, setFetchingText] = useState<boolean>(false);
  const [isFetchingImproveWriting, setIsFetchingImproveWriting] =
    useState<boolean>(false);
  const [isFetchingChat, setIsFetchingChat] = useState<boolean>(false);

  const [isGeneratedEmail, setIsGeneratedEmail] = useState<boolean>(false);
  const [isGeneratedSummary, setIsGeneratedSummary] = useState<boolean>(false);
  const [isGeneratedImproveText, setIsGeneratedImproveText] =
    useState<boolean>(false);

  const [generatedEmail, setGeneratedEmail] = useState<string>("");
  const [generatedSummary, setGeneratedSummary] = useState<string>("");
  const [generatedImproveText, setGeneratedImproveText] = useState<string>("");
  const [generatedChat, setGeneratedChat] = useState<
    { query: string; output: string }[]
  >([]);

  const generateChat = async (content: string) => {
    setIsFetchingChat(true);
    try {
      const arr = generatedChat;
      arr.push({ query: content, output: "" });
      setGeneratedChat(arr);
      const response = await writeEmail(content);
      if (response.status === 200) {
        const newArr = generatedChat;
        newArr.pop();
        newArr.push({ query: content, output: response.data });
        setGeneratedChat(newArr);
      } else {
        const newArr = generatedChat;
        newArr.pop();
        setGeneratedChat(newArr);
        showNotification("Error", response.data.message, "error");
      }
    } catch {
      showNotification("Error", "Internal server error", "error");
      navigate("/login");
    }
    setChat("");
    setIsFetchingChat(false);
  };

  const genenerateEmail = async (content: string) => {
    setFetchingEmail(true);
    setIsGeneratedEmail(true);
    try {
      const response = await writeEmail(content);
      if (response.status === 200) {
        setGeneratedEmail(response.data);
        showNotification("Success", "Generated email successfully", "success");
      } else {
        setGeneratedEmail("");
        setIsGeneratedEmail(false);
        showNotification("Error", response.data.message, "error");
      }
    } catch {
      showNotification("Error", "Internal server error", "error");
      navigate("/login");
    }
    setFetchingEmail(false);
  };

  const generateImproveWriting = async (content: string) => {
    setIsFetchingImproveWriting(true);
    setIsGeneratedImproveText(true);
    try {
      const response = await improveWritingUser(content);
      if (response.status === 200) {
        setGeneratedImproveText(response.data);
        showNotification("Success", "Imrpoved writing successfully", "success");
      } else {
        showNotification("Error", response.data.message, "error");
        setGeneratedImproveText("");
        setIsGeneratedImproveText(false);
      }
    } catch {
      showNotification("Error", "Internal server error", "error");
      navigate("/login");
    }
    setIsFetchingImproveWriting(false);
  };

  const generateSummariseText = async (content: string) => {
    setFetchingText(true);
    setIsGeneratedSummary(true);
    try {
      const response = await summariseText(content);
      if (response.status === 200) {
        setGeneratedSummary(response.data);
        showNotification("Success", "Summarised successfully", "success");
      } else {
        showNotification("Error", response.data.message, "error");
        setIsGeneratedSummary(false);
        setGeneratedSummary("");
      }
    } catch {
      showNotification("Error", "Internal server error", "error");
      navigate("/login");
    }
    setFetchingText(false);
  };

  return (
    <motion.div
      style={{
        position: "fixed",
        bottom: "5vh",
        right: "5vw",
        zIndex: 2069,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0 } }}
    >
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={true}
        withinPortal={true}
        styles={{
          inner: {
            visibility: "hidden",
          },
        }}
      ></Modal>
      <AnimatePresence>
        {!opened && (
          <motion.div
            initial={{ x: "-50%", y: "-100%", opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={{ x: "-50%", y: "-100%", opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              style={{
                width: "200px !important",
                zIndex: 1000,
              }}
              onClick={open}
            >
              Open
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ x: "100%", y: "100%", opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={{ x: "100%", y: "100%", opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: "fixed",
              display: "flex",
              flexDirection: "column",
              rowGap: "5%",
              boxSizing: "border-box",
              borderWidth: "4px",
              borderStyle: "solid",
              borderColor: "purple",
              background: "white",
              borderRadius: "20px",
              padding: "2%",
              bottom: "25vh",
              right: "25vw",
              width: "45vw",
              height: "55vh",
              zIndex: 1000,
            }}
          >
            <ScrollArea h={450}>
              <Center>
                <Text size="lg">Write with AI</Text>
              </Center>
              <Group
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-around",
                  flexFlow: "row wrap",
                  overflowY: "auto",
                  marginTop: "1rem",
                }}
              >
                <div style={{ width: "75%" }}>
                  <Flex className="flex-col">
                    <SegmentedControl
                      value={value}
                      onChange={setValue}
                      className={`${value == "4" ? "mb-[5px]" : ""}`}
                      data={[
                        { label: "Improve writing", value: "1" },
                        { label: "Write an email", value: "2" },
                        { label: "Summarize", value: "3" },
                        { label: "Chat bot", value: "4" },
                      ]}
                    />
                    {value != "4" && (
                      <Flex className="items-center" mt={"5px"}>
                        <Text>Type:</Text>
                        <SegmentedControl
                          value={
                            value == "1"
                              ? isGeneratedImproveText.toString()
                              : value == "2"
                                ? isGeneratedEmail.toString()
                                : isGeneratedSummary.toString()
                          }
                          onChange={(e) =>
                            value == "1"
                              ? setIsGeneratedImproveText(e == "true")
                              : value == "2"
                                ? setIsGeneratedEmail(e == "true")
                                : setIsGeneratedSummary(e == "true")
                          }
                          data={[
                            { label: "Original", value: "false" },
                            { label: "Generated Output", value: "true" },
                          ]}
                        />
                      </Flex>
                    )}
                  </Flex>
                  {value == "1" &&
                    (isGeneratedImproveText ? (
                      <Skeleton visible={isFetchingImproveWriting}>
                        {" "}
                        <Textarea
                          classNames={{
                            input:
                              "h-[24vh] border-[3px] border-solid rounded-md",
                          }}
                          label="Improved Text(Editable)"
                          value={generatedImproveText}
                          onChange={(event) =>
                            setGeneratedImproveText(event.currentTarget.value)
                          }
                        />{" "}
                      </Skeleton>
                    ) : (
                      <Textarea
                        classNames={{
                          input:
                            "h-[24vh] border-[3px] border-solid rounded-md",
                        }}
                        label="Text to improve"
                        withAsterisk
                        placeholder="Paste/write the text you want to improve"
                        disabled={isFetchingImproveWriting}
                        value={improveWriting}
                        onChange={(event) =>
                          setImproveWriting(event.currentTarget.value)
                        }
                      />
                    ))}
                  {value == "2" &&
                    (isGeneratedEmail ? (
                      <Skeleton visible={isFetchingEmail}>
                        <Textarea
                          classNames={{
                            input:
                              "h-[24vh] border-[3px] border-solid rounded-md",
                          }}
                          label="Generated email(Editable)"
                          value={generatedEmail}
                          onChange={(event) =>
                            setGeneratedEmail(event.currentTarget.value)
                          }
                        />{" "}
                      </Skeleton>
                    ) : (
                      <Textarea
                        classNames={{
                          input:
                            "h-[24vh] border-[3px] border-solid rounded-md",
                        }}
                        label="Talking points"
                        withAsterisk
                        disabled={isFetchingEmail}
                        placeholder="List out the talking points for your email here"
                        value={emailPoints}
                        onChange={(event) =>
                          setEmailPoints(event.currentTarget.value)
                        }
                      />
                    ))}
                  {value == "3" &&
                    (isGeneratedSummary ? (
                      <Skeleton visible={isFetchingText}>
                        {" "}
                        <Textarea
                          classNames={{
                            input:
                              "h-[24vh] border-[3px] border-solid rounded-md",
                          }}
                          label="Summarised Text(Editable)"
                          value={generatedSummary}
                          onChange={(event) =>
                            setGeneratedSummary(event.currentTarget.value)
                          }
                        />{" "}
                      </Skeleton>
                    ) : (
                      <Textarea
                        classNames={{
                          input:
                            "h-[24vh] border-[3px] border-solid rounded-md",
                        }}
                        label="Original Text"
                        placeholder="Type/Paste your text here to summarise"
                        withAsterisk
                        value={text}
                        disabled={isFetchingText}
                        onChange={(event) => setText(event.currentTarget.value)}
                      />
                    ))}
                  {value == "4" && (
                    <>
                      <Flex className="h-[20vh] max-h-[20vh] border-[3px] border-solid rounded-md overflow-y-auto w-full flex-col">
                        {generatedChat.map((elem, key) => {
                          return (
                            <>
                              <Flex
                                className="max-w-[70%] rounded-lg bg-blue-500 text-white self-end mt-[10px] mr-[4px]"
                                key={key}
                              >
                                <Text>{elem.query}</Text>
                              </Flex>
                              <Flex
                                className="max-w-[70%] rounded-lg bg-green-500 text-white self-start mt-[10px] ml-[4px]"
                                key={generatedChat.length + key}
                              >
                                <Text>
                                  {elem.output.length > 0
                                    ? elem.output
                                    : "Generating ..."}
                                </Text>
                              </Flex>
                            </>
                          );
                        })}
                      </Flex>
                      <Skeleton visible={isFetchingChat}>
                        <Textarea
                          classNames={{
                            input:
                              "h-[8vh] border-[3px] border-solid rounded-md",
                          }}
                          label="Query"
                          placeholder="Type/Paste your query"
                          withAsterisk
                          value={chat}
                          disabled={isFetchingChat}
                          onChange={(event) =>
                            setChat(event.currentTarget.value)
                          }
                        />
                      </Skeleton>
                    </>
                  )}
                </div>
                <Group
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: "20%",
                    alignItems: "center",
                  }}
                >
                  {value == "1" &&
                    (isGeneratedImproveText ? (
                      isFetchingImproveWriting ? (
                        <Button
                          rightSection={<Loader color="white" size={14} />}
                        >
                          Generating
                        </Button>
                      ) : (
                        <CopyButton value={generatedImproveText} timeout={2000}>
                          {({ copied, copy }) => (
                            <Button
                              color={copied ? "teal" : "blue"}
                              onClick={copy}
                            >
                              {copied ? "Copied" : "Copy"}
                            </Button>
                          )}
                        </CopyButton>
                      )
                    ) : isFetchingImproveWriting ? (
                      <Button rightSection={<Loader color="white" size={14} />}>
                        Generating
                      </Button>
                    ) : (
                      <Button
                        w={"100%"}
                        disabled={isFetchingImproveWriting}
                        onClick={() => generateImproveWriting(improveWriting)}
                      >
                        {" "}
                        Generate
                      </Button>
                    ))}

                  {value == "2" &&
                    (isGeneratedEmail ? (
                      isFetchingEmail ? (
                        <Button
                          rightSection={<Loader color="white" size={14} />}
                        >
                          Generating
                        </Button>
                      ) : (
                        <CopyButton value={generatedEmail} timeout={2000}>
                          {({ copied, copy }) => (
                            <Button
                              color={copied ? "teal" : "blue"}
                              onClick={copy}
                            >
                              {copied ? "Copied" : "Copy"}
                            </Button>
                          )}
                        </CopyButton>
                      )
                    ) : isFetchingEmail ? (
                      <Button rightSection={<Loader color="white" size={14} />}>
                        Generating
                      </Button>
                    ) : (
                      <Button
                        w={"100%"}
                        disabled={isFetchingEmail}
                        onClick={() => genenerateEmail(emailPoints)}
                      >
                        {" "}
                        Generate
                      </Button>
                    ))}

                  {value == "3" &&
                    (isGeneratedSummary ? (
                      isFetchingText ? (
                        <Button
                          rightSection={<Loader color="white" size={14} />}
                        >
                          Generating
                        </Button>
                      ) : (
                        <CopyButton value={generatedSummary} timeout={2000}>
                          {({ copied, copy }) => (
                            <Button
                              color={copied ? "teal" : "blue"}
                              onClick={copy}
                            >
                              {copied ? "Copied" : "Copy"}
                            </Button>
                          )}
                        </CopyButton>
                      )
                    ) : isFetchingText ? (
                      <Button rightSection={<Loader color="white" size={14} />}>
                        Generating
                      </Button>
                    ) : (
                      <Button
                        w={"100%"}
                        disabled={isFetchingText}
                        onClick={() => generateSummariseText(text)}
                      >
                        {" "}
                        Generate
                      </Button>
                    ))}
                  {value == "4" &&
                    (isFetchingChat ? (
                      <Button rightSection={<Loader color="white" size={14} />}>
                        Generating
                      </Button>
                    ) : (
                      <Button
                        w={"100%"}
                        disabled={isFetchingChat}
                        onClick={() => generateChat(chat)}
                      >
                        {" "}
                        Generate
                      </Button>
                    ))}
                </Group>
              </Group>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default HelpDesk;
