import React from "react";
import { Button, TextInput, Paper, Col, Group, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";

type Robot = {
  id: number;
  name: string;
  type: string;
};

const CreateRobot: React.FC = () => {
  const form = useForm({
    initialValues: {
      name: "",
      type: "",
    },
    validate: {
      name: (value) => true,
      type: (value) => true,
    },
  });
  const navigate = useNavigate();
  const handleSubmit = () => {
    if (form.isValid()) {
      // handle the robot creation logic here

      // then redirect to previous page or main page
      navigate("/robots");
    }
  };

  return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Robot Name"
            placeholder="Enter robot name"
            required
            value={form.values.name}
            onChange={(event) =>
              form.setFieldValue("name", event.currentTarget.value)
            }
            error={form.errors.name && "Please enter a name"}
          />
          <Select
            label="Robot Type"
            data={["Type A", "Type B", "Type C"]}
            placeholder="Select a robot type"
            required
            value={form.values.type}
            onChange={(value) => form.setFieldValue("type", value || "")}
            error={form.errors.type && "Please select a type"}
          />
          <Group position="apart" style={{ marginTop: "20px" }}>
            <Button onClick={() => navigate("/robots")}>Cancel</Button>
            <Button type="submit" color="blue">
              Create
            </Button>
          </Group>
        </form>
  );
};

export default CreateRobot;
