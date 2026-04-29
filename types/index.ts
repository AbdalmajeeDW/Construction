export interface Message {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  houseNumber: string;
  phone: string;
  location: string;
  images: [];
  space: number;
  updatedAt: string;
}

export interface Stats {
  total: number;
  unread: number;
  today: number;
  lastWeek: number;
}

export interface StatCardAdmin {
  id:number;
  title: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  linear: string;
  onClick?: () => void;
}

export interface Activity {
  action: string;
  time: string;
}
