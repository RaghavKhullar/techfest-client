// import {
//     Box,
//     Group,
//     Image,
//     Modal,
//     ScrollArea,
//     Select,
//     Text,
//     Textarea,
// } from "@mantine/core";
// import { useDisclosure } from "@mantine/hooks";
// import { AnimatePresence, motion } from "framer-motion";
// import { FC, useCallback, useState } from "react";
// // import { GoogleReCaptcha } from "react-google-recaptcha-v3";
// import mascotButton from "../../assets/images/main/queryBox/mascotButton.png";
// import mascotWriting from "../../assets/images/main/queryBox/mascotWriting.png";
// import mapIcon from "../../assets/images/main/queryBox/mapIcon.png";
// import sendIcon from "../../assets/images/main/queryBox/sendIcon.png";
// import { useNavigate } from "react-router-dom";

// const teamQuery: any = { Events: "EVENTS", Accomodation: "PR", General: "QA" };

// interface Props {
//     delay: number;
// }
// const HelpDesk: FC<Props> = ({ delay }) => {
//     const navigate = useNavigate();
//     const [opened, { open, close }] = useDisclosure(false);
//     const [value, setValue] = useState<string | null>(null);
//     const [text, setText] = useState<any>("");
//     const [token, setToken] = useState<string>("");

//     return (
//         <motion.div
//             style={{
//                 position: "fixed",
//                 bottom: "5vh",
//                 right: "5vw",
//                 zIndex: 2069,
//             }}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1, transition: { delay: 0 } }}
//         >
//             <Modal
//                 opened={opened}
//                 onClose={close}
//                 withCloseButton={true}
//                 withinPortal={true}
//                 styles={
//                     {
//                         inner: {
//                             visibility: "hidden",
//                         }
//                     }
//                 }
//             ></Modal>
//             <AnimatePresence>
//                 {!opened && (
//                     <motion.div
//                         initial={{ x: "-50%", y: "-100%", opacity: 0 }}
//                         animate={{ x: 0, y: 0, opacity: 1 }}
//                         exit={{ x: "-50%", y: "-100%", opacity: 0 }}
//                         transition={{ duration: 0.5 }}
//                     >
//                         <Image
//                             style={{
//                                 width: "200px !important",
//                                 zIndex: 1000,
//                             }}
//                             onClick={open}
//                             src={mascotButton}
//                         />
//                     </motion.div>
//                 )}
//             </AnimatePresence>

//             <AnimatePresence>
//                 {opened && (
//                     <motion.div
//                         initial={{ x: "100%", y: "100%", opacity: 0 }}
//                         animate={{ x: 0, y: 0, opacity: 1 }}
//                         exit={{ x: "100%", y: "100%", opacity: 0 }}
//                         transition={{ duration: 0.5 }}
//                         style={{
//                             position: "fixed",
//                             display: "flex",
//                             flexDirection: "column",
//                             rowGap: "5%",
//                             boxSizing: "border-box",
//                             borderWidth: "4px",
//                             borderStyle: "solid",
//                             borderColor: "purple",
//                             background: "white",
//                             borderRadius: "20px",
//                             padding: "2%",
//                             bottom: "5vh",
//                             right: "10vh",
//                             width: "35vw",
//                             height: "100px",
//                             minWidth: "380px",
//                             minHeight: "400px",
//                             zIndex: 1000,
//                         }}
//                     >
//                         <Image src={mascotWriting} style={{
//                             position: "absolute",
//                             transform: "translateY(-93%) translateX(9%)",
//                             maxWidth: "500px",
//                         }} />
//                         <ScrollArea h={450}>
//                             <Text>
//                                 Write an email
//                             </Text>
//                             <Text>eg: "Where do I register for accomodation?"</Text>
//                             <Text>Feel free to ask your queries.</Text>
//                             {/* <GoogleReCaptcha onVerify={onVerify} /> */}
//                             <Group style={{
//                                 width: "100%",
//                                 display: "flex",
//                                 justifyContent: "space-around",
//                                 flexFlow: "row wrap",
//                                 overflowY: "auto",
//                                 marginTop: "1rem",
//                             }}>
//                                 <div style={{ width: "75%", }}>
//                                     <Select
//                                         data={["Accomodation", "Events", "General"]}
//                                         value={value}
//                                         onChange={setValue}
//                                         placeholder="Pick a Query Type"
//                                         style={{
//                                             width: "100%",
//                                             padding: "0 0 1rem",
//                                         }}
//                                     />
//                                     <Textarea
//                                         style={{ width: "100%" }}
//                                         minRows={5}
//                                         value={text}
//                                         onChange={(event) => setText(event.currentTarget.value)}
//                                         onKeyDown={(event) => {
//                                             // if (event.key === "Enter") submitQuery();
//                                         }}
//                                     />
//                                 </div>
//                                 <Group style={{
//                                     display: "flex",
//                                     flexDirection: "column",
//                                     justifyContent: "center",
//                                     width: "10%",
//                                     alignItems: "center",
//                                 }}>
//                                     <Box
//                                         style={{
//                                             backgroundColor: "red",
//                                             boxSizing: "border-box",
//                                             display: "flex",
//                                             justifyContent: "center",
//                                             alignItems: "center",
//                                             borderRadius: "10px",
//                                             width: "54px",
//                                             height: " 54px",
//                                             paddingLeft: "7px",
//                                         }}
//                                         onClick={() => {
//                                             navigate("/map");
//                                         }}
//                                     >
//                                         <Image width={"80%"} src={mapIcon} />
//                                     </Box>
//                                     <Box
//                                         style={{
//                                             backgroundColor: "red",
//                                             boxSizing: "border-box",
//                                             display: "flex",
//                                             justifyContent: "center",
//                                             alignItems: "center",
//                                             borderRadius: "10px",
//                                             width: "54px",
//                                             height: " 54px",
//                                             paddingLeft: "7px",
//                                         }}
//                                         onClick={() => {

//                                         }}
//                                     >
//                                         <Image width={"80%"} src={sendIcon} />
//                                     </Box>
//                                 </Group>
//                             </Group>
//                         </ScrollArea>
//                     </motion.div>
//                 )
//                 }
//             </AnimatePresence >
//         </motion.div >
//     );
// };

// export default HelpDesk;
