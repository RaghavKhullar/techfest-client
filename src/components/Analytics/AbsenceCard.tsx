import { Card, ColorSwatch, Flex, RingProgress, Text } from "@mantine/core";

const AbsenceCard = ({ absentDays }: { absentDays: number }) => {
  const absenceData = [
    {
      value: absentDays * (10 / 3),
      color: "#808080",
      tooltip: `Absent Days- ${absentDays}`,
    },
    {
      value: (30 - absentDays) * (10 / 3),
      color: "#4CAF50",
      tooltip: `Present Days- ${30 - absentDays}`,
    },
  ];
  return (
    <>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className="w-full h-[50%]"
      >
        <Text className="text-2xl text-center">Absences</Text>
        <Flex className="justify-evenly items-center h-full">
          <RingProgress
            size={200}
            thickness={20}
            label={
              <Text
                size="md"
                ta="center"
                px="xs"
                style={{ pointerEvents: "none" }}
              >
                Hover sections to see details
              </Text>
            }
            sections={absenceData}
          />
          <Flex className="flex-col justify-between h-[50%] ">
            {absenceData.map((elem, i) => {
              return (
                <Flex className="items-center w-full mt-[5px]" key={i}>
                  <ColorSwatch color={elem.color} className="mr-4" />
                  <Text className="text-sm">{elem.tooltip}</Text>
                </Flex>
              );
            })}
          </Flex>
        </Flex>
      </Card>
    </>
  );
};
export default AbsenceCard;
