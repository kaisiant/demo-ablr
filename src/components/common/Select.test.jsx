import { render, fireEvent, screen } from "@testing-library/react";
import Select from "./Select";

const setup = () => {
  const utils = render(
    <Select
      options={[
        { name: "dog", value: 1 },
        { name: "cat", value: 2 },
      ]}
    />
  );
  const select = screen.getByLabelText("select");
  return {
    select,
    ...utils,
  };
};

const setup2 = () => {
  const options = [
    { animal: "dog", code: 1 },
    { animal: "cat", code: 2 },
  ];
  const utils = render(
    <Select valueKey="code" labelKey="animal" options={options} />
  );
  const select = screen.getByLabelText("select");
  return {
    select,
    options,
    ...utils,
  };
};

it("show selected value correctly", () => {
  const { select } = setup();
  fireEvent.change(select, { target: { value: 2 } });
  expect(select.value).toBe("2");
});

it("show selected value correctly based on valueKey", () => {
  const { select } = setup2();
  fireEvent.change(select, { target: { value: 2 } });
  expect(select.value).toBe("2");
});

it("should able to display dynamic label", () => {
  const { options } = setup2();
  options.forEach((opt) => {
    screen.getByText(opt.animal);
  });
});