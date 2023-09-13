import React, {useEffect, useState} from "react";
import { Dropdown } from "./dropdown";
import classnames from "classnames";
import { Information } from "./information";
import { categories, defaultSelectedOptions } from "./constants";
import { IStateOptions } from "./types";

import css from "./app.scss";
import { runTestQuery } from "../scripts/api";

function App() {
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<IStateOptions>(defaultSelectedOptions);

  useEffect(() => {
    runTestQuery();
  }, [])

  const handleSetSelectedOptions = (option: string, value: string | string[]) => {
    const newSelectedOptions = {...selectedOptions, [option]: value};
    setSelectedOptions(newSelectedOptions);
  };

  const handleInfoClick = () => {
    setShowInfo(true);
  };

  return (
    <div className={css.pluginContent}>
      { showInfo &&
      <Information closeInfo={() => setShowInfo(false)}/>
      }
      <div className={css.introSection}>
        <div className={css.sectionHeaderLine}>
        <span className={css.sectionHeaderText}>
          Retrieve data on U.S. agricultural statitistics at the state or county level.
        </span>
        <span
          title="Further information about this CODAP plugin"
          className={classnames(css.infoButton, {[css.disabled]: showInfo})}
          onClick={handleInfoClick}
        />
        </div>
      </div>
      <div className={css.scrollArea}>
        {categories.map((cat) => {
          return (
            <Dropdown
              key={cat.header}
              category={cat.header}
              sectionAltText={cat.altText}
              handleSetSelectedOptions={handleSetSelectedOptions}
              selectedOptions={selectedOptions}
            />
          )
        })}
      </div>
      <div className={css.summary}>
        <span className={css.statusGraphic}></span>
        <button className={css.getDataButton}>Get Data</button>
      </div>
    </div>

  );
}

export default App;
