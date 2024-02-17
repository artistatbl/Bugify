// Select.tsx
import React from 'react';
import { FieldValues, UseFormRegister, useForm } from 'react-hook-form';

interface SelectProps<TFormValues extends FieldValues> {
  name: keyof TFormValues;
  label: string;
  options: { value: string; label: string }[];
  register: UseFormRegister<TFormValues>;
  errorMessage?: string;
}

const Select = <TFormValues extends FieldValues>({ name, label, options, register, errorMessage }: SelectProps<TFormValues>) => {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={String(name)} className="font-medium text-gray-700">
        {label}
      </label>
      <select id={String(name)} {...register(name as any)} className="border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errorMessage && <p className="text-red-500 text-xs mt-1">{errorMessage}</p>}
    </div>
  );
};

export default Select;