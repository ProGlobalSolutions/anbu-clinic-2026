export interface NavLink {
  label: string;
  path: string;
  children?: NavLink[];
}

export interface SkinSection {
  title: string;
  iconColor: string;
  points: string[];
}

export interface SkinCondition {
  id: string;
  name: string;
  shortDesc: string;
  image: string;
  sections: SkinSection[];
}

export interface TreatmentProgram {
  id: string;
  name: string;
  image: string;
  points: string[];
}
