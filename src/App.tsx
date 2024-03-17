/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from "react";
import CustomCMSApp from "./CustomCMSApp";
import { useLocalStorage } from "@uidotdev/usehooks";

// export default CustomCMSApp;
const App = () => {
  // const [databaseId, setDatabaseId] = useState("(default)");

  return (
    <div>
      <CustomCMSApp />
    </div>
  );
};

export default App;
