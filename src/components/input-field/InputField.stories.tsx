import type { Meta, StoryObj } from "@storybook/react";
import { InputField } from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  tags: ["autodocs"], // Docs tab me auto generate hoga
  args: {
    label: "Example",
    placeholder: "Enter value",
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

// 👇 Default example
export const Default: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
  },
};

// 👇 Variants
export const Outlined: Story = {
  args: {
    label: "Outlined",
    variant: "outlined",
  },
};

export const Filled: Story = {
  args: {
    label: "Filled",
    variant: "filled",
  },
};

export const Ghost: Story = {
  args: {
    label: "Ghost",
    variant: "ghost",
  },
};

// 👇 Sizes
export const Small: Story = {
  args: {
    label: "Small",
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    label: "Medium",
    size: "md",
  },
};

export const Large: Story = {
  args: {
    label: "Large",
    size: "lg",
  },
};

// 👇 States
export const Disabled: Story = {
  args: {
    label: "Disabled",
    disabled: true,
    placeholder: "Can't type here",
  },
};

export const Invalid: Story = {
  args: {
    label: "Invalid",
    invalid: true,
    errorMessage: "This field is required",
  },
};

export const Loading: Story = {
  args: {
    label: "Loading",
    "aria-busy": true,
    placeholder: "Loading...",
  },
};

// 👇 Password toggle
export const Password: Story = {
  args: {
    label: "Password",
    type: "password",
    passwordToggle: true,
    placeholder: "Enter password",
  },
};

// 👇 Clearable
export const Clearable: Story = {
  args: {
    label: "Search",
    placeholder: "Type something",
    clearable: true,
  },
};

// 👇 Helper Text
export const HelperText: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
    helperText: "This will be visible to others",
  },
};
