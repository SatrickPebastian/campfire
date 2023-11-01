import React, { useState } from "react";
import { Table, Checkbox, Paper, Button, Group } from "@mantine/core";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

export type Images = {
  name: string;
  version: string;
};


const ImagesPage = () => {

  const { isLoading, error, data } = useQuery('images', () =>
    fetch('http://campfire-backend:3000/api/applications').then(res =>
      res.json() as Promise<Images[]>
    )
  )


  const [selected, setSelected] = useState<string[]>([]);

  if(isLoading) return <p>Loading...</p>
  if(error) return <p>Error</p>
  if(!data) return <p>No data</p>

  const handleSelect = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const selectAll = () => {
    if (selected.length === data.length) {
      setSelected([]);
    } else {
      setSelected(data.map((robot) => robot.name));
    }
  };


  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>
              <Checkbox
                checked={selected.length === data.length}
                onChange={selectAll}
              />
            </th>
            <th>Name</th>
            <th>Version</th>
          </tr>
        </thead>
        <tbody>
          {data.map((robot: Images) => (
            <tr key={robot.name+robot.version}>
              <td>
                <Checkbox
                  checked={selected.includes(robot.name)}
                  onChange={() => handleSelect(robot.name)}
                />
              </td>
              <td>{robot.name}</td>
              <td>{robot.version}</td>
              
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ImagesPage;
