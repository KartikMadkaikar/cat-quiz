export default function CatCharacter({ leftPupilStyle, rightPupilStyle }) {
  return (
    <div className="w-[320px]">

      <svg viewBox="0 0 300 300">

        {/* EARS */}
        <polygon points="60,40 100,120 20,120" fill="black" />
        <polygon points="240,40 280,120 200,120" fill="black" />

        {/* FACE */}
        <circle cx="150" cy="170" r="120" fill="black" />

        {/* LEFT EYE IRIS */}
        <circle cx="100" cy="170" r="35" fill="#FFD700" />

        {/* LEFT PUPIL */}
        <circle
          cx="100"
          cy="170"
          r="12"
          fill="black"
          style={leftPupilStyle}
        />

        {/* RIGHT EYE IRIS */}
        <circle cx="200" cy="170" r="35" fill="#FFD700" />

        {/* RIGHT PUPIL */}
        <circle
          cx="200"
          cy="170"
          r="12"
          fill="black"
          style={rightPupilStyle}
        />

      </svg>

    </div>
  );
}