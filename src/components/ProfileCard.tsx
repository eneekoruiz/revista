import React from "react";

type ProfileProps = {
  name: string;
  role: string;
  description: string;
  imageUrl?: string;
};

export default function ProfileCard({ name, role, description, imageUrl }: ProfileProps) {
  return (
    <div className="brutal-shadow bg-black border-2 border-[#FC352E] flex flex-col overflow-hidden w-full font-poppins">
      <div className="h-64 w-full bg-[#111] relative border-b-2 border-[#FC352E] overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#FC352E] font-anton text-8xl uppercase opacity-20">
            {name.charAt(0)}
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-[#FC352E] font-anton text-3xl uppercase tracking-tight mb-1">{name}</h3>
        <p className="text-white font-bold text-xs tracking-[0.2em] uppercase mb-4 opacity-70">{role}</p>
        <div className="w-8 h-1 bg-[#FC352E] mb-4"></div>
        <p className="text-white/80 text-sm leading-relaxed flex-1">
          {description}
        </p>
      </div>
    </div>
  );
}
