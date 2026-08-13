import React from "react";
import { ProvinceData } from "../types";
import { LeafletOperationalMap } from "./LeafletOperationalMap";

interface MapDashboardWrapperProps {
  provinces: ProvinceData[];
  selectedProvince: ProvinceData | null;
  onSelectProvince: (prov: ProvinceData | null) => void;
  theme?: "dark" | "light";
}

export const MapDashboardWrapper: React.FC<MapDashboardWrapperProps> = ({
  provinces,
  selectedProvince,
  onSelectProvince,
  theme = "dark",
}) => {
  return (
    <div className="w-full">
      <LeafletOperationalMap
        provinces={provinces}
        selectedProvince={selectedProvince}
        onSelectProvince={onSelectProvince}
        theme={theme}
      />
    </div>
  );
};


