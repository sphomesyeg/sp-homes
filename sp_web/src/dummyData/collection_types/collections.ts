export interface City {
  _type: "city";
  name: string;
}

export interface Community {
  _type: "community";
  name: string;
  city: {
    _type: "city";
    _ref: string;
  };
  description: string;
  featuredImage: {
    _type: "image";
    url: string;
  };
  slug: {
    _type: "slug";
    current: string;
  };
}

export interface QuickPossession {
  _id: string;
  houseModel: string;
  houseType: string;
  city: { _type: string; _ref: string };
  community: { _type: string; _ref: string };
  sqft: number;
  beds: number;
  baths: number;
  featuredImage: { _type: string; url: string };
  status: string;
  availability?: string;
  oldPrice?: number;
  newPrice?: number;
  houseGallery?: { _type: string; url: string }[];
  creativeTitle?: string;
  shortDescription?: string;
  keyFeatures?: string[];
  floorPlans?: { floor: string; image: { _type: string; url: string } }[];
  slug: { _type: string; current: string };
}

export interface showHome {
  id: number;
  houseModel: string;
  houseType: string;
  streetAddress: string;
  city: { _ref: string };
  community: { _ref: string };
  province: string;
  propertySize: number;
  numOfBeds: number;
  numOfBaths: number;
  videoTour: string;
  featuredImage: string;
  slug: { current: string };
}