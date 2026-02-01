import { AnimatePresence, motion } from "framer-motion";
import {
  Accessibility,
  Bike,
  Building2,
  ExternalLinkIcon,
  Layers,
  Mail,
  MapPin,
  ParkingSquare,
  Phone,
  Train,
  Wifi,
} from "lucide-react";

import type { Station } from "@/types";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Info from "./Info";
import { Button } from "./ui/button";

const AMENITIES = [
  { key: "hasParking", label: "Parking", icon: ParkingSquare },
  { key: "hasBicycleParking", label: "Bike parking", icon: Bike },
  { key: "hasWiFi", label: "WiFi", icon: Wifi },
  { key: "hasPublicFacilities", label: "Public facilities", icon: Building2 },
  {
    key: "hasSteplessAccess",
    label: "Step‑free access",
    icon: Accessibility,
    yesNo: true,
  },
];

export interface ISelectedStationProps {
  selectedStation?: Station;
}

const SelectedStation = ({ selectedStation }: ISelectedStationProps) => {
  if (!selectedStation) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={selectedStation?.name}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="w-full rounded-md">
          <CardContent className="space-y-3 p-6">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-semibold">
                  {selectedStation.name}
                </h1>

                <p className="text-muted-foreground text-sm">
                  Station ID {selectedStation.id} · RIL {selectedStation.ril100}
                </p>
              </div>

              <div className="flex gap-2">
                <Badge>Category {selectedStation.category}</Badge>

                <Badge variant="outline">
                  {selectedStation.productLine.productLine}
                </Badge>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-sm">
              <MapPin size={16} />
              {selectedStation.address.street},{" "}
              {selectedStation.address.zipcode} {selectedStation.address.city} —{" "}
              {selectedStation.federalState}
            </div>

            {/* Meta badges */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{selectedStation.operator.name}</Badge>

              <Badge variant="outline">
                {selectedStation.productLine.segment}
              </Badge>

              <Badge variant="outline">
                {selectedStation.regionalbereich.shortName}
              </Badge>
            </div>

            <Separator />

            {/* Amenities */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {AMENITIES.map(({ key, label, icon: Icon, yesNo }) => {
                const raw = selectedStation[key as keyof Station];
                const active = yesNo ? raw === "yes" : Boolean(raw);

                return (
                  <div
                    key={key}
                    className={`grid grid-cols-[auto_1fr] items-center gap-2 rounded-xl border p-3 text-sm ${
                      active
                        ? "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-800 dark:text-green-50"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon size={16} />
                    {label}
                  </div>
                );
              })}
            </div>

            <Separator />

            {/* Operational info */}
            <div className="grid gap-4 text-sm sm:grid-cols-2">
              <Info
                label="Station management"
                value={selectedStation.stationManagement.name}
              />

              <Info
                label="Control center"
                value={selectedStation.szentrale.name}
              />

              <Info
                label="Federal state"
                value={selectedStation.federalState}
              />
              <Info label="Weight" value={`${selectedStation.weight}`} />
            </div>

            {/* Contact */}
            <div className="bg-muted space-y-2 rounded-2xl p-4 text-sm">
              <div className="grid grid-cols-[auto_1fr] items-center gap-2">
                <Mail size={14} />
                <a
                  href={`mailto:${selectedStation.timeTableOffice.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-600"
                >
                  <span className="break-all">
                    {selectedStation.timeTableOffice.email}
                  </span>
                </a>
              </div>

              <div className="grid grid-cols-[auto_1fr] items-center gap-2">
                <Phone size={14} />
                <a
                  href={`tel:${selectedStation.szentrale.publicPhoneNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-600"
                >
                  {selectedStation.szentrale.publicPhoneNumber}
                </a>
              </div>
            </div>

            {/* Coordinates preview */}
            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border p-4 text-sm">
              <Layers size={16} />
              Lat {selectedStation.location.latitude} · Lng{" "}
              {selectedStation.location.longitude}
              <Button
                asChild
                variant="outline"
                size="icon-sm"
                title="Open in Google Maps"
                className="border-sky-600 text-sky-600! hover:bg-sky-600/10 focus-visible:border-sky-600 focus-visible:ring-sky-600/20 dark:border-sky-400 dark:text-sky-400! dark:hover:bg-sky-400/10 dark:focus-visible:border-sky-400 dark:focus-visible:ring-sky-400/40"
              >
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${selectedStation.location.latitude},${selectedStation.location.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLinkIcon size={16} />
                </a>
              </Button>
            </div>

            <div className="text-muted-foreground flex items-center gap-2 pt-2 text-sm">
              <Train size={14} />
              {selectedStation.productLine.productLine} —{" "}
              {selectedStation.productLine.segment}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default SelectedStation;
