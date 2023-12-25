import { Card, Flex, Text, Tooltip } from "@mantine/core";
import GaugeChart from "react-gauge-chart";
import { Progress } from "@mantine/core";
import { getColorsFromScore, getMoralScore } from "../../utils/utils";
const ScoreMeters = ({
  currentRating,
  stressBurnoutScore,
  moral,
}: {
  currentRating: number;
  stressBurnoutScore: number;
  moral: string;
}) => {
  return (
    <>
      <Flex className="w-[45%] justify-between">
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          className="w-[47%] h-full"
        >
          <Text className="text-2xl text-center">Employee rating</Text>
          <GaugeChart
            id="gauge-chart1"
            className="h-[100%] w-[100%] mt-[20px]"
            nrOfLevels={10}
            percent={currentRating / 10}
            arcPadding={0.03}
            cornerRadius={3}
            textColor={"black"}
            formatTextValue={(value: string) =>
              (parseInt(value) / 10).toString()
            }
            colors={[
              "#FF0000", // Red
              "#FF3300",
              "#FF6600",
              "#FF9900",
              "#FFCC00",
              "#FFFF00", // Yellow
              "#CCFF00",
              "#99FF00",
              "#66FF00",
              "#33FF00", // Green
            ]}
          />
        </Card>
        {/* ToDo */}
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          className="w-[47%] h-[100%]"
        >
          <Flex className="flex-col w-full h-full justify-evenly">
            <Flex className="flex-col w-full h-[40%] justify-center">
              <Text className="text-2xl text-center">
                Stress and burnout score
              </Text>
              <Progress.Root className="w-full h-[45%]" size="xl">
                <Tooltip label={`Stress score: ${stressBurnoutScore}`}>
                  <Progress.Section
                    value={stressBurnoutScore * 20}
                    color={getColorsFromScore(stressBurnoutScore)}
                  >
                    <Progress.Label>Score: {stressBurnoutScore}</Progress.Label>
                  </Progress.Section>
                </Tooltip>
              </Progress.Root>
            </Flex>
            <Flex className="flex-col w-full h-[40%] justify-center">
              <Text className="text-2xl text-center">Moral</Text>
              <Progress.Root className="w-full h-[45%]" size="xl">
                <Tooltip label={`Moral: ${moral}`}>
                  <Progress.Section
                    value={getMoralScore(moral) * 20}
                    color={getColorsFromScore(6 - getMoralScore(moral))}
                  >
                    <Progress.Label>{moral}</Progress.Label>
                  </Progress.Section>
                </Tooltip>
              </Progress.Root>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </>
  );
};
export default ScoreMeters;
