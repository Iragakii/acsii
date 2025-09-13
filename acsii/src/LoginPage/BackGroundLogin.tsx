import LetterGlitch from "./LetterGlitch";

const BackGroundLogin = () => {
  return (
    <>
      <LetterGlitch
        glitchSpeed={50}
        centerVignette={true}
        outerVignette={false}
        smooth={true}
      />
    </>
  );
};

export default BackGroundLogin;
