import { memo } from "react";

import {
  useFormContext,
  Controller,
  useFormState,
  FieldValues,
  Path,
} from "react-hook-form";

import { NumericFormat, NumberFormatValues } from "react-number-format";

import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

import FormError from "../form-error";

export type IProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  format?: string;
  suffix?: string;
  prefix?: string;
  decimalScale?: number;
  disabled?: boolean;
  readOnly?: boolean;
  label?: string;
  sx?: any;
  isAllowed?: () => boolean;
};

const FormNumberInput = <TFieldValues extends FieldValues>({
  name,
  disabled,
  decimalScale,
  readOnly,
  prefix,
  suffix,
  label,
  sx,
  isAllowed,
}: IProps<TFieldValues>) => {
  const { control } = useFormContext();
  const { errors } = useFormState({ control });

  const error = errors && errors[name];

  return (
    <FormControl error fullWidth>
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          const { name, value, onChange, onBlur, ref } = field;

          return (
            <NumericFormat
              customInput={TextField}
              decimalScale={decimalScale}
              decimalSeparator={"."}
              disabled={disabled}
              displayType={readOnly ? "text" : "input"}
              error={!!error}
              getInputRef={ref}
              isAllowed={isAllowed}
              label={label}
              name={name}
              prefix={prefix}
              InputLabelProps={{
                style: {
                  fontSize: 14,
                },
              }}
              suffix={suffix}
              sx={sx}
              value={value}
              onBlur={onBlur}
              onValueChange={(value: NumberFormatValues) =>
                onChange(
                  value.floatValue === undefined ? null : value.floatValue
                )
              }
            />
          );
        }}
      />
      <FormError errors={errors} name={name} />
    </FormControl>
  );
};

export default memo(FormNumberInput);
