export interface QuickPossession {
  _id: string;
  houseModel: string;
  houseType: string;
  community: {
    name: string;
  };
  sqft: number;
  beds: number;
  baths: number;
  oldPrice: number;
  newPrice: number;
  featuredImage: string | null;
  status: string;
  availability: string | null;
  slug: {
    currrent: string;
  };
}



export interface FilterByCommunityProps {
  community: string;
  setCommunity: (community: string) => void;
}

export interface Community {
  _id: string;
  name: string;
  city: {
    name: string;
  };
  description: string;
  featuredImage: string;
  slug: string;
}