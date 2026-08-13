import React from "react";
import { ProvinceData, ProgramItem } from "../types";
import { LeafletOperationalMap } from "./LeafletOperationalMap";

interface MapDashboardWrapperProps {
  provinces: ProvinceData[];
  programs?: ProgramItem[];
  selectedProvince: ProvinceData | null;
  onSelectProvince: (prov: ProvinceData | null) => void;
  theme?: "dark" | "light";
  searchQuery?: string;
}

export const MapDashboardWrapper: React.FC<MapDashboardWrapperProps> = ({
  provinces,
  programs,
  selectedProvince,
  onSelectProvince,
  theme = "dark",
  searchQuery,
}) => {
  return (
    <div className="w-full">
      <LeafletOperationalMap
        provinces={provinces}
        programs={programs}
        selectedProvince={selectedProvince}
        onSelectProvince={onSelectProvince}
        theme={theme}
        externalSearchQuery={searchQuery}
      />
    </div>
  );
};


