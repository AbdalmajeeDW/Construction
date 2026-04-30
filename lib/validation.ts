import { TFunction } from "i18next";

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  postcode?: string;
  nr?: string;
  straat?: string;
  plaats?: string;
  space?: string;
  message?: string;
  images?: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  postcode: string;
  nr: string;
  straat: string;
  plaats: string;
  space: string;
  message: string;
}

export const validateFormContact = (
  formData: FormData, 
  t: TFunction,
  images?: File[] 
): { isValid: boolean; errors: FormErrors } => {
  const newErrors: FormErrors = {};
  let isValid = true;

  if (!images || images.length === 0) {
    newErrors.images = t("validation.imagesRequired");
    isValid = false;
  }

  if (!formData.firstName?.trim()) {
    newErrors.firstName = t("validation.firstNameRequired");
    isValid = false;
  } else if (formData.firstName.trim().length < 2) {
    newErrors.firstName = t("validation.firstNameMin");
    isValid = false;
  } else if (formData.firstName.trim().length > 50) {
    newErrors.firstName = t("validation.firstNameMax");
    isValid = false;
  }

  if (!formData.lastName?.trim()) {
    newErrors.lastName = t("validation.lastNameRequired");
    isValid = false;
  } else if (formData.lastName.trim().length < 2) {
    newErrors.lastName = t("validation.lastNameMin");
    isValid = false;
  } else if (formData.lastName.trim().length > 50) {
    newErrors.lastName = t("validation.lastNameMax");
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
  if (!formData.email?.trim()) {
    newErrors.email = t("validation.emailRequired");
    isValid = false;
  } else if (!emailRegex.test(formData.email.trim())) {
    newErrors.email = t("validation.emailInvalid");
    isValid = false;
  }

  const phoneRegex = /^[0-9+\-\s()]{8,20}$/;
  if (!formData.phone?.trim()) {
    newErrors.phone = t("validation.phoneRequired");
    isValid = false;
  } else if (!phoneRegex.test(formData.phone.trim())) {
    newErrors.phone = t("validation.phoneInvalid");
    isValid = false;
  }

  const postcodeRegex = /^[A-Z0-9]{3,10}(\s[A-Z0-9]{2,4})?$/i;
  if (!formData.postcode?.trim()) {
    newErrors.postcode = t("validation.postcodeRequired");
    isValid = false;
  } else if (!postcodeRegex.test(formData.postcode.trim())) {
    newErrors.postcode = t("validation.postcodeInvalid");
    isValid = false;
  }

  if (!formData.straat?.trim()) {
    newErrors.straat = t("validation.straatRequired");
    isValid = false;
  } else if (formData.straat.trim().length < 2) {
    newErrors.straat = t("validation.straatMin");
    isValid = false;
  }

  if (!formData.nr?.trim()) {
    newErrors.nr = t("validation.nrRequired");
    isValid = false;
  } else if (!/^[0-9A-Za-z\-\/]+$/.test(formData.nr.trim())) {
    newErrors.nr = t("validation.nrInvalid");
    isValid = false;
  }

  if (!formData.plaats?.trim()) {
    newErrors.plaats = t("validation.plaatsRequired");
    isValid = false;
  } else if (formData.plaats.trim().length < 2) {
    newErrors.plaats = t("validation.plaatsMin");
    isValid = false;
  }

  if (!formData.space?.trim()) {
    newErrors.space = t("validation.spaceRequired");
    isValid = false;
  } else if (isNaN(Number(formData.space)) || Number(formData.space) <= 0) {
    newErrors.space = t("validation.spaceInvalid");
    isValid = false;
  } else if (Number(formData.space) > 10000) {
    newErrors.space = t("validation.spaceMax");
    isValid = false;
  }

  if (!formData.message?.trim()) {
    newErrors.message = t("validation.messageRequired");
    isValid = false;
  } else if (formData.message.trim().length < 10) {
    newErrors.message = t("validation.messageMin");
    isValid = false;
  } else if (formData.message.trim().length > 1000) {
    newErrors.message = t("validation.messageMax");
    isValid = false;
  }

  return { isValid, errors: newErrors };
};