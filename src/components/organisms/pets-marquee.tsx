import { PetCard } from "@/components/molecules/pet-card";

type Pet = {
  id: string;
  name: string;
  type: string;
  status: "lost" | "found";
  emoji: string;
  location: string;
};

const mockPets: Pet[] = [
  {
    id: "1",
    name: "Max",
    type: "Golden Retriever",
    status: "lost",
    emoji: "🐕",
    location: "Central Park, NY",
  },
  {
    id: "2",
    name: "Whiskers",
    type: "Tabby Cat",
    status: "found",
    emoji: "🐈",
    location: "Brooklyn, NY",
  },
  {
    id: "3",
    name: "Luna",
    type: "Husky",
    status: "lost",
    emoji: "🐺",
    location: "Queens, NY",
  },
  {
    id: "4",
    name: "Mittens",
    type: "Persian Cat",
    status: "found",
    emoji: "😺",
    location: "Manhattan, NY",
  },
  {
    id: "5",
    name: "Buddy",
    type: "Beagle",
    status: "lost",
    emoji: "🐶",
    location: "Bronx, NY",
  },
  {
    id: "6",
    name: "Shadow",
    type: "Black Cat",
    status: "found",
    emoji: "🐈‍⬛",
    location: "Staten Island, NY",
  },
  {
    id: "7",
    name: "Charlie",
    type: "Corgi",
    status: "lost",
    emoji: "🦮",
    location: "Long Island, NY",
  },
  {
    id: "8",
    name: "Ginger",
    type: "Orange Cat",
    status: "found",
    emoji: "🐱",
    location: "Harlem, NY",
  },
  {
    id: "9",
    name: "Rocky",
    type: "German Shepherd",
    status: "lost",
    emoji: "🐕‍🦺",
    location: "Chelsea, NY",
  },
  {
    id: "10",
    name: "Fluffy",
    type: "Ragdoll Cat",
    status: "found",
    emoji: "😻",
    location: "SoHo, NY",
  },
];

export const PetsMarquee = () => {
  // Duplicate the array for seamless loop
  const duplicatedPets = [...mockPets, ...mockPets];

  return (
    <section className="py-12 bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-orange-950/20 overflow-hidden">
      <div className="mb-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          Recent Lost & Found Pets 🔍
        </h2>
        <p className="text-muted-foreground">
          Help us reunite these pets with their families! 💖
        </p>
      </div>

      {/* Marquee container */}
      <div className="relative">
        <div className="flex gap-6 animate-marquee hover:pause">
          {duplicatedPets.map((pet, index) => (
            <PetCard
              key={`${pet.id}-${index}`}
              name={pet.name}
              type={pet.type}
              status={pet.status}
              emoji={pet.emoji}
              location={pet.location}
            />
          ))}
        </div>
      </div>

      {/* Gradient overlays for fade effect */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
    </section>
  );
};
