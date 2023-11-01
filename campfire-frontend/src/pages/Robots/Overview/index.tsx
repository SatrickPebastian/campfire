import React, { useState } from "react";
import {
  Table,
  Checkbox,
  Paper,
  Button,
  Group,
  Modal,
  Text,
  Col,
  Radio,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { Images } from "../../Images/Overview";
import { useQuery } from "react-query";

type Robot = {
  _id: string;
  name: string;
  type: string;
};

const MultiSelectTable = () => {
  const images = useQuery("images", () =>
    fetch("http://campfire-backend:3000/api/applications").then(
      (res) => res.json() as Promise<Images[]>
    )
  );

  const robots = useQuery("robots", () =>
    fetch("http://campfire-backend:3000/api/robots").then(
      (res) => res.json() as Promise<Robot[]>
    )
  );
  const [selected, setSelected] = useState<string[]>([]);
  const [opened, setOpened] = useState(false);
  const [selectedFirmware, setSelectedFirmware] = useState<string | null>(null);
  if (images.isLoading || robots.isLoading) return <p>Loading...</p>;
  if (images.error || robots.error) return <p>Error</p>;
  if (!images.data || !robots.data) return <p>No Data</p>;

  const handleSelectFirmware = (firmware: string) => {
    setSelectedFirmware(firmware);
  };

  const handleSubmit = () => {
    if (selectedFirmware) {
      // Handle the selected firmware logic here
      fetch("http://campfire-backend:3000/api/robots/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          robotIds: robots.data.filter((robot)=> selected.includes(robot._id)).map((robot) => robot._id),
          msg: {
            function: "update",
            package: {
              name: images.data.find((image)=>image.name===selectedFirmware)?.name,
              version: images.data.find((image)=>image.name===selectedFirmware)?.version,
            },
          },
        }),
      });
      setOpened(false);
    }
  };

  const handleSelect = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const selectAll = () => {
    if (selected.length === robots.data.length) {
      setSelected([]);
    } else {
      setSelected(robots.data.map((robot) => robot._id));
    }
  };

  const updateFirmwareRobot = () => {
    setOpened(true);
  };

  return (
    <div>
      <Modal opened={opened} onClose={() => setOpened(false)}>
        <Text>Select Image</Text>{" "}
        <Radio.Group
          value={selectedFirmware || ""}
          onChange={(a) => handleSelectFirmware(a)}
        >
          <Table>
            <thead>
              <tr>
                <th>Select</th>
                <th>Name</th>
                <th>Version</th>
              </tr>
            </thead>{" "}
            <tbody>
              {images.data?.map((firmware) => (
                <tr key={firmware.name + firmware.version}>
                  <td>
                    <Radio value={firmware.name} />
                  </td>
                  <td>{firmware.name}</td>
                  <td>{firmware.version}</td>
                </tr>
              ))}
            </tbody>{" "}
          </Table>{" "}
        </Radio.Group>
        <Group position="right" mt={20}>
          <Button onClick={() => setOpened(false)}>Cancel</Button>
          <Button color="blue" onClick={handleSubmit}>
            Confirm
          </Button>
        </Group>
      </Modal>

      <Button onClick={updateFirmwareRobot} color="blue">
        Update Selected Robots
      </Button>
      <Table>
        <thead>
          <tr>
            <th>
              <Checkbox
                checked={selected.length === robots.data.length}
                onChange={selectAll}
              />
            </th>
            <th>Name</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {robots.data.map((robot: Robot) => (
            <tr key={robot._id}>
              <td>
                <Checkbox
                  checked={selected.includes(robot._id)}
                  onChange={() => handleSelect(robot._id)}
                />
              </td>
              <td>{robot.name}</td>
              <td>{robot.type}</td>
              <td>
                <Button onClick={updateFirmwareRobot} color="blue">
                  Update Robot
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MultiSelectTable;
