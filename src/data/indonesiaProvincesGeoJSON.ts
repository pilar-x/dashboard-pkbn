// GeoJSON Data for Indonesian Province Boundaries
// Provides boundary polygon geometries for Google Maps Data Layer

export interface ProvinceFeatureProperties {
  id: string;
  code: string;
  name: string;
  islandGroup: string;
}

export const indonesiaProvincesGeoJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { id: "aceh", code: "11", name: "Aceh", islandGroup: "Sumatra" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [95.2, 5.6],
            [97.8, 5.2],
            [98.2, 3.8],
            [97.4, 2.0],
            [96.8, 2.5],
            [95.8, 4.2],
            [95.2, 5.6]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: { id: "sumut", code: "12", name: "Sumatra Utara", islandGroup: "Sumatra" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [98.2, 3.8],
            [99.8, 3.2],
            [100.2, 1.8],
            [99.2, 1.0],
            [97.4, 2.0],
            [98.2, 3.8]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: { id: "sumbar", code: "13", name: "Sumatra Barat", islandGroup: "Sumatra" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [99.2, 0.2],
            [101.2, 0.4],
            [101.8, -1.8],
            [100.2, -3.2],
            [99.2, -1.2],
            [99.2, 0.2]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: { id: "riau", code: "14", name: "Riau", islandGroup: "Sumatra" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [100.2, 2.5],
            [103.2, 2.0],
            [103.8, -0.8],
            [101.2, -0.2],
            [100.2, 1.8],
            [100.2, 2.5]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: { id: "banten", code: "36", name: "Banten", islandGroup: "Jawa" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [105.1, -5.9],
            [106.7, -5.9],
            [106.5, -6.9],
            [105.2, -6.8],
            [105.1, -5.9]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: { id: "dki", code: "31", name: "DKI Jakarta", islandGroup: "Jawa" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [106.7, -6.1],
            [106.98, -6.1],
            [106.98, -6.38],
            [106.7, -6.38],
            [106.7, -6.1]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: { id: "jabar", code: "32", name: "Jawa Barat", islandGroup: "Jawa" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [106.5, -6.2],
            [108.8, -6.2],
            [108.8, -7.8],
            [106.5, -7.7],
            [106.5, -6.2]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: { id: "jateng", code: "33", name: "Jawa Tengah", islandGroup: "Jawa" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [108.8, -6.5],
            [111.6, -6.5],
            [111.5, -8.2],
            [108.8, -7.8],
            [108.8, -6.5]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: { id: "diy", code: "34", name: "DI Yogyakarta", islandGroup: "Jawa" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [110.0, -7.55],
            [110.8, -7.55],
            [110.8, -8.2],
            [110.0, -8.2],
            [110.0, -7.55]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: { id: "jatim", code: "35", name: "Jawa Timur", islandGroup: "Jawa" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [111.5, -6.8],
            [114.6, -6.8],
            [114.6, -8.8],
            [111.5, -8.5],
            [111.5, -6.8]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: { id: "bali", code: "51", name: "Bali", islandGroup: "Bali & Nusa" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [114.4, -8.0],
            [115.7, -8.0],
            [115.7, -8.9],
            [114.4, -8.9],
            [114.4, -8.0]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: { id: "ntb", code: "52", name: "Nusa Tenggara Barat", islandGroup: "Bali & Nusa" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [115.8, -8.1],
            [119.3, -8.1],
            [119.3, -9.1],
            [115.8, -9.1],
            [115.8, -8.1]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: { id: "ntt", code: "53", name: "Nusa Tenggara Timur", islandGroup: "Bali & Nusa" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [118.9, -8.1],
            [125.2, -8.1],
            [125.2, -11.1],
            [118.9, -11.1],
            [118.9, -8.1]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: { id: "kalbar", code: "61", name: "Kalimantan Barat", islandGroup: "Kalimantan" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [108.8, 2.1],
            [114.2, 2.1],
            [114.2, -3.1],
            [108.8, -3.1],
            [108.8, 2.1]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: { id: "kaltim", code: "64", name: "Kalimantan Timur", islandGroup: "Kalimantan" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [115.2, 2.6],
            [119.1, 2.6],
            [119.1, -2.1],
            [115.2, -2.1],
            [115.2, 2.6]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: { id: "sulsel", code: "73", name: "Sulawesi Selatan", islandGroup: "Sulawesi" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [118.8, -2.0],
            [121.8, -2.0],
            [121.8, -7.2],
            [118.8, -7.2],
            [118.8, -2.0]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: { id: "sulut", code: "71", name: "Sulawesi Utara", islandGroup: "Sulawesi" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [123.5, 5.0],
            [127.2, 5.0],
            [127.2, 0.2],
            [123.5, 0.2],
            [123.5, 5.0]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: { id: "maluku", code: "81", name: "Maluku", islandGroup: "Maluku & Papua" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [125.8, -2.2],
            [131.8, -2.2],
            [131.8, -8.3],
            [125.8, -8.3],
            [125.8, -2.2]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: { id: "papua", code: "91", name: "Papua", islandGroup: "Maluku & Papua" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [137.5, -1.8],
            [141.1, -1.8],
            [141.1, -9.1],
            [137.5, -9.1],
            [137.5, -1.8]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: { id: "papuabarad", code: "92", name: "Papua Barat", islandGroup: "Maluku & Papua" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [130.8, -0.2],
            [137.5, -0.2],
            [137.5, -4.8],
            [130.8, -4.8],
            [130.8, -0.2]
          ]
        ]
      }
    }
  ]
};
