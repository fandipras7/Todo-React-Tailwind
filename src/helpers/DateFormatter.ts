export const formatToLocalDate = (srcDate: string): string => {
  const date = new Date(srcDate);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  const monthNames = [ "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember", ];
  const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;

  return formattedDate;
};
