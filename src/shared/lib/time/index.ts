export const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  const seconds = Math.floor((duration % 1) * 60);

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};
