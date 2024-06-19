interface Photo {
  id: string;
  alt_description?: string;
  blur_hash?: string;
  created_at?: string | Date;
  height?: number;
  width?: number;
  updated_at?: string | Date;
  likes?: number;
  links?: string[];
  user: User;
  classname?: string;
  url?: string;
}

interface User {
  id: string;
  bio?: string;
  first_name?: string;
  profile_image?: string;
  username?: string;
}
