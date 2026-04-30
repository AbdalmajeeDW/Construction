// components/ContactForm/InputField.tsx
import { FormData, FormErrors } from "@/types";
import { TFunction } from "i18next";

export function InputField({
  label,
  icon,
  formData,
  errors,
  onChange,
  errorName,
  t
}: {
  label: string;
  icon?: React.ReactNode;
  formData: FormData;
  errors: FormErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  t: TFunction;
  errorName: string;
}) {
  const labelClass =
    "flex items-center gap-2 text-sm font-semibold text-gray-600 mb-1";
  const inputClass =
    "text-black/75 placeholder:text-gray-400 w-full border border-gray-400 px-4 py-2 rounded-lg focus:ring-2 focus:ring-teal-400 outline-none";
  const inputErrorClass =
    "text-black/75 placeholder:text-gray-400 w-full border border-red-500 px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-400 outline-none";
  
  const translate = t(`contactForm.${label}`);

  return (
    <div>
      <label className={labelClass}>
        {icon} {translate} *
      </label>
      <input 
        name={errorName}
        value={formData[errorName as keyof FormData] as string}
        className={errors[errorName as keyof FormErrors] ? inputErrorClass : inputClass}
        onChange={onChange}
      />
      {errors[errorName as keyof FormErrors] && (
        <p className="text-red-500 text-xs mt-1">{errors[errorName as keyof FormErrors]}</p>
      )}
    </div>
  );
}