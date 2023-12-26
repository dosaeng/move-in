export const convertImageUrl = (value: string) => {
  try {
    const url = new URL(value);

    return url.toString();
  } catch (error) {
    return `data:;base64,${value}`;
  }
};
