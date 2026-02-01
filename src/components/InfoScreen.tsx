import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

import { SparklesCore } from "./ui/sparkles";

export interface IInfoScreenProps {
  className?: string;
  children?: ReactNode;
}

const InfoScreen = ({ className, children }: IInfoScreenProps) => {
  return (
    <div
      className={cn(
        "flex h-svh w-full flex-col items-center justify-center overflow-hidden bg-black",
        className,
      )}
    >
      <div className="absolute inset-0 h-screen w-full">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="h-full w-full"
          particleColor="#FFFFFF"
        />
      </div>

      <span className="z-20 text-xl text-white">{children}</span>
    </div>
  );
};

export default InfoScreen;
