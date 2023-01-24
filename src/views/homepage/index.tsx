import Maps from "components/Maps";
import { useEffect } from "react";

const HomepageView = () => {
  useEffect(() => {
    document.title = "Map Clone by Kyra";
  }, []);

  return (
    <div className="homepage">
      <Maps />
    </div>
  );
};

export default HomepageView;
