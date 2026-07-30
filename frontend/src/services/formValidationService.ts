export const validateTitle = (title: string) => {
  return title.trim().length <= 30 && title.trim().length > 0; 
}

export const validateDescription = (description: string) => {
  return description.trim().length <= 200 && description.trim().length > 0; 
}