import { forwardRef, useMemo, useState } from "react";

export type InputVariant = "outlined" | "filled" | "ghost";
export type InputSize = "sm" | "md" | "lg";

export interface InputFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  invalid?: boolean;
  variant?: InputVariant;
  size?: InputSize;
  passwordToggle?: boolean;
  clearable?: boolean;
  containerClassName?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      invalid,
      disabled,
      variant = "outlined",
      size = "md",
      type = "text",
      passwordToggle,
      clearable,
      value,
      onChange,
      className,
      containerClassName,
      required,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const hasRightAdornment =
      Boolean(rest["aria-busy"]) || Boolean(invalid) || passwordToggle || clearable;

    // size classes
    const sizeCls = useMemo(() => {
      switch (size) {
        case "sm":
          return "text-sm px-3 py-2";
        case "lg":
          return "text-base px-5 py-3";
        default:
          return "text-base px-4 py-2.5";
      }
    }, [size]);

    // variant classes
    const variantCls = useMemo(() => {
      const focus = invalid
        ? "focus:ring-2 focus:ring-red-500"
        : "focus:ring-2 focus:ring-blue-500";
      if (variant === "filled") {
        return `bg-gray-100 dark:bg-gray-700 border border-transparent ${focus}`;
      }
      if (variant === "ghost") {
        return `bg-transparent border border-transparent ${focus}`;
      }
      // outlined
      return `bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 ${focus}`;
    }, [variant, invalid]);

    const invalidCls = invalid
      ? "border-red-500 text-red-700 placeholder:text-red-400 dark:text-red-400"
      : "";

    const disabledCls = disabled ? "opacity-50 pointer-events-none" : "";

    const rightPad = hasRightAdornment ? "pr-12" : "";

    const inputType =
      isPassword && passwordToggle ? (showPassword ? "text" : "password") : type;

    return (
      <div className={`mb-4 ${containerClassName || ""}`}>
        {label && (
          <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            value={value}
            onChange={onChange}
            aria-invalid={invalid || undefined}
            aria-busy={rest["aria-busy"] as any}
            required={required}
            disabled={disabled}
            className={[
              "w-full rounded-lg outline-none transition-colors",
              sizeCls,
              variantCls,
              invalidCls,
              disabledCls,
              rightPad,
              "text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400",
              className || "",
            ].join(" ")}
            {...rest}
          />

          {rest["aria-busy"] && (
            <span className="absolute inset-y-0 right-3 flex items-center">
              <svg
                className="h-5 w-5 animate-spin text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            </span>
          )}

          {/* clear button */}
          {clearable && typeof value === "string" && value.length > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onChange?.({
                  target: { value: "" },
                } as unknown as React.ChangeEvent<HTMLInputElement>);
              }}
              className="absolute inset-y-0 right-3 flex items-center justify-center h-6 w-6 my-auto rounded-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-100 hover:opacity-90"
              aria-label="Clear input"
            >
              ×
            </button>
          )}

          {/* password show/hide */}
          {isPassword && passwordToggle && (
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className={`absolute inset-y-0 ${
                clearable ? "right-10" : "right-3"
              } flex items-center text-sm font-medium text-blue-600 dark:text-blue-400`}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          )}
        </div>

        {/* helper / error */}
        {errorMessage ? (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
        ) : helperText ? (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

InputField.displayName = "InputField";
