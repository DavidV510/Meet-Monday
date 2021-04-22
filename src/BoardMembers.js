import React from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css"
import StoryStateRow from 'monday-ui-react-core/src/components/StoryStateRow'
import boolean from 'monday-ui-react-core/src/'


const BoardMembers = () => {
    const BoardMembers = [
      { value: "English", label: "English", isFixed: true },
      { value: "ocean", label: "Ocean", isFixed: true },
      { value: "blue", label: "Blue", isDisabled: true },
      { value: "purple", label: "Purple" },
      { value: "red", label: "Red", isFixed: true },
      { value: "orange", label: "Orange" },
      { value: "yellow", label: "Yellow" }
    ];
    
    const mockDefaultOptions = BoardMembers.slice(0, 2);
    
    const isAsync = boolean("Async options - Promise or Callback", false, "Async");
    
    const isVirtualized = boolean("isVirtualized", false);
    const isWithDefaultValue = boolean("defautValue", false);
    const noOptionsMessage = text("noOptionsMessage", "No options found");
    
    const mockPromiseOptions = inputValue => {
      const arr = isVirtualized ? mockVirtualizedOptions : BoardMembers;
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(arr.filter(({ label }) => label.toLowerCase().includes(inputValue.toLowerCase())));
        }, 1000);
      });
    };
    
    let extraProps = {};
    if (isAsync) {
      const isDefaultOptions = boolean("Prefetched options", false, "Async");
      const isCachedOptions = boolean("Cache async options", false, "Async");
    
      extraProps = {
        asyncOptions: mockPromiseOptions,
        cacheOptions: isCachedOptions,
        ...(isDefaultOptions && {
          defaultOptions: isVirtualized ? [mockVirtualizedOptions[0]] : mockDefaultOptions
        })
      };
    }
    
    extraProps = {
      ...extraProps,
      ...(isWithDefaultValue && {
        defaultValue: isVirtualized ? mockVirtualizedOptions[0] : BoardMembers[0]
      })
    };
    
    return (
      <section>
        <StoryStateRow>
          <StoryStateColumn title="Sandbox" centerize>
            <Dropdown
              id="Sandbox"
              className="dropdown-story"
              disabled={boolean("disabled", false)}
              clearable={boolean("clearable", true)}
              rtl={boolean("rtl", false)}
              searchable={boolean("searchable", true)}
              name="color"
              options={isVirtualized ? mockVirtualizedOptions : BoardMembers}
              size={select("size", Object.values(Dropdown.size), Dropdown.size.SMALL)}
              placeholder={text("placeholder", "Dropdown placeholder")}
              onMenuOpen={action("Menu Open")}
              onMenuClose={action("Menu Close")}
              onFocus={action("Menu Focus")}
              onChange={action("Selected value has changed")}
              noOptionsMessage={() => noOptionsMessage}
              openMenuOnFocus={boolean("openMenuOnFocus", true)}
              openMenuOnClick={boolean("openMenuOnClick", true)}
              isVirtualized={isVirtualized}
              menuPortalTarget={document.body}
              {...extraProps}
            />
          </StoryStateColumn>
        </StoryStateRow>
      </section>
    );
}

export default BoardMembers