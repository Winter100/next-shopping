export function isFieldEmpty(field: string | number) {
  if (typeof field === "string") {
    return !field.trim().length;
  }

  if (typeof field === "number") {
    return field === null || isNaN(field);
  }

  return true;
}
