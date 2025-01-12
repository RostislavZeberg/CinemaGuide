import random from "random";
import { FC } from "react";

import { MovieList } from "../../api/Movie";
import empty from '../../../public/empty_img.jpeg'

export interface GenresViewProps {
  imgGenre: MovieList;
}

export const ImgGenre: FC<GenresViewProps> = ({ imgGenre }) => {
  
  const MovieImg = random.choice(imgGenre)?.backdropUrl;

  return (
    <div style={{ flexGrow: "1" }}>
      <img
        style={{
          borderTopRightRadius: "24px",
          borderTopLeftRadius: "24px",
          height: "100%",
        }}
        src={MovieImg ? MovieImg : empty}
        alt=""
      />
    </div>
  );
};
