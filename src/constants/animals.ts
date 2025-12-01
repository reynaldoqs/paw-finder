export const species = [
  "dog",
  "cat",
  "rabbit",
  "guinea pig",
  "hamster",
  "other",
] as const;

export const animalStatus = [
  "active",
  "inactive",
  "deleted",
  "found",
  "archived",
] as const;

export const speciesColors: Record<(typeof species)[number], string> = {
  dog: "hover:bg-blue-500/10 hover:border-blue-500 data-[selected=true]:bg-blue-500/20 data-[selected=true]:border-blue-500",
  cat: "hover:bg-purple-500/10 hover:border-purple-500 data-[selected=true]:bg-purple-500/20 data-[selected=true]:border-purple-500",
  rabbit:
    "hover:bg-pink-500/10 hover:border-pink-500 data-[selected=true]:bg-pink-500/20 data-[selected=true]:border-pink-500",
  "guinea pig":
    "hover:bg-orange-500/10 hover:border-orange-500 data-[selected=true]:bg-orange-500/20 data-[selected=true]:border-orange-500",
  hamster:
    "hover:bg-yellow-500/10 hover:border-yellow-500 data-[selected=true]:bg-yellow-500/20 data-[selected=true]:border-yellow-500",
  other:
    "hover:bg-gray-500/10 hover:border-gray-500 data-[selected=true]:bg-gray-500/20 data-[selected=true]:border-gray-500",
} as const;

export const animalBgs: Record<(typeof species)[number], string> = {
  dog: "bg-blue-500/10",
  cat: "bg-purple-500/10",
  rabbit: "bg-pink-500/10",
  "guinea pig": "bg-orange-500/10",
  hamster: "bg-yellow-500/10",
  other: "bg-gray-500/10",
} as const;

export const speciesIcons = {
  dog: "🐕",
  cat: "🐈",
  rabbit: "🐇",
  "guinea pig": "🐹",
  hamster: "🐹",
  other: "🐾",
} as const;
