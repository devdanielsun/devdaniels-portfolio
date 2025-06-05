export interface LandingData {
    name: string;
    function: string;
    description: string;
    imagePath: string;
    links: {
      label: string;
      icon?: string;
      url: string;
    }[];
  }