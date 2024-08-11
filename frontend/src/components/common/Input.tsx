import React, { useState } from "react";
import style from "../../styles/input.module.css";

interface props {
  type: string;
  autoComplete?: string | undefined;
  defaultValue?: string | undefined | number;
  disabled?: boolean | undefined;
  placeholder?: string | undefined;
  label?: string | undefined;
  name: string;
  required?: string | undefined;
  rows?: number | undefined;
  multiple?: boolean | undefined;
  accept?: string | undefined;
  onInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    type: string
  ) => void;
}

const Input: React.FC<props> = (props) => {
  const {
    type,
    autoComplete,
    disabled,
    placeholder,
    label,
    name,
    required,
    rows,
    accept,
    defaultValue,
    multiple,
    onInputChange,
  } = props;

  const [fileLabel, setFileLabel] = useState("");

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    name: string
  ) => {
    if (onInputChange) {
      if (type === "file") {
        const files: FileList | null = (e.target as HTMLInputElement).files;
        if (files && onInputChange) {
          if (files.length > 1) {
            setFileLabel(
              `${files[0]?.name} and ${files.length - 1} more files`
            );
          } else {
            setFileLabel(files[0]?.name);
          }
          onInputChange(e, name);
        }
      } else {
        onInputChange(e, name);
      }
    } else {
      console.log("onChange is null.");
    }
  };

  if (
    type === "text" ||
    type === "number" ||
    type === "email" ||
    type === "password"
  ) {
    return (
      <div className={style.inputDiv}>
        <label htmlFor={name}>
          {label ?? ""}{" "}
          <span>{required === "true" && label != "" ? "*" : ""}</span>
        </label>
        <input
          type={type}
          name={name}
          id={name}
          autoComplete={autoComplete}
          placeholder={placeholder}
          disabled={disabled}
          defaultValue={defaultValue}
          onChange={(e) => handleChange(e, name)}
        />
      </div>
    );
  } else if (type === "textarea") {
    return (
      <div className={style.inputDiv}>
        <label htmlFor={name}>
          {label ?? ""} <span>*</span>
        </label>
        <textarea
          name={name}
          id={name}
          autoComplete={autoComplete}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          defaultValue={defaultValue}
          onChange={(e) => handleChange(e, name)}
        />
      </div>
    );
  } else if (type === "file") {
    return (
      <div className={style.inputFileDiv}>
        <label htmlFor={name}>
          {fileLabel === "" ? label ?? "" : fileLabel}{" "}
          <span>{required === "true" ? "*" : ""}</span>
        </label>
        <input
          type="file"
          name={name}
          id={name}
          autoComplete={autoComplete}
          placeholder={placeholder}
          disabled={disabled}
          multiple={multiple}
          onChange={(e) => handleChange(e, name)}
          accept={accept}
        />
      </div>
    );
  }
};

export default Input;
