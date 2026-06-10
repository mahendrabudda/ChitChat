const sounds = [
  "/sounds/key1.mp3",
  "/sounds/key2.mp3",
  "/sounds/key3.mp3",
];

function useKeyboardSound() {
  const playRandomKeyStrokeSound = () => {
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    const audio = new Audio(randomSound);
    audio.volume = 0.3;
    audio.play().catch(() => {});
  };

  return { playRandomKeyStrokeSound };
}

export default useKeyboardSound;