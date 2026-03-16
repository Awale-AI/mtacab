import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Wheat, Sprout } from "lucide-react";
import { cn } from "@/lib/utils";
import somaliaMapImage from "@/assets/somalia-map.png";

interface LocationData {
  id: string;
  name: string;
  state: string;
  description: string;
  highlight: string;
  icon: React.ElementType;
  // Real-world coordinates (latitude, longitude)
  coordinates: { lat: number; lng: number };
}

const priorityLocations: LocationData[] = [
  {
    id: "beletweyne",
    name: "Beletweyne",
    state: "Hirshabelle",
    description: "2,912 farmers organized into 14 cooperative groups.",
    highlight: "Major structured farmer organization zone.",
    icon: Users,
    coordinates: { lat: 4.74, lng: 45.20 },
  },
  {
    id: "jowhar",
    name: "Jowhar",
    state: "Middle Shabelle",
    description: "Highly productive area.",
    highlight: "The only district in Somalia with active rice cultivation.",
    icon: Wheat,
    coordinates: { lat: 2.78, lng: 45.50 },
  },
  {
    id: "afgooye",
    name: "Afgooye",
    state: "Lower Shabelle",
    description: "Part of the agricultural heartland.",
    highlight: "Key maize production and integrated market zone.",
    icon: Sprout,
    coordinates: { lat: 2.14, lng: 45.12 },
  },
  {
    id: "merca",
    name: "Merca",
    state: "Lower Shabelle",
    description: "Primary focus area for agricultural studies and extension.",
    highlight: "Smallholder information dissemination hub.",
    icon: Users,
    coordinates: { lat: 1.71, lng: 44.77 },
  },
  {
    id: "qoryoley",
    name: "Qoryoley",
    state: "Lower Shabelle",
    description: "Growing agricultural district.",
    highlight: "Emerging farming cooperative network.",
    icon: Sprout,
    coordinates: { lat: 1.79, lng: 44.53 },
  },
];

// Geographic bounds for Somalia (approximate)
// Latitude: -1.5°S to 12°N
// Longitude: 41°E to 51.5°E
const SOMALIA_BOUNDS = {
  minLat: -1.5,
  maxLat: 12,
  minLng: 41,
  maxLng: 51.5,
};

// Convert geographic coordinates to SVG coordinates
// SVG viewBox: 0 0 400 500 (wider format to accommodate Somalia's shape)
function geoToSvg(lat: number, lng: number): { x: number; y: number } {
  const svgWidth = 400;
  const svgHeight = 500;
  const padding = 30;
  
  const lngRange = SOMALIA_BOUNDS.maxLng - SOMALIA_BOUNDS.minLng;
  const latRange = SOMALIA_BOUNDS.maxLat - SOMALIA_BOUNDS.minLat;
  
  const x = padding + ((lng - SOMALIA_BOUNDS.minLng) / lngRange) * (svgWidth - 2 * padding);
  const y = padding + ((SOMALIA_BOUNDS.maxLat - lat) / latRange) * (svgHeight - 2 * padding);
  
  return { x, y };
}

function SomaliaMap() {
  return (
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center">
      <img 
        src={somaliaMapImage} 
        alt="Somalia map showing Phase 1 Coverage - 5 Districts: Beletweyne, Jowhar, Afgooye, Qoryoley, and Merca"
        className="w-full h-auto max-h-[520px] object-contain"
      />
    </div>
  );
}

interface LocationCardProps {
  location: LocationData;
  isHovered: boolean;
  onHover: (id: string | null) => void;
}

function LocationCard({ location, isHovered, onHover }: LocationCardProps) {
  const Icon = location.icon;
  
  return (
    <Card 
      className={cn(
        "border transition-all duration-300 cursor-pointer",
        isHovered 
          ? "border-[hsl(142_76%_36%)] shadow-lg shadow-[hsl(142_76%_36%_/_0.1)] bg-[hsl(142_76%_36%_/_0.03)] scale-[1.02]" 
          : "border-border hover:border-primary/30 hover:shadow-md bg-card"
      )}
      onMouseEnter={() => onHover(location.id)}
      onMouseLeave={() => onHover(null)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={cn(
            "p-2 rounded-lg shrink-0 transition-colors duration-300",
            isHovered ? "bg-[hsl(142_76%_36%_/_0.15)]" : "bg-primary/10"
          )}>
            <Icon className={cn(
              "w-5 h-5 transition-colors duration-300",
              isHovered ? "text-[hsl(142_76%_36%)]" : "text-primary"
            )} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h4 className={cn(
                "font-semibold transition-colors duration-300",
                isHovered ? "text-[hsl(142_76%_36%)]" : "text-foreground"
              )}>
                {location.name}
              </h4>
              <Badge 
                variant="secondary" 
                className={cn(
                  "text-[10px] px-2 py-0 transition-colors duration-300",
                  isHovered && "bg-[hsl(142_76%_36%_/_0.15)] text-[hsl(142_76%_36%)]"
                )}
              >
                {location.state}
              </Badge>
            </div>
            <p className="text-sm text-foreground mb-1">{location.description}</p>
            <p className={cn(
              "text-xs font-medium transition-colors duration-300",
              isHovered ? "text-[hsl(142_76%_36%)]" : "text-primary"
            )}>
              {location.highlight}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function PriorityLocationsSection() {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  return (
    <section className="py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <Badge variant="outline" className="mb-3 text-[hsl(142_76%_36%)] border-[hsl(142_76%_36%_/_0.3)] bg-[hsl(142_76%_36%_/_0.05)]">
          <MapPin className="w-3 h-3 mr-1" />
          Phase 1 — Initial Coverage
        </Badge>
        <h2 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-2">
          Priority Agricultural Locations in Somalia
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Initial implementation areas for TACAB program coordination
        </p>
      </div>

      {/* Split Layout */}
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Left: Map */}
        <Card className="bg-gradient-to-br from-secondary/10 to-background border-border overflow-hidden">
          <CardContent className="p-4 lg:p-6">
            <SomaliaMap />
          </CardContent>
        </Card>

        {/* Right: Location Cards */}
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Target Districts
            </h3>
            <span className="text-xs text-muted-foreground">
              Hover to highlight on map
            </span>
          </div>
          {priorityLocations.map((location) => (
            <LocationCard 
              key={location.id} 
              location={location}
              isHovered={hoveredLocation === location.id}
              onHover={setHoveredLocation}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
