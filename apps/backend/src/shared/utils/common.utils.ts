export const replaceSpaceWithChar = (
  text: string,
  replaceWith: string = '_',
  lowercase: boolean = true,
) => {
  const preparedText = text.replaceAll(' ', replaceWith || '_');
  return lowercase ? preparedText.toLocaleLowerCase() : preparedText;
};

export const getDefaultImageUrl = (seed: string) => {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
};
