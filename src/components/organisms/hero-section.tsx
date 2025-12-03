import { GradientText } from "../atoms";

export const HeroSection = () => {
  return (
    <section className="relative flex items-center justify-center min-h-[40vh] px-4 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gray-900 dark:bg-gray-100 rounded-full mix-blend-multiply dark:mix-blend-soft-light opacity-70 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-gray-900 dark:bg-gray-100 rounded-full mix-blend-multiply dark:mix-blend-soft-light opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-gray-900 dark:bg-gray-100 rounded-full mix-blend-multiply dark:mix-blend-soft-light opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="text-center space-y-6 max-w-4xl mx-auto">
        <div className="space-y-2">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
            <GradientText>🐾 PawFinder</GradientText>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium">
            Reuniting pets with their families 💕
          </p>
        </div>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Lost a furry friend? Found a wandering pet? We're here to help bring
          them home! 🏡✨
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <button
            type="button"
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            Report Lost Pet 😿
          </button>
          <button
            type="button"
            className="px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            Report Found Pet 😺
          </button>
        </div>
      </div>
    </section>
  );
};
