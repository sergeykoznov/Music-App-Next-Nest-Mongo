import convertSeconds from "@/helpers/convertSeconds";
import React from "react";

interface TrackProgressProps {
  left: number;
  right: number;
  minutes?: boolean;
  onChange: (e: any) => void;
}

const TrackProgress: React.FC<TrackProgressProps> = ({
  left,
  right,
  minutes,
  onChange,
}) => {
  return (
    <div style={{ display: "flex" }}>
      <input
        type="range"
        min={0}
        max={right}
        value={left}
        onChange={onChange}
      />
      {minutes ? (
        <div>
          {convertSeconds(left)} / {convertSeconds(right)}
        </div>
      ) : (
        <div>
          {left} / {right}
        </div>
      )}
    </div>
  );
};

export default TrackProgress;
