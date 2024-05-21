import { memo } from 'react';

import {
  useFormContext,
  Controller,
  useFormState,
  FieldValues,
  Path,
} from 'react-hook-form';

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

import FormError from '../form-error';

export interface IProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  disabled?: boolean;
  label?: string;
  readOnly?: boolean;
  multiline?: boolean;
  rows?: number;
  autoHeight?: boolean;
  type?: 'password' | 'text' | 'email';
}

const FormInput = <TFieldValues extends FieldValues>({
  name,
  disabled,
  label,
  readOnly,
  type,
  multiline,
  rows,
  autoHeight,
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
          const { name, value, onChange, onBlur } = field;

          return (
            <TextField
              fullWidth
              error={!!error}
              InputLabelProps={{
                style: {
                  fontSize: 14,
                },
              }}
              inputProps={{
                readOnly,
                disabled,
              }}
              InputProps={{
                style: {
                  fontSize: 14,
                  height: '100%',
                },
              }}
              label={label}
              multiline={multiline}
              name={name}
              rows={rows}
              sx={{
                height: autoHeight ? 'auto' : 60,
              }}
              type={type}
              value={value || ''}
              onBlur={onBlur}
              onChange={onChange}
            />
          );
        }}
      />
      <FormError errors={errors} name={name} />
    </FormControl>
  );
};

export default memo(FormInput);
