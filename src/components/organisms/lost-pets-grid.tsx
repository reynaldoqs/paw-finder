import { getLostAnimals } from "@/actions/get_lost_animals";
import { Masonry } from "../atoms";

export const LostPetsGrid: React.FC = async () => {
  const lostAnimals = await getLostAnimals();
  const formattedLostAnimals = lostAnimals.map((animal) => {
    const animalImage = animal.images?.[0]?.url || animal.imageUrl;
    const aspectRatio = animal.images?.[0]
      ? animal.images[0].width / animal.images[0].height
      : 1;
    return {
      id: animal.id,
      img: animalImage,
      url: `/animal/${animal.id}`,
      aspectRatio,
    };
  });

  return (
    <div>
      <Masonry
        items={formattedLostAnimals}
        ease="power3.out"
        duration={0.6}
        stagger={0.05}
        animateFrom="center"
        scaleOnHover={true}
        hoverScale={0.95}
        blurToFocus={true}
        colorShiftOnHover={true}
      />
    </div>
  );
};
