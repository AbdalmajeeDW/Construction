export const getRoute = (id: number) => {
  switch (id) {
    case 1:
      return "/messages?filter=all";
    case 2:
      return "/messages?filter=unread";
    case 3:
      return "/messages?filter=unread"; 
    case 4:
      return "/messages?filter=read";
    default:
      return "/messages";
  }
};