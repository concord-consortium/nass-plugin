import React from "react";
import { Options } from "./options";
import { attributeOptions } from "./constants";
import classnames from "classnames";
import { IStateOptions } from "./types";

import css from "./options.scss";

interface IProps {
  handleSetSelectedOptions: (option: string, value: string|string[]) => void;
  selectedOptions: IStateOptions;
}

export const AttributeOptions: React.FC<IProps> = (props) => {
  const {handleSetSelectedOptions, selectedOptions} = props;

  const commonProps = {
    inputType: "checkbox" as "checkbox"|"radio",
    handleSetSelectedOptions,
    selectedOptions
  };

  const getClasses = (key: string) => {
    if (key === "cropUnits" || key === "crops") {
      return classnames(css.checkOptions, css.narrow);
    } else {
      return classnames(css.checkOptions, css.vertical);
    }
  };

  return (
    <>
      {
        attributeOptions.map((attr) => {
          return (
            <>
            {attr.label && <div key={`header-${attr.key}`} className={css.category}>{attr.label}</div>}
            {attr.instructions && <div key={`instructions-${attr.key}`} className={css.instructions}>{attr.instructions}</div>}
            <div key={`options-container-${attr.key}`} className={classnames(getClasses(attr.key))}>
              <Options
                key={`options-${attr.key}`}
                options={attr.options}
                optionKey={attr.key}
                {...commonProps}
              />
            </div>
            </>
          );
        })
      }
    </>
    );
};