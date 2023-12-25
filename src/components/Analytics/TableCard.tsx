import { Card, Text, Center, Flex, Table, Pagination } from "@mantine/core";
import { IconCalendarDue, IconCheck, IconClockPlay } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { getPriority, getStatus } from "../../utils/utils";

const TableCard = ({
  toDo,
  inProgress,
  complete,
  subTasks,
}: {
  toDo: number;
  inProgress: number;
  complete: number;
  subTasks: AnalyticsSubtask[];
}) => {
  const rowsPerTable = 4;
  const [rows, setRows] = useState<any>([]);
  const [activePage, setPage] = useState<number>(1);
  useEffect(() => {
    setRows(
      subTasks.slice(
        (activePage - 1) * rowsPerTable,
        Math.min(subTasks.length, activePage * rowsPerTable)
      )
    );
  }, [activePage, subTasks]);
  const headers = (
    <Table.Tr>
      <Table.Th>Subtask Name</Table.Th>
      <Table.Th>Due date</Table.Th>
      <Table.Th>Priority</Table.Th>
      <Table.Th>Progress</Table.Th>
    </Table.Tr>
  );
  const getFormattedDate = (date: Date) => {
    const yyyy = date.getFullYear();
    let mm: any = date.getMonth() + 1; // Months start at 0!
    let dd: any = date.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    return dd + "/" + mm + "/" + yyyy;
  };
  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder className="w-[45%]">
        <Text className="text-2xl text-center">My Goals</Text>
        <Center className="mt-[20px]">
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className="w-[80%] border-[purple] border-[1px]"
          >
            <Flex className="justify-evenly align-center">
              <Flex className="flex-col">
                <Flex className="items-center justify-center">
                  <IconCheck color="green" />
                  <Text>{complete}</Text>
                </Flex>
                <Flex>
                  <Text>Completed</Text>
                </Flex>
              </Flex>

              <Flex className="flex-col">
                <Flex className="items-center justify-center">
                  <IconClockPlay color="orange" />
                  <Text>{inProgress}</Text>
                </Flex>
                <Flex>
                  <Text>In Progress</Text>
                </Flex>
              </Flex>

              <Flex className="flex-col">
                <Flex className="items-center justify-center">
                  <IconCalendarDue color="red" />
                  <Text>{toDo}</Text>
                </Flex>
                <Flex>
                  <Text>To-Do</Text>
                </Flex>
              </Flex>
            </Flex>
          </Card>
        </Center>
        <Flex mt="md" mb="xs">
          <Text fw={500}>Count of assigned subtasks: </Text>
          <Text>{toDo + inProgress + complete}</Text>
        </Flex>

        <Table captionSide="bottom">
          <Table.Caption>Goals assigned to me</Table.Caption>
          <Table.Thead>{headers}</Table.Thead>
          <Table.Tbody>
            {rows.map((element: any, i: any) => {
              return (
                <Table.Tr key={i}>
                  <Table.Td>{element.name}</Table.Td>
                  <Table.Td>
                    {getFormattedDate(new Date(element.deadline))}
                  </Table.Td>
                  <Table.Td>{getPriority(element.priority)}</Table.Td>
                  <Table.Td>{getStatus(element.status)}</Table.Td>
                </Table.Tr>
              );
            })}
          </Table.Tbody>
        </Table>
        <Center>
          <Pagination
            total={Math.ceil((subTasks.length || 0) / rowsPerTable)}
            value={activePage}
            onChange={setPage}
            mt="sm"
          />
        </Center>
      </Card>
    </>
  );
};

export default TableCard;
